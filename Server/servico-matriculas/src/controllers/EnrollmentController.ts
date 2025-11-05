import { Request, Response } from "express";
import { CreateEnrollmentService } from "../services/CreateEnrollmentService";

export class EnrollmentController {
  constructor(private createEnrollmentService: CreateEnrollmentService) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { student_id, course_id } = req.body;

      const enrollment = await this.createEnrollmentService.execute({
        student_id,
        course_id,
      });

      return res.status(201).json(enrollment);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });

      return res.status(500).json({ error: "internal server error" });
    }
  };
}
