import { Student } from '../models/Student';

// Nos repositories, fazemos a conexão entre o nossa lógica
// de negócio "Services" e o Prisma

export interface IStudentRepository {
  findByEmail(email: string): Promise<Student | null>;
  findById(id: string): Promise<Student | null>;
  save(student: Student): Promise<void>;
  findAll(): Promise<Student[]>;
}