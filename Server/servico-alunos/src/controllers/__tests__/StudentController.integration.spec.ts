import { app } from "../../app";
import { prisma } from "../../lib/client";
import request from "supertest";

describe("Student Controller Integration", () => {
  afterEach(async () => {
    // Limpa a tabela de alunos para garantir que os testes sejam independentes
    await prisma.student.deleteMany();
  });

  afterAll(async () => {
    // Fecha a conexão com o banco de dados
    await prisma.$disconnect();
  });

  it("Should be able to create a new student", async () => {
    const response = await request(app).post("/students").send({
      name: "Test Student",
      email: "test.student@example.com",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Test Student");

    const savedStudent = await prisma.student.findUnique({
      where: { email: "test.student@example.com" },
    });

    expect(savedStudent).not.toBeNull();
    expect(savedStudent?.name).toBe("Test Student");
    expect(savedStudent?.id).toBe(response.body.id);
  });

  it("should return 400 when trying to create a student with a duplicated email", async () => {
    await prisma.student.create({
      data: {
        id: "some-uuid",
        name: "Existing Student",
        email: "duplicated@example.com",
        createdAt: new Date(),
      },
    });

    const response = await request(app).post("/students").send({
      name: "another student",
      email: "duplicated@example.com",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("This email is already in use");
  });

  it("Should find a new student when searching using id", async () => {
    const student = await prisma.student.create({
      data: {
        id: "test-student-id",
        name: "Test Student",
        email: "test.student@example.com",
        createdAt: new Date(),
      },
    });
    const response = await request(app).get("/students/test-student-id");

    expect(response).not.toBeNull();
    expect(response.body).toHaveProperty("id", "test-student-id");

  });
});
