import { Member } from "@/components/MemberCard";

const BASE_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`;

const headers = {
  Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
  "Content-Type": "application/json",
};

// ── Members ──────────────────────────────────────────────────────────────────

interface AirtableRecord {
  id: string;
  fields: {
    Name?: string;
    "First Name"?: string;
    Type?: string;
    Title?: string;
    LinkedIn?: string;
    Region?: string;
    Photo?: Array<{ url: string; filename: string }>;
    Email?: string;
    [key: string]: unknown;
  };
}

function recordToMember(record: AirtableRecord): Member {
  const f = record.fields;
  return {
    id: record.id,
    name: f["Name"] ?? "",
    firstName: f["First Name"] ?? (f["Name"] ?? "").split(" ")[0],
    type: f["Type"] ?? "MEM-Regular",
    title: f["Title"] ?? "",
    linkedin: f["LinkedIn"] ?? "",
    region: f["Region"] ?? "",
    photoUrl: f["Photo"]?.[0]?.url,
  };
}

async function fetchAllRecords(
  table: string,
  filterFormula?: string,
  view?: string,
  revalidate: number | false = 86400,
  noStore = false,
): Promise<AirtableRecord[]> {
  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams({ pageSize: "100" });
    if (filterFormula) params.set("filterByFormula", filterFormula);
    if (view) params.set("view", view);
    if (offset) params.set("offset", offset);

    // Always bypass cache for offset pages (tokens expire in ~5 min).
    // When noStore=true we bypass cache for ALL pages (used on retry after stale-offset 422).
    const cacheOpt: RequestInit = noStore || offset
      ? { cache: "no-store" }
      : { next: { revalidate } };

    const res = await fetch(`${BASE_URL}/${encodeURIComponent(table)}?${params}`, {
      headers,
      ...cacheOpt,
    });

    if (!res.ok) {
      const body = await res.text();
      // Cached page-1 offset token was stale — retry everything bypassing cache
      if (res.status === 422 && !noStore) {
        return fetchAllRecords(table, filterFormula, view, revalidate, true);
      }
      throw new Error(`Airtable ${res.status}: ${body}`);
    }

    const data = await res.json();
    records.push(...data.records);
    offset = data.offset;
  } while (offset);

  return records;
}

export async function getMembers(): Promise<Member[]> {
  const tableName = process.env.AIRTABLE_MEMBERS_TABLE ?? "Members";
  // Airtable attachment URLs expire in ~4-6h, so cap cache at 3h
  const records = await fetchAllRecords(tableName, undefined, "viwjhmKTzpPrPMx8C", 10800);
  return records.map(recordToMember);
}

export async function getMemberByEmail(email: string): Promise<Member | null> {
  const tableName = process.env.AIRTABLE_MEMBERS_TABLE ?? "Members";
  const formula = `TRIM(LOWER({Email})) = "${email.toLowerCase().trim().replace(/"/g, '\\"')}"`;
  // bypass cache for auth checks
  const params = new URLSearchParams({ filterByFormula: formula, maxRecords: "1" });
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(tableName)}?${params}`, {
    headers,
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.records?.length) return null;
  const member = recordToMember(data.records[0]);
  // Only allow active members (Type must start with "MEM-")
  if (!member.type?.toUpperCase().startsWith("MEM-")) return null;
  return member;
}

// ── Future Topics ─────────────────────────────────────────────────────────────

export interface FutureTopic {
  id: string;
  title: string;
  area: string;
  description: string;
}

// ── Demo Day ──────────────────────────────────────────────────────────────────

export interface DemoSubmission {
  id: string;
  name: string;
  target: string[];
  highlight: string;
  publicStatus: string;
  vimeoUrl: string;
  embedUrl: string;
}

function vimeoShareToEmbed(url: string): string {
  // https://vimeo.com/VIDEO_ID/HASH?... → embed URL
  try {
    const u = new URL(url);
    const parts = u.pathname.replace(/^\//, "").split("/");
    const videoId = parts[0];
    const hash = parts[1] ?? "";
    const base = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`;
    return hash ? `${base}&h=${hash}` : base;
  } catch {
    return url;
  }
}

export async function getDemoSubmissions(): Promise<DemoSubmission[]> {
  const tableName = process.env.AIRTABLE_DEMO_TABLE ?? "Vendors";
  // Only fetch vendors that have been marked with a Public status (Demo Day participants)
  const records = await fetchAllRecords(tableName, "{Public}!=''", undefined, false);
  return records.map((r) => {
    // Vimeo field is a plain URL string (e.g. https://vimeo.com/VIDEO_ID/HASH?share=copy)
    const vimeoUrl = typeof r.fields["Vimeo"] === "string" ? r.fields["Vimeo"] : "";
    return {
      id: r.id,
      name: String(r.fields["Name"] ?? ""),
      target: Array.isArray(r.fields["Target"])
        ? (r.fields["Target"] as string[])
        : r.fields["Target"]
        ? [String(r.fields["Target"])]
        : [],
      highlight: String(r.fields["Highlight"] ?? ""),
      publicStatus: String(r.fields["Public"] ?? ""),
      vimeoUrl,
      embedUrl: vimeoUrl ? vimeoShareToEmbed(vimeoUrl) : "",
    };
  });
}

export async function getDemoVoteCounts(): Promise<Record<string, number>> {
  const tableName = process.env.AIRTABLE_DEMO_VOTES_TABLE ?? "Demo Votes";
  const records = await fetchAllRecords(tableName, undefined, undefined, false);
  const counts: Record<string, number> = {};
  for (const r of records) {
    const id = String(r.fields["Submission ID"] ?? "");
    if (id) counts[id] = (counts[id] ?? 0) + 1;
  }
  return counts;
}

export async function getDemoVoteToday(
  submissionId: string,
  voterEmail: string
): Promise<boolean> {
  const tableName = process.env.AIRTABLE_DEMO_VOTES_TABLE ?? "Demo Votes";
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const formula = `AND({Submission ID}="${submissionId}",TRIM(LOWER({Voter Email}))="${voterEmail.toLowerCase().trim()}",IS_SAME(DATESTR({Voted At}),"${today}","days"))`;
  const params = new URLSearchParams({ filterByFormula: formula, maxRecords: "1" });
  const res = await fetch(
    `${BASE_URL}/${encodeURIComponent(tableName)}?${params}`,
    { headers, cache: "no-store" }
  );
  if (!res.ok) return false;
  const data = await res.json();
  return (data.records?.length ?? 0) > 0;
}

export async function createDemoVote(
  submissionId: string,
  voterEmail: string
): Promise<void> {
  const tableName = process.env.AIRTABLE_DEMO_VOTES_TABLE ?? "Demo Votes";
  await fetch(`${BASE_URL}/${encodeURIComponent(tableName)}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      records: [
        {
          fields: {
            "Submission ID": submissionId,
            "Voter Email": voterEmail,
            "Voted At": new Date().toISOString(),
          },
        },
      ],
    }),
  });
}

export async function getFutureTopics(): Promise<FutureTopic[]> {
  const tableName = process.env.AIRTABLE_TOPICS_TABLE ?? "Future Topics";
  const records = await fetchAllRecords(tableName, undefined, undefined, false);
  return records.map((r) => ({
    id: r.id,
    title: String(r.fields["Topic"] ?? r.fields["Name"] ?? r.fields["Title"] ?? ""),
    area: String(r.fields["Area"] ?? ""),
    description: String(r.fields["Description"] ?? ""),
  }));
}
