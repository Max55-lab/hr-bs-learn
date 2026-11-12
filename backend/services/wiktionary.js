const https = require("https");

function fetchWiktionary(word) {
  return new Promise((resolve) => {
    const url =
      "https://hr.wiktionary.org/w/api.php?action=query&prop=extracts&explaintext=1&titles=" +
      encodeURIComponent(word) +
      "&format=json&origin=*";
    const req = https.get(url, { headers: { "User-Agent": "hr-bs-learn/1.0" } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          const pages = json?.query?.pages || {};
          const page = Object.values(pages)[0];
          if (!page || page.missing) return resolve(null);
          const extract = page.extract || "";
          // izvuci prvu definiciju (1.1) ...
          const m = extract.match(/definicija:\s*\n([\s\S]*?)(?:\n(?:sinonimi|antonimi|primjeri|srodne|sintagma|frazeologija|etimologija):)/i);
          if (!m) return resolve(null);
          const block = m[1];
          const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
          // preskoci liniju s vrstom rijeci (imenica, glagol, ...)
          let def = null;
          for (const ln of lines) {
            const mm = ln.match(/^\(\d+\.\d+\)\s*(.+)$/);
            if (mm && mm[1].trim()) {
              def = mm[1].trim();
              break;
            }
          }
          if (!def) {
            for (const ln of lines) {
              if (!/^(imenica|glagol|prilog|pridjev|čestica|veznik|uzvik|broj)/i.test(ln) && !/^\(\d+\.\d+\)$/.test(ln)) {
                def = ln;
                break;
              }
            }
          }
          // odbaci besmislene definicije
          if (!def || def === "(1.1)" || /^\(\d+\.\d+\)$/.test(def)) {
            return resolve(null);
          }
          // vrsta rijeci
          const posMatch = extract.match(/definicija:\s*\n\s*(imenica|glagol|prilog|pridjev|čestica|veznik|uzvik|broj)/i);
          const pos = posMatch ? posMatch[1].toLowerCase() : null;
          resolve({ word: page.title, translation: def, pos });
        } catch (e) {
          resolve(null);
        }
      });
    });
    req.on("error", () => resolve(null));
    req.setTimeout(15000, () => {
      req.destroy();
      resolve(null);
    });
  });
}

module.exports = { fetchWiktionary };