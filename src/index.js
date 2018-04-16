import LocalForage from 'localforage'
import 'localforage-getitems'
import 'localforage-setitems'

export default {
  register: (name, version, storeName) => {
    LocalForage.config({
      driver: LocalForage.IndexedDB,
      name,
      version,
      storeName
    })

    return {
      offline: {
        plugin: (store) => {
          store.subscribe((mutations, state) => LocalForage.setItems(state))
        },
        actions: {
          setOffState: ({ commit }, obj) => (commit('OFF_SET_STATE', obj))
        },
        mutations: {
          OFF_SET_STATE: (state, obj) => {
            for (const prop in obj) {
              if (obj[prop] !== state[prop]) {
                state[prop] = obj[prop]
              }
            }
          }
        }
      },
      mixinOff: {
        created() {
          if (!navigator.onLine) return this._loadOfflineData()
        },
        methods: {
          async _loadOfflineData() {
            const newState = await LocalForage.getItems()
            this.$store.dispatch('setOffState', newState)
          }
        }
      }
    }
  }
}
