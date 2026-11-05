import { NextRequest, NextResponse } from "next/server";
import { verifyPendingToken, createDemoSessionToken, DEMO_PENDING_COOKIE, DEMO_SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { code } = await req.json().catch(() => ({}));

  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "Code is required." }, { status: 400 });
  }

  const pendingToken = req.cookies.get(DEMO_PENDING_COOKIE)?.value;
  if (!pendingToken) {
    return NextResponse.json(
      { error: "Session expired. Please request a new code." },
      { status: 401 }
    );
  }

  const pending = await verifyPendingToken(pendingToken);
  if (!pending) {
    return NextResponse.json(
      { error: "Code has expired. Please request a new one." },
      { status: 401 }
    );
  }

  if (pending.code !== code.trim()) {
    return NextResponse.json({ error: "Incorrect code. Please try again." }, { status: 401 });
  }

  const sessionToken = await createDemoSessionToken(pending.email);

  const res = NextResponse.json({ success: true, email: pending.email });

  res.cookies.set(DEMO_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  res.cookies.delete(DEMO_PENDING_COOKIE);

  return res;
}
