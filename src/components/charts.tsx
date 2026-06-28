"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Literal colors — CSS vars don't resolve inside SVG fill/stroke.
const C = {
  brand: "#2d66f5",
  good: "#16a578",
  warn: "#d3860a",
  inkFaint: "#8a91a3",
  border: "#e6e8ee",
  surface2: "#f3f4f7",
};

const AXIS = { fontSize: 11, fill: C.inkFaint };
const GRID = C.border;

const tip = {
  contentStyle: {
    borderRadius: 12,
    border: `1px solid ${C.border}`,
    boxShadow: "0 12px 28px -8px rgba(16,24,40,0.18)",
    fontSize: 12,
  },
};

export function SessionsArea({ data }: { data: { week: string; sessions: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
        <defs>
          <linearGradient id="g-sessions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.brand} stopOpacity={0.35} />
            <stop offset="100%" stopColor={C.brand} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="week" tick={AXIS} tickLine={false} axisLine={false} />
        <YAxis tick={AXIS} tickLine={false} axisLine={false} width={36} />
        <Tooltip {...tip} />
        <Area
          type="monotone"
          dataKey="sessions"
          stroke={C.brand}
          strokeWidth={2}
          fill="url(#g-sessions)"
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function HBar({
  data,
  xKey,
  yKey,
  color = C.brand,
  height = 240,
}: {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, bottom: 0, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} horizontal={false} />
        <XAxis type="number" tick={AXIS} tickLine={false} axisLine={false} />
        <YAxis
          type="category"
          dataKey={yKey}
          tick={AXIS}
          tickLine={false}
          axisLine={false}
          width={92}
        />
        <Tooltip {...tip} cursor={{ fill: C.surface2 }} />
        <Bar dataKey={xKey} fill={color} radius={[0, 5, 5, 0]} barSize={16} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function GroupedBar({
  data,
  keys,
  colors,
  xKey,
  height = 240,
}: {
  data: Record<string, unknown>[];
  keys: string[];
  colors: string[];
  xKey: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
        <XAxis dataKey={xKey} tick={AXIS} tickLine={false} axisLine={false} />
        <YAxis tick={AXIS} tickLine={false} axisLine={false} width={36} />
        <Tooltip {...tip} cursor={{ fill: C.surface2 }} />
        {keys.map((k, i) => (
          <Bar key={k} dataKey={k} fill={colors[i]} radius={[5, 5, 0, 0]} barSize={22} isAnimationActive={false} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ConditionBar({
  data,
}: {
  data: { label: string; overall: number }[];
}) {
  const palette = [
    "#9aa6bf",
    "#6b8ef6",
    "#2d66f5",
    "#16a578",
    "#d3860a",
    "#7c5cff",
  ];
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="label" tick={{ ...AXIS, fontSize: 10 }} tickLine={false} axisLine={false} interval={0} />
        <YAxis domain={[3, 5]} tick={AXIS} tickLine={false} axisLine={false} width={36} />
        <Tooltip {...tip} cursor={{ fill: C.surface2 }} />
        <Bar dataKey="overall" radius={[5, 5, 0, 0]} barSize={34} isAnimationActive={false}>
          {data.map((_, i) => (
            <Cell key={i} fill={palette[i % palette.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
