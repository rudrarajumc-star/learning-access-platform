import { kpis, studentsByCenter } from "@/lib/queries";

export const metadata = {
  title: "Impact",
  description: "The numbers behind our free tutoring - students reached, sessions, hours, and score gains, from real data.",
};

export default function ImpactPage() {
  const k = kpis();
  const centers = studentsByCenter();

  const stats = [
    { value: `${k.totalStudents}+`, label: "students reached" },
    { value: k.totalSessions.toLocaleString(), label: "tutoring sessions" },
    { value: `${k.totalHours.toLocaleString()}+`, label: "tutoring hours" },
    { value: k.activeTutors, label: "volunteer tutors" },
    { value: k.centers, label: "learning centers" },
    { value: `+${k.avgImprovement}`, label: "avg. score gain" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 py-20">
      <div className="text-xs font-semibold uppercase tracking-wider text-brand">Impact</div>
      <h1 className="mt-2 text-3xl font-bold text-ink">Numbers we can defend.</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        Every figure here is computed from the live platform database - not a slide. Improvement is
        measured as the change from each learner&apos;s baseline assessment to their current score.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="card p-6 text-center">
            <div className="text-3xl font-bold text-brand">{s.value}</div>
            <div className="mt-1 text-sm text-ink-soft">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-xl font-semibold text-ink">Reach by center</h2>
      <div className="mt-4 space-y-3">
        {centers.map((c) => {
          const max = Math.max(...centers.map((x) => x.students));
          return (
            <div key={c.center} className="flex items-center gap-4">
              <div className="w-28 text-sm text-ink-soft">{c.center}</div>
              <div className="h-7 flex-1 overflow-hidden rounded-lg bg-surface-2">
                <div
                  className="flex h-full items-center justify-end rounded-lg bg-brand px-2 text-xs font-medium text-white"
                  style={{ width: `${(c.students / max) * 100}%` }}
                >
                  {c.students}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
