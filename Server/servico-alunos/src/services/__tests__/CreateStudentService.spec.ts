import { FakeStudentRepository } from "../../repositories/fakes/FakeStudentRepository";
import { CreateStudentService } from "../CreateStudentService";

let fakeStudentRepository: FakeStudentRepository;
let createStudentService: CreateStudentService;

describe("CreateStudent Service", () => {
  beforeEach(() => {
    fakeStudentRepository = new FakeStudentRepository();
    createStudentService = new CreateStudentService(fakeStudentRepository);
  });

  it("should be able to create a new student", async () => {
    const student = await createStudentService.execute({
      name: "John Doe",
      email: "john.doe@exemple.com",
    });

    expect(student).toHaveProperty("id");
    expect(student.name).toBe("John Doe");
  });

  it("should not be able to create a student with an email that is already in use", async () => {
    const student = {
      name: "Any name",
      email: "jane.doe@example.com",
    };
    await createStudentService.execute(student);

    await expect(createStudentService.execute(student)).rejects.toBeInstanceOf(
      Error
    );
  });
});
