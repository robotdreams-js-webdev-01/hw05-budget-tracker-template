const fs = require('fs');
const path = require('path');

const hwId = 'hw05';
const hintLevel = process.env.HINT_LEVEL;

const hints = {
  '1': '💡 Nézd meg a 20. óra fetch+integráció diasorát! Ellenőrizd: a frontend a NEXT_PUBLIC_API_URL env változót használja-e a fetch hívásokban?',
  '2': "💡 Prisma: a clientet csak egyszer példányosítsd (singleton pattern). Docker: a service nevek hostname-ként működnek (pl. 'postgres:5432'). CORS middleware szükséges Express-ben, ha a frontend és az api különböző porton fut.",
  '3': "💡 Prisma migráció: 'npx prisma migrate dev --name init'. Docker healthcheck: a postgres service-hez add hozzá (pg_isready), és az api-ban 'depends_on: postgres: condition: service_healthy' biztosítja, hogy az API csak akkor induljon, ha a DB már kész.",
};

const hintText = hints[hintLevel];
if (!hintText) {
  console.error(`Ismeretlen hint szint: ${hintLevel}`);
  process.exit(1);
}

// Read hints-usage.json
let hintsData;
try {
  const raw = fs.readFileSync(path.join(process.cwd(), 'hints-usage.json'), 'utf8');
  hintsData = JSON.parse(raw);
} catch {
  hintsData = {};
}

// Increment usage counter
if (!hintsData[hwId]) {
  hintsData[hwId] = { usedHints: 0 };
}
hintsData[hwId].usedHints += 1;

// Append hint to GitHub Step Summary
const summary = `## 💡 Hint ${hintLevel} – 5. házi\n\n${hintText}\n\n> Felhasznált hintek száma: ${hintsData[hwId].usedHints}\n`;
fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);

// Write updated hints-usage.json
fs.writeFileSync(
  path.join(process.cwd(), 'hints-usage.json'),
  JSON.stringify(hintsData, null, 2)
);

console.log(`Hint ${hintLevel} megjelenítve. Összes felhasznált hint (${hwId}): ${hintsData[hwId].usedHints}`);
