import { Card, PageHeader, StatCard } from "@/components/ui";
import { ConditionBar, GroupedBar, HBar, SessionsArea } from "@/components/charts";
import {
  improvementBySubject,
  kpis,
  promptConditionStats,
  sessionsByWeek,
  studentsByCenter,
  tutorHours,
  weakTopics,
} from "@/lib/queries";

export default function AnalyticsPage() {
  const k = kpis();
  const weak = weakTopics().slice(0, 8).map((w) => ({ topic: w.topic, sessions: w.sessions }));

  return (
    <div>
      <PageHeader title="Analytics" subtitle="Every chart that turns operational logs into evidence." />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Sessions logged" value={k.totalSessions.toLocaleString()} accent />
        <StatCard label="Tutoring hours" value={k.totalHours.toLocaleString()} />
        <StatCard label="Avg. improvement" value={`+${k.avgImprovement} pts`} />
        <StatCard label="Rubric ratings" value={promptConditionStats().reduce((a, s) => a + s.n, 0)} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card title="Sessions over time">
          <SessionsArea data={sessionsByWeek()} />
        </Card>
        <Card title="Weak topics frequency">
          <HBar data={weak} xKey="sessions" yKey="topic" color="#d3860a" />
        </Card>
        <Card title="Students by center">
          <HBar data={studentsByCenter()} xKey="students" yKey="center" />
        </Card>
        <Card title="Tutoring hours by tutor">
          <HBar data={tutorHours()} xKey="hours" yKey="tutor" color="#16a578" />
        </Card>
        <Card title="Score improvement by subject">
          <GroupedBar
            data={improvementBySubject()}
            xKey="subject"
            keys={["baseline", "current"]}
            colors={["#c7cedb", "#2d66f5"]}
          />
        </Card>
        <Card title="AI problem quality by prompt condition">
          <ConditionBar data={promptConditionStats()} />
        </Card>
      </div>
    </div>
  );
}
