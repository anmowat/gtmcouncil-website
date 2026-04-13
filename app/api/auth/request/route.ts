import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getMemberByEmail } from "@/lib/airtable";
import { createPendingToken, PENDING_COOKIE } from "@/lib/auth";

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}));

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Check if this email exists in the Airtable members table
  const member = await getMemberByEmail(normalizedEmail);
  if (!member) {
    return NextResponse.json(
      { error: "This email isn't in our member directory. This area is reserved for GTM council members only." },
      { status: 403 }
    );
  }

  const code = generateCode();
  const pendingToken = await createPendingToken(normalizedEmail, code);

  // Send email via Resend
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "GTM Council <noreply@gtmcouncil.com>",
    to: normalizedEmail,
    subject: "Your GTM Council login code",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px;">
        <div style="margin-bottom: 24px;">
          <strong style="font-size: 20px; color: #011224;">GTM Council</strong>
        </div>
        <p style="font-size: 16px; color: #374151; margin-bottom: 8px;">Hi ${member.firstName || "there"},</p>
        <p style="font-size: 15px; color: #6b7280; margin-bottom: 32px;">
          Use the code below to log in to the GTM Council member portal. This code expires in 10 minutes.
        </p>
        <div style="background: #f3f4f6; border-radius: 12px; padding: 32px; text-align: center; margin-bottom: 32px;">
          <p style="font-size: 40px; font-weight: 800; letter-spacing: 12px; color: #011224; margin: 0;">${code}</p>
        </div>
        <p style="font-size: 13px; color: #9ca3af;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }

  const res = NextResponse.json({
    message: "If that email is in our member list, you'll receive a code shortly.",
  });

  res.cookies.set(PENDING_COOKIE, pendingToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  });

  return res;
}
