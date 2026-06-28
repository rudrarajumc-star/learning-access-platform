import { Chip, PageHeader } from "@/components/ui";
import { centerName, db } from "@/lib/queries";

export default function TutorsPage() {
  const rows = db.tutors
    .map((t) => {
      const sessions = db.sessions.filter((s) => s.tutorId === t.id);
      const hours = Math.round(sessions.reduce((a, s) => a + s.durationMinutes, 0) / 60);
      const students = new Set(sessions.map((s) => s.studentId)).size;
      return { ...t, hours, students, sessions: sessions.length };
    })
    .sort((a, b) => b.hours - a.hours);

  return (
    <div>
      <PageHeader title="Tutors" subtitle="Volunteer tutors, their reach, and logged contribution." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((t) => (
          <div key={t.id} className="card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand">
                  {t.name.slice(0, 2)}
                </div>
                <div>
                  <div className="font-medium text-ink">{t.name}</div>
                  <div className="text-xs text-ink-faint">{centerName(t.centerId).replace(" Center", "")}</div>
                </div>
              </div>
              <Chip tone={t.active ? "good" : "neutral"}>{t.active ? "active" : "inactive"}</Chip>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {t.subjects.map((s) => (
                <Chip key={s} tone="brand">{s}</Chip>
              ))}
              {t.languages.map((l) => (
                <Chip key={l}>{l}</Chip>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
              <Metric label="Hours" value={t.hours} />
              <Metric label="Sessions" value={t.sessions} />
              <Metric label="Students" value={t.students} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-lg font-semibold text-ink">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-ink-faint">{label}</div>
    </div>
  );
}
