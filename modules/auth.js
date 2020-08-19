export default {
  getUserAuthURL ($api) {
    return $api.server().get('login')
  },

  refreshToken ($api, refreshToken) {
    console.log('ENTRA EN REFRESH TOKEN')
    return $api.server().get(`refreshToken?refresh_token=${refreshToken}`)
  }
}
