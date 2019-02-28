const cacheName = 'C-R-S';
const staticAssets = [
    './',
    './index.html',
    './admin/companies.html',
    './admin/logIn.html',
    './admin/main.html',
    './admin/student.html',
    './company/logIn.html',
    './company/students.html',
    './company/main.html',
    './company/signUp.html',
    './student/companies.html',
    './student/logIn.html',
    './student/main.html',
    './student/signUp.html',
    './assets/bootstrap3/css/bootstrap.css',
    './assets/bootstrap3/css/bootstrap.min.css',
    './assets/css/style.css',
    './assets/images/dummy_Company.png',
    './assets/images/dummy_Student.png',
    './assets/images/home-page-bg.jpg',
    './assets/bootstrap3/jquery.js',
    './assets/bootstrap3/js/bootstrap.js',
    './assets/bootstrap3/js/bootstrap.min.js',
    './assets/sweetAlert/sweetAlert.js',
    './assets/js/admin.js',
    './assets/js/app.js',
    './assets/js/editImage.js',
    './assets/js/post.js',
    './assets/js/signUp.js',
    './assets/js/timeLine.js',
    './assets/js/vecancyPosts.js',
    './assets/js/verify.js',
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log(cache)
          console.log('[ServiceWorker] Caching app shell');
          return cache.addAll(staticAssets);
        })
      );
})
self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req))
    } else {
        event.respondWith(networkFirst(req))
    }
})

async function cacheFirst(req) {
    const cacheResponse = await caches.match(req);
    return cacheResponse || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open(cacheName);
    // console.log(cache)
    console.log(req)
    try {
        const res = await fetch(req);
        console.log( "imp" + " " +JSON.parse(res))
        cache.put(req, res.clone())
        return res
    } catch (error) {
        return await cache.match(req)
    }
}