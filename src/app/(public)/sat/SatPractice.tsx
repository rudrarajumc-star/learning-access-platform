"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { QUESTIONS, type Question, type Section } from "./questions";

type Mode = Section | "Mixed";
type Phase = "start" | "quiz" | "results";

interface Answered {
  id: string;
  section: Section;
  category: string;
  correct: boolean;
  picked: number;
}

const LETTERS = ["A", "B", "C", "D"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SatPractice() {
  const [phase, setPhase] = useState<Phase>("start");
  const [mode, setMode] = useState<Mode>("Mixed");
  const [deck, setDeck] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answered[]>([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // timer
  useEffect(() => {
    if (phase !== "quiz") return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const start = (m: Mode) => {
    const pool = m === "Mixed" ? QUESTIONS : QUESTIONS.filter((q) => q.section === m);
    setMode(m);
    setDeck(shuffle(pool));
    setIdx(0);
    setPicked(null);
    setAnswers([]);
    setStreak(0);
    setBestStreak(0);
    setSeconds(0);
    setPhase("quiz");
  };

  const current = deck[idx];

  const choose = useCallback(
    (i: number) => {
      if (picked !== null || !current) return;
      const correct = i === current.answer;
      setPicked(i);
      setAnswers((a) => [
        ...a,
        { id: current.id, section: current.section, category: current.category, correct, picked: i },
      ]);
      setStreak((s) => {
        const ns = correct ? s + 1 : 0;
        setBestStreak((b) => Math.max(b, ns));
        return ns;
      });
    },
    [picked, current]
  );

  const next = useCallback(() => {
    if (picked === null) return;
    if (idx + 1 >= deck.length) setPhase("results");
    else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  }, [picked, idx, deck.length]);

  // keyboard shortcuts
  useEffect(() => {
    if (phase !== "quiz") return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (picked === null) {
        const map: Record<string, number> = { a: 0, b: 1, c: 2, d: 3, "1": 0, "2": 1, "3": 2, "4": 3 };
        if (k in map && current && map[k] < current.choices.length) choose(map[k]);
      } else if (k === "enter" || k === " ") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, picked, current, choose, next]);

  const score = answers.filter((a) => a.correct).length;

  if (phase === "start") return <StartScreen onStart={start} />;
  if (phase === "results")
    return (
      <Results
        answers={answers}
        total={deck.length}
        seconds={seconds}
        bestStreak={bestStreak}
        onRetry={() => start(mode)}
        onHome={() => setPhase("start")}
      />
    );

  // quiz
  const pct = ((idx + (picked !== null ? 1 : 0)) / deck.length) * 100;
  return (
    <div className="mx-auto max-w-2xl">
      {/* status bar */}
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-medium text-ink-soft">
          Question {idx + 1} <span className="text-ink-faint">/ {deck.length}</span>
        </span>
        <div className="flex items-center gap-3 text-ink-faint">
          <span className="tabular-nums">{fmt(seconds)}</span>
          <span className="flex items-center gap-1 text-good">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 4 14h6l-2 8 10-14h-6z" /></svg>
            {streak}
          </span>
          <span className="font-medium text-ink">{score} correct</span>
        </div>
      </div>
      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div className="h-full rounded-full bg-gradient-to-r from-brand to-[#7c5cff] transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>

      <div key={current.id} className="fade-up">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="chip bg-brand-soft text-brand">{current.section}</span>
          <span className="chip bg-surface-2 text-ink-soft">{current.category}</span>
          <span className={`chip ${diffTone(current.difficulty)}`}>{current.difficulty}</span>
        </div>

        {current.passage && (
          <div className="mb-4 rounded-xl border border-border bg-surface-2/50 p-4 text-sm italic leading-relaxed text-ink-soft">
            {current.passage}
          </div>
        )}

        <h2 className="whitespace-pre-line text-lg font-semibold leading-snug text-ink">{current.prompt}</h2>

        <div className="mt-4 space-y-2.5">
          {current.choices.map((c, i) => {
            const isAnswer = i === current.answer;
            const isPicked = i === picked;
            let cls = "border-border bg-surface hover:border-brand/50 hover:bg-brand-soft/40";
            if (picked !== null) {
              if (isAnswer) cls = "border-good bg-[#16a578]/10";
              else if (isPicked) cls = "border-bad bg-[#e0463c]/10";
              else cls = "border-border bg-surface opacity-60";
            }
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={picked !== null}
                className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${cls}`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                    picked !== null && isAnswer
                      ? "bg-good text-white"
                      : picked !== null && isPicked
                      ? "bg-bad text-white"
                      : "bg-surface-2 text-ink-soft"
                  }`}
                >
                  {picked !== null && isAnswer ? "✓" : picked !== null && isPicked ? "✕" : LETTERS[i]}
                </span>
                <span className="text-sm text-ink">{c}</span>
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div className="fade-up mt-4 rounded-xl border border-border bg-surface p-4 shadow-card">
            <div className={`text-sm font-semibold ${picked === current.answer ? "text-good" : "text-bad"}`}>
              {picked === current.answer ? "Correct" : "Not quite"}
            </div>
            <p className="mt-1 text-sm text-ink-soft">{current.explanation}</p>
            <button onClick={next} className="btn-primary mt-3 w-full">
              {idx + 1 >= deck.length ? "See results" : "Next question"}
              <span className="ml-1 text-xs opacity-70">↵</span>
            </button>
          </div>
        )}

        {picked === null && (
          <p className="mt-4 text-center text-xs text-ink-faint">
            Tap a choice or press A–D · explanations appear instantly
          </p>
        )}
      </div>
    </div>
  );
}

function StartScreen({ onStart }: { onStart: (m: Mode) => void }) {
  const modes: { m: Mode; title: string; desc: string; color: string; n: number }[] = [
    { m: "Math", title: "Math", desc: "Algebra, problem solving, advanced math & geometry", color: "#2d66f5", n: QUESTIONS.filter((q) => q.section === "Math").length },
    { m: "Reading & Writing", title: "Reading & Writing", desc: "Grammar, transitions, and reading comprehension", color: "#7c5cff", n: QUESTIONS.filter((q) => q.section === "Reading & Writing").length },
    { m: "Mixed", title: "Full Mix", desc: "A bit of everything, just like the real test", color: "#16a578", n: QUESTIONS.length },
  ];
  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid gap-4 sm:grid-cols-3">
        {modes.map((x) => (
          <button
            key={x.m}
            onClick={() => onStart(x.m)}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30" style={{ background: x.color }} />
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ background: x.color }} />
            <span className="text-lg font-bold text-ink">{x.title}</span>
            <span className="mt-1 flex-1 text-sm text-ink-soft">{x.desc}</span>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: x.color }}>
              {x.n} questions · Start →
            </span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-ink-faint">
        Free forever. Pick a section to begin — your score and a full review come at the end.
      </p>
    </div>
  );
}

function Results({
  answers,
  total,
  seconds,
  bestStreak,
  onRetry,
  onHome,
}: {
  answers: Answered[];
  total: number;
  seconds: number;
  bestStreak: number;
  onRetry: () => void;
  onHome: () => void;
}) {
  const correct = answers.filter((a) => a.correct).length;
  const pct = total ? Math.round((correct / total) * 100) : 0;

  const cats = useMemo(() => {
    const map = new Map<string, { c: number; t: number }>();
    for (const a of answers) {
      const e = map.get(a.category) ?? { c: 0, t: 0 };
      e.t += 1;
      if (a.correct) e.c += 1;
      map.set(a.category, e);
    }
    return [...map.entries()].sort((a, b) => b[1].t - a[1].t);
  }, [answers]);

  const msg = pct >= 90 ? "Outstanding 🎉" : pct >= 70 ? "Strong work 💪" : pct >= 50 ? "Good start — keep going" : "Every rep counts";
  const ring = 2 * Math.PI * 52;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="card p-7 text-center fade-up">
        <div className="relative mx-auto h-32 w-32">
          <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90">
            <circle cx="64" cy="64" r="52" fill="none" stroke="rgb(var(--surface-2))" strokeWidth="12" />
            <circle
              cx="64" cy="64" r="52" fill="none" stroke="rgb(var(--brand))" strokeWidth="12" strokeLinecap="round"
              strokeDasharray={ring} strokeDashoffset={ring - (ring * pct) / 100}
              style={{ transition: "stroke-dashoffset 1s cubic-bezier(.16,1,.3,1)" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-ink">{pct}%</span>
            <span className="text-xs text-ink-faint">{correct}/{total}</span>
          </div>
        </div>
        <h2 className="mt-4 text-xl font-bold text-ink">{msg}</h2>
        <div className="mt-2 flex justify-center gap-5 text-sm text-ink-soft">
          <span>⏱ {fmt(seconds)}</span>
          <span>🔥 best streak {bestStreak}</span>
        </div>

        <div className="mt-6 space-y-2.5 text-left">
          {cats.map(([name, { c, t }]) => (
            <div key={name}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-medium text-ink-soft">{name}</span>
                <span className="text-ink-faint">{c}/{t}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                <div className="h-full rounded-full bg-brand transition-all duration-700" style={{ width: `${(c / t) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button onClick={onRetry} className="btn-primary shine px-5">Try again</button>
          <button onClick={onHome} className="btn-ghost px-5">Switch section</button>
        </div>
      </div>

      <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-ink-faint">Review</h3>
      <div className="space-y-2">
        {answers.map((a, i) => {
          const q = QUESTIONS.find((x) => x.id === a.id)!;
          return (
            <details key={a.id} className="group rounded-xl border border-border bg-surface p-4">
              <summary className="flex cursor-pointer list-none items-start gap-3">
                <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${a.correct ? "bg-good" : "bg-bad"}`}>
                  {a.correct ? "✓" : "✕"}
                </span>
                <span className="flex-1 text-sm font-medium text-ink">{i + 1}. {q.prompt.split("\n")[0]}</span>
              </summary>
              <div className="mt-3 space-y-1 pl-9 text-sm">
                <div className="text-good">Correct: {q.choices[q.answer]}</div>
                {!a.correct && <div className="text-bad">You chose: {q.choices[a.picked]}</div>}
                <p className="pt-1 text-ink-soft">{q.explanation}</p>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}
function diffTone(d: string) {
  return d === "Easy" ? "bg-[#16a578]/12 text-good" : d === "Medium" ? "bg-brand-soft text-brand" : "bg-[#e0463c]/12 text-bad";
}
