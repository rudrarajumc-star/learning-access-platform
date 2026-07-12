import { NextResponse } from "next/server";
import { recordEvent } from "@/lib/analytics/store";
import { EVENT_NAMES } from "@/lib/analytics/types";
import type { AnalyticsEvent, DeviceType, PropValue, TrackPayload } from "@/lib/analytics/types";

export const runtime = "nodejs";

function deviceFromUA(ua: string): DeviceType {
  const s = ua.toLowerCase();
  if (/bot|crawl|spider|slurp|facebookexternalhit|bingpreview|headless/.test(s)) return "bot";
  if (/ipad|tablet|playbook|silk|kindle|(android(?!.*mobi))/.test(s)) return "tablet";
  if (/mobi|iphone|ipod|android|blackberry|iemobile|opera mini/.test(s)) return "mobile";
  return "desktop";
}

const BLOCKED_PROPS = new Set([
  "email",
  "name",
  "phone",
  "contact",
  "message",
  "notes",
  "address",
  "password",
  "firstname",
  "lastname",
]);

function scrubProps(input: unknown): Record<string, PropValue> {
  const out: Record<string, PropValue> = {};
  if (!input || typeof input !== "object") return out;
  let count = 0;
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (count >= 8) break;
    if (BLOCKED_PROPS.has(key.toLowerCase())) continue;
    if (typeof value === "string") out[key] = value.slice(0, 80);
    else if (typeof value === "number" && Number.isFinite(value)) out[key] = value;
    else if (typeof value === "boolean") out[key] = value;
    else continue;
    count += 1;
  }
  return out;
}

function eventId(): string {
  return Math.random().toString(36).slice(2, 12) + Date.now().toString(36);
}

export async function POST(req: Request) {
  let payload: TrackPayload;
  try {
    payload = (await req.json()) as TrackPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!payload || !EVENT_NAMES.includes(payload.name) || typeof payload.path !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const ua = req.headers.get("user-agent") || "";
  const device = deviceFromUA(ua);
  if (device === "bot") return NextResponse.json({ ok: true });

  const country =
    req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry") || "";
  const ref =
    typeof payload.ref === "string" && payload.ref ? payload.ref.slice(0, 80) : "direct";

  const event: AnalyticsEvent = {
    id: eventId(),
    name: payload.name,
    path: String(payload.path || "/").split("?")[0].slice(0, 120),
    vid: String(payload.vid || "anon").slice(0, 40),
    sid: String(payload.sid || "anon").slice(0, 40),
    device,
    ref,
    country: country.slice(0, 4),
    props: scrubProps(payload.props),
    ts: Date.now(),
  };

  await recordEvent(event);
  return NextResponse.json({ ok: true });
}
