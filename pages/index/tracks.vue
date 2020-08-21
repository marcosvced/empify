<template>
  <fragment>
    <list :items="tracks" :selected="selected" class="m-tracks__list" @click="select($event.id)" />
    <info-wrapper
      v-if="selected && isInfoOpened"
      :item="selected"
      class="m-tracks__info-wrapper"
      @close="isInfoOpened = false"
    />
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
  data () {
    return {
      isInfoOpened: true
    }
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
      },
      set (id) {
        this.$store.commit('spotify/tracks/SET_SELECTED', id)
      }
    }
  },
  watch: {
    selected () {
      this.isInfoOpened = true
    }
  },
  methods: {
    select (id) {
      this.selected = id
    }
  }
}
</script>

<style scoped>

</style>
