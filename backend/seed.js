const db = require("./db");
const A1 = require("./seed-data");

const insert = db.prepare(`
  INSERT OR IGNORE INTO words (word, translation, pos, level, source)
  VALUES (?, ?, ?, ?, 'seed')
`);

db.exec("BEGIN");
let added = 0;
for (const r of A1) {
  const info = insert.run(r.word, r.translation, r.pos || null, r.level || "A1");
  if (info.changes > 0) added++;
}
db.exec("COMMIT");

const total = db.prepare("SELECT COUNT(*) AS c FROM words").get().c;
console.log(`Seeder: ${A1.length} riječi u setu, ${added} novih dodano. Ukupno u bazi: ${total}`);