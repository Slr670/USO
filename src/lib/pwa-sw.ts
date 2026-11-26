import { PWA_VERSION, PWA_THEME_COLOR } from './constants';

export const PWA_STATIC_CACHE = `uso-shf-static-v${PWA_VERSION}`;
export const PWA_DYNAMIC_CACHE = `uso-shf-dynamic-v${PWA_VERSION}`;
export const PWA_API_CACHE = `uso-shf-api-v${PWA_VERSION}`;

export const PWA_PRECACHE_ASSETS: readonly string[] = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/assets/icons/favicon.svg',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png',
  '/assets/icons/maskable-icon-192x192.png',
  '/assets/icons/maskable-icon-512x512.png',
  '/assets/image/USO_portal_icon.png'
];

/**
 * Generates the authoritative Service Worker script (PWA v2.0.0)
 * Served dynamically via Next.js TypeScript Route Handler at /sw.js
 * Preserves strict TypeScript-only source tree compliance (zero standalone .js files)
 */
export function buildServiceWorkerScript(): string {
  const precacheJson = JSON.stringify(PWA_PRECACHE_ASSETS);

  return `/* USO Operations Portal - Service Worker (PWA v${PWA_VERSION}) */
'use strict';

const PWA_VERSION = '${PWA_VERSION}';
const STATIC_CACHE = '${PWA_STATIC_CACHE}';
const DYNAMIC_CACHE = '${PWA_DYNAMIC_CACHE}';
const API_CACHE = '${PWA_API_CACHE}';
const VALID_CACHES = [STATIC_CACHE, DYNAMIC_CACHE, API_CACHE];
const PRECACHE_ASSETS = ${precacheJson};

const OFFLINE_FALLBACK_DOCUMENT = [
  '<!DOCTYPE html>',
  '<html lang="en">',
  '<head>',
  '  <meta charset="utf-8" />',
  '  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />',
  '  <meta name="theme-color" content="${PWA_THEME_COLOR}" />',
  '  <title>Offline — USO Operations Portal</title>',
  '  <style>',
  '    * { box-sizing: border-box; margin: 0; padding: 0; }',
  '    body { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at top, #112240 0%, #060d1d 70%); color: #f8fafc; font-family: Inter, system-ui, -apple-system, sans-serif; padding: 24px; text-align: center; }',
  '    .card { max-width: 460px; width: 100%; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 20px; padding: 36px 28px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5); }',
  '    .icon { width: 56px; height: 56px; margin: 0 auto 20px; color: #38bdf8; }',
  '    h1 { font-size: 1.35rem; font-weight: 700; margin-bottom: 10px; letter-spacing: -0.01em; }',
  '    p { font-size: 0.95rem; line-height: 1.6; color: #94a3b8; margin-bottom: 24px; }',
  '    button { appearance: none; border: none; border-radius: 9999px; background: linear-gradient(135deg, #06b6d4, #2563eb); color: #ffffff; font-weight: 600; font-size: 0.95rem; padding: 12px 28px; cursor: pointer; }',
  '    button:hover { opacity: 0.92; }',
  '  </style>',
  '</head>',
  '<body>',
  '  <div class="card">',
  '    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
  '      <path d="M4.93 4.93a10 10 0 0 1 14.14 0" />',
  '      <path d="M7.76 7.76a6 6 0 0 1 8.48 0" />',
  '      <circle cx="12" cy="12" r="2" />',
  '      <line x1="12" y1="14" x2="12" y2="22" />',
  '    </svg>',
  '    <h1>Network Connection Unavailable</h1>',
  '    <p>USO Operations Portal (PWA v' + PWA_VERSION + ') is currently offline. Reconnect to sync live SHF station telemetry and module services.</p>',
  '    <button type="button" onclick="window.location.reload()">Retry Connection</button>',
  '  </div>',
  '</body>',
  '</html>'
].join('\\n');

function safeReply(event, payload) {
  try {
    if (event && event.ports && event.ports[0] && typeof event.ports[0].postMessage === 'function') {
      event.ports[0].postMessage(payload);
      return;
    }
    if (event && event.source && typeof event.source.postMessage === 'function') {
      event.source.postMessage(payload);
    }
  } catch {
    // Receiver port closed or disconnected; ignore safely
  }
}

function safeCachePut(cacheName, request, response) {
  return caches
    .open(cacheName)
    .then((cache) => cache.put(request, response))
    .catch(() => undefined);
}

// Register message listener synchronously during initial script evaluation
// so incoming postMessage calls always have an initialized receiving end.
self.addEventListener('message', (event) => {
  try {
    if (!event || !event.data || typeof event.data !== 'object') {
      return;
    }

    if (event.data.type === 'SKIP_WAITING') {
      Promise.resolve(self.skipWaiting()).catch(() => undefined);
      safeReply(event, { type: 'SKIP_WAITING_ACK', version: PWA_VERSION });
    } else if (event.data.type === 'GET_PWA_VERSION') {
      safeReply(event, { type: 'PWA_VERSION', version: PWA_VERSION });
    } else if (event.data.type === 'PWA_PING') {
      safeReply(event, { type: 'PWA_PONG', version: PWA_VERSION });
    }
  } catch {
    // Prevent unhandled exceptions in message dispatch
  }
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) =>
        Promise.allSettled(
          PRECACHE_ASSETS.map((assetUrl) =>
            fetch(assetUrl, { cache: 'reload' })
              .then((response) => {
                if (response && response.ok && response.status === 200) {
                  return cache.put(assetUrl, response);
                }
                return undefined;
              })
              .catch(() => undefined)
          )
        )
      )
      .then(() => self.skipWaiting())
      .catch(() => undefined)
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !VALID_CACHES.includes(key))
            .map((staleKey) => caches.delete(staleKey))
        )
      )
      .then(() => self.clients.claim())
      .catch(() => undefined)
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  // Ignore non-HTTP(S) schemes (e.g., chrome-extension://, data:)
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  // Bypass byte-range requests and large video streams (.mp4, .mov) to preserve native 206 streaming
  if (
    request.headers.has('range') ||
    /\\.(mp4|mov|webm|mkv)$/i.test(url.pathname)
  ) {
    return;
  }

  const isSameOrigin = url.origin === self.location.origin;

  // 1. API Endpoints (/api/v1/*): Network-First with Offline Cache Fallback
  if (isSameOrigin && url.pathname.startsWith('/api/v1/')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            safeCachePut(API_CACHE, request, clone);
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedApi = await caches.match(request).catch(() => undefined);
          if (cachedApi) return cachedApi;
          return new Response(
            JSON.stringify({
              success: false,
              offline: true,
              error: 'Offline: cached API data unavailable.'
            }),
            {
              status: 503,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        })
    );
    return;
  }

  // 2. HTML Document Navigations: Network-First with App Shell & Offline Page Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            safeCachePut(DYNAMIC_CACHE, request, clone);
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request).catch(() => undefined);
          if (cachedPage) return cachedPage;

          const cachedRoot = await caches.match('/').catch(() => undefined);
          if (cachedRoot) return cachedRoot;

          return new Response(OFFLINE_FALLBACK_DOCUMENT, {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        })
    );
    return;
  }

  // 3. Static Assets (Next.js bundles, Icons, Images, Manifest, Google Fonts): Stale-While-Revalidate
  const isFontOrigin =
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com';

  if (isSameOrigin || isFontOrigin) {
    event.respondWith(
      caches
        .match(request)
        .then((cachedResponse) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              if (
                networkResponse &&
                networkResponse.status === 200 &&
                (networkResponse.type === 'basic' || networkResponse.type === 'cors')
              ) {
                const clone = networkResponse.clone();
                safeCachePut(DYNAMIC_CACHE, request, clone);
              }
              return networkResponse;
            })
            .catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        })
        .catch(() => fetch(request).catch(() => new Response('', { status: 504 })))
    );
  }
});
`;
}
