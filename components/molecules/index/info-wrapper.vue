<template>
  <div>
    <svg
      class="a-icon__close"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      @click="$emit('close')"
    >
      <path
        d="M19.8617 12.1502H5.86166"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.8617 19.1502L5.86166 12.1502L12.8617 5.15024"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <div class="overlay" />
    <figure class="m-tracks__figure">
      <img :src="cover" alt="cover">
    </figure>
    <p>{{ item.name }}</p>
  </div>
</template>

<script>
import Album from '@/modules/spotify/album'
import Track from '@/modules/spotify/track'
import Artist from '@/modules/spotify/artist'

export default {
  name: 'InfoWrapper',
  props: {
    item: {
      type: [Track, Album, Artist],
      default: null
    }
  },
  computed: {
    cover: {
      get () {
        if (this.item.album) {
          return this.item.album.cover
        }
        return this.item.cover ? this.item.cover : require('@/assets/img/404.png')
      }
    }
  }
}
</script>

<style scoped>
@import "assets/css/components/molecules/index/info-wrapper/_styles.css";
@import "assets/css/components/molecules/index/info-wrapper/_responsive.css";
</style>
