import { Student } from '../models/Student';
import { IStudentRepository } from '../repositories/IStudentRepository';


export class ListStudentsService {
  constructor (private studentRepository: IStudentRepository) {}

  public async execute (): Promise<Student[]> {
    const students = await this.studentRepository.findAll();
    
    return students;
  }
}