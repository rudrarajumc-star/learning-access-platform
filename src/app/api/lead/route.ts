import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let payload: Record<string, unknown> = {};
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  if (typeof payload._gotcha === "string" && payload._gotcha.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const type = String(payload.type || "lead");
  const name = payload.name ? String(payload.name) : "";
  const email = payload.contact || payload.email ? String(payload.contact || payload.email) : "";

  if (!name && !email) {
    return NextResponse.json({ ok: false, error: "Tell us how to reach you." }, { status: 400 });
  }

  const lines = Object.entries(payload)
    .filter(([k]) => k !== "_gotcha")
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join("\n");
  const summary = `New ${type} submission\n\n${lines}`;
  console.log("[lead]", summary);

  const apiKey = process.env.RESEND_API_KEY;
  const notify = process.env.LEAD_NOTIFY_EMAIL;
  if (apiKey && notify) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL || "Learning Access <onboarding@resend.dev>",
          to: [notify],
          subject: `New ${type} - Learning Access Initiative`,
          text: summary,
        }),
      });
      if (!res.ok) console.error("lead email failed", res.status, await res.text());
    } catch (err) {
      console.error("lead email error", err);
    }
  }

  return NextResponse.json({ ok: true });
}
