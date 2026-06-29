import Link from "next/link";

export const metadata = {
  title: "LGBTQ+ Support",
  description: "A welcoming place to learn as yourself, plus LGBTQ+ youth helplines for India and beyond.",
};

export default function LgbtqPage() {
  const crisisIndia = [
    {
      name: "Tele MANAS (Govt of India)",
      detail: "Call 14416 or 1-800-891-4416. Free, 24/7, in Telugu, Hindi, English and more.",
    },
    {
      name: "iCALL (TISS)",
      detail: "Call 9152987821, Mon–Sat, 8am–10pm. Counsellors who support LGBTQ+ callers.",
    },
    {
      name: "Vandrevala Foundation",
      detail: "Call or WhatsApp 1-860-2662-345. Mental-health support, 24/7.",
    },
  ];

  const crisisGlobal = [
    {
      name: "The Trevor Project",
      detail: "Call 1-866-488-7386 or text START to 678-678. For LGBTQ+ young people (US).",
    },
    {
      name: "988 Lifeline",
      detail: "Call or text 988, then press 3 for LGBTQ+ youth support. 24/7 (US).",
    },
    {
      name: "Trans Lifeline",
      detail: "Call 877-565-8860. Peer support run by and for trans people.",
    },
  ];

  const promises = [
    {
      t: "Your name and pronouns, full stop",
      b: "Tell us once. Our tutors use them, no questions asked and no comments.",
    },
    {
      t: "A tutor you're comfortable with",
      b: "If you'd rather work with someone LGBTQ+ or an ally, just say so when you sign up.",
    },
    {
      t: "Private means private",
      b: "We don't out anyone. What you tell us stays between you and your tutor.",
    },
    {
      t: "Help finding more than tutoring",
      b: "If you need support we can't give, we'll help you find people who can.",
    },
  ];

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand">LGBTQ+ support</div>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-ink sm:text-4xl">
            You belong here.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            Whoever you are and wherever you are with figuring that out, you&apos;re welcome. You can
            learn with us without hiding any part of yourself, and you can ask us for help when
            things are hard.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <div className="rounded-xl border border-[#f3c9c4] bg-[#fdf2f1] p-6">
          <h2 className="text-base font-semibold text-ink">If you need to talk to someone right now</h2>
          <p className="mt-1 text-sm text-ink-soft">
            You don&apos;t have to be in crisis to reach out. These lines are free, and the people on
            them want to hear from you.
          </p>
          <div className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
            In India
          </div>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {crisisIndia.map((c) => (
              <div key={c.name} className="rounded-lg border border-border bg-surface p-4">
                <div className="font-medium text-ink">{c.name}</div>
                <div className="mt-1 text-xs text-ink-soft">{c.detail}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
            US &amp; international
          </div>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {crisisGlobal.map((c) => (
              <div key={c.name} className="rounded-lg border border-border bg-surface p-4">
                <div className="font-medium text-ink">{c.name}</div>
                <div className="mt-1 text-xs text-ink-soft">{c.detail}</div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-ink-faint">
            Somewhere else, or want LGBTQ+ community and peer support near you? Message us and
            we&apos;ll help you find it, including groups like The Humsafar Trust and Nazariya.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16">
        <h2 className="text-xl font-semibold text-ink">What you can expect from us</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {promises.map((p) => (
            <div key={p.t} className="card p-5">
              <h3 className="font-semibold text-ink">{p.t}</h3>
              <p className="mt-1.5 text-sm text-ink-soft">{p.b}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-surface p-6 text-center">
          <h3 className="text-lg font-semibold text-ink">Want to study with us?</h3>
          <p className="mx-auto mt-1 max-w-lg text-sm text-ink-soft">
            The tutoring is free and the door is open. Sign up and we&apos;ll take it from there.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link href="/tutoring" className="btn-primary px-5 py-2.5 text-base">Get free tutoring</Link>
            <Link href="/join" className="btn-ghost px-5 py-2.5 text-base">Volunteer with us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
