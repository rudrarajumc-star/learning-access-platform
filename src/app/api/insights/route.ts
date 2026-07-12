import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, SESSION_VALUE } from "@/lib/auth";
import { getInsights } from "@/lib/analytics/insights";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const store = await cookies();
  if (store.get(SESSION_COOKIE)?.value !== SESSION_VALUE) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const days = Number(new URL(req.url).searchParams.get("days")) || 30;
  const insights = await getInsights(Math.min(90, Math.max(7, days)));
  return NextResponse.json({ ok: true, insights });
}
