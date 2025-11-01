const CACHE_NAME = "sagar-portfolio-v1"
const urlsToCache = [
  "/",
  "/about",
  "/project",
  "/blog",
  "/experience",
  "/contact",
  "/globals.css",
  "/sagarkundu_square.avif",
  "/sagarkundu.avif",
]

self.addEventListener("install", (event) => {
  // Use a resilient install step that won't fail the install if one resource 404s
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      for (const url of urlsToCache) {
        try {
          const res = await fetch(url, { cache: "no-cache" })
          if (res && res.ok) {
            await cache.put(url, res.clone())
          } else {
            // Log but don't throw: prevents addAll from failing the whole install
            // console.warn("SW: resource not cached (invalid response)", url, res && res.status)
          }
        } catch (err) {
          // console.warn("SW: resource fetch failed, skipping", url, err)
        }
      }
    })(),
  )
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }
      return fetch(event.request)
    }),
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})
