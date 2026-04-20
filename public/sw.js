const CACHE = 'v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const requestUrl = new URL(event.request.url);

  // Cache only same-origin requests. External content such as YouTube is not cached.
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.open(CACHE).then((cache) =>
      fetch(event.request)
        .then((res) => {
          if (res.ok) cache.put(event.request, res.clone());
          return res;
        })
        .catch(() => cache.match(event.request))
    )
  );
});
