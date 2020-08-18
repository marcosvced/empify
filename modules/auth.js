export default {
  getUserAuthURL ($api) {
    return $api.server().get('login')
  },

  refreshToken ($api, refreshToken) {
    return $api.server().get(`refreshToken?refresh_token=${refreshToken}`)
  }
}
