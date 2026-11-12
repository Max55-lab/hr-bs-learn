const { DatabaseSync } = require("node:sqlite");
const path = require("path");

const DB_PATH = process.env.DB_PATH ? path.resolve(process.env.DB_PATH) : path.join(__dirname, "words.db");
const db = new DatabaseSync(DB_PATH);
db.exec("PRAGMA journal_mode = WAL");

// migracija: dodaj nove stupce ako ne postoje (prije indeksa)
try { db.exec("ALTER TABLE words ADD COLUMN lexicon_category TEXT DEFAULT 'standard'"); } catch (e) {}
try { db.exec("ALTER TABLE words ADD COLUMN origin_language TEXT"); } catch (e) {}
try { db.exec("ALTER TABLE words ADD COLUMN etymology_story TEXT"); } catch (e) {}
try { db.exec("ALTER TABLE words ADD COLUMN primary_regions TEXT"); } catch (e) {}
try { db.exec("ALTER TABLE words ADD COLUMN lat REAL"); } catch (e) {}
try { db.exec("ALTER TABLE words ADD COLUMN lng REAL"); } catch (e) {}
try { db.exec("ALTER TABLE words ADD COLUMN modern_equivalent TEXT"); } catch (e) {}

db.exec(`
  CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT NOT NULL UNIQUE,
    translation TEXT NOT NULL,            -- JSON: {hr,en,de,es,...}
    pos TEXT,
    level TEXT DEFAULT 'A1',
    source TEXT DEFAULT 'seed',
    created_at TEXT DEFAULT (datetime('now')),
    lexicon_category TEXT DEFAULT 'standard',  -- standard, archaism, proverb, loanword
    origin_language TEXT,
    etymology_story TEXT,                  -- JSON: {hr,en,de,es,...}
    primary_regions TEXT,                  -- JSON: ["Bosna","Hercegovina"]
    lat REAL,
    lng REAL,
    modern_equivalent TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_words_word ON words(word);
  CREATE INDEX IF NOT EXISTS idx_words_level ON words(level);
  CREATE INDEX IF NOT EXISTS idx_words_cat ON words(lexicon_category);

  CREATE TABLE IF NOT EXISTS locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country TEXT,
    category TEXT,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    description TEXT,                     -- JSON: {hr,en,de,es,...}
    image_url TEXT,
    local_words TEXT,                     -- JSON: ["Pendžer","Avlija"]
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    level TEXT DEFAULT 'A1',
    description TEXT,
    word_ids TEXT NOT NULL
  );
`);

module.exports = db;