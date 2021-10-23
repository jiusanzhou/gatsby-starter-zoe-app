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
    "url": "webpack-runtime-544554f411b52410f422.js"
  },
  {
    "url": "framework-1cd12a274124f71c1bad.js"
  },
  {
    "url": "78e521c3-11f5fa873e01c03047e4.js"
  },
  {
    "url": "5e2a4920-55c18731957809d40714.js"
  },
  {
    "url": "1bfc9850-8d565a4924a67dc56e68.js"
  },
  {
    "url": "d7eeaac4-9e91b0de5b67b759a72d.js"
  },
  {
    "url": "9f96d65d-43b2df01ca5c9b101ae3.js"
  },
  {
    "url": "app-29a05c660ae4c298164a.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "f5745f1d81ffdda3ca01d4c4a04b848f"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-a12c34d8f47c6528d910.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "ba1dd9f8d3a92ebb6b1f0d75c49b6443"
  },
  {
    "url": "page-data/sq/d/1137061806.json",
    "revision": "68c29ec0449fc7c9215eb1c340418325"
  },
  {
    "url": "page-data/sq/d/1138555179.json",
    "revision": "0d9c97b4031c3ffc0d62467cb8806d73"
  },
  {
    "url": "page-data/sq/d/1730835263.json",
    "revision": "3e46cb20604118ec889d3bc38de3b227"
  },
  {
    "url": "page-data/sq/d/3230166491.json",
    "revision": "a3563a26815e2a3bf27b3c80b43b4bf3"
  },
  {
    "url": "page-data/sq/d/3912480317.json",
    "revision": "75de9130e6deba1326d597700f2f17be"
  },
  {
    "url": "page-data/sq/d/4276287135.json",
    "revision": "169709d7f3a792211e88101ac5cb1d68"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "2018229bdecefcbb02d25ccd5b480c62"
  },
  {
    "url": "polyfill-7644dbc8b87bbf2ba314.js"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "dc9b9c5b795a20fef58f12c75495c407"
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
  if (!resources || !(await caches.match(`/gatsby-starter-zoe-app/app-29a05c660ae4c298164a.js`))) {
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
