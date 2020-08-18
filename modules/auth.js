export default {
  getUserAuthURL ($api) {
    return $api.server().get('login')
  },

  refreshToken ($api, refreshToken) {
    return $api.server.get(`refresh_token?refresh_token=${refreshToken}`)
  }
}
