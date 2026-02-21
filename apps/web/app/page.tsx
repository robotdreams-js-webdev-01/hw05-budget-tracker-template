'use client';
// 20. óra: fetch + React state integráció

// TODO (20. óra – React hooks): Importáld a useState-t és useEffect-et
// import { useState, useEffect } from 'react';

// TODO (20. óra – TypeScript interface): Tranzakció típus definíciója
// interface Transaction {
//   id: number;
//   amount: number;      // pozitív = bevétel, negatív = kiadás
//   category: string;
//   date: string;
//   note?: string;
// }

// TODO (20. óra – useState): Állapotok definiálása
// const [transactions, setTransactions] = useState<Transaction[]>([]);
// const [isLoading, setIsLoading]       = useState<boolean>(true);
// const [error, setError]               = useState<string | null>(null);

// TODO (20. óra – useEffect + fetch GET): Tranzakciók betöltése induláskor
// A NEXT_PUBLIC_API_URL env változót használd a base URL-hez:
// useEffect(() => {
//   fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`)
//     .then((res) => res.json())
//     .then((data) => setTransactions(data))
//     .catch(() => setError('Nem sikerült betölteni a tranzakciókat'))
//     .finally(() => setIsLoading(false));
// }, []);

// TODO (20. óra – balance): Egyenleg kiszámítása
// const balance = transactions.reduce((sum, t) => sum + t.amount, 0);

// TODO (20. óra – fetch POST): Új tranzakció hozzáadása
// async function handleAdd(e: React.FormEvent<HTMLFormElement>): Promise<void> {
//   e.preventDefault();
//   const formData = new FormData(e.currentTarget);
//   const body = {
//     amount: Number(formData.get('amount')),
//     category: formData.get('category') as string,
//     date: formData.get('date') as string,
//     note: formData.get('note') as string,
//   };
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//   });
//   if (res.ok) {
//     const newTx = await res.json();
//     setTransactions((prev) => [newTx, ...prev]);
//   }
// }

// TODO (20. óra – fetch DELETE): Tranzakció törlése id alapján
// async function handleDelete(id: number): Promise<void> {
//   await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${id}`, { method: 'DELETE' });
//   setTransactions((prev) => prev.filter((t) => t.id !== id));
// }

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Budget Tracker</h1>

      {/* TODO (20. óra – Balance box): Egyenleg megjelenítése */}
      {/* Tipp: pozitív balance → zöld, negatív → piros szín */}
      <div className="rounded-xl border p-6 mb-6 text-center">
        <p className="text-sm text-gray-500 mb-1">Egyenleg</p>
        <p className="text-3xl font-bold">0 Ft</p>
      </div>

      {/* TODO (20. óra – Form): Tranzakció hozzáadó form */}
      {/* Mezők: amount (number), category (text), date (date), note (text, opcionális) */}
      <form className="border rounded-xl p-6 mb-6 space-y-4">
        <h2 className="font-semibold">Új tranzakció</h2>
        {/* TODO: input mezők + submit gomb */}
      </form>

      {/* TODO (20. óra – Loading állapot): isLoading esetén spinner vagy szöveg */}
      {/* Példa: {isLoading && <p className="text-gray-400">Betöltés...</p>} */}

      {/* TODO (20. óra – Error állapot): error esetén hibaüzenet */}
      {/* Példa: {error && <p className="text-red-500">{error}</p>} */}

      {/* TODO (20. óra – Lista): Tranzakciók megjelenítése */}
      {/* Minden sorban: dátum, kategória, összeg, törlés gomb */}
      <ul className="space-y-2">
        {/* TODO: transactions.map((t) => ( ... )) */}
      </ul>
    </main>
  );
}
