<template>
  <div class="o-searcher">
    <label class="a-searcher">
      <svg
        ref="icon"
        class="a-searcher__icon"
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
      >
        <path
          d="M28.7778 45.4445C16.5048 45.4445 6.55554 35.4952 6.55554 23.2222C6.55554 10.9492 16.5048 1 28.7778 1C41.0508 1 51 10.9492 51 23.2222C51 35.4952 41.0508 45.4445 28.7778 45.4445Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M0.999919 51L13.0833 38.9167"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <input
        v-model.trim="search"
        class="a-searcher__input"
        placeholder="Type to discover your sound"
        @focus="animateIn"
        @blur="animateOut"
      >
    </label>
    <div class="m-searcher__content">
      <div v-if="tracks.length" class="m-content__tracks -wrapper">
        <h2 class="a-tracks__title -header">
          Tracks
        </h2>
        <ul class="m-content__items -list">
          <li v-for="item in tracks.slice(0,8)" :key="item.id" class="a-items__track">
            {{ item.name }}
          </li>
          <li v-if="tracks.length > 8" class="a-items__more">
            + See more
          </li>
        </ul>
      </div>
      <div v-if="albums.length" class="m-content__albums -wrapper">
        <h2 class="a-albums__title -header">
          Albums
        </h2>
        <ul class="m-content__items -list">
          <li v-for="item in albums.slice(0,5)" :key="item.id" class="a-items__album">
            {{ item.name }}
          </li>
          <li v-if="albums.length > 5" class="a-items__more">
            + See more
          </li>
        </ul>
      </div>
      <div v-if="artists.length" class="m-content__artists -wrapper">
        <h2 class="a-artists__title -header">
          Artists
        </h2>
        <ul class="m-content__items -list">
          <li v-for="item in artists.slice(0,5)" :key="item.id" class="a-items__artist">
            {{ item.name }}
          </li>
          <li v-if="artists.length > 5" class="a-items__more">
            + See more
          </li>
        </ul>
      </div>
      <p v-if="!tracks.length && !albums.length && !artists.length && search" class="m-content__no-items">
        No items found for this search
      </p>
    </div>
  </div>
</template>

<script>
import spotify from '@/modules/spotify/search'

export default {
  name: 'Searcher',
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
        if (!val) {
          this._clear()
          return
        }
        this._search()
      }
    },
    tracks: {
      get () {
        return this.$store.getters['spotify/tracks/GET_TRACKS']
      }
    },
    albums: {
      get () {
        return this.$store.getters['spotify/albums/GET_ALBUMS']
      }
    },
    artists: {
      get () {
        return this.$store.getters['spotify/artists/GET_ARTISTS']
      }
    }
  },
  methods: {
    async _search () {
      if (this.search) {
        try {
          const response = await spotify.search(this.$api, this.search)
          if (!this.search) {
            this._clear()
            return
          }
          if (response.data) {
            this.$store.dispatch('spotify/albums/SET_ALBUMS_INFO', response.data.albums)
            this.$store.dispatch('spotify/artists/SET_ARTISTS_INFO', response.data.artists)
            this.$store.dispatch('spotify/tracks/SET_TRACKS_INFO', response.data.tracks)
          }
        } catch (e) {
          console.error(e)
        }
      }
    },
    _clear () {
      this.$store.dispatch('spotify/tracks/CLEAR_TRACKS')
      this.$store.dispatch('spotify/albums/CLEAR_ALBUMS')
      this.$store.dispatch('spotify/artists/CLEAR_ARTISTS')
    },
    animateIn () {
      this.$refs.icon.classList.add('-scale')
    },
    animateOut () {
      this.$refs.icon.classList.remove('-scale')
    }
  }
}
</script>

<style scoped>
@import "assets/css/components/searcher/_variables.css";
@import "assets/css/components/searcher/_styles.css";
@import "assets/css/components/searcher/_responsive.css";
</style>
