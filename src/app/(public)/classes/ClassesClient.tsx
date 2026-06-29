"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";

interface ClassItem {
  title: string;
  subject: string;
  level: string;
  day: string;
  time: string;
  lang: string[];
  tutor: string;
  seats: string;
  color: string;
}

const CLASSES: ClassItem[] = [
  { title: "Math Foundations", subject: "Math", level: "Grades 4–6", day: "Mon", time: "5:00 PM", lang: ["Telugu", "English"], tutor: "Anika", seats: "6 of 12 seats", color: "#2d66f5" },
  { title: "Algebra Basics", subject: "Math", level: "Grades 7–9", day: "Tue", time: "6:00 PM", lang: ["English"], tutor: "Rudra", seats: "3 of 12 seats", color: "#2d66f5" },
  { title: "Reading Club", subject: "Reading", level: "All levels", day: "Wed", time: "5:00 PM", lang: ["English"], tutor: "Priya", seats: "Open", color: "#7c5cff" },
  { title: "English Conversation", subject: "English", level: "Beginners", day: "Thu", time: "6:00 PM", lang: ["Hindi", "English"], tutor: "Meena", seats: "5 of 10 seats", color: "#16a578" },
  { title: "Word Problems Workshop", subject: "Math", level: "Grades 5–8", day: "Fri", time: "5:30 PM", lang: ["Telugu"], tutor: "Karthik", seats: "Open", color: "#2d66f5" },
  { title: "Saturday Study Hall", subject: "Drop-in", level: "Any age", day: "Sat", time: "10:00 AM", lang: ["Any"], tutor: "Whole team", seats: "Drop in anytime", color: "#d3860a" },
];

const RECORDINGS = [
  { title: "Fractions, made simple", subject: "Math", len: "18 min", color: "#2d66f5" },
  { title: "Reading inference basics", subject: "Reading", len: "22 min", color: "#7c5cff" },
  { title: "Intro to algebra", subject: "Math", len: "25 min", color: "#2d66f5" },
  { title: "Everyday English: greetings", subject: "English", len: "15 min", color: "#16a578" },
];

const SUBJECTS = ["All", "Math", "Reading", "English", "Drop-in"];

export default function ClassesClient() {
  const [view, setView] = useState<"schedule" | "recordings">("schedule");
  const [subject, setSubject] = useState("All");

  const shown = useMemo(
    () => (subject === "All" ? CLASSES : CLASSES.filter((c) => c.subject === subject)),
    [subject]
  );

  return (
    <div>
      <div className="mb-6 inline-flex rounded-xl border border-border bg-surface p-1">
        {(["schedule", "recordings"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all duration-200 ${
              view === v ? "bg-ink text-white shadow-card" : "text-ink-soft hover:text-ink"
            }`}
          >
            {v === "schedule" ? "Weekly schedule" : "Recordings"}
          </button>
        ))}
      </div>

      {view === "schedule" ? (
        <>
          <div className="mb-6 flex flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                onClick={() => setSubject(s)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                  subject === s
                    ? "bg-brand text-white shadow-card"
                    : "border border-border bg-surface text-ink-soft hover:border-brand/40 hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 70}>
                <Tilt className="h-full">
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-card transition-shadow duration-300 hover:shadow-lift">
                    <span
                      className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-25"
                      style={{ background: c.color }}
                    />
                    <span className="absolute inset-x-0 top-0 h-1" style={{ background: c.color }} />

                    <div className="relative flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold tracking-tight2 text-ink">{c.day}</span>
                        <span className="text-sm font-medium text-ink-soft">{c.time}</span>
                      </div>
                      <span
                        className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                        style={{ background: `${c.color}1a`, color: c.color }}
                      >
                        {c.subject}
                      </span>
                    </div>

                    <h3 className="relative mt-3 text-lg font-semibold text-ink">{c.title}</h3>
                    <p className="relative mt-0.5 text-sm text-ink-soft">{c.level}</p>

                    <div className="relative mt-3 flex flex-wrap gap-1.5">
                      {c.lang.map((l) => (
                        <span key={l} className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-ink-soft">
                          {l}
                        </span>
                      ))}
                    </div>

                    <div className="relative mt-4 flex flex-1 items-end justify-between border-t border-border pt-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                          style={{ background: c.color }}
                        >
                          {c.tutor.slice(0, 2)}
                        </span>
                        <span className="text-xs text-ink-faint">{c.seats}</span>
                      </div>
                      <Link
                        href="/tutoring"
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-transform hover:scale-105"
                        style={{ background: c.color }}
                      >
                        Reserve a seat
                      </Link>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-ink-faint">
            All classes are free and online. Reserve a seat and we&apos;ll send you the link.
          </p>
        </>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RECORDINGS.map((r, i) => (
              <Reveal key={r.title} delay={(i % 4) * 60}>
                <Tilt className="h-full">
                  <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card transition-shadow duration-300 hover:shadow-lift">
                    <div
                      className="relative flex h-32 items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${r.color}26, ${r.color}0d)` }}
                    >
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lift transition-transform duration-300 group-hover:scale-110"
                        style={{ background: r.color }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      <span className="absolute right-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 text-[10px] font-medium text-white">
                        Coming soon
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: r.color }}>
                        {r.subject}
                      </span>
                      <h3 className="mt-1 font-semibold text-ink">{r.title}</h3>
                      <span className="mt-auto pt-2 text-xs text-ink-faint">{r.len}</span>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-dashed border-border bg-surface-2/40 p-5 text-center text-sm text-ink-soft">
            We record our group classes so you can rewatch anytime. Recordings drop here after each
            session — check back soon.
          </div>
        </>
      )}
    </div>
  );
}
