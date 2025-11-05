import { Course } from '../models/Course'

export interface ICourseRepository {
  findById(id: string): Promise<Course | null>;
}