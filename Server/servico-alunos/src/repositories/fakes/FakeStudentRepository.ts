import { Student } from '../../models/Student';
import { IStudentRepository } from '../IStudentRepository';

export class FakeStudentRepository implements IStudentRepository {
  private students: Student[];

  constructor() {
    this.students = [new Student("name1", "email@email.com", "uuid-example-01")]
  }

  public async findByEmail(email: string): Promise<Student | null> {
    const foundStudent = this.students.find(
      (student) => student.email === email
    );
    return foundStudent || null;
  }
  
  public async findById(id: string): Promise<Student | null> {
      return this.students.find(student => student.id === id) || null;
  }
  
  public async save(student: Student): Promise<void> {
    this.students.push(student);
  }

  public async findAll(): Promise<Student[]> {
    return this.students;
  }
}
