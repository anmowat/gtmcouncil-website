import { NextRequest, NextResponse } from "next/server";
import { createDemoVote } from "@/lib/airtable";

export async function POST(req: NextRequest) {
  const { submissionId, count, adminKey } = await req.json().catch(() => ({}));

  if (!process.env.DEMO_ADMIN_KEY || adminKey !== process.env.DEMO_ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!submissionId || typeof submissionId !== "string") {
    return NextResponse.json({ error: "submissionId is required." }, { status: 400 });
  }

  const n = Math.min(Number(count) || 1, 100);
  await Promise.all(
    Array.from({ length: n }, () => createDemoVote(submissionId, "admin@gtmcouncil.com"))
  );

  return NextResponse.json({ success: true, added: n });
}
