import Link from "next/link";
import { Card, Chip, PageHeader, StatCard } from "@/components/ui";
import { ConditionBar, GroupedBar, HBar, SessionsArea } from "@/components/charts";
import {
  improvementBySubject,
  kpis,
  promptConditionStats,
  recentActivity,
  sessionsByWeek,
  studentsByCenter,
  weakTopics,
} from "@/lib/queries";

export default function DashboardPage() {
  const k = kpis();
  const weak = weakTopics().slice(0, 5);
  const activity = recentActivity();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Where things stand right now across all three centers."
        action={
          <div className="flex gap-2">
            <Link href="/exports" className="btn-ghost">
              Export
            </Link>
            <Link href="/students" className="btn-primary">
              + Add student
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Active students" value={k.activeStudents} sub={`${k.totalStudents} total reached`} accent />
        <StatCard label="Tutoring sessions" value={k.totalSessions.toLocaleString()} sub="last 14 weeks" />
        <StatCard label="Tutoring hours" value={k.totalHours.toLocaleString()} sub="logged & verified" />
        <StatCard label="Avg. improvement" value={`+${k.avgImprovement}`} sub="points, baseline → current" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Active tutors" value={k.activeTutors} />
        <StatCard label="Learning centers" value={k.centers} />
        <StatCard label="Practice problems" value={k.problems} />
        <StatCard label="Weak topics tracked" value={weakTopics().length} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <Card title="Sessions per week" className="lg:col-span-2" right={<Chip tone="good">▲ trending up</Chip>}>
          <SessionsArea data={sessionsByWeek()} />
        </Card>
        <Card title="Students by center">
          <HBar data={studentsByCenter()} xKey="students" yKey="center" />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card title="Score improvement by subject">
          <GroupedBar
            data={improvementBySubject()}
            xKey="subject"
            keys={["baseline", "current"]}
            colors={["#c7cedb", "#2d66f5"]}
          />
          <div className="mt-2 flex justify-center gap-4 text-xs text-ink-faint">
            <span className="flex items-center gap-1.5"><i className="inline-block h-2 w-2 rounded-full bg-[#c7cedb]" />Baseline</span>
            <span className="flex items-center gap-1.5"><i className="inline-block h-2 w-2 rounded-full bg-brand" />Current</span>
          </div>
        </Card>

        <Card
          title="AI problem quality by prompt"
          className="lg:col-span-2"
          right={<Link href="/research-scores" className="text-xs font-medium text-brand hover:underline">Research →</Link>}
        >
          <ConditionBar data={promptConditionStats()} />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card title="Top weak topics" right={<Link href="/topics" className="text-xs font-medium text-brand hover:underline">All topics →</Link>}>
          <div className="space-y-2.5">
            {weak.map((w) => (
              <div key={w.topicId} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Chip tone={w.subject === "Math" ? "brand" : "warn"}>{w.subject}</Chip>
                  <span className="text-sm text-ink">{w.topic}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-ink-faint">
                  <span>{w.studentsAffected} students</span>
                  <span className="tabular-nums font-medium text-ink-soft">{w.sessions} sessions</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent activity" right={<Link href="/sessions" className="text-xs font-medium text-brand hover:underline">All sessions →</Link>}>
          <div className="space-y-3">
            {activity.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[10px] font-semibold text-ink-soft">
                  {a.student.split("-")[0]}
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-ink">
                    <span className="font-medium">{a.student}</span> · {a.text}
                  </div>
                  <div className="text-[11px] text-ink-faint">
                    Tutor {a.tutor} · {a.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
