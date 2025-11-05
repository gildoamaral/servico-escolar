import { IStudentRepository } from '../repositories/IStudentRepository';
import { Student } from '../models/Student';


export class FindStudentByIdService {
  constructor(private studentRepository: IStudentRepository) {}

  public async execute (id: string): Promise<Student> {
    const student = await this.studentRepository.findById(id);

    if (!student) throw new Error("Student not found");

    return student;
  }
}