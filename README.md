# Vue PWA offline vuex

Use this plugin for storage you store in IndexedDB and retrieve it when haven't network.

# Get Started

```shell
npm i vue-offline-worker -S
// or
yarn add vue-offline-worker
```

Now, import the plugin for your store and use your resources:

**store.js**
```javascript
const { offline, mixinOff } = storage.register('myApp', '1.0.0', 'storeName')

// export store instance and too the mixix offline
export default {
  store: new Vuex.Store({
    // register plugin
    plugins: [offline.plugin],

    // merge offline actions and mutations
    actions: Object.assign(actions, offline.actions),
    mutations: Object.assign(mutations, offline.mutations),
    // ...
  }),
  // export mixi too
  mixinOff
}
```

**main.js**
```javascript
// ...
import vuex from '@/store'

new Vue({
  // ...
  // set store and mixin in root vue instance
  store: vuex.store,
  mixins: [vuex.mixinOff]
})
```

For test, make a ajax request in your app. In Chrome open the devtools, and check 'Offline' mode, refresh the page, and check if yours responses is loaded.

## Cache images and files

To store images and files in browser cache, use webpack plugin:

```javascript
plugins: [
  // ...
  new SWPrecacheWebpackPlugin({
    cacheId: 'example',
    filename: 'service-worker.js',
    staticFileGlobs: ['dist/**/*.{js,html,css}'],
    minify: true,
    stripPrefix: 'dist/',
    runtimeCaching: [
      // yours externs url here
      {
        urlPattern: /^https:\/\/localhost\//,
        handler: 'cacheFirst'
      }
    ]
  })
]
``` 