/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-735d508008d9f6e04f74.js"
  },
  {
    "url": "framework-4c7ec0139c7c494b54b7.js"
  },
  {
    "url": "78e521c3-38b7b3805b16f70492e5.js"
  },
  {
    "url": "5e2a4920-04f8b2754efc5e3ab06e.js"
  },
  {
    "url": "1bfc9850-f2806e9baee94d31aa76.js"
  },
  {
    "url": "d7eeaac4-86fa6afb3d504147e316.js"
  },
  {
    "url": "9f96d65d-e24471fa1e55add7167c.js"
  },
  {
    "url": "app-041501b298b6968d6b94.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "24f25c7954314b00f9ecc84a540a3a2a"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-f3e74a39de4e35ec1fc2.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "60041c10ad1decedc6877675a2b50b5a"
  },
  {
    "url": "page-data/sq/d/1137061806.json",
    "revision": "68c29ec0449fc7c9215eb1c340418325"
  },
  {
    "url": "page-data/sq/d/3230166491.json",
    "revision": "aed8f1f37890e780eeabd34ea601f538"
  },
  {
    "url": "page-data/sq/d/3549944518.json",
    "revision": "95731ad755dd86d681b7619e05d22917"
  },
  {
    "url": "page-data/sq/d/4217087647.json",
    "revision": "b4f0a141d8de66bb0016c8d0032c3180"
  },
  {
    "url": "page-data/sq/d/4276287135.json",
    "revision": "f0011a2757a90e870740ad6eaf692790"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "bd83afb570a99ef935bf29fa59ec0fff"
  },
  {
    "url": "polyfill-653687283647d4b26886.js"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "d24dccef1dbd3229f15cbb7d535ae16c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\/page-data\/.*\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|avif|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */
importScripts(`idb-keyval-3.2.0-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^/gatsby-starter-zoe-app`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/gatsby-starter-zoe-app/app-041501b298b6968d6b94.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/gatsby-starter-zoe-app/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)
