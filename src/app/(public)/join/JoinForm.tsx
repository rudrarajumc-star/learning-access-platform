"use client";

import { useState } from "react";
import { track } from "@/lib/analytics/client";

export default function JoinForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const payload = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {}
    track("lead_submit", { type: String(payload.type || "Volunteer signup") });
    setBusy(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e4f6ef] text-good">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-ink">Got it. We&apos;ll reach out soon.</h3>
        <p className="mt-1 text-sm text-ink-soft">
          Thanks for signing up. Someone from the team usually replies within a few days.
        </p>
        <button className="btn-ghost mt-5" onClick={() => setSent(false)}>Send another</button>
      </div>
    );
  }

  return (
    <form className="card space-y-4 p-6" onSubmit={submit}>
      <input type="hidden" name="type" value="Volunteer signup" />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <input required name="name" className="input" placeholder="Your name" />
        </Field>
        <Field label="Email">
          <input required type="email" name="email" className="input" placeholder="you@email.com" />
        </Field>
      </div>
      <Field label="I want to join as a…">
        <select name="role" className="input">
          <option>Volunteer tutor</option>
          <option>Learning-center partner</option>
          <option>Researcher / contributor</option>
        </select>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Subjects you can help with">
          <input name="subjects" className="input" placeholder="e.g. Math, English" />
        </Field>
        <Field label="Languages you speak">
          <input name="languages" className="input" placeholder="e.g. Telugu, Hindi, English" />
        </Field>
      </div>
      <Field label="Anything else?">
        <textarea name="notes" className="input" rows={3} placeholder="Availability, location, why you're interested…" />
      </Field>
      <button type="submit" disabled={busy} className="btn-primary w-full py-2.5">
        {busy ? "Sending…" : "Submit interest form"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-ink-soft">{label}</span>
      {children}
    </label>
  );
}
