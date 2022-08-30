const APP_PREFIX = 'FoodFest-';
const VERSION = 'Version_01';
const CACHE_NAME = APP_PREFIX + VERSION;
const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
];

self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) {
              console.log('responding with cache : ' + e.request.url)
              return request
            } else {
              console.log('file is not cached, fetching : ' + e.request.url)
              return fetch(e.request)
          }
          
          // You can omit if/else for console.log & put one line below like this too.
          // return request || fetch(e.request)
          })
    )
  })

self.addEventListener('install', function (e) {
//We use e.waitUntil to tell the browser to wait until the work is complete before terminating the service worker.
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
        //We use caches.open to find the specific cache by name
            console.log('installing cache : '+ CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
            //then add every file in the FILES_TO_CACHE array to the cache
        })
    )
})

self.addEventListener('activate', function (e) {
    e.waitUntil(
      caches.keys().then(function (keyList) {
        let cacheKeeplist = keyList.filter(function (key) {
          return key.indexOf(APP_PREFIX);
        })
        cacheKeeplist.push(CACHE_NAME);

        return Promise.all(
            keyList.map(function(key, i) {
                if (cacheKeeplist.indexOf(key) === -1) {
                    console.log('deleting cache : ' + keyList[i]);
                    return caches.delete(keylist[i]);
                }
            })
        )
    })
    )
})
