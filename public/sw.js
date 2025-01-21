// public/service-worker.js

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('pwa-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/favicon.ico',
        '/icon-512x512.png'
      ]).catch((err) => {
        console.error('Error caching resources during installation:', err);
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('apimanga.wocogeh.com')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Jika data ada di cache
        }

        // Jika tidak ada di cache, lakukan fetch dan cache hasilnya
        return fetch(event.request)
          .then((response) => {
            // Pastikan respons bisa diclone sebelum digunakan
            if (response.ok) {
              const responseClone = response.clone();
              caches.open('pwa-cache').then((cache) => {
                cache.put(event.request, responseClone); // Simpan respons dalam cache
              });
            }
            return response;
          })
          .catch((err) => {
            console.error('Failed to fetch:', err);
            // Fallback response jika fetch gagal (misalnya mode offline)
            return new Response('Data tidak tersedia', {
              status: 503,
              statusText: 'Service Unavailable',
            });
          });
      })
    );
  } else {
    // Untuk permintaan selain API, lakukan fetch secara normal
    event.respondWith(
      fetch(event.request).catch((err) => {
        console.error('Fetch failed for request', event.request.url, err);
        // Jika fetch gagal, coba fallback ke cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Jika tidak ada di cache, kembalikan response error valid
          return new Response('Data tidak tersedia', {
            status: 503,
            statusText: 'Service Unavailable',
          });
        });
      })
    );
  }

});
