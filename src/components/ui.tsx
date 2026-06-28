import Link from "next/link";

export function Chip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "brand" | "good" | "warn" | "bad";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-surface-2 text-ink-soft",
    brand: "bg-brand-soft text-brand",
    good: "bg-[#e4f6ef] text-good",
    warn: "bg-[#fdf1dd] text-warn",
    bad: "bg-[#fce8e6] text-bad",
  };
  return <span className={`chip ${tones[tone]}`}>{children}</span>;
}

export function StatCard({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="card p-4 fade-up">
      <div className="text-xs font-medium uppercase tracking-wide text-ink-faint">{label}</div>
      <div className={`mt-1.5 text-2xl font-semibold ${accent ? "text-brand" : "text-ink"}`}>
        {value}
      </div>
      {sub && <div className="mt-0.5 text-xs text-ink-faint">{sub}</div>}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold text-ink">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-ink-soft">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({
  title,
  children,
  right,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`card p-5 ${className}`}>
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">{title}</h2>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

export function ScoreBar({ value, max = 5 }: { value: number; max?: number }) {
  const pct = (value / max) * 100;
  const tone = value >= 4.2 ? "#16a578" : value >= 3.5 ? "#2d66f5" : "#d3860a";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-2">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: tone }} />
      </div>
      <span className="tabular-nums text-xs text-ink-soft">{value.toFixed(1)}</span>
    </div>
  );
}

export function Crumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="mb-3 flex items-center gap-1.5 text-xs text-ink-faint">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {it.href ? (
            <Link href={it.href} className="hover:text-brand">
              {it.label}
            </Link>
          ) : (
            <span className="text-ink-soft">{it.label}</span>
          )}
          {i < items.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  );
}
