import Link from "next/link";
import ClassesClient from "./ClassesClient";

export const metadata = {
  title: "Free Classes",
  description: "Live, free small-group classes every week - math, reading, and English. Reserve a seat.",
};

export default function ClassesPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="aurora" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-5xl px-5 py-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand">
            <span className="live-dot inline-block h-2 w-2 rounded-full bg-brand" />
            Live & free
          </div>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-[1.08] tracking-tight2 text-ink sm:text-4xl">
            Small group classes, every week. Always free.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            Can&apos;t do one-on-one? Hop into a live online class. A few students, one tutor, and
            plenty of room to ask questions. Reserve a seat and we&apos;ll send you the link.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <ClassesClient />

        <div className="mt-12 rounded-2xl border border-border bg-surface p-8 text-center">
          <h2 className="text-xl font-bold text-ink">Prefer one-on-one?</h2>
          <p className="mx-auto mt-1 max-w-lg text-ink-soft">
            We also match students with a personal tutor. Same deal: free, and in your language.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link href="/tutoring" className="btn-primary shine px-5 py-2.5 text-base">Get a personal tutor</Link>
            <Link href="/learn" className="btn-ghost px-5 py-2.5 text-base">Browse free resources</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
