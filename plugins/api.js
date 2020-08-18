const apiFactory = (axios, store, config) => ({
  spotify () {
    const request = axios.create({
      baseURL: config.SPOTIFY_URL,
      headers: {
        Authorization: `Bearer ${store.getters['auth/GET_ACCESS_TOKEN']}`
      }
    })

    request.interceptors.response.use(null, async (error) => {
      if (error.response.status !== 401) {
      // TODO: add error handling
        return console.error('!401: ', error)
      }
      try {
        await store.dispatch('auth/REFRESH_TOKEN', null, { root: true })
        error.config.headers.Authorization = `Bearer ${store.getters['auth/GET_ACCESS_TOKEN']}`
        await axios.request(error.config)
      } catch (e) {
        console.error('Error refreshing token: ', e)
      }
    })

    return request
  },
  server () {
    return axios.create({
      baseURL: config.API_URL
    })
  }
})
export default ({ app, store }, inject) => {
  console.log(app)
  inject('api', apiFactory(app.$axios, store, app.$config))
}
