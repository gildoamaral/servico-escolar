import { Course } from "../../models/Course";
import { ICourseRepository } from "../ICourseRepository";

export class FakeCourseRepository implements ICourseRepository {
  private courses: Course[];

  constructor() {
    this.courses = [ new Course({ title: "TypeScript advanced course", description: "A course focused on project patterns."}, "course-uuid-01" )]
  };

  public async findById(id: string): Promise<Course | null> {
    const course = this.courses.find((course) => course.id === id);
    return course || null;
  }
}
