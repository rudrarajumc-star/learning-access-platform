"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CODING_LESSONS,
  ENGLISH_LESSONS,
  MATH_BANDS,
  SCIENCE_BANDS,
  SOCIAL_BANDS,
  type GradeBand,
} from "../lessons/content";

const bandIds = (bands: GradeBand[]) => bands.flatMap((b) => b.topics.map((_, i) => `${b.id}::${i}`));

const SUBJECTS = [
  { key: "English", color: "#2d66f5", ids: ENGLISH_LESSONS.map((l) => l.id) },
  { key: "Math", color: "#16a578", ids: bandIds(MATH_BANDS) },
  { key: "Science", color: "#d3860a", ids: bandIds(SCIENCE_BANDS) },
  { key: "Social Studies", color: "#7c5cff", ids: bandIds(SOCIAL_BANDS) },
  { key: "Coding", color: "#e0486a", ids: CODING_LESSONS.map((l) => l.id) },
];

export default function Progress() {
  const [done, setDone] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [cert, setCert] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("lap_done") || "[]");
      setDone(Array.isArray(saved) ? saved : []);
    } catch {
      setDone([]);
    }
    setMounted(true);
  }, []);

  const stats = SUBJECTS.map((s) => {
    const total = s.ids.length;
    const completed = s.ids.filter((id) => done.includes(id)).length;
    return { ...s, total, completed, pct: total ? Math.round((completed / total) * 100) : 0 };
  });
  const grandTotal = stats.reduce((a, s) => a + s.total, 0);
  const grandDone = stats.reduce((a, s) => a + s.completed, 0);
  const overall = grandTotal ? Math.round((grandDone / grandTotal) * 100) : 0;
  const earned = stats.filter((s) => s.pct === 100);

  if (!mounted) {
    return <div className="h-64 animate-pulse rounded-2xl border border-border bg-surface-2/40" />;
  }

  return (
    <div>
      <div className="card flex flex-col items-center gap-6 p-7 sm:flex-row sm:gap-10">
        <div className="relative">
          <Ring pct={overall} color="#2d66f5" size={140} stroke={12} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-ink">{overall}%</span>
            <span className="text-xs text-ink-faint">{grandDone}/{grandTotal}</span>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-ink">
            {overall === 0 ? "Let's get started" : overall === 100 ? "You finished everything! 🎉" : "Keep going - you've got this"}
          </h2>
          <p className="mt-1 max-w-md text-ink-soft">
            This is everything you&apos;ve completed across all five subjects. It&apos;s saved on this
            device. Finish a whole subject to earn a certificate.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
            <Link href="/lessons" className="btn-primary px-4 py-2">Continue learning</Link>
            <button
              onClick={() => {
                if (confirm("Reset all your progress on this device?")) {
                  localStorage.removeItem("lap_done");
                  setDone([]);
                }
              }}
              className="btn-ghost px-4 py-2"
            >
              Reset progress
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.key} className="card flex items-center gap-4 p-5">
            <div className="relative shrink-0">
              <Ring pct={s.pct} color={s.color} size={84} stroke={9} />
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-ink">
                {s.pct}%
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-ink">{s.key}</div>
              <div className="text-sm text-ink-soft">{s.completed} of {s.total} done</div>
              {s.pct === 100 ? (
                <button onClick={() => setCert(s.key)} className="mt-1 text-sm font-medium text-good hover:underline">
                  🏅 View certificate
                </button>
              ) : (
                <Link href="/lessons" className="mt-1 inline-block text-sm font-medium text-brand hover:underline">
                  Keep going →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      <h3 className="mb-3 mt-10 text-sm font-semibold uppercase tracking-wide text-ink-faint">Badges</h3>
      <div className="flex flex-wrap gap-4">
        {stats.map((s) => {
          const got = s.pct === 100;
          return (
            <button
              key={s.key}
              onClick={() => got && setCert(s.key)}
              className={`flex w-28 flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all ${
                got ? "border-border bg-surface shadow-card hover:-translate-y-1 hover:shadow-lift" : "border-dashed border-border bg-surface-2/40"
              }`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${got ? "" : "grayscale opacity-40"}`}
                style={got ? { background: `${s.color}1a` } : undefined}
              >
                {got ? "🏅" : "🔒"}
              </span>
              <span className={`text-xs font-medium ${got ? "text-ink" : "text-ink-faint"}`}>{s.key}</span>
            </button>
          );
        })}
      </div>
      {earned.length === 0 && (
        <p className="mt-3 text-sm text-ink-faint">Finish a whole subject to unlock its badge and certificate.</p>
      )}

      {cert && <Certificate subject={cert} onClose={() => setCert(null)} />}
    </div>
  );
}

function Ring({ pct, color, size, stroke }: { pct: number; color: string; size: number; stroke: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(var(--surface-2))" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (c * pct) / 100}
        style={{ transition: "stroke-dashoffset 1s cubic-bezier(.16,1,.3,1)" }}
      />
    </svg>
  );
}

function Certificate({ subject, onClose }: { subject: string; onClose: () => void }) {
  const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
        <div className="cert-print rounded-2xl border-4 border-double border-brand/40 bg-surface p-8 text-center shadow-lift">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-base font-bold text-white">LA</div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Certificate of Completion</div>
          <p className="mt-4 text-sm text-ink-soft">This certifies that a learner has completed all lessons in</p>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight2 text-ink">{subject}</h2>
          <p className="mt-3 text-sm text-ink-soft">on the Learning Access Initiative platform.</p>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-left text-xs text-ink-faint">
            <span>Awarded {date}</span>
            <span>learningaccessinitiative.org</span>
          </div>
        </div>
        <div className="mt-3 flex justify-center gap-2 print:hidden">
          <button onClick={() => window.print()} className="btn-primary px-5">Print / Save PDF</button>
          <button onClick={onClose} className="btn-ghost px-5">Close</button>
        </div>
      </div>
    </div>
  );
}
