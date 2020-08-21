<template>
  <div class="o-index">
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
