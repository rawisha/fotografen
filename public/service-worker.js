const cacheData = "appV1";

const dataToCache = [
    'manifest.json',
    'static/js/main.95991a24.js',
    'static/js/bundle.js',
    'favicon.ico',
    '/gallery',
    '/']

self.addEventListener("install", (event) => {

   self.skipWating()
})

self.addEventListener("fetch", (event) => {
   event.respondWith(
       caches.match(event.request).then(resp => {
           return resp || fetch(event.request).then(async response =>  {
               const cache = await caches.open(cacheData);
               cache.put(event.request, response.clone(), {cache: "no-store"})
               return response;
           })
       })
       )

})


