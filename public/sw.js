// public/service-worker.js

const CACHE_NAME = 'komikdata';
const CACHE_EXPIRATION_TIME = 2 * 60 * 1000; // 2 minutes in milliseconds

// Daftar file untuk di-cache saat instalasi
const PRECACHE_URLS = [
  '/',
  '/icons/icon-512x512.png',
  '/offline.html', // Halaman fallback saat offline
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.error('Error caching resources during installation:', err);
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Cek apakah permintaan ada di cache
      if (cachedResponse) {
        return cachedResponse; // Jika ada di cache, kembalikan data cache
      }

      // Jika tidak ada di cache, lakukan fetch
      return fetch(event.request).then((response) => {
        // Jika request sukses, simpan respons dalam cache
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch((err) => {
        // Jika aplikasi offline dan tidak ada di cache, tampilkan halaman offline
        console.error('Fetch failed:', err);
        return caches.match('/offline.html'); // Tampilkan halaman offline jika offline
      });
    })
  );
});

// Optional: Menambahkan halaman offline ke cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.add('/offline.html');
    })
  );
});
