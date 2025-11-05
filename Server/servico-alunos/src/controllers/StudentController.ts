import { Request, Response } from "express";
import { CreateStudentService } from "../services/CreateStudentService";
import { IStudentRepository } from "../repositories/IStudentRepository";
import { FindStudentByIdService } from '../services/FindStudentByIdService';
import { ListStudentsService } from '../services/ListStudentsService';

export class StudentController {
  constructor(private studentRepository: IStudentRepository) {}

  create = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { name, email } = request.body;
      const createStudentService = new CreateStudentService(
        this.studentRepository
      );
      const student = await createStudentService.execute({ name, email });
      return response.status(201).json(student);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
      return response.status(500).json({ error: "internal server error" });
    }
  };

  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Student ID is required" });
    }

    const findStudentService = new FindStudentByIdService(
      this.studentRepository
    );
    try {
      const student = await findStudentService.execute(id);
      return res.status(200).json(student);
    } catch (error) {
      if (error instanceof Error)
        return res.status(404).json({ error: error.message });
      return res.status(500).json({ error: "internal server error" });
    }
  };

  public async index(req: Request, res: Response): Promise<Response> {
    try {
    const listStudentService = new ListStudentsService(this.studentRepository);
    const students = await listStudentService.execute();
    return res.status(200).json(students)

    } catch (error) {
      if (error instanceof Error)
        return res.status(404).json({ error: error.message });
      return res.status(500).json({ error: "internal server error" });
    }
  }
  // Futuramente, outros métodos como 'index' (listar), 'show' (buscar um), etc., virão aqui.
}
