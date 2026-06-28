import RequestForm from "./RequestForm";

export default function TutoringPage() {
  const forWho = [
    "You can't afford a private tutor and don't want to fall further behind.",
    "You're learning in English when it isn't the language you grew up speaking.",
    "School moves fast and you just need someone patient to go over things again.",
    "You want to get ahead, and nobody at home can help with the homework.",
  ];

  const steps = [
    { n: "1", t: "Tell us what you need", b: "Fill out the short form. A grade and a subject is enough to start." },
    { n: "2", t: "We match you with a tutor", b: "Someone who knows the subject, and ideally speaks your language." },
    { n: "3", t: "You meet, regularly", b: "Usually once a week. We keep track of how it's going so it actually sticks." },
  ];

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand">Free tutoring</div>
          <h1 className="mt-2 max-w-2xl text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Free tutoring, for real. No cost, no catch.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            If you want help and can&apos;t get it anywhere else, that&apos;s exactly who this is
            for. We tutor students in math and reading, in the language that&apos;s easiest for them,
            and we don&apos;t charge a thing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-ink">This is for you if…</h2>
            <ul className="mt-4 space-y-3">
              {forWho.map((line) => (
                <li key={line} className="flex gap-3 text-ink-soft">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {line}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-xl font-semibold text-ink">How it works</h2>
            <div className="mt-4 space-y-4">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand">
                    {s.n}
                  </div>
                  <div>
                    <div className="font-medium text-ink">{s.t}</div>
                    <div className="text-sm text-ink-soft">{s.b}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-ink">Request a tutor</h2>
            <RequestForm />
          </div>
        </div>
      </section>
    </div>
  );
}
