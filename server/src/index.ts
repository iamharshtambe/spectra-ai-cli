import express from 'express';
import { drizzle } from 'drizzle-orm/neon-http';

const app = express();
const PORT = process.env.PORT || 5000;
const db = drizzle(process.env.DATABASE_URL!);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
