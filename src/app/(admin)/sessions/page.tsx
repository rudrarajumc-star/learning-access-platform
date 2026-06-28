import { PageHeader } from "@/components/ui";
import { db, topic, tutorName } from "@/lib/queries";
import SessionsClient, { SessionRow } from "./SessionsClient";

export default function SessionsPage() {
  const rows: SessionRow[] = db.sessions.slice(0, 120).map((s) => ({
    id: s.id,
    date: s.date,
    student: s.studentId,
    tutor: tutorName(s.tutorId),
    subject: s.subject,
    topic: topic(s.topicId)?.name ?? "",
    weakArea: s.weakArea,
    duration: s.durationMinutes,
    engagement: s.engagement,
    notes: s.notes,
    nextStep: s.nextStep,
  }));

  return (
    <div>
      <PageHeader
        title="Sessions"
        subtitle="Everything we've logged so far. Search to find a student or topic."
      />
      <SessionsClient
        rows={rows}
        students={db.students.slice(0, 30).map((s) => s.id)}
        tutors={db.tutors.map((t) => t.name)}
        topics={db.topics.map((t) => ({ name: t.name, subject: t.subject }))}
      />
    </div>
  );
}
