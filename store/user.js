import user from '@/modules/user'

export const state = () => ({
  id: '',
  name: '',
  email: '',
  picture: ''
})

export const getters = {
  GET_NAME: state => state.name,
  GET_ID: state => state.id,
  GET_EMAIL: state => state.email,
  GET_PICTURE: state => state.picture,
  GET_USER: (state) => {
    return state
  }
}

export const mutations = {
  SET_NAME (state, name) {
    state.name = name
  },

  SET_ID (state, id) {
    state.id = id
  },

  SET_EMAIL (state, email) {
    state.email = email
  },

  SET_PICTURE (state, url) {
    state.picture = url
  }
}

export const actions = {
  async GET_INFO (context) {
    try {
      const response = await user.getUserInfo(this.$api)
      if (response.data) {
        context.commit('SET_NAME', response.data.display_name)
        context.commit('SET_EMAIL', response.data.email)
        context.commit('SET_PICTURE', response.data.images[0].url)
        context.commit('SET_ID', response.data.id)
      }
    } catch (e) {
      console.error(e)
    }
  }
}
