import express from 'express';
import cors from 'cors';
import 'dotenv/config';
// TODO [10p] (24. óra): PrismaClient import + példányosítás.

const app = express();
app.use(cors());
app.use(express.json());

// Health check – ez már kész, nem kell módosítani
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// TODO [8p] (20. óra): POST /transactions endpoint (validáció + 201 válasz).

// TODO [8p] (20. óra): GET /transactions endpoint (dátum szerint csökkenő sorrend).

// TODO [8p] (20. óra): DELETE /transactions/:id endpoint (204 vagy 404).
// TODO [6p] (20–24. óra): Egységes hibakezelés és státuszkódok (400/404/500).

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`API fut: http://localhost:${PORT}`);
});
