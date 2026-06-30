"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  CODING_LESSONS,
  ENGLISH_LESSONS,
  MATH_BANDS,
  QUIZZES,
  SCIENCE_BANDS,
  SOCIAL_BANDS,
  type EnglishLesson,
  type GradeBand,
  type QuizQ,
} from "./content";

const STORAGE_KEY = "lap_done";

function readProgress(): string[] {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function writeProgress(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    return;
  }
}

function useDone() {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => setDone(readProgress()), []);
  const toggle = (id: string) =>
    setDone((current) => {
      const next = current.includes(id) ? current.filter((other) => other !== id) : [...current, id];
      writeProgress(next);
      return next;
    });
  return { done, toggle };
}

const TABS = [
  ["english", "English"],
  ["math", "Math"],
  ["science", "Science"],
  ["social", "Social Studies"],
  ["coding", "Coding"],
] as const;

type Tab = (typeof TABS)[number][0];

export default function Lessons() {
  const [tab, setTab] = useState<Tab>("english");

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-surface p-1">
          {TABS.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                tab === key ? "bg-ink text-white shadow-card" : "text-ink-soft hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <Link href="/progress" className="text-sm font-medium text-brand hover:underline">
          My progress →
        </Link>
      </div>

      {tab === "english" && <LessonReader lessons={ENGLISH_LESSONS} heading="Grammar lessons" />}
      {tab === "coding" && <LessonReader lessons={CODING_LESSONS} heading="Coding lessons" />}
      {tab === "math" && <BandView bands={MATH_BANDS} />}
      {tab === "science" && <BandView bands={SCIENCE_BANDS} />}
      {tab === "social" && <BandView bands={SOCIAL_BANDS} />}
    </div>
  );
}

