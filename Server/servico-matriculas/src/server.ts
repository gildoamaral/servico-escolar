import { app } from './app';
import "dotenv/config"

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('====================================');
  console.log(`Server is running on port ${PORT}`);
  console.log('====================================');
})