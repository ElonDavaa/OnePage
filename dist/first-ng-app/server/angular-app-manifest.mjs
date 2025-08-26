
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
      "chunk-33XRVV7Q.js"
    ],
    "route": "/news"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-33XRVV7Q.js"
    ],
    "route": "/news/news"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-33XRVV7Q.js"
    ],
    "route": "/news/1009"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-33XRVV7Q.js"
    ],
    "route": "/news/6001"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-33XRVV7Q.js"
    ],
    "route": "/news/6002"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-33XRVV7Q.js"
    ],
    "route": "/news/6003"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-33XRVV7Q.js"
    ],
    "route": "/news/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 54387, hash: 'c86e667684ff9d97031d75f7006b397582c647ab73e54eed70db8a422cc047ca', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 46196, hash: '02946c273a5951d6a6cea76b74d148dbde119d5e758c47db975413c67754a32b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'news/index.html': {size: 54894, hash: '11692366d380ed39726ed16937525348c4e31c9be0168a57511dfd2ecedcb151', text: () => import('./assets-chunks/news_index_html.mjs').then(m => m.default)},
    'news/news/index.html': {size: 54894, hash: '11692366d380ed39726ed16937525348c4e31c9be0168a57511dfd2ecedcb151', text: () => import('./assets-chunks/news_news_index_html.mjs').then(m => m.default)},
    'news/1009/index.html': {size: 54835, hash: '5c7b526b729c0a927c2ab11390b9583ae78eb27a0fcf2c6ad3d497820a23354a', text: () => import('./assets-chunks/news_1009_index_html.mjs').then(m => m.default)},
    'news/6002/index.html': {size: 54835, hash: '5c7b526b729c0a927c2ab11390b9583ae78eb27a0fcf2c6ad3d497820a23354a', text: () => import('./assets-chunks/news_6002_index_html.mjs').then(m => m.default)},
    'news/6001/index.html': {size: 54835, hash: '5c7b526b729c0a927c2ab11390b9583ae78eb27a0fcf2c6ad3d497820a23354a', text: () => import('./assets-chunks/news_6001_index_html.mjs').then(m => m.default)},
    'news/6003/index.html': {size: 54835, hash: '5c7b526b729c0a927c2ab11390b9583ae78eb27a0fcf2c6ad3d497820a23354a', text: () => import('./assets-chunks/news_6003_index_html.mjs').then(m => m.default)},
    'index.html': {size: 79478, hash: '6887d12cdbe7b1ed7e96491b207a2eace015b56e44e14728fe4eac77a8750c79', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6ZN2XR7B.css': {size: 405356, hash: 'RhqwTVG9+fY', text: () => import('./assets-chunks/styles-6ZN2XR7B_css.mjs').then(m => m.default)}
  },
};
