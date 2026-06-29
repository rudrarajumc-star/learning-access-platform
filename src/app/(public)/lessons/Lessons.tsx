"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { ENGLISH_LESSONS, MATH_BANDS, SCIENCE_BANDS, type GradeBand } from "./content";

function useDone() {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem("lap_done") || "[]");
      if (Array.isArray(v)) setDone(v);
    } catch {
      /* ignore */
    }
  }, []);
  const toggle = (id: string) =>
    setDone((d) => {
      const n = d.includes(id) ? d.filter((x) => x !== id) : [...d, id];
      try {
        localStorage.setItem("lap_done", JSON.stringify(n));
      } catch {
        /* ignore */
      }
      return n;
    });
  return { done, toggle };
}

export default function Lessons() {
  const [tab, setTab] = useState<"english" | "math" | "science">("english");
  const tabs = [
    ["english", "English"],
    ["math", "Math"],
    ["science", "Science"],
  ] as const;

  return (
    <div>
      <div className="mb-8 inline-flex flex-wrap rounded-xl border border-border bg-surface p-1">
        {tabs.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-lg px-5 py-2 text-sm font-medium transition-all duration-200 ${
              tab === key ? "bg-ink text-white shadow-card" : "text-ink-soft hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "english" ? (
        <EnglishView />
      ) : tab === "math" ? (
        <BandView bands={MATH_BANDS} />
      ) : (
        <BandView bands={SCIENCE_BANDS} />
      )}
    </div>
  );
}

function EnglishView() {
  const [id, setId] = useState(ENGLISH_LESSONS[0].id);
  const { done, toggle } = useDone();
  const index = ENGLISH_LESSONS.findIndex((l) => l.id === id);
  const lesson = ENGLISH_LESSONS[index] ?? ENGLISH_LESSONS[0];
  const next = ENGLISH_LESSONS[index + 1];
  const isDone = done.includes(lesson.id);
  const pct = Math.round((done.length / ENGLISH_LESSONS.length) * 100);

  const go = (newId: string) => {
    setId(newId);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
          <div className="h-full rounded-full bg-gradient-to-r from-brand to-[#16a578] transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <span className="shrink-0 text-xs font-medium text-ink-soft">
          {done.length} / {ENGLISH_LESSONS.length} done
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-[230px_1fr]">
        <div className="md:hidden">
          <select value={id} onChange={(e) => setId(e.target.value)} className="input">
            {ENGLISH_LESSONS.map((l) => (
              <option key={l.id} value={l.id}>
                {done.includes(l.id) ? "✓ " : ""}{l.title}
              </option>
            ))}
          </select>
        </div>

        <aside className="hidden md:block">
          <div className="sticky top-20 max-h-[80vh] space-y-0.5 overflow-y-auto pr-1">
            <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
              Grammar lessons
            </div>
            {ENGLISH_LESSONS.map((l) => (
              <button
                key={l.id}
                onClick={() => setId(l.id)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  l.id === id ? "bg-brand-soft font-medium text-brand" : "text-ink-soft hover:bg-surface-2"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] ${
                    done.includes(l.id) ? "bg-good text-white" : "border border-border"
                  }`}
                >
                  {done.includes(l.id) ? "✓" : ""}
                </span>
                {l.title}
              </button>
            ))}
          </div>
        </aside>

        <article key={lesson.id} className="fade-up">
          <h2 className="text-2xl font-extrabold tracking-tight2 text-ink">{lesson.title}</h2>
          <p className="mt-1 text-ink-soft">{lesson.summary}</p>

          <div className="mt-6 space-y-7">
            {lesson.sections.map((s) => (
              <section key={s.heading}>
                <h3 className="text-base font-semibold text-ink">{s.heading}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-soft">{s.body}</p>
                {s.examples && (
                  <ul className="mt-3 space-y-1.5 rounded-xl border border-border bg-surface-2/50 p-4">
                    {s.examples.map((ex, i) => (
                      <li key={i} className="text-sm text-ink">
                        <span className="mr-2 text-brand">›</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {lesson.practice && lesson.practice.length > 0 && (
            <div className="mt-8 rounded-2xl border border-border bg-surface p-5 shadow-card">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-faint">Try it</h3>
              <div className="mt-3 space-y-3">
                {lesson.practice.map((p, i) => (
                  <details key={i} className="rounded-lg border border-border p-3">
                    <summary className="cursor-pointer text-sm font-medium text-ink">{p.q}</summary>
                    <p className="mt-2 text-sm text-good">{p.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-5">
            <button
              onClick={() => toggle(lesson.id)}
              className={isDone ? "btn-ghost" : "btn-primary"}
            >
              {isDone ? "✓ Completed" : "Mark complete"}
            </button>
            {next && (
              <button onClick={() => go(next.id)} className="btn-ghost">
                Next: {next.title} →
              </button>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

function BandView({ bands }: { bands: GradeBand[] }) {
  const [bandId, setBandId] = useState(bands[0].id);
  const band = bands.find((b) => b.id === bandId) ?? bands[0];

  return (
    <div>
      <div className="mb-2 text-sm font-medium text-ink-soft">Pick your age group:</div>
      <div className="mb-7 flex flex-wrap gap-2">
        {bands.map((b) => (
          <button
            key={b.id}
            onClick={() => setBandId(b.id)}
            className={`rounded-xl border px-4 py-2 text-left transition-all duration-200 ${
              b.id === bandId ? "border-brand bg-brand-soft" : "border-border bg-surface hover:border-brand/40"
            }`}
          >
            <div className={`text-sm font-semibold ${b.id === bandId ? "text-brand" : "text-ink"}`}>{b.grade}</div>
            <div className="text-xs text-ink-faint">{b.ages}</div>
          </button>
        ))}
      </div>

      <div key={band.id} className="fade-up">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-surface-2/50 px-4 py-3">
          <span className="text-sm text-ink-soft">
            Following the <span className="font-medium text-ink">{band.book}</span> syllabus.
          </span>
          <a href="https://ncert.nic.in/textbook.php" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand hover:underline">
            Free NCERT books →
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {band.topics.map((t, i) => (
            <Reveal key={t.title} delay={(i % 2) * 70}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-card">
                <h3 className="font-semibold text-ink">{t.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">{t.explanation}</p>
                <div className="mt-3 rounded-lg bg-brand-soft/60 p-3 text-sm text-ink">
                  <span className="font-medium text-brand">Example. </span>
                  {t.example}
                </div>
                {t.practice?.map((p, j) => (
                  <details key={j} className="mt-2 rounded-lg border border-border p-3 text-sm">
                    <summary className="cursor-pointer font-medium text-ink">Try it: {p.q}</summary>
                    <p className="mt-2 text-good">{p.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-ink-faint">
          Want more practice? The NCERT textbooks above are free, and books like R.S. Aggarwal and
          R.D. Sharma have plenty of exercises.
        </p>
      </div>
    </div>
  );
}
