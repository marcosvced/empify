<template>
  <div class="o-index">
    <div class="m-index__header">
      <span class="a-header__logo">Empify .</span>
      <div class="m-header__wrapper">
        <div class="a-header__searcher" @click="$store.dispatch('searcher/OPEN')">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <path d="M13.5417 19.7917C8.93929 19.7917 5.20833 16.0607 5.20833 11.4583C5.20833 6.85596 8.93929 3.125 13.5417 3.125C18.144 3.125 21.875 6.85596 21.875 11.4583C21.875 16.0607 18.144 19.7917 13.5417 19.7917Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3.125 21.875L7.65625 17.3438" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Search</span>
        </div>
        <div class="a-header__logout" @click="$store.dispatch('auth/LOGOUT')">
          Logout
        </div>
      </div>
    </div>
    <routes :routes="routes" />
    <NuxtChild :key="$route.params.id" />
    <transition-fade>
      <searcher v-if="isSearcherOpened" />
    </transition-fade>
  </div>
</template>

<script>

import Searcher from '@/components/shared/searcher'
import Routes from '@/components/molecules/index/routes'
import TransitionFade from '@/components/shared/transition-fade'

export default {
  components: {
    TransitionFade,
    Routes,
    Searcher
  },
  middleware: ['auth', 'user'],
  data () {
    return {
      routes: [
        {
          name: 'tracks',
          link: '/tracks'
        },
        {
          name: 'albums',
          link: '/albums'
        },
        {
          name: 'artists',
          link: '/artists'
        }
      ]
    }
  },
  computed: {
    isSearcherOpened: {
      get () {
        return this.$store.getters['searcher/GET_STATE']
      }
    },
    lastSearch: {
      get () {
        return this.$store.getters['searcher/GET_LAST_SEARCH']
      }
    }
  },
  mounted () {
    if (!this.lastSearch) {
      this.$store.dispatch('searcher/OPEN')
    }
  }
}
</script>

<style scoped>
@import "assets/css/pages/index/_variables.css";
@import "assets/css/pages/index/_styles.css";

.o-index .m-index__header {
  padding: 0 6% 0 0;
  align-items: center;
}

.o-index .m-index__header .a-header__logo {
  font-size: clamp(var(--f-size-regular), 2.5vw, var(--f-size-large));
  font-family: var(--f-title);
  font-weight: bold;
}

.o-index .m-index__header .m-header__wrapper {
  display: flex;
  gap: 2rem;
  font-size: var(--f-size-small);
  text-transform: uppercase;
  align-items: center;
}

.o-index .m-index__header .m-header__wrapper:before {
  content: "";
  height: 20px;
  width: 1px;
  background-color: white;
  display: block;
  order: 2;
  opacity: .35;
}
.o-index .m-index__header .a-header__logout,
.o-index .m-index__header .a-header__searcher {
  order: 1;
  cursor: pointer;
  opacity: .35;
  transition: opacity .4s ease-in-out;
}
.o-index .m-index__header .a-header__searcher {
  display: flex;
  gap: 1em;
  align-items: center;
}

.o-index .m-index__header .a-header__logout {
  order: 3;
}
.o-index .m-index__header .a-header__logout:hover,
.o-index .m-index__header .a-header__searcher:hover {
  opacity: 1;
}
</style>
