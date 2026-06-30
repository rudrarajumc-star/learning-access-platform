import Progress from "./Progress";

export const metadata = {
  title: "My Progress",
  description: "Track how far you've gotten across English, math, science, social studies, and coding - and earn a certificate.",
};

export default function ProgressPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="aurora" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-5xl px-5 py-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand">My progress</div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight2 text-ink sm:text-4xl">
            Your learning, <span className="text-gradient">all in one place</span>.
          </h1>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-5 py-10">
        <Progress />
      </section>
    </div>
  );
}
