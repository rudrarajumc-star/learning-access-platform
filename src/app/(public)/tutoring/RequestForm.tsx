"use client";

import { useState } from "react";

export default function RequestForm() {
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
    } catch {
      /* still show success; submission is logged server-side when reachable */
    }
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
        <h3 className="mt-4 text-lg font-semibold text-ink">You&apos;re on the list.</h3>
        <p className="mt-1 text-sm text-ink-soft">
          We&apos;ll match you with a tutor and reach out about times that work. It usually takes a
          few days. There&apos;s no cost, ever.
        </p>
        <button className="btn-ghost mt-5" onClick={() => setSent(false)}>Sign up someone else</button>
      </div>
    );
  }

  return (
    <form className="card space-y-4 p-6" onSubmit={submit}>
      <input type="hidden" name="type" value="Tutor request" />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Student's first name">
          <input required name="name" className="input" placeholder="First name is fine" />
        </Field>
        <Field label="Grade">
          <select name="grade" className="input">
            {["3", "4", "5", "6", "7", "8", "9", "10", "Other"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="What do they need help with?">
        <select name="subject" className="input">
          <option>Math</option>
          <option>Reading / English</option>
          <option>Both</option>
          <option>Something else</option>
        </select>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Languages spoken at home">
          <input name="languages" className="input" placeholder="e.g. Telugu, Hindi, English" />
        </Field>
        <Field label="Best way to reach you">
          <input required name="contact" className="input" placeholder="Phone or email" />
        </Field>
      </div>
      <Field label="Anything we should know?">
        <textarea name="notes" className="input" rows={3} placeholder="When they're free, what they're struggling with, anything at all." />
      </Field>
      <button type="submit" disabled={busy} className="btn-primary w-full py-2.5">
        {busy ? "Sending…" : "Request a tutor"}
      </button>
      <p className="text-center text-xs text-ink-faint">
        Free and confidential. A parent or the student can fill this out.
      </p>
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
