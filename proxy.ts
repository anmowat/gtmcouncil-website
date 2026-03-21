import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";

const PROTECTED = ["/members"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  // Allow the login page through
  if (pathname.startsWith("/members/login")) {
    return NextResponse.next();
  }

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = req.cookies.get("gtmc_session")?.value;

  if (!token) {
    const loginUrl = new URL("/members/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const session = await verifySessionToken(token);
  if (!session) {
    const loginUrl = new URL("/members/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete("gtmc_session");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/members/:path*"],
};
