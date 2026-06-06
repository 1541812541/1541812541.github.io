// This project is a static GitHub Pages blog.
// To make newly published menu data take effect immediately in old browsers,
// this service worker deletes the old recipes-* caches and unregisters itself.
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith("recipes-"))
          .map((key) => caches.delete(key))
      ))
      .then(() => self.registration.unregister())
      .then(() => self.clients.claim())
  );
});
