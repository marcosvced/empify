<template>
  <div class="content-scroll__wrapper">
    <div ref="scroll">
      <div ref="scroll-content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>

import { Smooth } from '@/modules/smooth'

export default {
  name: 'SmoothScroll',
  data () {
    return {
      smooth: null
    }
  },
  mounted () {
    this.smooth = new Smooth(this.$refs.scroll, this.$refs['scroll-content'])
  },
  methods: {
    beforeDestroy () {
      this.smooth.off()
    }
  }

}
</script>

<style scoped>

</style>
