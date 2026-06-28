"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";

type Cat = "Math" | "Reading" | "English (new speakers)" | "Science" | "Free books";

interface Resource {
  name: string;
  blurb: string;
  url: string;
  cat: Cat;
  free: string;
}

const catColor: Record<Cat, string> = {
  Math: "#2d66f5",
  Reading: "#7c5cff",
  "English (new speakers)": "#16a578",
  Science: "#d3860a",
  "Free books": "#e0486a",
};

const RESOURCES: Resource[] = [
  // Math
  { name: "Khan Academy — Math", url: "https://www.khanacademy.org/math", cat: "Math", free: "100% free", blurb: "Every math topic from counting to calculus, with practice and videos. Our go-to." },
  { name: "Khan Academy Kids", url: "https://learn.khanacademy.org/khan-academy-kids/", cat: "Math", free: "Free app", blurb: "Playful early math and reading for younger learners (ages 2–8)." },
  { name: "Desmos", url: "https://www.desmos.com/calculator", cat: "Math", free: "Free", blurb: "A beautiful graphing calculator. Make equations come alive." },
  { name: "Prodigy Math", url: "https://www.prodigygame.com", cat: "Math", free: "Free to play", blurb: "Math practice disguised as a game. Kids forget they're studying." },
  // Reading & English
  { name: "Khan Academy — Reading & Grammar", url: "https://www.khanacademy.org/ela", cat: "Reading", free: "100% free", blurb: "Reading comprehension and grammar, organized by grade." },
  { name: "CommonLit", url: "https://www.commonlit.org", cat: "Reading", free: "Free", blurb: "Thousands of reading passages with questions, by reading level." },
  { name: "ReadTheory", url: "https://readtheory.org", cat: "Reading", free: "Free", blurb: "Adapts to the reader and builds comprehension at the right level." },
  { name: "Storyline Online", url: "https://www.storylineonline.net", cat: "Reading", free: "Free", blurb: "Famous actors read picture books aloud. Great for new readers." },
  // English for new speakers
  { name: "Duolingo", url: "https://www.duolingo.com", cat: "English (new speakers)", free: "Free", blurb: "Learn English in short daily lessons, from many home languages." },
  { name: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish", cat: "English (new speakers)", free: "Free", blurb: "Videos, vocabulary and grammar built for English learners." },
  { name: "USA Learns", url: "https://www.usalearns.org", cat: "English (new speakers)", free: "Free", blurb: "Full English courses for adults and older students. No account needed to start." },
  { name: "VOA Learning English", url: "https://learningenglish.voanews.com", cat: "English (new speakers)", free: "Free", blurb: "News and stories read slowly, in clear and simple English." },
  // Science
  { name: "PhET Simulations", url: "https://phet.colorado.edu", cat: "Science", free: "Free", blurb: "Interactive science and math simulations from the University of Colorado." },
  { name: "Khan Academy — Science", url: "https://www.khanacademy.org/science", cat: "Science", free: "100% free", blurb: "Biology, chemistry, physics and more, explained simply." },
  { name: "NASA Kids' Club", url: "https://www.nasa.gov/kidsclub/index.html", cat: "Science", free: "Free", blurb: "Space, games and real NASA science for curious kids." },
  { name: "National Geographic Kids", url: "https://kids.nationalgeographic.com", cat: "Science", free: "Free", blurb: "Animals, nature and the world, packed with photos and facts." },
  // Free books
  { name: "StoryWeaver", url: "https://storyweaver.org.in", cat: "Free books", free: "Free · multilingual", blurb: "Thousands of children's books in Telugu, Hindi, English and 300+ languages. Made in India." },
  { name: "Open Library", url: "https://openlibrary.org", cat: "Free books", free: "Free", blurb: "Borrow millions of books for free from the Internet Archive." },
  { name: "Project Gutenberg", url: "https://www.gutenberg.org", cat: "Free books", free: "Free", blurb: "70,000+ classic books you can read or download, no cost." },
  { name: "Intl. Children's Digital Library", url: "http://en.childrenslibrary.org", cat: "Free books", free: "Free", blurb: "Children's books from around the world, in many languages." },
];

const TABS: ("All" | Cat)[] = [
  "All",
  "Math",
  "Reading",
  "English (new speakers)",
  "Science",
  "Free books",
];

export default function LearnClient() {
  const [tab, setTab] = useState<"All" | Cat>("All");

  const shown = useMemo(
    () => (tab === "All" ? RESOURCES : RESOURCES.filter((r) => r.cat === tab)),
    [tab]
  );

  return (
    <div>
      {/* Filter tabs */}
      <div className="sticky top-16 z-10 -mx-5 mb-8 border-b border-border bg-bg/80 px-5 py-3 backdrop-blur">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-ink text-white shadow-card"
                    : "border border-border bg-surface text-ink-soft hover:border-ink/20 hover:text-ink"
                }`}
              >
                {t === "English (new speakers)" ? "English (ELL)" : t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((r, i) => {
          const color = catColor[r.cat];
          return (
            <Reveal key={r.name} delay={(i % 3) * 70}>
              <Tilt className="h-full">
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-card transition-shadow duration-300 hover:shadow-lift"
              >
                {/* hover glow */}
                <span
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
                  style={{ background: color }}
                />
                {/* top accent */}
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ background: color }}
                />

                <div className="relative flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{ background: color }}
                  >
                    {r.name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()}
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                    style={{ background: `${color}1a`, color }}
                  >
                    {r.free}
                  </span>
                </div>

                <h3 className="relative mt-3 font-semibold text-ink">{r.name}</h3>
                <p className="relative mt-1 flex-1 text-sm text-ink-soft">{r.blurb}</p>

                <span className="relative mt-3 inline-flex items-center gap-1 text-sm font-medium" style={{ color }}>
                  Visit site
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  >
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </span>
              </a>
              </Tilt>
            </Reveal>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-ink-faint">
        These are independent sites we like, not run by us. They&apos;re free to use. Tell us if a link breaks.
      </p>
    </div>
  );
}
