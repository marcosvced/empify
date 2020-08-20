<template>
  <fragment>
    <list :items="tracks" :selected="selected" class="m-tracks__list" @click="select($event.id)" />
    <info-wrapper v-if="selected" :item="selected" class="m-tracks__info-wrapper" />
  </fragment>
</template>

<script>
import List from '@/components/molecules/index/list'
import InfoWrapper from '@/components/molecules/index/info-wrapper'

export default {
  name: 'Tracks',
  components: {
    InfoWrapper,
    List
  },
  computed: {
    tracks: {
      get () {
        return this.$store.getters['spotify/tracks/GET_TRACKS']
      }
    },
    selected: {
      get () {
        return this.$store.getters['spotify/tracks/GET_SELECTED']
      }
    }
  },
  methods: {
    select (id) {
      this.$store.commit('spotify/tracks/SET_SELECTED', id)
    }
  }
}
</script>

<style scoped>

</style>
