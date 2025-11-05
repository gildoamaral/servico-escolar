import { Student } from "../../models/Student";
import { IStudentRepository } from "../IStudentRepository";
import { prisma } from "../../lib/client";

export class PrismaStudentRepository implements IStudentRepository {
  async findByEmail(email: string): Promise<Student | null> {
    const studentData = await prisma.student.findUnique({ where: { email } });

    if (!studentData) return null;

    return new Student(
      studentData.name,
      studentData.email,
      studentData.id,
      studentData.createdAt
    );
  }

  async findById(id: string): Promise<Student | null> {
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!student) return null;

    return new Student(
      student.name,
      student.email,
      student.id,
      student.createdAt
    );
  }

  async save(student: Student): Promise<void> {
    await prisma.student.create({
      data: {
        id: student.id,
        name: student.name,
        email: student.email,
        createdAt: student.createdAt,
      },
    });
  }

  async findAll(): Promise<Student[]> {
    const studentRaw = await prisma.student.findMany();

    const studentList = studentRaw.map(student => {
      return new Student(
        student.name,
        student.email,
        student.id,
        student.createdAt,
      )
    });

    return studentList;
  }
}
