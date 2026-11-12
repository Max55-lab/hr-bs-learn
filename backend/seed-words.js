const db = require("./db");

const words = [
  {
    word: "Pendžer",
    lexicon_category: "loanword",
    origin_language: "turski (perzijsko porijeklo)",
    modern_equivalent: "Prozor",
    primary_regions: ["Bosna", "Hercegovina", "Slavonija"],
    lat: 43.8563, lng: 18.4131,
    translation: { hr: "Prozor", en: "Window", de: "Fenster", es: "Ventana" },
    etymology_story: {
      hr: "Riječ dolazi od turskog 'pencere' (izvorno perzijski 'panjara'). Ušla je u jezik tijekom osmanske uprave od 15. stoljeća kroz gradnju kuća i sevdalinke.",
      en: "Derived from the Turkish 'pencere' (originally Persian 'panjara'). It entered the language during Ottoman rule from the 15th century.",
      de: "Abgeleitet vom türkischen 'pencere' (ursprünglich persisch 'panjara').",
      es: "Derivado del turco 'pencere' (originalmente persa 'panjara')."
    }
  },
  {
    word: "Šugaman",
    lexicon_category: "loanword",
    origin_language: "talijanski (mletački)",
    modern_equivalent: "Ručnik / Peškir",
    primary_regions: ["Dalmacija", "Istra", "Kvarner"],
    lat: 43.5081, lng: 16.4402,
    translation: { hr: "Ručnik za brisanje", en: "Towel", de: "Handtuch", es: "Toalla" },
    etymology_story: {
      hr: "Potječe od mletačkog 'sugaman' (tal. asciugamano). U jadranski govor ušla je kroz stoljetnu vladavinu Mletačke Republike.",
      en: "Originates from Venetian 'sugaman' (Italian 'asciugamano'). Entered coastal speech during Venetian Republic rule.",
      de: "Stammt aus dem Venezianischen 'sugaman'.",
      es: "Proviene del veneciano 'sugaman'."
    }
  },
  {
    word: "Cug",
    lexicon_category: "loanword",
    origin_language: "njemački",
    modern_equivalent: "Vlak / Voz",
    primary_regions: ["Zagorje", "Zagreb", "Slavonija"],
    lat: 45.8150, lng: 15.9819,
    translation: { hr: "Vlak; također gutljaj pića", en: "Train; also a sip", de: "Zug", es: "Tren" },
    etymology_story: {
      hr: "Izravna posuđenica od njemačke riječi 'Zug'. Postala je dio svakodnevnog govora sjeverne Hrvatske u 19. stoljeću izgradnjom željezničke mreže.",
      en: "Direct loanword from German 'Zug'. Entered everyday speech in northern Croatia in the 19th century with railway expansion.",
      de: "Direkte Entlehnung aus dem Deutschen 'Zug'.",
      es: "Préstamo directo del alemán 'Zug'."
    }
  },
  {
    word: "Varoš",
    lexicon_category: "loanword",
    origin_language: "mađarski",
    modern_equivalent: "Grad / Predgrađe",
    primary_regions: ["Slavonija", "Baranja", "Bosna", "Dalmacija"],
    lat: 45.5550, lng: 18.6955,
    translation: { hr: "Grad ili stari dio grada", en: "Town or old town district", de: "Stadt / Altstadt", es: "Pueblo / Barrio antiguo" },
    etymology_story: {
      hr: "Dolazi od mađarske riječi 'város'. Ušla je u hrvatski i bosanski jezik kroz stoljetne veze s Ugarskom.",
      en: "Comes from Hungarian 'város'. Entered through centuries of Hungarian influence.",
      de: "Stammt aus dem Ungarischen 'város'.",
      es: "Proviene del húngaro 'város'."
    }
  },
  {
    word: "Fjaka",
    lexicon_category: "loanword",
    origin_language: "talijanski",
    modern_equivalent: "Slatka pospanost",
    primary_regions: ["Dalmacija", "Hercegovina (južna)"],
    lat: 44.1194, lng: 15.2314,
    translation: { hr: "Psihofizičko stanje opuštenosti", en: "Sweetness of doing nothing", de: "Süße Trägheit", es: "Dulce pereza" },
    etymology_story: {
      hr: "Od talijanske riječi 'fiacca'. Na jadranskoj obali razvila se u poseban kulturološki pojam.",
      en: "From Italian 'fiacca'. Evolved into a unique cultural concept along the Adriatic.",
      de: "Aus dem Italienischen 'fiacca'.",
      es: "Del italiano 'fiacca'."
    }
  },
  {
    word: "Avlija",
    lexicon_category: "loanword",
    origin_language: "turski (grčko porijeklo)",
    modern_equivalent: "Dvorište",
    primary_regions: ["Bosna", "Hercegovina", "Slavonija"],
    lat: 43.3438, lng: 17.8078,
    translation: { hr: "Ograđeno kućno dvorište", en: "Enclosed courtyard", de: "Innenhof", es: "Patio" },
    etymology_story: {
      hr: "Ušla preko turskog 'avlu', izvorno starogrčki 'aulḗ'. Označava tradicionalno ograđeno dvorište bosanskohercegovačke arhitekture.",
      en: "Entered via Turkish 'avlu', originally Ancient Greek 'aulḗ'. Traditional walled courtyard of BiH architecture.",
      de: "Über das Türkische 'avlu', ursprünglich Altgriechisch 'aulḗ'.",
      es: "Entró vía turco 'avlu', originalmente griego antiguo 'aulḗ'."
    }
  },
  {
    word: "Šrafciger",
    lexicon_category: "loanword",
    origin_language: "njemački",
    modern_equivalent: "Odvijač",
    primary_regions: ["Zagreb", "Zagorje", "Slavonija", "Bosna"],
    lat: 46.3057, lng: 16.3366,
    translation: { hr: "Odvijač", en: "Screwdriver", de: "Schraubenzieher", es: "Destornillador" },
    etymology_story: {
      hr: "Prilagodba njemačke 'Schraubenzieher'. Ušla u govor preko majstora u doba Austro-Ugarske.",
      en: "Adapted from German 'Schraubenzieher'. Entered via craftsmen during Austro-Hungarian period.",
      de: "Anpassung des deutschen 'Schraubenzieher'.",
      es: "Adaptación del alemán 'Schraubenzieher'."
    }
  },
  {
    word: "Luč",
    lexicon_category: "archaism",
    origin_language: "slavenski",
    modern_equivalent: "Svjetlost / Baklja",
    primary_regions: ["Dalmacija", "Hercegovina", "Lika", "Zagorje"],
    lat: 44.5469, lng: 15.3747,
    translation: { hr: "Svjetlost ili drvena baklja", en: "Light / torch", de: "Licht / Kienspan", es: "Luz / Antorcha" },
    etymology_story: {
      hr: "Praslavenska riječ (*lučь). Danas zastarjelica očuvana u poeziji i korijenu 'lučonoša'.",
      en: "Proto-Slavic word (*lučь). Today an archaism preserved in poetry.",
      de: "Urslawisches Wort (*lučь).",
      es: "Palabra protoeslava (*lučь)."
    }
  },
  {
    word: "Tko rano rani, dvije sreće grabi",
    lexicon_category: "proverb",
    origin_language: "slavenski (narodna baština)",
    modern_equivalent: "Uspjeh dolazi vrijednima",
    primary_regions: ["Hrvatska", "Bosna i Hercegovina"],
    lat: 45.1000, lng: 16.5000,
    translation: { hr: "Onaj tko ustane rano postiže dvostruki uspjeh", en: "The early bird catches the worm", de: "Morgenstund hat Gold im Mund", es: "A quien madruga, Dios le ayuda" },
    etymology_story: {
      hr: "Stara narodna poslovica iz tradicijskog poljoprivrednog društva.",
      en: "Old folk proverb from traditional agrarian society.",
      de: "Altes Sprichwort aus der Agrargesellschaft.",
      es: "Viejo proverbio del mundo agrario."
    }
  },
  {
    word: "Ispeci pa reci",
    lexicon_category: "proverb",
    origin_language: "slavenski (narodna baština)",
    modern_equivalent: "Dobro razmisli prije govora",
    primary_regions: ["Bosna", "Hercegovina", "Dalmacija", "Slavonija"],
    lat: 44.2034, lng: 17.9077,
    translation: { hr: "Dobro promisli prije nego što nešto kažeš", en: "Think before you speak", de: "Erst denken, dann sprechen", es: "Piensa antes de hablar" },
    etymology_story: {
      hr: "Metafora iz starinskog ognjišta: kruh mora biti pečen prije nego što se iznese.",
      en: "Metaphor from the traditional hearth: bread must be baked before serving.",
      de: "Metapher vom traditionellen Herd.",
      es: "Metáfora del hogar tradicional."
    }
  }
];

