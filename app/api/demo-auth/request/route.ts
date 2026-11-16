import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createPendingToken, DEMO_PENDING_COOKIE } from "@/lib/auth";

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}));

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const code = generateCode();
  const pendingToken = await createPendingToken(normalizedEmail, code);

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "GTM Council <noreply@gtmcouncil.com>",
    to: normalizedEmail,
    subject: "Your GTM Council Demo Day code",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #011224;">
        <div style="margin-bottom: 24px;">
          <strong style="font-size: 20px; color: #c4921a;">GTM Council — Demo Day</strong>
        </div>
        <p style="font-size: 15px; color: #d1d5db; margin-bottom: 32px;">
          Use the code below to verify your email and vote. This code expires in 10 minutes.
        </p>
        <div style="background: #0a2240; border-radius: 12px; padding: 32px; text-align: center; margin-bottom: 32px; border: 1px solid #c4921a33;">
          <p style="font-size: 40px; font-weight: 800; letter-spacing: 12px; color: #c4921a; margin: 0;">${code}</p>
        </div>
        <p style="font-size: 13px; color: #6b7280;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }

  const res = NextResponse.json({ message: "Check your email for a verification code." });

  res.cookies.set(DEMO_PENDING_COOKIE, pendingToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });

  return res;
}
