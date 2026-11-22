'use client';

import { useState, useRef, useCallback } from 'react';
import type { ThreadResult, ThreadMessage } from '@/app/api/search/route';

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function MessageBubble({ msg }: { msg: ThreadMessage }) {
  return (
    <div className={`flex gap-3 ${msg.is_parent ? '' : 'pl-4 border-l-2 border-gray-100'}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="font-semibold text-sm text-[#011224]">{msg.user_name}</span>
          <span className="text-xs text-gray-400">{formatDate(msg.posted_at)}</span>
        </div>
        <p className="text-sm text-gray-700 whitespace-pre-wrap break-words leading-relaxed">
          {msg.text_clean}
        </p>
      </div>
    </div>
  );
}

function ThreadCard({ thread }: { thread: ThreadResult }) {
  const [expanded, setExpanded] = useState(true);
  const hasReplies = thread.messages.length > 1;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-medium text-[#c4921a] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 shrink-0">
            #{thread.channel_name}
          </span>
          <span className="text-xs text-gray-400 shrink-0">{formatDate(thread.posted_at)}</span>
          {thread.reply_count > 0 && (
            <span className="text-xs text-gray-400 shrink-0">
              {thread.reply_count} {thread.reply_count === 1 ? 'reply' : 'replies'}
            </span>
          )}
          {thread.reaction_count > 0 && (
            <span className="text-xs text-gray-400 shrink-0">· {thread.reaction_count} 👍</span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {thread.can_view_in_slack ? (
            <a
              href={thread.slack_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[#011224] hover:text-[#c4921a] underline underline-offset-2 transition-colors"
            >
              View in Slack ↗
            </a>
          ) : (
            <span
              title="This thread is older than 30 days and may not be accessible in Slack search."
              className="text-xs font-medium text-gray-300 cursor-default select-none"
            >
              View in Slack ↗
            </span>
          )}
          {hasReplies && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              {expanded ? 'Collapse ↑' : 'Expand ↓'}
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      {expanded && (
        <div className="px-4 py-4 space-y-4">
          {thread.messages.map((msg, i) => (
            <MessageBubble key={`${msg.user_id}-${i}`} msg={msg} />
          ))}
        </div>
      )}

      {/* Collapsed preview */}
      {!expanded && (
        <div className="px-4 py-3">
          <p className="text-sm text-gray-500 truncate">{thread.messages[0]?.text_clean}</p>
        </div>
      )}
    </div>
  );
}

export default function SearchClient() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ThreadResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) return;
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
        signal: ctrl.signal,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResults(data.threads);
    } catch (e: unknown) {
      if (e instanceof DOMException && e.name === 'AbortError') return;
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(query);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. How are teams using AI for forecasting?"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4921a] focus:border-transparent"
          autoFocus
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="bg-[#011224] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#011224]/90 disabled:opacity-40 transition-opacity"
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-sm text-gray-400 text-center py-10">Searching threads…</div>
      )}

      {results !== null && !loading && (
        <>
          {results.length === 0 ? (
            <div className="text-sm text-gray-400 text-center py-10">
              No matching threads found. Try rephrasing your question.
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-gray-400">{results.length} thread{results.length !== 1 ? 's' : ''} found</p>
              {results.map((thread) => (
                <ThreadCard key={`${thread.channel_id}-${thread.slack_ts}`} thread={thread} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
