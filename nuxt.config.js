export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Empify',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#040405' },
      { name: 'apple-mobile-web-app-status-bar-style', content: '#040405' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'http://empify.herokuapp.com' },
      { property: 'og:title', content: 'Empify' },
      { property: 'og:description', content: 'Discover your perfect sound using this music search engine created with Nuxt.js and Spotify services.' },
      { property: 'og:image', content: 'https://empify.herokuapp.com/card.png' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:url', content: 'http://empify.herokuapp.com' },
      { property: 'twitter:title', content: 'Empify' },
      { property: 'twitter:description', content: 'Discover your perfect sound using this music search engine created with Nuxt.js and Spotify services.' },
      { property: 'twitter:image', content: 'https://empify.herokuapp.com/card.png' },
      { hid: 'description', name: 'description', content: 'Discover your perfect sound using this music search engine created with Nuxt.js and Spotify services.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/styles.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/fragment.js' , ssr: false },
    { src: '~/plugins/api.js' }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  serverMiddleware: [
    { path: '/', handler: '~/api/server.js' }
  ],
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    SPOTIFY_URL: process.env.SPOTIFY_URL,
    SPOTIFY_STORAGE_KEY: process.env.SPOTIFY_STORAGE_KEY
  }
}
