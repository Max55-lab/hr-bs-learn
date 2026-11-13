const CACHE = "hrbs-v2";
const ASSETS = ["/index.html", "/icon.svg", "/manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;
  if (url.pathname === "/robots.txt" || url.pathname === "/sitemap.xml") return;

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const c = res.clone();
            caches.open(CACHE).then((cc) => cc.put("/index.html", c));
          }
          return res;
        })
        .catch(() => caches.match("/index.html"))
    );
    return;
  }

  e.respondWith(caches.match(req).then((cached) => {
    const fp = fetch(req).then((res) => {
      if (res && res.status === 200) { const c = res.clone(); caches.open(CACHE).then((cc) => cc.put(req, c)); }
      return res;
    }).catch(() => cached);
    return cached || fp;
  }));
});
