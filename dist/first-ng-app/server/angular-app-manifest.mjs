
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 1,
    "route": "/login"
  },
  {
    "renderMode": 1,
    "route": "/login/callback"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KIHHURK6.js"
    ],
    "route": "/news"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KIHHURK6.js"
    ],
    "route": "/news/news"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KIHHURK6.js"
    ],
    "route": "/news/1009"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KIHHURK6.js"
    ],
    "route": "/news/6001"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KIHHURK6.js"
    ],
    "route": "/news/6002"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KIHHURK6.js"
    ],
    "route": "/news/6003"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-KIHHURK6.js"
    ],
    "route": "/news/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 54387, hash: 'e41f26af0ea4766c6a3fd81a883d06edd0211304d4360775158e97cce8bf889c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 46196, hash: '51b1041397e95683ddc880cfc6c2ec721149f6dcd0a2445a8333a7aa7fb3724f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'news/index.html': {size: 54894, hash: '77b48de2f8d5718f32c2a701cc5aa5efdc4aa839a0a2f07026f96aa4825e7137', text: () => import('./assets-chunks/news_index_html.mjs').then(m => m.default)},
    'news/6001/index.html': {size: 54835, hash: 'b2c2c72c81d074463397dc0b30db14b2b58d741db0d92c69e3a48bab1ce4cf72', text: () => import('./assets-chunks/news_6001_index_html.mjs').then(m => m.default)},
    'news/news/index.html': {size: 54894, hash: '77b48de2f8d5718f32c2a701cc5aa5efdc4aa839a0a2f07026f96aa4825e7137', text: () => import('./assets-chunks/news_news_index_html.mjs').then(m => m.default)},
    'news/1009/index.html': {size: 54835, hash: 'b2c2c72c81d074463397dc0b30db14b2b58d741db0d92c69e3a48bab1ce4cf72', text: () => import('./assets-chunks/news_1009_index_html.mjs').then(m => m.default)},
    'news/6002/index.html': {size: 54835, hash: 'b2c2c72c81d074463397dc0b30db14b2b58d741db0d92c69e3a48bab1ce4cf72', text: () => import('./assets-chunks/news_6002_index_html.mjs').then(m => m.default)},
    'news/6003/index.html': {size: 54835, hash: 'b2c2c72c81d074463397dc0b30db14b2b58d741db0d92c69e3a48bab1ce4cf72', text: () => import('./assets-chunks/news_6003_index_html.mjs').then(m => m.default)},
    'index.html': {size: 79417, hash: '5a6f09e5cec2fbe8555e64e543c85a2723677f6c3247703bf30b717fe3a6173d', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6ZN2XR7B.css': {size: 405356, hash: 'RhqwTVG9+fY', text: () => import('./assets-chunks/styles-6ZN2XR7B_css.mjs').then(m => m.default)}
  },
};
