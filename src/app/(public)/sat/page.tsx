import SatPractice from "./SatPractice";

export default function SatPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="aurora" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-5xl px-5 py-14 text-center">
          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-soft">
            <span className="live-dot inline-block h-2 w-2 rounded-full bg-brand" />
            Free SAT practice · instant feedback
          </div>
          <h1 className="mx-auto max-w-2xl text-3xl font-extrabold leading-[1.08] tracking-tight2 text-ink sm:text-[2.7rem]">
            Practice the <span className="text-gradient">SAT</span> for free. Get better every question.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            Real-style Math and Reading &amp; Writing questions with an explanation after every single
            one. No account, no paywall, no catch.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <SatPractice />
      </section>
    </div>
  );
}
