// Very small service worker that caches app shell on install and serves from cache
const CACHE_NAME = 'the-vault-cache-v1';
const ASSETS_TO_CACHE = ['/', '/index.html', '/src/main.jsx', '/src/index.css'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
