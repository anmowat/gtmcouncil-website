import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getSupabase } from '@/lib/supabase';
import OpenAI from 'openai';

export const runtime = 'nodejs';

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export interface ThreadMessage {
  user_id: string | null;
  user_name: string;
  text_clean: string;
  posted_at: string;
  is_parent: boolean;
}

export interface ThreadResult {
  slack_ts: string;
  channel_id: string;
  channel_name: string;
  posted_at: string;
  reply_count: number;
  reaction_count: number;
  similarity: number;
  messages: ThreadMessage[];
  slack_url: string;
  can_view_in_slack: boolean;
}

function slackUrl(channelId: string, slackTs: string) {
  return `https://slack.com/app_redirect?channel=${channelId}&message_ts=${slackTs}`;
}

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const q = req.nextUrl.searchParams.get('q')?.trim();
  if (!q) return NextResponse.json({ threads: [] });

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const db = getSupabase();

  let embedding: number[];
  try {
    const res = await openai.embeddings.create({ model: 'text-embedding-3-small', input: q });
    embedding = res.data[0].embedding;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `Embedding failed: ${msg}` }, { status: 500 });
  }

  const { data: matches, error: searchErr } = await db.rpc('search_threads', {
    query_embedding: embedding,
    match_count: 10,
  });
  if (searchErr) return NextResponse.json({ error: searchErr.message }, { status: 500 });
  if (!matches?.length) return NextResponse.json({ threads: [] });

  type Match = {
    slack_ts: string;
    channel_id: string;
    user_id: string | null;
    text_clean: string;
    posted_at: string;
    reply_count: number;
    reaction_count: number;
    similarity: number;
  };

  // Fetch channel names
  const channelIds = [...new Set((matches as Match[]).map((m) => m.channel_id))];
  const { data: channels } = await db
    .from('channels')
    .select('slack_channel_id, name')
    .in('slack_channel_id', channelIds);
  const channelNames: Record<string, string> = {};
  for (const c of channels || []) channelNames[c.slack_channel_id] = c.name;

  // Fetch replies for each thread
  const threadReplies = await Promise.all(
    (matches as Match[]).map(async (match) => {
      const { data: replies } = await db
        .from('messages')
        .select('user_id, text_clean, posted_at')
        .eq('thread_ts', match.slack_ts)
        .eq('channel_id', match.channel_id)
        .is('deleted_at', null)
        .order('posted_at', { ascending: true })
        .limit(50);
      return replies || [];
    })
  );

  // Collect all user IDs to batch-fetch names
  const allUserIds = new Set<string>();
  for (const match of matches as Match[]) if (match.user_id) allUserIds.add(match.user_id);
  for (const replies of threadReplies) for (const r of replies) if (r.user_id) allUserIds.add(r.user_id);

  const { data: members } = await db
    .from('members')
    .select('slack_user_id, display_name, real_name')
    .in('slack_user_id', [...allUserIds]);
  const memberNames: Record<string, string> = {};
  for (const m of members || []) {
    memberNames[m.slack_user_id] = m.display_name || m.real_name || m.slack_user_id;
  }

  const threads: ThreadResult[] = (matches as Match[]).map((match, i) => {
    const replies = threadReplies[i];
    const messages: ThreadMessage[] = [
      {
        user_id: match.user_id,
        user_name: match.user_id ? (memberNames[match.user_id] || match.user_id) : 'Unknown',
        text_clean: match.text_clean,
        posted_at: match.posted_at,
        is_parent: true,
      },
      ...replies.map((r) => ({
        user_id: r.user_id,
        user_name: r.user_id ? (memberNames[r.user_id] || r.user_id) : 'Unknown',
        text_clean: r.text_clean,
        posted_at: r.posted_at,
        is_parent: false,
      })),
    ];

    return {
      slack_ts: match.slack_ts,
      channel_id: match.channel_id,
      channel_name: channelNames[match.channel_id] || match.channel_id,
      posted_at: match.posted_at,
      reply_count: match.reply_count,
      reaction_count: match.reaction_count,
      similarity: match.similarity,
      messages,
      slack_url: slackUrl(match.channel_id, match.slack_ts),
      can_view_in_slack: Date.now() - new Date(match.posted_at).getTime() < THIRTY_DAYS_MS,
    };
  });

  return NextResponse.json({ threads });
}