function LessonReader({ lessons, heading }: { lessons: EnglishLesson[]; heading: string }) {
  const [id, setId] = useState(lessons[0].id);
  const { done, toggle } = useDone();
  const index = lessons.findIndex((l) => l.id === id);
  const lesson = lessons[index] ?? lessons[0];
  const next = lessons[index + 1];
  const isDone = done.includes(lesson.id);
  const doneCount = lessons.filter((l) => done.includes(l.id)).length;
  const pct = Math.round((doneCount / lessons.length) * 100);
  const quiz = QUIZZES[lesson.id];

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
        <span className="shrink-0 text-xs font-medium text-ink-soft">{doneCount} / {lessons.length} done</span>
      </div>

      <div className="grid gap-6 md:grid-cols-[230px_1fr]">
        <div className="md:hidden">
          <select value={id} onChange={(e) => setId(e.target.value)} className="input">
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>{done.includes(l.id) ? "✓ " : ""}{l.title}</option>
            ))}
          </select>
        </div>

        <aside className="hidden md:block">
          <div className="sticky top-20 max-h-[80vh] space-y-0.5 overflow-y-auto pr-1">
            <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">{heading}</div>
            {lessons.map((l) => (
              <button
                key={l.id}
                onClick={() => setId(l.id)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  l.id === id ? "bg-brand-soft font-medium text-brand" : "text-ink-soft hover:bg-surface-2"
                }`}
              >
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] ${done.includes(l.id) ? "bg-good text-white" : "border border-border"}`}>
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
                      <li key={i} className="text-sm text-ink"><span className="mr-2 text-brand">›</span>{ex}</li>
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

          {quiz && quiz.length > 0 && <LessonQuiz key={lesson.id} questions={quiz} />}

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-5">
            <button onClick={() => toggle(lesson.id)} className={isDone ? "btn-ghost" : "btn-primary"}>
              {isDone ? "✓ Completed" : "Mark complete"}
            </button>
            {next && (
              <button onClick={() => go(next.id)} className="btn-ghost">Next: {next.title} →</button>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

function LessonQuiz({ questions }: { questions: QuizQ[] }) {
  const [picks, setPicks] = useState<(number | null)[]>(questions.map(() => null));
  const answered = picks.filter((p) => p !== null).length;
  const score = picks.reduce((s: number, p, i) => s + (p === questions[i].answer ? 1 : 0), 0);
  const allDone = answered === questions.length;

  return (
    <div className="mt-6 rounded-2xl border border-border bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-faint">Quick quiz</h3>
        {allDone && (
          <span className={`chip ${score === questions.length ? "bg-[#e4f6ef] text-good" : "bg-surface-2 text-ink-soft"}`}>
            Score: {score}/{questions.length}
          </span>
        )}
      </div>

      <div className="mt-3 space-y-5">
        {questions.map((q, qi) => {
          const picked = picks[qi];
          return (
            <div key={qi}>
              <p className="text-sm font-medium text-ink">{qi + 1}. {q.q}</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {q.choices.map((c, ci) => {
                  let cls = "border-border bg-surface hover:border-brand/50";
                  if (picked !== null) {
                    if (ci === q.answer) cls = "border-good bg-[#16a578]/10 text-ink";
                    else if (ci === picked) cls = "border-bad bg-[#e0463c]/10 text-ink";
                    else cls = "border-border bg-surface opacity-60";
                  }
                  return (
                    <button
                      key={ci}
                      disabled={picked !== null}
                      onClick={() => setPicks((p) => p.map((x, i) => (i === qi ? ci : x)))}
                      className={`rounded-lg border px-3 py-2 text-left text-sm transition-all duration-200 ${cls}`}
                    >
                      {picked !== null && ci === q.answer ? "✓ " : picked === ci && ci !== q.answer ? "✕ " : ""}
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {allDone && (
        <button
          onClick={() => setPicks(questions.map(() => null))}
          className="mt-4 text-sm font-medium text-brand hover:underline"
        >
          Reset quiz
        </button>
      )}
    </div>
  );
}

function BandView({ bands }: { bands: GradeBand[] }) {
  const [bandId, setBandId] = useState(bands[0].id);
  const { done, toggle } = useDone();
  const band = bands.find((b) => b.id === bandId) ?? bands[0];

  const allIds = bands.flatMap((b) => b.topics.map((_, i) => `${b.id}::${i}`));
  const doneCount = allIds.filter((x) => done.includes(x)).length;
  const pct = Math.round((doneCount / allIds.length) * 100);

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
          <div className="h-full rounded-full bg-gradient-to-r from-brand to-[#16a578] transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <span className="shrink-0 text-xs font-medium text-ink-soft">{doneCount} / {allIds.length} topics done</span>
      </div>

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
          <span className="text-sm text-ink-soft">Following the <span className="font-medium text-ink">{band.book}</span> syllabus.</span>
          <a href="https://ncert.nic.in/textbook.php" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand hover:underline">Free NCERT books →</a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {band.topics.map((t, i) => {
            const tid = `${band.id}::${i}`;
            const tdone = done.includes(tid);
            return (
              <Reveal key={t.title} delay={(i % 2) * 70}>
                <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-card">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-ink">{t.title}</h3>
                    <button
                      onClick={() => toggle(tid)}
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors ${
                        tdone ? "bg-good text-white" : "border border-border text-ink-faint hover:text-ink"
                      }`}
                    >
                      {tdone ? "✓ Done" : "Mark done"}
                    </button>
                  </div>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">{t.explanation}</p>
                  <div className="mt-3 rounded-lg bg-brand-soft/60 p-3 text-sm text-ink">
                    <span className="font-medium text-brand">Example. </span>{t.example}
                  </div>
                  {t.practice?.map((p, j) => (
                    <details key={j} className="mt-2 rounded-lg border border-border p-3 text-sm">
                      <summary className="cursor-pointer font-medium text-ink">Try it: {p.q}</summary>
                      <p className="mt-2 text-good">{p.a}</p>
                    </details>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-ink-faint">
          Want more practice? The NCERT textbooks above are free, and books like R.S. Aggarwal and
          R.D. Sharma have plenty of exercises.
        </p>
      </div>
    </div>
  );
}
