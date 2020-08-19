import vuexPersistedState from 'vuex-persistedstate'
// import SecureLS from 'secure-ls'
// const ls = new SecureLS({ isCompression: false })
export default ({ store, app }) => {
  vuexPersistedState({
    key: app.$config.SPOTIFY_STORAGE_KEY,
    reducer: state => ({
      auth: store.state.auth
    })
    // storage: {
    //   getItem: key => ls.get(key),
    //   setItem: (key, value) => ls.set(key, value),
    //   removeItem: key => ls.remove(key)
    // }
  })(store)
}
