// This will be replaced with the manifest when building
const manifest = self.__WB_MANIFEST;

// This will be replaced with the precache manifest by Vite PWA
self.__WB_DISABLE_DEV_LOGS = true;

// Use the manifest to precache all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('vortex-cache-v1')
      .then((cache) => {
        // Add all URLs from the manifest to the cache
        const urlsToCache = manifest.map(entry => entry.url);
        return cache.addAll(urlsToCache);
      })
  );
  // Activate the new service worker immediately
  self.skipWaiting();
});

// Serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== 'vortex-cache-v1')
          .map((name) => caches.delete(name))
      );
    })
  );
});