const locations = [
  {
    name: "Stari most (Mostar)",
    country: "BiH",
    category: "povijesna",
    lat: 43.3377, lng: 17.8150,
    description: {
      hr: "Simbol Mostara i BiH, sagrađen u 16. stoljeću. Uništen u ratu 1993., obnovljen 2004.",
      en: "Symbol of Mostar and BiH, built in the 16th century. Destroyed in 1993, rebuilt in 2004.",
      de: "Symbol von Mostar und BiH, im 16. Jahrhundert erbaut.",
      es: "Símbolo de Mostar y BiH, construido en el siglo XVI."
    },
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Stari_Most_Mostar.jpg/800px-Stari_Most_Mostar.jpg",
    local_words: ["Avlija", "Pendžer", "Fjaka"]
  },
  {
    name: "Baščaršija (Sarajevo)",
    country: "BiH",
    category: "povijesna",
    lat: 43.8593, lng: 18.4308,
    description: {
      hr: "Stara čaršija iz osmanskog perioda, srce Sarajeva.",
      en: "Old bazaar from the Ottoman period, heart of Sarajevo.",
      de: "Alter Basar aus der osmanischen Zeit.",
      es: "Antiguo bazar del período otomano."
    },
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Bascarsija_Sarajevo.jpg/800px-Bascarsija_Sarajevo.jpg",
    local_words: ["Pendžer", "Avlija", "Čaršija"]
  },
  {
    name: "Dioklecijanova palača (Split)",
    country: "HR",
    category: "povijesna",
    lat: 43.5081, lng: 16.4402,
    description: {
      hr: "Rimska palača iz 4. stoljeća, UNESCO baština, srce Splita.",
      en: "Roman palace from the 4th century, UNESCO heritage, heart of Split.",
      de: "Römischer Palast aus dem 4. Jahrhundert.",
      es: "Palacio romano del siglo IV."
    },
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Diocletian%27s_Palace_Split.jpg/800px-Diocletian%27s_Palace_Split.jpg",
    local_words: ["Šugaman", "Fjaka", "Marenda"]
  },
  {
    name: "Dubrovnik (Stari grad)",
    country: "HR",
    category: "turistička",
    lat: 42.6507, lng: 18.0944,
    description: {
      hr: "Biser Jadrana, UNESCO baština, grad-zid.",
      en: "Pearl of the Adriatic, UNESCO heritage, walled city.",
      de: "Perle der Adria, UNESCO-Welterbe.",
      es: "Perla del Adriático, patrimonio UNESCO."
    },
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Dubrovnik_Old_Town.jpg/800px-Dubrovnik_Old_Town.jpg",
    local_words: ["Šugaman", "Rozata", "Luč"]
  },
  {
    name: "Zagreb (Gornji grad)",
    country: "HR",
    category: "povijesna",
    lat: 45.8150, lng: 15.9819,
    description: {
      hr: "Povijesno središte Zagreba, katedrala, kamenita vrata.",
      en: "Historic center of Zagreb, cathedral, Stone Gate.",
      de: "Historisches Zentrum von Zagreb.",
      es: "Centro histórico de Zagreb."
    },
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Zagreb_Cathedral.jpg/800px-Zagreb_Cathedral.jpg",
    local_words: ["Cug", "Šrafciger", "Varoš"]
  }
];

const insertWord = db.prepare(`
  INSERT OR REPLACE INTO words (word, translation, pos, level, source, lexicon_category, origin_language, etymology_story, primary_regions, lat, lng, modern_equivalent)
  VALUES (?, ?, 'noun', 'A1', 'seed', ?, ?, ?, ?, ?, ?, ?)
`);

const insertLoc = db.prepare(`
  INSERT OR REPLACE INTO locations (name, country, category, lat, lng, description, image_url, local_words)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

db.exec("BEGIN");
let wn = 0, ln = 0;
for (const w of words) {
  insertWord.run(
    w.word,
    JSON.stringify(w.translation),
    w.lexicon_category,
    w.origin_language,
    JSON.stringify(w.etymology_story),
    JSON.stringify(w.primary_regions),
    w.lat, w.lng,
    w.modern_equivalent
  );
  wn++;
}
for (const l of locations) {
  insertLoc.run(
    l.name, l.country, l.category, l.lat, l.lng,
    JSON.stringify(l.description), l.image_url,
    JSON.stringify(l.local_words)
  );
  ln++;
}
db.exec("COMMIT");
console.log(`Seeded ${wn} riječi i ${ln} lokacija.`);