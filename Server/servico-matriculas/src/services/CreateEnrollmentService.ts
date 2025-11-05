import axios from "axios";
import { Enrollment } from "../models/Enrollment";
import { ICourseRepository } from "../repositories/ICourseRepository";
import { IEnrollmentRepository } from "../repositories/IEnrollmentRepository";

interface ICreateEnrollmentRequest {
  student_id: string;
  course_id: string;
}

const STUDENT_SERVICE_API_URL = "http://localhost:3001";

export class CreateEnrollmentService {
  constructor(
    private courseRepository: ICourseRepository,
    private enrollmentRepository: IEnrollmentRepository
  ) {}

  async execute({
    student_id,
    course_id,
  }: ICreateEnrollmentRequest): Promise<Enrollment> {
    const course = await this.courseRepository.findById(course_id);
    if (!course) throw new Error("Course not found.");

    const enrollmentStudentAlreadyExists =
      await this.enrollmentRepository.findByStudentId(student_id);
    if (enrollmentStudentAlreadyExists)
      throw new Error("Student alread enrolled");

    try {
      await axios.get(`${STUDENT_SERVICE_API_URL}/students/${student_id}`);
    } catch (error) {
      throw new Error("Student does not exists on registration system");
    }

    const enrollment = new Enrollment({
      student_id,
      course_name: course.title,
    });

    await this.enrollmentRepository.save(enrollment);

    return enrollment;
  }
}
