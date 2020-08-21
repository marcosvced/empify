<template>
  <fragment>
    <list :items="artists" :selected="selected" class="m-artists__list" @click="select($event.id)" />
    <info-wrapper
      v-if="selected && isInfoOpened"
      :item="selected"
      class="m-artists__info-wrapper"
      @close="isInfoOpened = false"
    />
  </fragment>
</template>

<script>
import List from '@/components/molecules/index/list'
import InfoWrapper from '@/components/molecules/index/info-wrapper'

export default {
  name: 'Artists',
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
    artists: {
      get () {
        return this.$store.getters['spotify/artists/GET_ARTISTS']
      }
    },
    selected: {
      get () {
        return this.$store.getters['spotify/artists/GET_SELECTED']
      },
      set (id) {
        this.$store.commit('spotify/artists/SET_SELECTED', id)
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
