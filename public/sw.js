// public/service-worker.js

const CACHE_NAME = 'komikdata';
const KOMIK_DETAIL_CACHE_NAME = 'komik-detail-cache'; // Nama cache untuk detail komik
const CACHE_EXPIRATION_TIME = 2 * 60 * 1000; // 2 menit dalam milidetik

// Daftar file untuk di-cache saat instalasi
const PRECACHE_URLS = [
  '/',
  '/icons/icon-512x512.png',
  '/offline.html', // Halaman fallback saat offline
];

// Cek koneksi jaringan
function isOnline() {
  return navigator.onLine;
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.error('Error caching resources during installation:', err);
      });
    })
  );
  // Juga buat cache untuk komik-detail saat instalasi
  event.waitUntil(
    caches.open(KOMIK_DETAIL_CACHE_NAME).then((cache) => {
      console.log('Komik detail cache created.');
    })
  );
});

// Fungsi untuk memeriksa apakah cache sudah kadaluarsa
function isCacheExpired(cachedResponse) {
  const cachedTime = cachedResponse.headers.get('X-Cache-Time');
  const currentTime = Date.now();
  return cachedTime && (currentTime - cachedTime > CACHE_EXPIRATION_TIME);
}

self.addEventListener('fetch', (event) => {
  // Periksa apakah request adalah untuk halaman detail komik
  if (/\/pages\/detail\/[^\/]+/.test(event.request.url)) {
    // Tangani permintaan komik detail di sini
    event.respondWith(
      caches.open(KOMIK_DETAIL_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          // Jika aplikasi offline, gunakan cache tanpa memeriksa kadaluarsa
          if (!isOnline()) {
            console.log('You are offline, using cached komik detail data without expiration');
            return cachedResponse || fetch(event.request)
              .then((response) => {
                if (response.ok) {
                  const responseClone = response.clone();
                  caches.open(KOMIK_DETAIL_CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseClone); // Simpan respons dalam cache
                  });
                }
                return response;
              }).catch((err) => {
                console.error('Fetch failed:', err);
                return caches.match('/offline.html'); // Tampilkan halaman offline jika offline
              });
          }

          // Jika aplikasi online, cek apakah cache ada dan kadaluarsa
          if (cachedResponse) {
            if (isCacheExpired(cachedResponse)) {
              console.log(`Cache expired for ${event.request.url}. Fetching new komik detail data...`);
              return fetch(event.request).then((response) => {
                if (response.ok) {
                  const responseClone = response.clone();
                  caches.open(KOMIK_DETAIL_CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseClone); // Simpan data baru ke cache
                  });
                }
                return response;
              }).catch((err) => {
                console.error('Fetch failed:', err);
                return caches.match('/offline.html'); // Tampilkan halaman offline jika offline
              });
            } else {
              console.log(`Cache hit for ${event.request.url}`);
              return cachedResponse; // Jika cache masih valid, gunakan data cache
            }
          }

          // Jika tidak ada di cache, lakukan fetch dan cache hasilnya
          return fetch(event.request).then((response) => {
            if (response.ok) {
              const responseClone = response.clone();
              caches.open(KOMIK_DETAIL_CACHE_NAME).then((cache) => {
                // Simpan data baru dengan waktu cache
                const headers = new Headers(responseClone.headers);
                headers.append('X-Cache-Time', String(Date.now())); // Tambahkan waktu cache
                const cacheResponse = new Response(responseClone.body, { headers });
                cache.put(event.request, cacheResponse); // Simpan respons dalam cache
              });
            }
            return response;
          }).catch((err) => {
            // Jika aplikasi offline dan tidak ada di cache, tampilkan halaman offline
            console.error('Fetch failed:', err);
            return caches.match('/offline.html'); // Tampilkan halaman offline jika offline
          });
        });
      })
    );
  } else {
    // Tangani permintaan umum di sini (bukan untuk detail komik)
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Jika aplikasi offline, jangan gunakan cache expiration
        if (!isOnline()) {
          console.log('You are offline, using cached data without expiration');
          return cachedResponse || fetch(event.request)
            .then((response) => {
              if (response.ok) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, responseClone); // Simpan respons dalam cache
                });
              }
              return response;
            }).catch((err) => {
              console.error('Fetch failed:', err);
              return caches.match('/offline.html'); // Tampilkan halaman offline jika offline
            });
        }

        // Jika aplikasi online, cek apakah cache ada dan kadaluarsa
        if (cachedResponse) {
          // Jika cache ada dan expired, lakukan fetch ulang dan perbarui cache
          if (isCacheExpired(cachedResponse)) {
            console.log(`Cache expired for ${event.request.url}. Fetching new data...`);
            return fetch(event.request).then((response) => {
              if (response.ok) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, responseClone); // Simpan data baru ke cache
                });
              }
              return response;
            }).catch((err) => {
              console.error('Fetch failed:', err);
              return caches.match('/offline.html'); // Tampilkan halaman offline jika offline
            });
          } else {
            console.log(`Cache hit for ${event.request.url}`);
            return cachedResponse; // Jika cache masih valid, gunakan data cache
          }
        }

        // Jika tidak ada di cache, lakukan fetch dan cache hasilnya
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              // Simpan data baru dengan waktu cache
              const headers = new Headers(responseClone.headers);
              headers.append('X-Cache-Time', String(Date.now())); // Tambahkan waktu cache
              const cacheResponse = new Response(responseClone.body, { headers });
              cache.put(event.request, cacheResponse); // Simpan respons dalam cache
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
  }
});


// Optional: Menambahkan halaman offline ke cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.add('/offline.html');
    })
  );
  // Juga tambahkan halaman offline ke cache komik-detail
  event.waitUntil(
    caches.open(KOMIK_DETAIL_CACHE_NAME).then((cache) => {
      console.log('Komik detail cache activated.');
    })
  );
});
