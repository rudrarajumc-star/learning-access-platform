import type { Config } from "tailwindcss";

const c = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: c("--bg"),
        surface: c("--surface"),
        "surface-2": c("--surface-2"),
        border: c("--border"),
        ink: c("--ink"),
        "ink-soft": c("--ink-soft"),
        "ink-faint": c("--ink-faint"),
        brand: c("--brand"),
        "brand-soft": c("--brand-soft"),
        good: c("--good"),
        warn: c("--warn"),
        bad: c("--bad"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.05)",
        lift: "0 12px 32px -8px rgba(16,24,40,0.16), 0 4px 12px -4px rgba(16,24,40,0.08)",
        glow: "0 0 0 1px rgb(var(--brand) / 0.12), 0 8px 28px -6px rgb(var(--brand) / 0.35)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },
      letterSpacing: {
        tightish: "-0.011em",
        tight2: "-0.02em",
      },
    },
  },
  plugins: [],
};

export default config;
