<template>
  <ul class="m-index__routes">
    <li v-for="route in routes" :key="route.name" class="`a-wrapper__item">
      <nuxt-link :to="route.link" :active-class="'-active'">
        {{ route.name }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Routes',
  props: {
    routes: {
      type: undefined,
      default: [],
      require: true
    }
  }
}
</script>

<style scoped>
@import "assets/css/components/molecules/index/routes/_styles.css";
</style>
