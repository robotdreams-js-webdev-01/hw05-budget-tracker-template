'use client';
// 20. óra: fetch, useState, useEffect

// TODO [8p]: Tranzakció típus (id, amount, category, date, note?).
// TODO [8p]: State: transactions, isLoading, error.
// TODO [14p]: useEffect: betöltés induláskor (GET /transactions), base URL: process.env.NEXT_PUBLIC_API_URL.
// TODO [10p]: balance számítás (bevételek - kiadások).
// TODO [12p]: Új tranzakció: POST /transactions, majd lista frissítés.
// TODO [8p]: Törlés: DELETE /transactions/:id, majd lista frissítés.
// TODO [10p]: Form + lista + loading + hiba üzenet + alap UX.

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Budget Tracker</h1>
      <div className="rounded-xl border p-6 mb-6 text-center">
        <p className="text-sm text-gray-500 mb-1">Egyenleg</p>
        <p className="text-3xl font-bold">0 Ft</p>
      </div>
      <form className="border rounded-xl p-6 mb-6 space-y-4">
        <h2 className="font-semibold">Új tranzakció</h2>
        {/* TODO [10p]: amount, category, date, note mezők + submit */}
      </form>
      <ul className="space-y-2">
        {/* TODO [8p]: transactions listája, törlés gombbal */}
      </ul>
    </main>
  );
}
