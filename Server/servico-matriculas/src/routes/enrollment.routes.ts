import { Router } from 'express';
import { EnrollmentController } from '../controllers/EnrollmentController';
import { SqliteCourseRepository } from '../repositories/implementations/SqliteCourseRepository';
import { SqliteEnrollmentRepository } from '../repositories/implementations/SqliteEnrollmentRepository';
import { CreateEnrollmentService } from '../services/CreateEnrollmentService';

const enrollmentRouter = Router();

const courseRepository = new SqliteCourseRepository();
const enrollmentRepository = new SqliteEnrollmentRepository();
const createEnrollmentService = new CreateEnrollmentService(courseRepository, enrollmentRepository);
const createEnrollmentController = new EnrollmentController(createEnrollmentService);

enrollmentRouter.post('/enrollments', createEnrollmentController.create)

export { enrollmentRouter };