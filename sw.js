// Automatisch erzeugt von scripts/pwa.mjs. Hält alle Dateien der App für den Offline-Betrieb vor.
const CACHE = 'mitarbeitsnoten-250657d0929f';
const DATEIEN = [
  "./",
  "./_expo/static/js/web/index-63c0684e918938eab4b65c716a89f159.js",
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
