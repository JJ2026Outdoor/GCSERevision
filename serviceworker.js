// Deliberately network-first for every same-origin app file (HTML/CSS/JS/
// data): a fetch always tries the network first and only falls back to the
// cache when that fails — i.e. genuinely offline. The cache is a pure
// offline safety net, not the primary source of truth, so unlike the
// `?v=N` cache-buster convention on style.css/js/app.js in index.html,
// CACHE_NAME below does NOT need bumping on every deploy — a stale cached
// copy is never served ahead of a live one while the network is reachable.
//
// Firebase/Firestore/Auth requests and Google Fonts are explicitly passed
// through untouched below — never cached, never intercepted — so cloud
// sync and font loading always hit the network directly.
const CACHE_NAME = "gcse-revision-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests for this app's own files. Anything
  // cross-origin (Firestore/Auth calls, Google Fonts, etc.) or non-GET
  // (POST/PUT to Firestore, for example) is left completely alone — no
  // event.respondWith() call means the browser handles it normally.
  if (url.origin !== self.location.origin || request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Only cache genuinely successful, basic (same-origin) responses —
        // never an opaque/error response, which would otherwise poison the
        // offline fallback with something unusable.
        if (response && response.ok && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
