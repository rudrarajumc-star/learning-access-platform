import Link from "next/link";
import { kpis } from "@/lib/queries";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import HeroFX from "@/components/HeroFX";

export default function Home() {
  const k = kpis();

  const paths = [
    { href: "/tutoring", tag: "For students", title: "Get free tutoring", body: "Math and reading, one-on-one, in the language that's easiest for you. No cost.", cta: "Request a tutor" },
    { href: "/classes", tag: "Live & free", title: "Join a class", body: "Small group classes every weekday. Reserve a seat and show up.", cta: "See the schedule" },
    { href: "/lgbtq", tag: "Support", title: "LGBTQ+ youth", body: "Learn as yourself. Your name and pronouns respected, help here if you need it.", cta: "See support" },
    { href: "/join", tag: "For volunteers", title: "Become a tutor", body: "An hour a week changes things for a kid who's falling behind. We'll match you.", cta: "Sign up to tutor" },
  ];

  const impact = [
    { n: k.totalStudents, suffix: "+", label: "students reached" },
    { n: k.activeTutors, suffix: "", label: "volunteer tutors" },
    { n: k.totalHours, suffix: "+", label: "tutoring hours" },
    { n: k.centers, suffix: "", label: "learning centers" },
  ];

  const tools = [
    "Khan Academy", "Duolingo", "CommonLit", "PhET", "StoryWeaver",
    "BBC Learning English", "Project Gutenberg", "ReadTheory", "Desmos",
  ];

  const features = [
    {
      title: "We keep records, not guesses",
      body: "Each student has a profile with their starting scores, the topics they keep getting stuck on, and every session they've had. Names stay private; we work off codes.",
      icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0",
    },
    {
      title: "Progress you can point to",
      body: "When a parent or a school asks if it's working, we can show the numbers. Sessions add up into improvement over time, by student and by center.",
      icon: "M4 19V5m5 14V9m5 10V12m5 7V7",
    },
    {
      title: "Testing AI as a tutor's helper",
      body: "We use AI to draft practice problems, then score them ourselves to see which kinds of prompts actually produce work that's clear for a kid still learning English.",
      icon: "M9 3v2m6-2v2M5 8h14M6 21h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1Zm3-4 2 2 4-4",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <HeroFX />
        <div className="relative mx-auto max-w-6xl px-5 py-24 text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-soft fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-good" />
            {k.totalSessions.toLocaleString()} sessions logged across {k.centers} centers
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight2 text-ink sm:text-[3.4rem] fade-up">
            Tutoring that reaches{" "}
            <span className="text-gradient">multilingual students</span>, and proves it works.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft fade-up">
            We run free tutoring across three learning centers and keep track of what actually
            helps: who showed up, what they struggled with, and whether their scores moved. This
            site is the system we use to do that.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 fade-up">
            <Link href="/tutoring" className="btn-primary shine px-5 py-2.5 text-base">
              Get free tutoring
            </Link>
            <Link href="/learn" className="btn-ghost px-5 py-2.5 text-base">
              Explore free resources
            </Link>
          </div>

          {/* Browser mockup */}
          <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-xl border border-border bg-surface shadow-lift fade-up">
            <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f5685a]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f6bb44]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#5ac15a]" />
              <span className="ml-3 rounded-md bg-surface px-3 py-0.5 text-xs text-ink-faint">
                app.learningaccessinitiative.org/dashboard
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3 p-5 text-left">
              {impact.map((m) => (
                <div key={m.label} className="rounded-lg border border-border bg-surface-2/40 p-3">
                  <div className="text-2xl font-semibold text-ink">
                    <CountUp value={m.n} suffix={m.suffix} />
                  </div>
                  <div className="text-[11px] text-ink-faint">{m.label}</div>
                </div>
              ))}
              <div className="col-span-4 mt-1 flex h-28 items-end gap-1.5 rounded-lg border border-border bg-surface-2/40 p-3">
                {[40, 55, 48, 62, 70, 58, 75, 82, 68, 88, 79, 92].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-brand"
                    style={{ height: `${h}%`, opacity: 0.85 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools marquee */}
      <Link href="/learn" className="group block overflow-hidden border-b border-border bg-surface py-7">
        <div className="mx-auto mb-3 max-w-6xl px-5 text-center text-xs font-medium uppercase tracking-wider text-ink-faint">
          Free tools our tutors point students to — tap to explore
        </div>
        <div className="relative [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="marquee gap-12 pr-12">
            {[...tools, ...tools].map((t, i) => (
              <span key={i} className="text-xl font-bold text-ink/25 transition-colors group-hover:text-ink/50">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Ways in */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((p, i) => (
            <Reveal key={p.href} delay={i * 80}>
              <Tilt className="h-full">
                <Link
                  href={p.href}
                  className="card group flex h-full flex-col p-6 shadow-card transition-shadow duration-300 hover:shadow-lift"
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand">{p.tag}</div>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-ink-soft">{p.body}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand">
                    {p.cta}
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SAT spotlight */}
      <section className="mx-auto max-w-6xl px-5 pb-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-card sm:p-10">
            <div className="aurora" />
            <div className="relative grid items-center gap-8 lg:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-soft">
                  <span className="live-dot inline-block h-2 w-2 rounded-full bg-brand" />
                  New · Free SAT practice
                </div>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight2 text-ink">
                  Practice the <span className="text-gradient">SAT</span>, free.
                </h2>
                <p className="mt-2 text-ink-soft">
                  Real-style Math and Reading &amp; Writing questions with an explanation after every
                  one. Track your score, see your weak spots, retry instantly.
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
                  {["Instant feedback + worked explanations", "Score and per-topic breakdown", "No account, no paywall"].map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="text-good">✓</span> {b}
                    </li>
                  ))}
                </ul>
                <Link href="/sat" className="btn-primary shine mt-6 inline-flex px-5 py-2.5 text-base">
                  Start practicing →
                </Link>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5 shadow-lift">
                <div className="mb-2 flex items-center gap-2 text-xs">
                  <span className="chip bg-brand-soft text-brand">Math</span>
                  <span className="chip bg-surface-2 text-ink-soft">Algebra</span>
                </div>
                <p className="font-semibold text-ink">If 3x + 7 = 22, what is the value of x?</p>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center gap-3 rounded-lg border border-border p-2.5"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-surface-2 text-xs font-bold text-ink-soft">A</span> 3</div>
                  <div className="flex items-center gap-3 rounded-lg border border-good bg-[#16a578]/10 p-2.5"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-good text-xs font-bold text-white">✓</span> 5</div>
                  <div className="flex items-center gap-3 rounded-lg border border-border p-2.5 opacity-60"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-surface-2 text-xs font-bold text-ink-soft">C</span> 7</div>
                </div>
                <div className="mt-3 rounded-lg bg-surface-2/60 p-3 text-xs text-ink-soft">
                  <span className="font-semibold text-good">Correct.</span> Subtract 7 → 3x = 15, divide by 3 → x = 5.
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <div className="card flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d={f.icon} />
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Architecture / tech */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-brand">How it&apos;s built</div>
              <h2 className="mt-2 text-2xl font-bold text-ink">Boring, on purpose.</h2>
              <p className="mt-3 text-ink-soft">
                The data lives in one database. Tutors log in, record sessions, and the charts
                update. We can hand a coordinator a CSV without exporting anyone&apos;s name. Nothing
                fancy, but it holds up as we add more centers.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Next.js", "Postgres", "Tutor logins", "CSV export", "Anonymized records"].map((t) => (
                  <span key={t} className="chip bg-surface-2 text-ink-soft">{t}</span>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <div className="space-y-2 font-mono text-xs text-ink-soft">
                {[
                  "User browser",
                  "Next.js frontend  ·  Vercel",
                  "Supabase Auth",
                  "PostgreSQL database",
                  "Analytics + CSV export",
                  "Research dataset / impact reports",
                ].map((row, i, arr) => (
                  <div key={row}>
                    <div className="rounded-lg border border-border bg-surface-2/50 px-3 py-2 text-ink">{row}</div>
                    {i < arr.length - 1 && <div className="py-0.5 text-center text-ink-faint">↓</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20 text-center">
        <h2 className="text-2xl font-bold text-ink">Want to help out?</h2>
        <p className="mx-auto mt-2 max-w-xl text-ink-soft">
          We&apos;re always looking for tutors and centers to partner with. An hour a week makes a
          difference.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/join" className="btn-primary px-5 py-2.5 text-base">Sign up to tutor</Link>
          <Link href="/login" className="btn-ghost px-5 py-2.5 text-base">Tutor log in</Link>
        </div>
      </section>
    </div>
  );
}
