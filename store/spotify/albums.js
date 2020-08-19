import Album from '@/modules/spotify/album'

export const state = () => ({
  items: [],
  href: '',
  next: '',
  previous: '',
  total: 0

})

export const getters = {
  GET_ALBUMS: state => state.items
}

export const mutations = {
  SET_ITEMS (state, items) {
    state.items = items
  },
  SET_HREF (state, href) {
    state.href = href
  },
  SET_NEXT (state, next) {
    state.next = next
  },
  SET_PREVIOUS (state, previous) {
    state.previous = previous
  },
  SET_TOTAL (state, total) {
    state.total = total
  }
}

export const actions = {
  SET_ALBUMS_INFO (context, info) {
    context.commit('SET_ITEMS', info.items.map((album) => {
      return new Album(album.id, album.name, album.release_date, album.images[0] !== undefined ? album.images[0].url : '')
    }))
    context.commit('SET_HREF', info.href)
    context.commit('SET_NEXT', info.next)
    context.commit('SET_PREVIOUS', info.previous)
    context.commit('SET_TOTAL', info.total)
  },
  CLEAR_ALBUMS (context) {
    context.commit('SET_HREF', '')
    context.commit('SET_NEXT', '')
    context.commit('SET_PREVIOUS', '')
    context.commit('SET_TOTAL', '')
    context.commit('SET_ITEMS', [])
  }
}
