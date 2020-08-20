<template>
  <fragment>
    <list :items="albums" :selected="selected" class="m-albums__list" @click="select($event.id)" />
    <info-wrapper v-if="selected" :item="selected" class="m-albums__info-wrapper" />
  </fragment>
</template>

<script>
import List from '@/components/molecules/index/list'
import InfoWrapper from '@/components/molecules/index/info-wrapper'

export default {
  name: 'Albums',
  components: {
    InfoWrapper,
    List
  },
  computed: {
    albums: {
      get () {
        return this.$store.getters['spotify/albums/GET_ALBUMS']
      }
    },
    selected: {
      get () {
        return this.$store.getters['spotify/albums/GET_SELECTED']
      }
    }
  },
  methods: {
    select (id) {
      this.$store.commit('spotify/albums/SET_SELECTED', id)
    }
  }
}
</script>

<style scoped>

</style>
