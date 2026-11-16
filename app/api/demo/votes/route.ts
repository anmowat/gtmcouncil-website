import { NextResponse } from "next/server";
import { getDemoVoteCounts } from "@/lib/airtable";

export const dynamic = "force-dynamic";

export async function GET() {
  const counts = await getDemoVoteCounts();
  return NextResponse.json(counts);
}
