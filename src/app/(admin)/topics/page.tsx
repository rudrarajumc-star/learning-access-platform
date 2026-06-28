import Link from "next/link";
import { Card, Chip, PageHeader } from "@/components/ui";
import { HBar } from "@/components/charts";
import { weakTopics } from "@/lib/queries";

export default function TopicsPage() {
  const rows = weakTopics();
  const chartData = rows.slice(0, 8).map((r) => ({ topic: r.topic, sessions: r.sessions }));
  const maxSessions = Math.max(...rows.map((r) => r.sessions));

  return (
    <div>
      <PageHeader
        title="Weak-topic tracker"
        subtitle="What students get stuck on most, counted up from every session."
      />

      <div className="grid gap-4 lg:grid-cols-5">
        <Card title="Most-mentioned weak topics" className="lg:col-span-2">
          <HBar data={chartData} xKey="sessions" yKey="topic" height={300} color="#d3860a" />
        </Card>

        <div className="card overflow-hidden lg:col-span-3">
          <table className="w-full border-collapse">
            <thead className="border-b border-border bg-surface-2/50">
              <tr>
                <th className="th">Topic</th>
                <th className="th">Subject</th>
                <th className="th">Students</th>
                <th className="th">Sessions</th>
                <th className="th">Suggested resource</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.topicId} className="border-b border-border last:border-0 hover:bg-surface-2/40">
                  <td className="td font-medium text-ink">{r.topic}</td>
                  <td className="td">
                    <Chip tone={r.subject === "Math" ? "brand" : "warn"}>{r.subject}</Chip>
                  </td>
                  <td className="td tabular-nums">{r.studentsAffected}</td>
                  <td className="td">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-2">
                        <div className="h-full rounded-full bg-warn" style={{ width: `${(r.sessions / maxSessions) * 100}%` }} />
                      </div>
                      <span className="tabular-nums">{r.sessions}</span>
                    </div>
                  </td>
                  <td className="td">
                    <Link href="/practice" className="text-brand hover:underline">{r.suggested}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
