import Link from "next/link";
import { Card, PageHeader, StatCard } from "@/components/ui";
import { Donut, DONUT_PALETTE, HBar, TrafficArea } from "@/components/charts";
import { getInsights } from "@/lib/analytics/insights";
import LiveFeed from "./InsightsLive";

export const dynamic = "force-dynamic";

export const metadata = { title: "Site analytics" };

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function Legend({ items }: { items: { name: string; value: number }[] }) {
  const total = items.reduce((a, b) => a + b.value, 0) || 1;
  return (
    <ul className="mt-3 space-y-1.5">
      {items.map((it, i) => (
        <li key={it.name} className="flex items-center gap-2 text-sm">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ background: DONUT_PALETTE[i % DONUT_PALETTE.length] }}
          />
          <span className="flex-1 truncate text-ink-soft">{it.name}</span>
          <span className="tabular-nums text-ink-faint">{Math.round((it.value / total) * 100)}%</span>
        </li>
      ))}
    </ul>
  );
}

export default async function InsightsPage() {
  const insights = await getInsights(30);
  const s = insights.summary;

  return (
    <div>
      <PageHeader
        title="Site analytics"
        subtitle="How people find, use, and move through the public site over the last 30 days."
        action={
          <div className="flex items-center gap-2">
            {!insights.hasRealTraffic && (
              <span className="chip bg-surface-2 text-ink-soft">Seeded demo traffic</span>
            )}
            <span className="chip bg-brand-soft text-brand">Live</span>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Visitors" value={s.visitors.toLocaleString()} accent sub="unique in range" />
        <StatCard label="Page views" value={s.pageviews.toLocaleString()} sub={`${s.viewsPerSession} per session`} />
        <StatCard label="Avg. visit" value={formatDuration(s.avgSessionSeconds)} sub={`${s.sessions.toLocaleString()} sessions`} />
        <StatCard label="Bounce rate" value={`${s.bounceRate}%`} sub="single-page visits" />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Lessons started" value={s.lessonStarts.toLocaleString()} />
        <StatCard label="Lessons finished" value={s.lessonCompletions.toLocaleString()} sub={`${s.completionRate}% completion`} />
        <StatCard label="Form submissions" value={s.leads.toLocaleString()} sub="tutor, volunteer, contact" />
        <StatCard label="Events tracked" value={s.events.toLocaleString()} />
      </div>

      <div className="mt-5">
        <Card
          title="Visitors and page views"
          right={
            <div className="flex items-center gap-3 text-xs text-ink-faint">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand" /> Page views
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-good" /> Visitors
              </span>
            </div>
          }
        >
          <TrafficArea data={insights.trend.map((t) => ({ label: t.label, visitors: t.visitors, views: t.views }))} />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card title="Top pages" className="lg:col-span-2">
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full">
              <thead className="bg-surface-2/60">
                <tr>
                  <th className="th">Page</th>
                  <th className="th text-right">Views</th>
                  <th className="th text-right">Visitors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {insights.topPages.map((p) => (
                  <tr key={p.path} className="hover:bg-surface-2/40">
                    <td className="td font-medium text-ink">{p.path}</td>
                    <td className="td text-right tabular-nums">{p.views.toLocaleString()}</td>
                    <td className="td text-right tabular-nums">{p.visitors.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Traffic sources">
          <Donut data={insights.referrers} />
          <Legend items={insights.referrers} />
        </Card>

        <Card title="Devices">
          <Donut data={insights.devices} />
          <Legend items={insights.devices} />
        </Card>

        <Card title="Top countries">
          <HBar
            data={insights.countries.map((c) => ({ country: c.name, visitors: c.value }))}
            xKey="visitors"
            yKey="country"
            height={200}
          />
        </Card>

        <Card title="What visitors do">
          <HBar
            data={insights.events.map((e) => ({ event: e.name, count: e.value }))}
            xKey="count"
            yKey="event"
            color="#7c5cff"
            height={200}
          />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card title="From visit to tutor request">
          <div className="space-y-3">
            {insights.funnel.map((step, i) => (
              <div key={step.step}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-ink-soft">{step.step}</span>
                  <span className="tabular-nums text-ink-faint">
                    {step.value.toLocaleString()} · {step.pct}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.max(step.pct, 2)}%`,
                      background: `linear-gradient(90deg, ${DONUT_PALETTE[i % DONUT_PALETTE.length]}, ${DONUT_PALETTE[(i + 1) % DONUT_PALETTE.length]})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink-faint">
            Each step counts unique sessions, so you can see exactly where interest drops off.
          </p>
        </Card>

        <Card title="Live activity">
          <LiveFeed initial={insights.recent} />
        </Card>
      </div>

      <p className="mt-5 text-xs text-ink-faint">
        Fully first-party and anonymous: no third-party scripts, no cookies for tracking, no names,
        emails, or IP addresses stored. Visitors on Do Not Track are never counted. Open the{" "}
        <Link href="/" className="text-brand hover:underline">public site</Link> in another tab and
        this feed updates on its own. See how it works in{" "}
        <span className="font-mono text-ink-soft">src/lib/analytics</span>.
      </p>
    </div>
  );
}
