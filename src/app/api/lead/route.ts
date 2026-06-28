import { NextResponse } from "next/server";

// Emails form submissions when RESEND_API_KEY + LEAD_NOTIFY_EMAIL are set,
// otherwise logs them. Always returns success to the user.
export async function POST(req: Request) {
  let data: Record<string, unknown> = {};
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields; humans don't.
  if (typeof data._gotcha === "string" && data._gotcha.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const type = String(data.type || "lead");
  const name = data.name ? String(data.name) : "";
  const email = data.contact || data.email ? String(data.contact || data.email) : "";

  if (!name && !email) {
    return NextResponse.json({ ok: false, error: "Tell us how to reach you." }, { status: 400 });
  }

  const lines = Object.entries(data)
    .filter(([k]) => k !== "_gotcha")
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join("\n");
  const summary = `New ${type} submission\n\n${lines}`;
  console.log("[lead]", summary);

  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (key && to) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL || "Learning Access <onboarding@resend.dev>",
          to: [to],
          subject: `New ${type} — Learning Access Initiative`,
          text: summary,
        }),
      });
      if (!res.ok) console.error("[lead] email send failed", res.status, await res.text());
    } catch (e) {
      console.error("[lead] email error", e);
    }
  }

  return NextResponse.json({ ok: true });
}
