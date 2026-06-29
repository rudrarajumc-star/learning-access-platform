import Lessons from "./Lessons";

export const metadata = {
  title: "Lessons — English & Math",
  description: "Free English grammar lessons and age-by-age math lessons with explanations, right here in the app.",
};

export default function LessonsPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="aurora" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-5xl px-5 py-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand">Lessons</div>
          <h1 className="mt-2 max-w-2xl text-3xl font-extrabold leading-[1.08] tracking-tight2 text-ink sm:text-4xl">
            Learn <span className="text-gradient">English &amp; Math</span>, right here.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            Clear grammar lessons in the style of Wren &amp; Martin, and math by age group following
            the NCERT syllabus — with worked examples for every topic. Free, no account.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <Lessons />
      </section>
    </div>
  );
}
