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

async function fetchAllRecords(table: string, filterFormula?: string, view?: string): Promise<AirtableRecord[]> {
  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams({ pageSize: "100" });
    if (filterFormula) params.set("filterByFormula", filterFormula);
    if (view) params.set("view", view);
    if (offset) params.set("offset", offset);

    const res = await fetch(`${BASE_URL}/${encodeURIComponent(table)}?${params}`, {
      headers,
      next: { revalidate: 86400 }, // 24-hour ISR cache
    });

    if (!res.ok) {
      const body = await res.text();
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
  const records = await fetchAllRecords(tableName, undefined, "viwjhmKTzpPrPMx8C");
  return records.map(recordToMember);
}

export async function getMemberByEmail(email: string): Promise<Member | null> {
  const tableName = process.env.AIRTABLE_MEMBERS_TABLE ?? "Members";
  const formula = `LOWER({Email}) = "${email.toLowerCase().replace(/"/g, '\\"')}"`;
  // bypass cache for auth checks
  const params = new URLSearchParams({ filterByFormula: formula, maxRecords: "1" });
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(tableName)}?${params}`, {
    headers,
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.records?.length) return null;
  return recordToMember(data.records[0]);
}

// ── Future Topics ─────────────────────────────────────────────────────────────

export interface FutureTopic {
  id: string;
  title: string;
  area: string;
  description: string;
}

export async function getFutureTopics(): Promise<FutureTopic[]> {
  const tableName = process.env.AIRTABLE_TOPICS_TABLE ?? "Future Topics";
  const records = await fetchAllRecords(tableName);
  return records.map((r) => ({
    id: r.id,
    title: String(r.fields["Topic"] ?? r.fields["Name"] ?? r.fields["Title"] ?? ""),
    area: String(r.fields["Area"] ?? ""),
    description: String(r.fields["Description"] ?? ""),
  }));
}
