<template>
  <fragment>
    <list :items="albums" :selected="selected" class="m-albums__list" @click="select($event.id)" />
    <info-wrapper
      v-if="selected && isInfoOpened"
      :item="selected"
      class="m-albums__info-wrapper"
      @close="isInfoOpened = false"
    />
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
  data () {
    return {
      isInfoOpened: true
    }
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
      },
      set (id) {
        this.$store.commit('spotify/albums/SET_SELECTED', id)
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
