-- Run this once in your Supabase SQL Editor (Database → SQL Editor → New query)
-- Requires pgvector extension (already enabled since embeddings are stored)

CREATE OR REPLACE FUNCTION search_threads(
  query_embedding vector(1536),
  match_count int DEFAULT 10
)
RETURNS TABLE (
  slack_ts text,
  channel_id text,
  user_id text,
  text_clean text,
  posted_at timestamptz,
  reply_count int,
  reaction_count int,
  similarity float
)
LANGUAGE sql
STABLE
AS $$
  SELECT
    slack_ts,
    channel_id,
    user_id,
    text_clean,
    posted_at,
    reply_count,
    reaction_count,
    1 - (embedding <=> query_embedding) AS similarity
  FROM messages
  WHERE thread_ts IS NULL
    AND deleted_at IS NULL
    AND embedding IS NOT NULL
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;
