<template>
  <div>
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
[class$='__info-wrapper'] {
  display: grid;
  grid-template-columns: 45% 15% auto;
  position: relative;
  overflow: hidden;
}

[class$='__info-wrapper'] figure {
  position: relative;
  z-index: -1;
  grid-column-start: 1;
  grid-column: 1 / span 2;
  align-self: end;
}
[class$='__info-wrapper'] .overlay {
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, transparent 65%, var(--c-dark));
  position: absolute;
}
[class$='__info-wrapper'] figure img {
  display: block;
  width: 100%;
}

[class$='__info-wrapper'] p {
  grid-column-start: 2;
  grid-column: 2 / span 2;
  position: absolute;
  align-self: center;
  font-size: var(--f-size-x-large);
  font-weight: bold;
  color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: var(--c-light);
  padding-right: 1rem;
  padding-left: 1rem;
}
</style>
