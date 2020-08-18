
export default {
  search ($api, q, type = 'album,artist,playlist,track', offset = 0, limit = 25, market = 'ES') {
    return $api.spotify().get('search', {
      params: {
        q,
        type,
        limit,
        offset,
        market
      }
    })
  }
}
