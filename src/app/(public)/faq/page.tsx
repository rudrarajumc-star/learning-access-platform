import Link from "next/link";

export const metadata = {
  title: "FAQ",
  description: "Common questions about our free tutoring, classes, lessons, and how to join.",
};

const FAQS = [
  {
    q: "Is the tutoring really free?",
    a: "Yes. Tutoring, live classes, lessons, and every resource on this site are free. There is no trial, no premium tier, and no catch. We are a volunteer-run initiative.",
  },
  {
    q: "Who can sign up?",
    a: "Any student who wants help, roughly grades 1 through 10. Most of our students are multilingual learners in India, but you do not have to be. A parent or the student can fill out the request form.",
  },
  {
    q: "What languages do you tutor in?",
    a: "English, Telugu, and Hindi, depending on the tutor. Tell us what is spoken at home when you sign up and we will match you with someone who speaks it.",
  },
  {
    q: "What subjects do you cover?",
    a: "Math and reading/English are our core subjects for one-on-one tutoring. The Lessons section on this site also covers science, social studies, and beginner coding you can work through on your own.",
  },
  {
    q: "How do online classes work?",
    a: "Reserve a seat from the Classes page and we send you a video call link. Classes are small groups with one tutor, once a week, and free.",
  },
  {
    q: "How do you protect students' privacy?",
    a: "We collect as little as possible: a first name and a way to reach you. Inside our records, students are tracked by anonymous codes, not names. See our Privacy Policy for the full picture.",
  },
  {
    q: "How do I become a tutor?",
    a: "Fill out the volunteer form. If you can explain fractions or read with a fourth grader for an hour a week, you are qualified. We will match you with a student and help you get started.",
  },
  {
    q: "I'm outside India. Can I still join?",
    a: "Yes. Classes and tutoring happen online, and the lessons on this site work anywhere. Time zones can be tricky, so mention where you are when you sign up.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs font-semibold uppercase tracking-wider text-brand">FAQ</div>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight2 text-ink">Questions, answered.</h1>
      <p className="mt-3 text-ink-soft">
        The things people usually ask before signing up. Something else on your mind?{" "}
        <Link href="/contact" className="font-medium text-brand hover:underline">Ask us directly.</Link>
      </p>

      <div className="mt-8 space-y-3">
        {FAQS.map((f) => (
          <details key={f.q} className="card group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="font-semibold text-ink">{f.q}</span>
              <span className="shrink-0 text-ink-faint transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-relaxed text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-6 text-center">
        <h2 className="text-lg font-bold text-ink">Ready to start?</h2>
        <div className="mt-4 flex justify-center gap-3">
          <Link href="/tutoring" className="btn-primary px-5 py-2.5">Get free tutoring</Link>
          <Link href="/join" className="btn-ghost px-5 py-2.5">Volunteer</Link>
        </div>
      </div>
    </div>
  );
}
