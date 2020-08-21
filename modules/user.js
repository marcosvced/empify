export default {
  getUserInfo ($api) {
    return $api.spotify().get('me')
  }
}
