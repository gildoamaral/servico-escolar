import express from 'express';
import { studentRouter } from './routes/student.routes';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API de Alunos está funcionando' });
});

app.use(studentRouter);

export { app };