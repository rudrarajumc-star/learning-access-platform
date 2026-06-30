import Link from "next/link";
import LearnClient from "./LearnClient";

export const metadata = {
  title: "Learn - Free Resources",
  description: "The best free places to learn online, from Khan Academy to free books in your own language.",
};

export default function LearnPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 glow" />
        <div className="relative mx-auto max-w-5xl px-5 py-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand">Learn anywhere</div>
          <h1 className="mt-2 max-w-2xl text-3xl font-extrabold leading-[1.08] tracking-tight2 text-ink sm:text-4xl">
            The best free places to learn, all in one spot.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            You don&apos;t need to wait for a session to keep going. These are the sites our tutors
            actually recommend, from Khan Academy to free books in your own language. Every one of
            them is free.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <LearnClient />

        <div className="mt-12 rounded-2xl border border-border bg-surface p-8 text-center">
          <h2 className="text-xl font-bold text-ink">Want someone to learn alongside?</h2>
          <p className="mx-auto mt-1 max-w-lg text-ink-soft">
            Self-study is great, but a tutor makes it stick. Ours are free.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link href="/tutoring" className="btn-primary shine px-5 py-2.5 text-base">Get free tutoring</Link>
            <Link href="/join" className="btn-ghost px-5 py-2.5 text-base">Volunteer to tutor</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
