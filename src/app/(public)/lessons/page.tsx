import Lessons from "./Lessons";

export const metadata = {
  title: "Lessons — English, Math & Science",
  description: "Free English grammar lessons plus age-by-age math and science, with worked examples and practice — and track your progress.",
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
            Learn <span className="text-gradient">English, Math &amp; Science</span>, right here.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            Grammar lessons in the style of Wren &amp; Martin, plus math and science by age group
            following the NCERT syllabus — worked examples, practice, and progress you can track. Free.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <Lessons />
      </section>
    </div>
  );
}
