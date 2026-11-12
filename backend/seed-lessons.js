const db = require("./db");

const lessons = [
  {
    title: "Lekcija 1: Pozdravi i osnove",
    level: "A1",
    description: "Osnovni pozdravi, zamjenice i brojevi 1–5.",
    words: ["zdravo", "bok", "da", "ne", "ja", "ti", "on", "ona", "jedan", "dva", "tri", "četiri", "pet", "hvala", "molim"],
  },
  {
    title: "Lekcija 2: Obitelj i boje",
    level: "A1",
    description: "Članovi obitelji i osnovne boje.",
    words: ["majka", "otac", "sestra", "brat", "baka", "djed", "crven", "plav", "zelen", "žut", "bijel", "crn"],
  },
  {
    title: "Lekcija 3: Hrana i piće",
    level: "A1",
    description: "Osnovna hrana i piće.",
    words: ["voda", "kruh", "mlijeko", "meso", "riba", "jaje", "sir", "kava", "čaj", "sok", "jabuka", "banana"],
  },
  {
    title: "Lekcija 4: Kuća i predmeti",
    level: "A1",
    description: "Prostorije i svakodnevni predmeti.",
    words: ["kuća", "stan", "soba", "krevet", "stol", "stolica", "vrata", "prozor", "telefon", "knjiga", "olovka", "novac"],
  },
  {
    title: "Lekcija 5: Glagoli i kretanje",
    level: "A1",
    description: "Osnovni glagoli i smjerovi.",
    words: ["biti", "imati", "ići", "doći", "jesti", "piti", "spavati", "govoriti", "lijevo", "desno", "ravno", "ovdje"],
  },
  {
    title: "Lekcija 6: Vrijeme i dani",
    level: "A1",
    description: "Dani u tjednu, mjeseci i vrijeme.",
    words: ["dan", "noć", "jutro", "večer", "danas", "sutra", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota"],
  },
  {
    title: "Lekcija 7: Mjesta u gradu",
    level: "A1",
    description: "Zgrade i mjesta u gradu.",
    words: ["grad", "ulica", "škola", "bolnica", "trgovina", "restoran", "banka", "pošta", "kolodvor", "hotel", "crkva", "muzej"],
  },
  {
    title: "Lekcija 8: Pridjevi i opisi",
    level: "A1",
    description: "Osnovni pridjevi za opisivanje.",
    words: ["velik", "malen", "dobar", "loš", "nov", "star", "mlad", "lijep", "visok", "nizak", "topao", "hladan"],
  },
  {
    title: "Lekcija 9: Opisi i osjećaji (A2)",
    level: "A2",
    description: "Pridjevi za opisivanje osjećaja i osobina.",
    words: ["odličan", "strašan", "zanimljiv", "smiješan", "ozbiljan", "sretan", "tužan", "umoran", "zdrav", "siguran"],
  },
  {
    title: "Lekcija 10: Vrijeme i mjesta (A2)",
    level: "A2",
    description: "Vrijeme, smjerovi i mjesta u gradu.",
    words: ["brzo", "polako", "uvijek", "nikada", "ponekad", "često", "rijetko", "ovdje", "tamo", "blizu", "daleko", "kamo"],
  },
  {
    title: "Lekcija 11: Složeni pojmovi (B1)",
    level: "B1",
    description: "Složeni pridjevi i apstraktni pojmovi.",
    words: ["uspiješan", "odgovoran", "pouzdan", "dostupan", "prikladan", "učinkovit", "održiv", "raznolik", "složen", "jednostavan", "očigledan", "točan"],
  },
  {
    title: "Lekcija 12: Svijet oko nas (B1)",
    level: "B1",
    description: "Priroda, vrijeme i okoliš.",
    words: ["okoliš", "klima", "zagađenje", "održivost", "energija", "obnovljiv", "temperatura", "kiša", "snijeg", "vjetar", "planina", "rijeka"],
  },
  {
    title: "Lekcija 13: Osjećaji i osobine (A2)",
    level: "A2",
    description: "Pridjevi za opisivanje osjećaja.",
    words: ["odličan", "strašan", "zanimljiv", "smiješan", "ozbiljan", "sretan", "tužan", "umoran", "zdrav", "siguran", "ljubav", "strah"],
  },
  {
    title: "Lekcija 14: Mjesta u gradu (A2)",
    level: "A2",
    description: "Zgrade i mjesta u gradu.",
    words: ["grad", "ulica", "škola", "bolnica", "trgovina", "restoran", "banka", "pošta", "kolodvor", "hotel", "muzej", "kino"],
  },
  {
    title: "Lekcija 15: Složeni pojmovi (B1)",
    level: "B1",
    description: "Složeni pridjevi i apstraktni pojmovi.",
    words: ["uspiješan", "odgovoran", "pouzdan", "dostupan", "prikladan", "učinkovit", "održiv", "raznolik", "složen", "jednostavan", "očigledan", "točan"],
  },
  {
    title: "Lekcija 16: Priroda i okoliš (B1)",
    level: "B1",
    description: "Priroda, vrijeme i okoliš.",
    words: ["okoliš", "klima", "zagađenje", "održivost", "energija", "obnovljiv", "temperatura", "kiša", "snijeg", "vjetar", "planina", "more"],
  },
  {
    title: "Lekcija 17: Putovanje i promet (A2)",
    level: "A2",
    description: "Putovanje, promet i smjerovi.",
    words: ["putnik", "vozač", "autobus", "vlak", "taksi", "bicikl", "auto", "avion", "brod", "lijevo", "desno", "ravno"],
  },
  {
    title: "Lekcija 18: Hrana i kuhanje (A2)",
    level: "A2",
    description: "Hrana, kuhanje i obroci.",
    words: ["kuhar", "konobar", "restoran", "kafić", "kruh", "meso", "riba", "piletina", "krumpir", "rajčica", "luk", "sir"],
  },
  {
    title: "Lekcija 19: Rad i profesije (B1)",
    level: "B1",
    description: "Profesije i radno mjesto.",
    words: ["liječnik", "učitelj", "student", "policajac", "vatrogasac", "vojnik", "trener", "sudac", "igrač", "branitelj", "napadač", "golman"],
  },
  {
    title: "Lekcija 20: Sport i natjecanje (B1)",
    level: "B1",
    description: "Sport i natjecanja.",
    words: ["natjecanje", "turnir", "prvenstvo", "medalja", "trofej", "pobjeda", "poraz", "rezultat", "bod", "gol", "utakmica", "trening"],
  },
];

const insert = db.prepare("INSERT OR REPLACE INTO lessons (id, title, level, description, word_ids) VALUES (?, ?, ?, ?, ?)");

db.exec("BEGIN");
for (let i = 0; i < lessons.length; i++) {
  const l = lessons[i];
  const ids = l.words
    .map((w) => {
      const row = db.prepare("SELECT id FROM words WHERE word = ?").get(w);
      return row ? row.id : null;
    })
    .filter(Boolean);
  insert.run(i + 1, l.title, l.level, l.description, JSON.stringify(ids));
  console.log(`${l.title}: ${ids.length}/${l.words.length} riječi pronađeno`);
}
db.exec("COMMIT");
console.log("Lekcije spremljene:", lessons.length);