const CACHE_NAME = 'Basketball'

const FILES_TO_CACHE = [
    '/pic/panda.png',
    '/offline.html'
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(FILES_TO_CACHE))
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise,all(keyList.map((key) => {
                if(key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key)
                    return caches.delete(key)
                }
            }))
        })
    )
})

self.addEventListener('fetch', event => {
    if (event.request.mode !== 'navigate') {
      // Not a page navigation, bail.
      return;
    }

    event.respondWith(
        fetch(event.request)
        .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                    return cache.match('offline.html');
                });
        })
    );

})