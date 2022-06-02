const cacheData = "appV1";


self.addEventListener("install", (event) => {

   self.skipWating()
})

self.addEventListener("fetch", (event) => {
   event.respondWith(
       caches.match(event.request).then(resp => {
           return resp || fetch(event.request).then(async response =>  {
               const cache = await caches.open(cacheData);
               cache.put(event.request, response.clone())
               return response;
           })
       })
       )

})


self.addEventListener('activate', (e) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    console.log(e);
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


