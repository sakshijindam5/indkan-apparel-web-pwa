/*
  service-worker.js
  INDKAN World Wide Exim Pvt. Ltd. - Progressive Web App
  Developed by: Sakshi Jindam (sakshijindam17@gmail.com)
  Pre-Interview Practical Assignment Submission
  Handles offline caching and asset management using a cache-first strategy.
*/

const CACHE_NAME = 'indkan-apparel-v1';

// Files to cache when service worker is installed
const STATIC_ASSETS = [
  './',
  'index.html',
  'catalogue.html',
  'product.html',
  'enquiry.html',
  'wholesale.html',
  'export-info.html',
  'about.html',
  'contact.html',
  'manifest.json',
  'css/style.css',
  'js/main.js',
  'js/products.js',
  'assets/img/final_logo.png',
  'assets/img/indkan-logo.svg',
  'assets/img/favicon.svg',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'favicon.ico'
];

// Install event: cache all essential files safely
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache each asset individually so one network failure does not abort installation
      return Promise.allSettled(
        STATIC_ASSETS.map((asset) => {
          return cache.add(asset).catch((err) => {
            console.warn('Optional asset failed to pre-cache:', asset, err);
          });
        })
      );
    }).then(() => {
      // Activate worker immediately
      return self.skipWaiting();
    })
  );
});

// Activate event: clean up older cache versions if any
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event: Cache-first for cached assets, network fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached version if found
        return cachedResponse;
      }
      // Otherwise fetch from network
      return fetch(event.request).then((networkResponse) => {
        // Optionally cache newly requested images or files if valid
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          event.request.url.startsWith(self.location.origin)
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // If offline and request is an HTML page, fallback to cached index.html
        if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
          return caches.match('index.html');
        }
      });
    })
  );
});
