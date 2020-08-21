<template>
  <div class="m-index__header">
    <span class="a-header__logo">Empify .</span>
    <div class="m-header__wrapper">
      <div class="a-header__searcher" @click="$store.dispatch('searcher/OPEN')">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <path
            d="M13.5417 19.7917C8.93929 19.7917 5.20833 16.0607 5.20833 11.4583C5.20833 6.85596 8.93929 3.125 13.5417 3.125C18.144 3.125 21.875 6.85596 21.875 11.4583C21.875 16.0607 18.144 19.7917 13.5417 19.7917Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.125 21.875L7.65625 17.3438"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Search</span>
      </div>
      <div class="a-header__logout" @click="$store.dispatch('auth/LOGOUT')">
        Logout
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
@import "assets/css/components/molecules/index/header/_styles.css";
@import "assets/css/components/molecules/index/header/_responsive.css";
</style>
