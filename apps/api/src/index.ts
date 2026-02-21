import express from 'express';
import cors from 'cors';
import 'dotenv/config';
// TODO (24. óra – Prisma): Importáld a PrismaClient-et és hozz létre egy példányt
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

// Health check – ez már kész, nem kell módosítani
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// TODO (20. óra – REST API POST): Új tranzakció létrehozása
// Hivatkozás: 20. óra – REST POST metódus + Prisma create
// app.post('/transactions', async (req, res) => {
//   try {
//     const { amount, category, date, note } = req.body;
//     if (amount === undefined || !category) {
//       return res.status(400).json({ error: 'amount és category kötelező' });
//     }
//     const transaction = await prisma.transaction.create({
//       data: { amount: Number(amount), category, date: date ? new Date(date) : undefined, note },
//     });
//     res.status(201).json(transaction);
//   } catch (error) {
//     res.status(500).json({ error: 'Szerverhiba' });
//   }
// });

// TODO (20. óra – REST API GET): Tranzakciók lekérése dátum szerint csökkenő sorrendben
// Hivatkozás: 20. óra – REST GET metódus + Prisma findMany + orderBy
// app.get('/transactions', async (_req, res) => {
//   try {
//     const transactions = await prisma.transaction.findMany({
//       orderBy: { date: 'desc' },
//     });
//     res.json(transactions);
//   } catch (error) {
//     res.status(500).json({ error: 'Szerverhiba' });
//   }
// });

// TODO (20. óra – REST API DELETE): Tranzakció törlése id alapján
// Hivatkozás: 20. óra – REST DELETE metódus + Prisma delete
// app.delete('/transactions/:id', async (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     await prisma.transaction.delete({ where: { id } });
//     res.status(204).send();
//   } catch (error) {
//     res.status(404).json({ error: 'Tranzakció nem található' });
//   }
// });

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`API fut: http://localhost:${PORT}`);
});
