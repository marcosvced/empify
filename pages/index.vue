<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        empify
      </h1>
      <input v-model="search">
      <p>{{ search }}</p>
      <div class="links">
        <a
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          Search
        </a>
      </div>
    </div>
  </div>
</template>

<script>

import spotify from '@/modules/spotify/search'

export default {
  middleware: ['auth', 'user'],
  data () {
    return {
      value: ''
    }
  },
  computed: {
    search: {
      get () {
        return this.value
      },
      set (val) {
        this.value = val
        this._search()
      }
    }
  },
  methods: {
    async _search () {
      try {
        const response = await spotify.search(this.$api, this.search)
        if (response.data) {
          this.$store.dispatch('spotify/albums/SET_ALBUMS_INFO', response.data.albums)
          this.$store.dispatch('spotify/artists/SET_ARTISTS_INFO', response.data.artists)
          console.log(response.data.playlists)
          console.log(response.data.tracks)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand',
  'Source Sans Pro',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  'Helvetica Neue',
  Arial,
  sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
