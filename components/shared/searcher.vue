<template>
  <div class="o-searcher">
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      class="a-searcher__close"
      @click="$store.dispatch('searcher/CLOSE')"
    >
      <g>
        <path
          class="a-close__line -back"
          d="M41.4921 14.6674L13.9921 42.1675"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          class="a-close__line -back"
          d="M13.9921 14.6674L41.4921 42.1675"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g>
        <path
          class="a-close__line -front -bottom"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          class="a-close__line -front -top"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
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
        @focus="searcherFocus"
        @blur="searcherBlur"
      >
    </label>
    <div class="m-searcher__content">
      <transition-fade>
        <div v-if="tracks && tracks.items.length" class="m-content__tracks -wrapper">
          <h2 class="a-tracks__title -header">
            Tracks
          </h2>
          <ul class="m-content__items -list">
            <li
              v-for="item in tracks.items.slice(0,8)"
              :key="item.id"
              class="a-items__track"
              @click="select(keys.TRACKS, item.id)"
            >
              {{ item.name }}
            </li>
            <li v-if="tracks.items.length > 8" class="a-items__more" @click="seeMore(keys.TRACKS)">
              + See more
            </li>
          </ul>
        </div>
      </transition-fade>
      <transition-fade>
        <div v-if="albums && albums.items.length" class="m-content__albums -wrapper">
          <h2 class="a-albums__title -header">
            Albums
          </h2>
          <ul class="m-content__items -list">
            <li
              v-for="item in albums.items.slice(0,5)"
              :key="item.id"
              class="a-items__album"
              @click="select(keys.ALBUMS, item.id)"
            >
              {{ item.name }}
            </li>
            <li v-if="albums.items.length > 5" class="a-items__more" @click="seeMore(keys.ALBUMS)">
              + See more
            </li>
          </ul>
        </div>
      </transition-fade>
      <transition-fade>
        <div v-if="artists && artists.items.length" class="m-content__artists -wrapper">
          <h2 class="a-artists__title -header">
            Artists
          </h2>
          <ul class="m-content__items -list">
            <li
              v-for="item in artists.items.slice(0,5)"
              :key="item.id"
              class="a-items__artist"
              @click="select(keys.ARTISTS, item.id)"
            >
              {{ item.name }}
            </li>
            <li v-if="artists.items.length > 5" class="a-items__more" @click="seeMore(keys.ARTISTS)">
              + See more
            </li>
          </ul>
        </div>
      </transition-fade>
      <p v-if="hasItems" class="m-content__no-items">
        No items found for this search
      </p>
    </div>
  </div>
</template>

<script>
import spotify from '@/modules/spotify/search'
import TransitionFade from '@/components/shared/transition-fade'
import { TRACKS, ALBUMS, ARTISTS } from '@/constants/searcher-keys'

export default {
  name: 'Searcher',
  components: { TransitionFade },
  data () {
    return {
      keys: {
        TRACKS,
        ALBUMS,
        ARTISTS
      },
      value: '',
      tracksInfo: null,
      albumsInfo: null,
      artistsInfo: null
    }
  },
  computed: {
    search: {
      get () {
        return this.value
      },
      set (value) {
        this.value = value
        if (!value) {
          this._clear()
          return
        }
        this._search()
      }
    },
    tracks: {
      get () {
        return this.tracksInfo
      },
      set (value) {
        this.tracksInfo = value
      }
    },
    albums: {
      get () {
        return this.albumsInfo
      },
      set (value) {
        this.albumsInfo = value
      }
    },
    artists: {
      get () {
        return this.artistsInfo
      },
      set (value) {
        this.artistsInfo = value
      }
    },
    hasItems: {
      get () {
        return this.search &&
          ((!this.tracks && !this.albums && !this.artists) ||
            (!this.tracks.items.length && !this.albums.items.length && !this.artists.items.length))
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
            this.tracks = response.data.tracks
            this.albums = response.data.albums
            this.artists = response.data.artists
          }
        } catch (e) {
          console.error(e)
        }
      }
    },
    _clear () {
      this.tracks = null
      this.albums = null
      this.artists = null
    },
    _setSearch () {
      this.$store.dispatch('spotify/tracks/SET_TRACKS_INFO', this.tracksInfo)
      this.$store.dispatch('spotify/albums/SET_ALBUMS_INFO', this.albumsInfo)
      this.$store.dispatch('spotify/artists/SET_ARTISTS_INFO', this.artistsInfo)
      this.$store.commit('searcher/SET_SEARCH', this.search)
    },
    _redirectTo (key) {
      this.$store.dispatch('searcher/CLOSE')
      this.$router.push({ name: `index-${key}` })
    },
    searcherFocus () {
      this.$refs.icon.classList.add('-scale')
    },
    searcherBlur () {
      this.$refs.icon.classList.remove('-scale')
    },
    seeMore (key) {
      this.$store.dispatch('spotify/tracks/CLEAR_SELECTED')
      this.$store.dispatch('spotify/albums/CLEAR_SELECTED')
      this.$store.dispatch('spotify/artists/CLEAR_SELECTED')
      this._setSearch()
      this._redirectTo(key)
    },
    select (key, id) {
      switch (key) {
        case this.keys.TRACKS:
          this.$store.commit('spotify/tracks/SET_SELECTED', id)
          break
        case this.keys.ALBUMS:
          this.$store.commit('spotify/albums/SET_SELECTED', id)
          break
        case this.keys.ARTISTS:
          this.$store.commit('spotify/artists/SET_SELECTED', id)
          break
      }
      this._setSearch()
      this._redirectTo(key)
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/components/searcher/_variables.css";
@import "../../assets/css/components/searcher/_styles.css";
@import "../../assets/css/components/searcher/_responsive.css";
</style>
