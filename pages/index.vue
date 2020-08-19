<template>
  <div class="o-index">
    Index
    <searcher />
  </div>
</template>

<script>

import Searcher from '@/components/searcher'
export default {
  components: { Searcher },
  middleware: ['auth', 'user']

}
</script>

<style scoped>

</style>
