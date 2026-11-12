# HR/BS Učenje — rječnik i lekcije

Hibridna web aplikacija za učenje hrvatskog i bosanskog jezika (poput Duolinga), na localhostu.

## Arhitektura

```
hr-bs-learn/
├── backend/          # Node.js + Express + SQLite (node:sqlite)
│   ├── server.js     # API servis
│   ├── db.js         # SQLite baza (words.db)
│   ├── seed.js       # seeder
│   ├── seed-data.js  # ~360 A1 riječi
│   └── services/
│       └── wiktionary.js  # fallback na hr.wiktionary.org
└── frontend/
    └── index.html    # vanilla JS frontend
```

## Pokretanje

```powershell
cd hr-bs-learn\backend
npm install
npm run seed     # ubaci ~360 A1 riječi
npm start        # backend na http://localhost:3001
```

Zatim otvori `hr-bs-learn\frontend\index.html` u pregledniku (dupli klik). Frontend poziva API na `localhost:3001`.

## API

- `GET /api/words?q=&level=&limit=` — pretraga/lista
- `GET /api/words/:word` — detalj; ako nema u bazi, fallback na Wiktionary (hr) + cache
- `POST /api/words` — dodaj riječ `{ word, translation, pos, level }`
- `DELETE /api/words/:id` — obriši
- `GET /api/stats` — statistika

## Audio izgovor

Frontend koristi `window.speechSynthesis` s `hr-HR` / `bs-BA` glasovima. Klikni 🔊 uz riječ.

## Baza

SQLite (`words.db`), tablica `words`: `id, word, translation, pos, level, source, created_at`.
Nema potrebe za MySQL serverom — SQLite je dovoljan za localhost i hibridni fallback.