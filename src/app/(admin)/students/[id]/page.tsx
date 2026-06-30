import { notFound } from "next/navigation";
import { Card, Chip, Crumb, ScoreBar, StatCard } from "@/components/ui";
import { centerName, db, improvement, tutorName, topic } from "@/lib/queries";

export default async function StudentProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const s = db.students.find((x) => x.id === id);
  if (!s) notFound();

  const sessions = db.sessions.filter((x) => x.studentId === s.id).slice(0, 8);
  const weakAreas = Array.from(
    new Set(db.sessions.filter((x) => x.studentId === s.id).map((x) => topic(x.topicId)?.name).filter(Boolean))
  ).slice(0, 6) as string[];
  const totalMin = db.sessions
    .filter((x) => x.studentId === s.id)
    .reduce((a, x) => a + x.durationMinutes, 0);

  return (
    <div>
      <Crumb items={[{ label: "Students", href: "/students" }, { label: s.id }]} />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-soft text-base font-bold text-brand">
            {s.id.split("-")[0]}
          </div>
          <div>
            <h1 className="font-mono text-xl font-semibold text-ink">{s.id}</h1>
            <p className="text-sm text-ink-soft">
              Grade {s.gradeLevel} · {s.primaryLanguage} speaker · {centerName(s.centerId)}
            </p>
          </div>
        </div>
        <Chip tone={s.status === "active" ? "good" : s.status === "paused" ? "warn" : "neutral"}>
          {s.status}
        </Chip>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="English level" value={s.englishLevel} />
        <StatCard label="Sessions" value={sessions.length ? db.sessions.filter((x) => x.studentId === s.id).length : 0} />
        <StatCard label="Tutoring time" value={`${Math.round(totalMin / 60)}h`} />
        <StatCard label="Avg. improvement" value={`+${improvement(s)}`} accent />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <Card title="Progress" className="lg:col-span-1">
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex justify-between text-xs text-ink-soft">
                <span>Math</span>
                <span className="font-medium text-good">+{s.currentMath - s.baselineMath}</span>
              </div>
              <Progress baseline={s.baselineMath} current={s.currentMath} />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs text-ink-soft">
                <span>English</span>
                <span className="font-medium text-good">+{s.currentEnglish - s.baselineEnglish}</span>
              </div>
              <Progress baseline={s.baselineEnglish} current={s.currentEnglish} />
            </div>
          </div>
          <div className="mt-5">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">Weak topics</div>
            <div className="flex flex-wrap gap-1.5">
              {weakAreas.map((w) => (
                <Chip key={w} tone="warn">{w}</Chip>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Session history" className="lg:col-span-2">
          <div className="space-y-3">
            {sessions.map((x) => {
              const t = topic(x.topicId);
              return (
                <div key={x.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Chip tone={x.subject === "Math" ? "brand" : "warn"}>{x.subject}</Chip>
                      <span className="text-sm font-medium text-ink">{t?.name}</span>
                      <span className="text-xs text-ink-faint">· weak area: {x.weakArea}</span>
                    </div>
                    <span className="text-xs text-ink-faint">{x.date} · {x.durationMinutes} min</span>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-soft">{x.notes}</p>
                  <p className="mt-1 text-xs text-brand">Next step: {x.nextStep}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-ink-faint">
                    Engagement <ScoreBar value={x.engagement} /> · {tutorName(x.tutorId)}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Progress({ baseline, current }: { baseline: number; current: number }) {
  return (
    <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-surface-2">
      <div className="absolute inset-y-0 left-0 rounded-full bg-brand" style={{ width: `${current}%` }} />
      <div className="absolute inset-y-0 left-0 rounded-full bg-[#9aa6c2]" style={{ width: `${baseline}%` }} />
    </div>
  );
}
