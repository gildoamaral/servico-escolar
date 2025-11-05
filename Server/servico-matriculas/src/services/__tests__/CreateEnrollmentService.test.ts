import axios from "axios";
import { FakeCourseRepository } from "../../repositories/fakes/FakeCourseRepository";
import { FakeEnrollmentRepository } from "../../repositories/fakes/FakeEnrollmentRepository";
import { CreateEnrollmentService } from "../CreateEnrollmentService";

// jest.mock('axios', () => {
//   return {
//     get: jest.fn().mockResolvedValue({
//       data: {
//         id: "student-uuid-01",
//         name: "John Doe",
//         email: "john.doe@example.com"
//       }
//     })
//   }
// })
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

let fakeCourseRepository: FakeCourseRepository;
let fakeEnrollmentRepository: FakeEnrollmentRepository;
let createEnrollmentService: CreateEnrollmentService;

describe("Create Enrollment Service", () => {
  beforeEach(() => {
    fakeCourseRepository = new FakeCourseRepository();
    fakeEnrollmentRepository = new FakeEnrollmentRepository();
    createEnrollmentService = new CreateEnrollmentService(
      fakeCourseRepository,
      fakeEnrollmentRepository
    );

    mockedAxios.get.mockClear();

    mockedAxios.get.mockResolvedValue({ status: 200 });
  });

  it("Should create an enrollment", async () => {
    const data = {
      student_id: "student-uuid-01",
      course_id: "course-uuid-01",
    };

    const enrollment1 = await createEnrollmentService.execute(data);

    expect(enrollment1).not.toBeNull();
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(enrollment1).toHaveProperty("student_id", "student-uuid-01");
  });

  it("Should fail when inserting a course that does not exist", async () => {
    const data = {
      student_id: "any-uuid",
      course_id: "course-uuid-02",
    };

    await expect(createEnrollmentService.execute(data)).rejects.toThrow(
      "Course not found"
    );
  });
});
