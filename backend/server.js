const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");
const { fetchWiktionary } = require("./services/wiktionary");

const app = express();
app.use(cors());
app.use(express.json());

// GET /api/words?q=...&level=A1&limit=50
app.get("/api/words", (req, res) => {
  const q = (req.query.q || "").trim();
  const level = (req.query.level || "").trim();
  const limit = Math.min(parseInt(req.query.limit, 10) || 100, 500);
  let sql = "SELECT * FROM words";
  const params = [];
  const where = [];
  if (q) {
    where.push("LOWER(word) LIKE ?");
    params.push("%" + q.toLowerCase() + "%");
  }
  if (level) {
    where.push("level = ?");
    params.push(level);
  }
  if (where.length) sql += " WHERE " + where.join(" AND ");
  sql += " ORDER BY word LIMIT ?";
  params.push(limit);
  const rows = db.prepare(sql).all(...params);
  res.json({ count: rows.length, words: rows });
});

// GET /api/words/:word  (DB first, then Wiktionary fallback + cache)
app.get("/api/words/:word", async (req, res) => {
  const word = req.params.word.trim();
  if (!word) return res.status(400).json({ error: "word required" });

  const row = db.prepare("SELECT * FROM words WHERE LOWER(word) = LOWER(?)").get(word);
  if (row) {
    return res.json({ source: "db", word: row });
  }

  // fallback: Wiktionary
  const wikt = await fetchWiktionary(word);
  if (!wikt || !wikt.translation) {
    return res.status(404).json({ error: "not found", source: "none" });
  }

  // cache in DB
  try {
    db.prepare(
      "INSERT OR IGNORE INTO words (word, translation, pos, level, source) VALUES (?, ?, ?, 'A1', 'wiktionary')"
    ).run(wikt.word, wikt.translation, wikt.pos);
  } catch (e) {
    // ignore duplicate
  }
  const cached = db.prepare("SELECT * FROM words WHERE LOWER(word) = LOWER(?)").get(wikt.word);
  res.json({ source: "wiktionary", word: cached || wikt });
});

// POST /api/words  { word, translation, pos, level }
app.post("/api/words", (req, res) => {
  const { word, translation, pos, level } = req.body || {};
  if (!word || !translation) {
    return res.status(400).json({ error: "word and translation required" });
  }
  try {
    const info = db
      .prepare("INSERT INTO words (word, translation, pos, level, source) VALUES (?, ?, ?, ?, 'user')")
      .run(word, translation, pos || null, level || "A1");
    const row = db.prepare("SELECT * FROM words WHERE id = ?").get(info.lastInsertRowid);
    res.status(201).json({ word: row });
  } catch (e) {
    if (String(e).includes("UNIQUE")) {
      return res.status(409).json({ error: "word already exists" });
    }
    res.status(500).json({ error: String(e) });
  }
});

// DELETE /api/words/:id
app.delete("/api/words/:id", (req, res) => {
  const info = db.prepare("DELETE FROM words WHERE id = ?").run(req.params.id);
  res.json({ deleted: info.changes });
});

// GET /api/lessons
app.get("/api/lessons", (req, res) => {
  const rows = db.prepare("SELECT id, title, level, description, word_ids FROM lessons ORDER BY id").all();
  const out = rows.map((r) => ({
    id: r.id,
    title: r.title,
    level: r.level,
    description: r.description,
    count: JSON.parse(r.word_ids || "[]").length,
  }));
  res.json({ lessons: out });
});

// GET /api/lessons/:id  (with words)
app.get("/api/lessons/:id", (req, res) => {
  const row = db.prepare("SELECT * FROM lessons WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "lesson not found" });
  const ids = JSON.parse(row.word_ids || "[]");
  const placeholders = ids.map(() => "?").join(",");
  const words = ids.length
    ? db.prepare(`SELECT * FROM words WHERE id IN (${placeholders})`).all(...ids)
    : [];
  // preserve lesson order
  const byId = Object.fromEntries(words.map((w) => [w.id, w]));
  const ordered = ids.map((id) => byId[id]).filter(Boolean);
  res.json({ lesson: { id: row.id, title: row.title, level: row.level, description: row.description }, words: ordered });
});
// stats
app.get("/api/stats", (req, res) => {
  const total = db.prepare("SELECT COUNT(*) AS c FROM words").get().c;
  const withDef = db.prepare("SELECT COUNT(*) AS c FROM words WHERE translation IS NOT NULL AND translation != ''").get().c;
  const withoutDef = total - withDef;
  const byLevel = db.prepare("SELECT level, COUNT(*) AS c FROM words GROUP BY level").all();
  const bySource = db.prepare("SELECT source, COUNT(*) AS c FROM words GROUP BY source").all();
  const byCat = db.prepare("SELECT lexicon_category, COUNT(*) AS c FROM words GROUP BY lexicon_category").all();
  res.json({ total, withDefinition: withDef, withoutDefinition: withoutDef, byLevel, bySource, byCategory: byCat });
});

// locations
app.get("/api/locations", (req, res) => {
  const country = (req.query.country || "").trim();
  const category = (req.query.category || "").trim();
  let sql = "SELECT * FROM locations";
  const where = [];
  const params = [];
  if (country) { where.push("country = ?"); params.push(country); }
  if (category) { where.push("category = ?"); params.push(category); }
  if (where.length) sql += " WHERE " + where.join(" AND ");
  sql += " ORDER BY name";
  const rows = db.prepare(sql).all(...params);
  res.json({ locations: rows.map((r) => ({ ...r, description: tryParse(r.description), local_words: tryParse(r.local_words) })) });
});

function tryParse(s) { try { return s ? JSON.parse(s) : null; } catch { return s; } }

// posluži frontend (jedan link za sve)
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));
app.use((req, res) => {
  if (req.path.startsWith("/api")) return res.status(404).json({ error: "not found" });
  res.sendFile(path.join(frontendPath, "index.html"));
});

// health check
app.get("/api/health", (req, res) => res.json({ ok: true, service: "hr-bs-learn" }));
app.listen(PORT, () => {
  console.log(`hr-bs-learn backend running on http://localhost:${PORT}`);
});