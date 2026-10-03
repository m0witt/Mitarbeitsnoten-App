// Automatisch erzeugt von scripts/pwa.mjs. Hält alle Dateien der App für den Offline-Betrieb vor.
const CACHE = 'mitarbeitsnoten-d31038fd0f70';
const DATEIEN = [
  "./",
  "./_expo/static/js/web/index-4ec9a6eaf6fd3564cc99610e6a2982cc.js",
  "./apple-touch-icon.png",
  "./favicon.ico",
  "./icon-192.png",
  "./icon-512.png",
  "./index.html",
  "./manifest.webmanifest",
  "./sw-registrierung.js"
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((namen) => Promise.all(namen.filter((n) => n !== CACHE).map((n) => caches.delete(n)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(
      (treffer) => treffer || fetch(e.request).catch(() => (e.request.mode === 'navigate' ? caches.match('./') : Response.error())),
    ),
  );
});
