<!--TODO: Show message to the user that there is no content and that they should perform a search-->
<template>
  <div class="o-index">
    <div class="m-index__social-media">
      <a class="a-social-media__linkedin -icon" href="https://www.linkedin.com/in/marcosvced" target="_blank">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              d="M20 10C21.9891 10 23.8968 10.7902 25.3033 12.1967C26.7098 13.6032 27.5 15.5109 27.5 17.5V26.25H22.5V17.5C22.5 16.837 22.2366 16.2011 21.7678 15.7322C21.2989 15.2634 20.663 15 20 15C19.337 15 18.7011 15.2634 18.2322 15.7322C17.7634 16.2011 17.5 16.837 17.5 17.5V26.25H12.5V17.5C12.5 15.5109 13.2902 13.6032 14.6967 12.1967C16.1032 10.7902 18.0109 10 20 10V10Z"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 11.25H2.5V26.25H7.5V11.25Z"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 7.5C6.38071 7.5 7.5 6.38071 7.5 5C7.5 3.61929 6.38071 2.5 5 2.5C3.61929 2.5 2.5 3.61929 2.5 5C2.5 6.38071 3.61929 7.5 5 7.5Z"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      </a>
      <a class="a-social-media__github -icon" href="https://www.github.com/marcosvced" target="_blank">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <g>
            <path
              d="M20 27.5V22.6625C20.0469 22.0664 19.9664 21.4672 19.7638 20.9047C19.5612 20.3422 19.2412 19.8293 18.825 19.4C22.75 18.9625 26.875 17.475 26.875 10.65C26.8747 8.90477 26.2034 7.22648 25 5.96248C25.5698 4.43562 25.5295 2.74792 24.8875 1.24998C24.8875 1.24998 23.4125 0.812483 20 3.09998C17.135 2.32351 14.115 2.32351 11.25 3.09998C7.8375 0.812483 6.3625 1.24998 6.3625 1.24998C5.72047 2.74792 5.68018 4.43562 6.25 5.96248C5.03766 7.23586 4.36565 8.92931 4.375 10.6875C4.375 17.4625 8.5 18.95 12.425 19.4375C12.0137 19.8624 11.6966 20.3692 11.4941 20.9249C11.2917 21.4805 11.2085 22.0726 11.25 22.6625V27.5M11.25 23.75C5 25.625 5 20.625 2.5 20L11.25 23.75Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      </a>
      <a class="a-social-media__instagram -icon" href="https://www.instagram.com/devlermve/" target="_blank">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <g>
            <path
              d="M21.25 2.5H8.75C5.29822 2.5 2.5 5.29822 2.5 8.75V21.25C2.5 24.7018 5.29822 27.5 8.75 27.5H21.25C24.7018 27.5 27.5 24.7018 27.5 21.25V8.75C27.5 5.29822 24.7018 2.5 21.25 2.5Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20 14.2125C20.1543 15.2528 19.9766 16.3153 19.4922 17.2488C19.0078 18.1823 18.2414 18.9393 17.302 19.4121C16.3626 19.8849 15.2981 20.0495 14.2597 19.8824C13.2214 19.7153 12.2622 19.2251 11.5185 18.4815C10.7749 17.7378 10.2847 16.7786 10.1176 15.7403C9.9505 14.702 10.1151 13.6374 10.5879 12.698C11.0607 11.7586 11.8177 10.9922 12.7512 10.5078C13.6847 10.0234 14.7472 9.84575 15.7875 10C16.8487 10.1574 17.8311 10.6518 18.5896 11.4104C19.3482 12.1689 19.8426 13.1514 20 14.2125Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21.875 8.125H21.8875"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      </a>
    </div>
    <index-header />
    <routes :routes="routes" />
    <NuxtChild :key="$route.params.id" />
  </div>
</template>

<script>

import Routes from '@/components/molecules/index/routes'
import Header from '@/components/molecules/index/header'

export default {
  components: {
    indexHeader: Header,
    Routes
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
@import "assets/css/pages/index/_responsive.css";
</style>
