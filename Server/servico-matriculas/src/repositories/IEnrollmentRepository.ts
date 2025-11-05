import { Enrollment } from '../models/Enrollment';

export interface IEnrollmentRepository {
  findByStudentId(student_id: string): Promise<Enrollment|null>;
  save(enrollment: Enrollment): Promise<void>;
}