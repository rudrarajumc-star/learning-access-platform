export const metadata = {
  title: "Mission",
  description: "Why we built data-driven, free tutoring for multilingual students.",
};

export default function MissionPage() {
  const pillars = [
    {
      title: "Access",
      body: "Reach learners in low-resource, multilingual environments where consistent tutoring is scarce.",
    },
    {
      title: "Measurement",
      body: "Treat every session as data — so progress is provable, not anecdotal.",
    },
    {
      title: "Equity in AI",
      body: "Make sure AI-generated learning material actually serves multilingual learners, not just fluent English speakers.",
    },
  ];
  return (
    <div className="mx-auto max-w-3xl px-5 py-20">
      <div className="text-xs font-semibold uppercase tracking-wider text-brand">Mission</div>
      <h1 className="mt-2 text-3xl font-bold text-ink">
        Make learning support measurable, scalable, and fair.
      </h1>
      <p className="mt-5 text-lg text-ink-soft">
        Tutoring works. The hard part is keeping track of it once you&apos;re helping more than a
        handful of kids. We built this so nothing falls through the cracks: who we&apos;re helping,
        what they keep getting stuck on, and whether their scores are actually moving.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.title} className="card p-5">
            <h3 className="font-semibold text-ink">{p.title}</h3>
            <p className="mt-1.5 text-sm text-ink-soft">{p.body}</p>
          </div>
        ))}
      </div>
      <blockquote className="mt-10 border-l-2 border-brand pl-5 text-lg text-ink">
        “I started keeping a spreadsheet of every kid I tutored. It got messy fast. This is what it
        turned into once I wanted to actually answer the question: is this helping?”
        <span className="mt-2 block text-sm text-ink-faint">— Rudra, founder</span>
      </blockquote>
    </div>
  );
}
