import { openDb } from '../../database';
import { Course } from '../../models/Course';
import { ICourseRepository } from '../ICourseRepository';


export class SqliteCourseRepository implements ICourseRepository {

  async findById(id: string): Promise<Course|null> {

    // db.get() é usado para buscar um único registro
    const db = await openDb();

    const courseData = await db.get("SELECT * FROM courses WHERE id = ?", [id]);

    if (!courseData) {
      return null;
    }

    return new Course(
      { title: courseData.title, description: courseData.description}
    )
  }
}