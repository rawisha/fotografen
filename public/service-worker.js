const cacheData = "appV1";

const dataToCache = [
    'manifest.json',
    'static/js/bundle.js',
    'favicon.ico',
    '/gallery',
    '/']
this.addEventListener("install", (event) => {

    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll(dataToCache)
        })

    )

})

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request)
                .then((resp) => {
                    if (resp) {
                        return resp
                    }
                })
        )
    }

})

this.addEventListener('activate', (e) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    e.waitUntil(
        caches.keys()
            .then((cacheNames) => Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            ))
    )
})