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
.-list {
  overflow-y: auto;
  margin: 0;
  list-style: none;
  padding: 10vh 0 10vh;
}

.-list::-webkit-scrollbar {
  display: none;
}

[class$='__list'] .m-list__item {
  cursor: pointer;
}

[class$='__list'] .m-list__item:not(:last-child) {
  margin-bottom: 2rem;
}

[class$='__list'] .m-list__item {
  position: relative;
  padding-left: 3rem;
}

[class$='__list'] .m-list__item:before {
  content: "";
  height: 5px;
  width: 0;
  background-color: var(--c-secondary);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  transition: width .6s var(--ease-in-out-circ);
}

[class$='__list'] .m-list__item:hover:before {
  width: 2.5rem;
}

[class$='__list'] .m-list__item.-active:before {
  width: 100%;
}

</style>
