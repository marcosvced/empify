import auth from '@/modules/auth'

export const state = () => ({
  accessToken: '',
  refreshToken: '',
  expiryIn: ''
})

export const getters = {
  GET_ACCESS_TOKEN: state => state.accessToken,
  GET_REFRESH_TOKEN: state => state.refreshToken,
  GET_EXPIRY_IN: state => state.expiryIn
}

export const mutations = {
  SET_ACCESS_TOKEN (state, token) {
    state.accessToken = token
  },

  SET_REFRESH_TOKEN (state, token) {
    state.refreshToken = token
  },

  SET_EXPIRY_TIME (state, time) {
    state.expiryIn = time
  }
}

export const actions = {
  async LOGIN () {
    try {
      const response = await auth.getUserAuthURL(this.$api)
      if (response.data) {
        window.location.href = response.data
      }
    } catch (e) {
      console.error(e)
    }
  },

  async REFRESH_TOKEN (context) {
    try {
      if (context.state.refreshToken) {
        const response = await auth.refreshToken(this.$api, context.state.refreshToken)
        await context.dispatch('SET_ACCESS_TOKEN', response.data.access_token)
      }
    } catch (e) {
      console.error(e)
    }
  },

  LOGOUT () {
    const script = document.createElement('script')

    script.src = 'https://www.spotify.com/logout/'
    document.getElementById('__nuxt').appendChild(script)

    window.localStorage.clear()
    window.sessionStorage.clear()

    setTimeout(() => {
      location.reload()
    }, 1000)
  },

  SET_ACCESS_TOKEN ({ commit }, token) {
    commit('SET_ACCESS_TOKEN', token)
  },

  SET_REFRESH_TOKEN ({ commit }, token) {
    commit('SET_REFRESH_TOKEN', token)
  },

  SET_EXPIRY_TIME ({ commit }, time) {
    commit('SET_EXPIRY_TIME', time)
  }
}
