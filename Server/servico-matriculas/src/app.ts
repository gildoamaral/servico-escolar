import express from 'express';
import { enrollmentRouter } from './routes/enrollment.routes';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: "Student server is running"})
})

app.use('/api/v1', enrollmentRouter);

export { app };