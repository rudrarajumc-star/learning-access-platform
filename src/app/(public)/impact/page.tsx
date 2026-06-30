import { SITE_STATS } from "@/lib/siteStats";

export const metadata = {
  title: "Impact",
  description: "Our reach so far - students tutored, hours taught, tutors, and centers.",
};

export default function ImpactPage() {
  const stats = [
    { value: `${SITE_STATS.studentsTutored}+`, label: "students tutored" },
    { value: `${SITE_STATS.tutoringHours.toLocaleString()}+`, label: "tutoring hours" },
    { value: SITE_STATS.tutors, label: "volunteer tutors" },
    { value: SITE_STATS.centers, label: "learning centers" },
  ];
  const maxStudents = Math.max(...SITE_STATS.byCenter.map((c) => c.students));

  return (
    <div className="mx-auto max-w-5xl px-5 py-20">
      <div className="text-xs font-semibold uppercase tracking-wider text-brand">Impact</div>
      <h1 className="mt-2 text-3xl font-bold text-ink">Our reach so far.</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        Free tutoring, in students&apos; own languages, across three learning centers - with most of
        our students in Hyderabad.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-6 text-center">
            <div className="text-3xl font-bold text-brand">{s.value}</div>
            <div className="mt-1 text-sm text-ink-soft">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-xl font-semibold text-ink">Students by center</h2>
      <div className="mt-4 space-y-3">
        {SITE_STATS.byCenter.map((c) => (
          <div key={c.city} className="flex items-center gap-4">
            <div className="w-28 text-sm text-ink-soft">{c.city}</div>
            <div className="h-7 flex-1 overflow-hidden rounded-lg bg-surface-2">
              <div
                className="flex h-full items-center justify-end rounded-lg bg-brand px-2 text-xs font-medium text-white"
                style={{ width: `${(c.students / maxStudents) * 100}%` }}
              >
                {c.students}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
