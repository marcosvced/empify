<!--TODO: load more info when scrolling is complete-->
<template>
  <ul
    v-if="items"
    class="-list"
  >
    <li
      v-for="item in items"
      :key="item.id"
      :class="`m-list__item ${selected === item?'-active':''}`"
      @click="$emit('click', item)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
import Album from '@/modules/spotify/album'
import Artist from '@/modules/spotify/artist'
import Track from '@/modules/spotify/track'

export default {
  name: 'List',
  props: {
    items: {
      type: Array,
      require: true,
      default: null
    },
    selected: {
      type: [Track, Album, Artist],
      default: null
    }
  }
}
</script>

<style scoped>
@import "assets/css/components/molecules/index/list/_styles.css";
@import "assets/css/components/molecules/index/list/_responsive.css";
</style>
