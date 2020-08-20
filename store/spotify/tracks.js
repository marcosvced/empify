import Artist from '@/modules/spotify/artist'
import Track from '@/modules/spotify/track'
import Album from '@/modules/spotify/album'

export const state = () => ({
  items: [],
  href: '',
  next: '',
  previous: '',
  total: 0,
  selected: null
})

export const getters = {
  GET_TRACKS: state => state.items,
  GET_SELECTED: (state) => {
    return state.items.find((track) => {
      return track.id === state.selected
    })
  }
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
  },
  SET_SELECTED (state, id) {
    state.selected = id
  }
}

export const actions = {
  SET_TRACKS_INFO (context, info) {
    context.commit('SET_ITEMS', info.items.map((track) => {
      const artists = track.artists.map(artist => new Artist(artist.id, artist.name))
      const album = new Album(track.album.id, track.album.name, track.album.release_date, track.album.images[0] !== undefined ? track.album.images[0].url : '')
      return new Track(track.id, track.name, artists, album)
    }))
    context.commit('SET_HREF', info.href)
    context.commit('SET_NEXT', info.next)
    context.commit('SET_PREVIOUS', info.previous)
    context.commit('SET_TOTAL', info.total)
  },
  CLEAR_TRACKS (context) {
    context.commit('SET_HREF', '')
    context.commit('SET_NEXT', '')
    context.commit('SET_PREVIOUS', '')
    context.commit('SET_TOTAL', '')
    context.commit('SET_ITEMS', [])
    context.dispatch('CLEAR_SELECTED')
  },
  CLEAR_SELECTED (context) {
    context.commit('SET_SELECTED', null)
  }
}
