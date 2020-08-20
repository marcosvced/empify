<template>
  <fragment>
    <list :items="artists" :selected="selected" class="m-artists__list" @click="select($event.id)" />
    <info-wrapper v-if="selected" :item="selected" class="m-artists__info-wrapper" />
  </fragment>
</template>

<script>
import List from '@/components/molecules/index/list'
import InfoWrapper from '@/components/molecules/index/info-wrapper'
export default {
  name: 'Artists',
  components: { InfoWrapper, List },
  computed: {
    artists: {
      get () {
        return this.$store.getters['spotify/artists/GET_ARTISTS']
      }
    },
    selected: {
      get () {
        return this.$store.getters['spotify/artists/GET_SELECTED']
      }
    }
  },
  methods: {
    select (id) {
      this.$store.commit('spotify/artists/SET_SELECTED', id)
    }
  }
}
</script>

<style scoped>

</style>
