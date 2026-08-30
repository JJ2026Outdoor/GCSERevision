// Offline support for GCSE Revision.
//
// STRATEGY, and why: earlier in this project, stale cached copies of
// app.js/dashboard.js caused real, confusing bugs (the missing-export error
// that turned out to be a cached old file; the file-location mixup that
// looked like a cache problem). To avoid recreating that exact problem at
// the service-worker layer, this SW deliberately uses NETWORK-FIRST for
// every same-origin app file (HTML/CSS/JS/data): when online, it always
// fetches the latest version from the network first, and only falls back to
// the cached copy if the network request fails (i.e. genuinely offline).
// The cache exists purely as an offline safety net, not as the primary
// source — so a normal online visit always gets the newest files, no
// separate "bump this cache version too" discipline required alongside the
// existing ?v= convention in index.html.
//
// CACHE_VERSION only needs bumping if you change which FILES are precached
// below (e.g. adding a new subject file) — not for routine content edits to
// existing files, since those are always fetched fresh when online anyway.
const CACHE_VERSION = "gcse-revision-v1";

const PRECACHE_URLS = [
  "./",
  "index.html",
  "style.css",
  "manifest.json",
  "icon-192.png",
  "icon-512.png",
  "firebase-config.js",
  "js/app.js",
  "js/dashboard.js",
  "js/storage.js",
  "js/subjects.js",
  "js/marking.js",
  "js/timer.js",
  "data/maths.js",
  "data/science.js",
  "data/english.js",
  "data/maths-generators.js",
  "data/past-papers.js",
  "data/glossary.js",
  "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.5.1/chart.umd.min.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isAppFile(url) {
  // Same-origin, or the one pinned third-party script we explicitly cache.
  return url.origin === self.location.origin || url.href.startsWith("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/");
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return; // never touch POSTs — that's Firestore writes

  const url = new URL(request.url);

  // Firebase Auth/Firestore calls (identitytoolkit.googleapis.com,
  // firestore.googleapis.com) and Google Fonts are deliberately left
  // completely untouched — no caching, no offline fallback. Sync and
  // sign-in only make sense online anyway, and intercepting them risks
  // serving a stale auth response instead of a clean network error.
  if (!isAppFile(url)) return;

  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        const copy = networkResponse.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
        return networkResponse;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        // Last resort for a full-page navigation while offline with nothing
        // cached yet for this exact URL: fall back to the cached app shell.
        if (request.mode === "navigate") {
          const shell = await caches.match("index.html");
          if (shell) return shell;
        }
        throw new Error("Offline and not cached: " + request.url);
      })
  );
});
