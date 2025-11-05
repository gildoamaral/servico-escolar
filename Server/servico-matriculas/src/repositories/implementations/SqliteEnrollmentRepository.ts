import { openDb } from "../../database";
import { Enrollment } from "../../models/Enrollment";
import { IEnrollmentRepository } from "../IEnrollmentRepository";

export class SqliteEnrollmentRepository implements IEnrollmentRepository {
  async findByStudentId(student_id: string): Promise<Enrollment | null> {
    const db = await openDb();

    const enrollmentData = await db.get(
      "SELECT * FROM enrollments WHERE student_id = ?",
      [student_id]
    );

    if (!enrollmentData) {
      return null;
    }

    return new Enrollment(
      {
        student_id: enrollmentData.student_id,
        course_name: enrollmentData.course_name,
      },
      enrollmentData.id,
      new Date(enrollmentData.created_at)
    );
  }

  async save(enrollment: Enrollment): Promise<void> {
    const db = await openDb();
    await db.run(
      `INSERT INTO enrollments (id, student_id, course_name, created_at) VALUES (?, ?, ?, ?)`,
      [
        enrollment.id,
        enrollment.student_id,
        enrollment.course_name,
        enrollment.createdAt.toISOString(),
      ]
    );
  };
}
