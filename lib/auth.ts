import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "change-me-in-production-use-a-long-random-string"
);

export const SESSION_COOKIE = "gtmc_session";
export const PENDING_COOKIE = "gtmc_pending";

// ── Pending (holds the OTP code for 10 minutes) ───────────────────────────

export async function createPendingToken(email: string, code: string): Promise<string> {
  return new SignJWT({ email, code })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("10m")
    .sign(SECRET);
}

export async function verifyPendingToken(
  token: string
): Promise<{ email: string; code: string } | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return { email: payload.email as string, code: payload.code as string };
  } catch {
    return null;
  }
}

// ── Session (30-day auth) ─────────────────────────────────────────────────

export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(SECRET);
}

export async function verifySessionToken(
  token: string
): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return { email: payload.email as string };
  } catch {
    return null;
  }
}

// ── Cookie helpers ────────────────────────────────────────────────────────

export async function getSession(): Promise<{ email: string } | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function setSessionCookie(token: string) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  jar.delete(PENDING_COOKIE);
}
