import { Student } from "../models/Student";
import { IStudentRepository } from "../repositories/IStudentRepository";

interface ICreateStudentRequest {
  name: string;
  email: string;
}
// Usando Injeção de Dependência: o serviço não cria seu próprio repositório.
// Ele recebe o repositório de quem o chamar. Isso o torna desacoplado e testável.

export class CreateStudentService {
  constructor(private studentRepository: IStudentRepository) {}

  public async execute({
    name,
    email,
  }: ICreateStudentRequest): Promise<Student> {
    const studentAlreadyExists = await this.studentRepository.findByEmail(
      email
    );
    if (studentAlreadyExists) throw new Error("This email is already in use");

    const newStudent = new Student(name, email);

    await this.studentRepository.save(newStudent);

    return newStudent;
  }
}
