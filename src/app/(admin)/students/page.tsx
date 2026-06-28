import { PageHeader } from "@/components/ui";
import { centerName, db, improvement } from "@/lib/queries";
import StudentsTable, { StudentRow } from "./StudentsTable";

export default function StudentsPage() {
  const rows: StudentRow[] = db.students.map((s) => ({
    id: s.id,
    grade: s.gradeLevel,
    language: s.primaryLanguage,
    english: s.englishLevel,
    center: centerName(s.centerId).replace(" Center", ""),
    status: s.status,
    baseline: s.baselineMath,
    current: s.currentMath,
    improvement: improvement(s),
  }));

  return (
    <div>
      <PageHeader
        title="Students"
        subtitle="Every student we work with, by code. We don't store names here."
      />
      <StudentsTable rows={rows} />
    </div>
  );
}
