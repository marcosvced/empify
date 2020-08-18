<template>
  <div class="o-login">
    <a
      rel="noopener noreferrer"
      class="a-btn--primary button--green"
      @click="login"
    >
      Login
    </a>
  </div>
</template>

<script>

export default {
  name: 'Login',
  created () {
    if (process.client) {
      this._getLocalStorage()
    }
    if (this.$route.query.access_token && this.$route.query.refresh_token && this.$route.query.expires_in) {
      this._setAuthentication(this.$route.query.access_token, this.$route.query.refresh_token, this.$route.query.expires_in)
    } else if (this.$route.query.error) {
    // TODO: Show error message to user
    // eslint-disable-next-line no-console
      console.error('no session: ', this.$route.query.error)
    }
  },
  methods: {
    login () {
      this.$store.dispatch('auth/LOGIN')
    },
    _getLocalStorage () {
      const auth = window.localStorage.spotify_app_state ? JSON.parse(window.localStorage[this.$config.SPOTIFY_STORAGE_KEY]).auth : null
      if (auth) {
        this._setAuthentication(auth.accessToken, auth.refreshToken, auth.expiryIn)
      }
    },
    _setAuthentication (accessToken, refreshToken, expiresIn) {
      this.$store.dispatch('auth/SET_ACCESS_TOKEN', accessToken)
      this.$store.dispatch('auth/SET_REFRESH_TOKEN', refreshToken)
      this.$store.dispatch('auth/SET_EXPIRY_TIME', expiresIn)
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style scoped>

</style>
