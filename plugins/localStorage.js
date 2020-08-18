import vuexPersistedState from 'vuex-persistedstate'

export default ({ store, app }) => {
  vuexPersistedState({
    key: app.$config.SPOTIFY_STORAGE_KEY,
    reducer: state => ({
      auth: store.state.auth
    })
  })(store)
}
