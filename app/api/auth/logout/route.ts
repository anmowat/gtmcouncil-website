import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("gtmc_session");
  res.cookies.delete("gtmc_pending");
  return res;
}
