import { openDb } from "./index";

async function initializeDatabase() {
  const db = await openDb();

  // Usamos db.exec() para rodar comandos SQL que não retornam dados
  await db.exec(`
    CREATE TABLE IF NOT EXISTS enrollments (
      id          TEXT PRIMARY KEY,
      student_id  TEXT NOT NULL,
      course_name TEXT NOT NULL,
      created_at  TEXT NOT NULL
    );
  `);

  console.log("✅ Database and table [enrollments] initialized.");

  await db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
      id          TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      description TEXT
    );
  `);

  const course = await db.get(
    "SELECT * FROM courses WHERE id = ?",
    "course-uuid-01"
  );
  if (!course) {
    await db.run(
      "INSERT INTO courses (id, title, description) VALUES (?, ?, ?)",
      "course-uuid-01",
      "TypeScript advanced course",
      "A course focused on project patterns."
    );
    console.log("📘 Example course inserted.");
  }

  console.log(
    "✅ Database and tables [enrollments] and [courses] initialized."
  );
}

initializeDatabase().catch((err) => {
  console.error("Error initializing database:", err);
});
