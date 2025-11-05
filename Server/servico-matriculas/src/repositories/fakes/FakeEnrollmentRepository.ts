import { Enrollment } from "../../models/Enrollment";
import { IEnrollmentRepository } from "../IEnrollmentRepository";

export class FakeEnrollmentRepository implements IEnrollmentRepository {
  private enrollments: Enrollment[] = [];

  public async findByStudentId(student_id: string): Promise<Enrollment | null> {
    const foundEnrollment = this.enrollments.find(
      (enrollment) => enrollment.student_id === student_id
    );

    return foundEnrollment || null;
  }

  public async save(enrollment: Enrollment): Promise<void> {
      this.enrollments.push(enrollment);
  }
}
