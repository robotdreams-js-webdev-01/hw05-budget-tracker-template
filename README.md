# 5. házi – Full-Stack Budget Tracker

## Kontextus

**Kapcsolódó órák:** 20–25. óra – fetch integráció, REST API, Prisma ORM, PostgreSQL, Docker, CI/CD, deploy

---

## Tanulási célok

- REST API tervezés és implementáció (Express + TypeScript VAGY Next.js API Routes)
- Prisma ORM, PostgreSQL adatbázis, migrációk
- Docker Compose lokális fejlesztői környezethez
- Integrációs tesztek írása (Jest)
- Full-stack deploy: Vercel (frontend) + Railway VAGY Vercel Postgres (backend/DB)

---

## Részletes feladatleírás

### Backend – Express API (`apps/api/`)

Implementáld az alábbi három endpointot:

| Metódus | Végpont | Leírás |
|---|---|---|
| `POST` | `/transactions` | Új tranzakció létrehozása |
| `GET` | `/transactions` | Összes tranzakció (dátum szerint csökkenő) |
| `DELETE` | `/transactions/:id` | Tranzakció törlése |

Elvárt státuszkódok: `201` (create), `200` (list), `204` (delete), `404` (nem találta), `400` (hibás adat).

### Frontend – Next.js + React + Tailwind (`apps/web/`)

- **Tranzakció hozzáadó form**: összeg (`amount`), kategória (`category`), dátum (`date`), megjegyzés (`note`)
- **Tranzakciók listája** a legújabbtól
- **Balance (egyenleg) box**: `bevételek összege − kiadások összege`
  - Pozitív amount = bevétel, negatív amount = kiadás
- **Loading és hibaállapot kezelése** (`isLoading`, `error`)
- Opcionálisan: szűrés kategória vagy dátum szerint

### Adatbázis – PostgreSQL + Prisma

```prisma
model Transaction {
  id        Int      @id @default(autoincrement())
  amount    Float
  category  String
  date      DateTime @default(now())
  note      String?
  createdAt DateTime @default(now())
}
```

Migráció futtatása:

```bash
npx prisma migrate dev --name init
```

### Docker

Egyetlen paranccsal indul a teljes stack lokálisan:

```bash
docker compose up --build
```

Szolgáltatások: `postgres` (5432), `api` (3001), `web` (3000)

### Tesztek

Legalább **3 unit/integrációs teszt** CI-ben fusson. Példák:
- API endpoint helyes státuszkódot ad vissza
- Balance helyesen számolódik ki
- Tranzakció törlés valóban eltűnik a listából

### Deploy

| Rész | Platform |
|---|---|
| Frontend (`apps/web`) | Vercel |
| Backend (`apps/api`) | Railway |
| Adatbázis | Railway PostgreSQL VAGY Vercel Postgres |

Az **élő URL-eket** írd bele a README-be!

---

## Minimum elvárások

- A CRUD az deployed URL-en működik
- TypeScript fordítás hibamentes (`npx tsc --noEmit`)
- Az adatbázis kapcsolat él a deployed környezetben is

---

## Pontozás (100 pont)

| Kritérium | Pont |
|---|---|
| Backend CRUD (helyes endpointok, státuszkódok, hibakezelés) | 20p |
| Frontend UI (form, lista, balance, loading/error állapotok) | 20p |
| DB integráció (Prisma, migráció, relációk, seed opcionális) | 20p |
| Tesztek (min. 3, CI-ben futnak, értelmesek) | 20p |
| DevOps (Docker, deploy, README setup guide, `.env.example`) | 20p |

---

## Lokális futtatás

### Előfeltételek

- Docker Desktop telepítve és fut
- A `.env.example` fájlt másold le `.env` névvel és töltsd ki

```bash
cp .env.example .env
```

### Indítás Docker-rel (ajánlott)

```bash
docker compose up --build
```

- Frontend: `http://localhost:3000`
- API: `http://localhost:3001`
- API health check: `http://localhost:3001/health`

### Indítás lokálisan (Docker nélkül)

```bash
# Terminál 1 – API
cd apps/api && npm install && npm run dev

# Terminál 2 – Frontend
cd apps/web && npm install && npm run dev
```

### Prisma migráció

```bash
cd apps/api
npx prisma migrate dev --name init
```

---

## Tippek

> 💡 Nézd vissza a **20. óra** fetch+integráció, **24. óra** Prisma+CI,
> és **25. óra** deploy diasorait!
