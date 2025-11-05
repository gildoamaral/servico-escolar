import { Student } from "../../models/Student";
import { FakeStudentRepository } from "../../repositories/fakes/FakeStudentRepository";
import { FindStudentByIdService } from "../FindStudentByIdService";

let fakeStudentRepository: FakeStudentRepository;
let findStudentByIdService: FindStudentByIdService;

describe("FindStudentById Service", () => {
  beforeEach(() => {
    fakeStudentRepository = new FakeStudentRepository();
    findStudentByIdService = new FindStudentByIdService(fakeStudentRepository);
  });

  test("Should find a student by ID", async () => {
    const student = await findStudentByIdService.execute("uuid-example-01");

    expect(student).not.toBeNull();
    expect(student.name).toBe("name1");
    expect(student).toBeInstanceOf(Student);
  });

  it("Should throw an error if student not found", async () => {
    await expect(
      findStudentByIdService.execute("uuid-not-existent")
    ).rejects.toThrow("Student not found");
  });
});
