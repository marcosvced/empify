<template>
  <div class="">
    <div class="o-login -flex">
      <!--      TODO: Use the Unsplash api to change photo and photo info dynamically -->
      <section
        class="m-login__picture -background"
        style="--img:url(https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)"
      >
        <div class="a-picture__user">
          <img
            src="https://images.unsplash.com/photo-1578176810046-c5e7d03f69cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
            alt=""
            class="a-user__profile"
          >
          <div class="m-user__info">
            <div class="a-info__name">
              Timothy Barlin
            </div>
            <div class="a-info__username">
              @timbar
            </div>
          </div>
        </div>
      </section>
      <section class="m-login__content">
        <div class="m-content__hero">
          <h1 class="a-hero__title">
            Discover <br> your perfect <br> sound
          </h1>
          <p class="a-hero__abstract">
            Millions of songs and podcasts. <br> No credit card needed.
          </p>
          <p class="a-hero__abstract">
            Only sign up with your spotify account
          </p>
        </div>
        <button class="m-login__start" @click="login">
          get started
          <svg class="a-start__icon" width="55" height="16" viewBox="0 0 55 16" fill="none">
            <path
              class="a-icon__line"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              class="a-icon__arrow"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </section>
    </div>
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
      console.error('no session: ', this.$route.query.error)
    }
  },
  methods: {
    login () {
      this.$store.dispatch('auth/LOGIN')
    },
    _getLocalStorage () {
      if (this.$store.getters['auth/GET_ACCESS_TOKEN']) {
        this._redirect()
      }
    },
    _setAuthentication (accessToken, refreshToken, expiresIn) {
      this.$store.dispatch('auth/SET_ACCESS_TOKEN', accessToken)
      this.$store.dispatch('auth/SET_REFRESH_TOKEN', refreshToken)
      this.$store.dispatch('auth/SET_EXPIRY_TIME', expiresIn)
      this._redirect()
    },
    _redirect () {
      this.$router.push({ name: 'index-tracks' })
    }
  }
}
</script>

<style scoped>
@import "assets/css/pages/login/_variables.css";
@import "assets/css/pages/login/_styles.css";
@import "assets/css/pages/login/_responsive.css";
</style>
