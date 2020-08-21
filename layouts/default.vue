<template>
  <div id="empify-app">
    <Nuxt />
    <transition-fade>
      <searcher v-if="isSearcherOpened" />
    </transition-fade>
  </div>
</template>

<style>
</style>
<script>
import TransitionFade from '@/components/shared/transition-fade'
import Searcher from '@/components/shared/searcher'
export default {
  components: { Searcher, TransitionFade },
  computed: {
    isSearcherOpened: {
      get () {
        return this.$store.getters['searcher/GET_STATE']
      }
    }
  }
}
</script>
