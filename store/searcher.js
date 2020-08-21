export const state = () => ({
  active: false,
  lastSearch: ''
})

export const getters = {
  GET_STATE: state => state.active,
  GET_LAST_SEARCH: state => state.lastSearch
}

export const mutations = {
  SET_STATE (state, active) {
    state.active = active
  },
  SET_SEARCH (state, search) {
    state.lastSearch = search
  }
}

export const actions = {
  OPEN (context) {
    context.commit('SET_STATE', true)
  },

  CLOSE (context) {
    context.commit('SET_STATE', false)
  }
}
