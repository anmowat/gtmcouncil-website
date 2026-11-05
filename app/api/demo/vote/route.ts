import { NextRequest, NextResponse } from "next/server";
import { getDemoSession } from "@/lib/auth";
import { getDemoVoteToday, createDemoVote } from "@/lib/airtable";

export async function POST(req: NextRequest) {
  const session = await getDemoSession();
  if (!session) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { submissionId } = await req.json().catch(() => ({}));
  if (!submissionId || typeof submissionId !== "string") {
    return NextResponse.json({ error: "submissionId is required." }, { status: 400 });
  }

  const alreadyVoted = await getDemoVoteToday(submissionId, session.email);
  if (alreadyVoted) {
    return NextResponse.json(
      { error: "You've already voted for this today. Come back tomorrow!" },
      { status: 409 }
    );
  }

  await createDemoVote(submissionId, session.email);

  return NextResponse.json({ success: true });
}
