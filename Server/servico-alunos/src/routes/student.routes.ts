import { Router } from "express";
import { StudentController } from "../controllers/StudentController";
import { PrismaStudentRepository } from '../repositories/implementations/PrismaStudentRepository';

const studentRouter = Router();
const studentRepository = new PrismaStudentRepository();
const studentController = new StudentController(studentRepository);

studentRouter.post("/students", studentController.create);
studentRouter.get("/students", studentController.index.bind(studentController));
studentRouter.get("/students/:id", studentController.find);

export { studentRouter };