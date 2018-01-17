<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
  import BetterScroll from 'better-scroll'
  export default {
    data() {
      return {}
    },
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      }
    },
    components: {},
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) return // 使代码更健壮
        this.scroll = new BetterScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh() // 刷新，重新计算高度
      }
    },
    watch: {
      // 监听 data 的变化，data 变化了刷新 scroll
      data() {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>
<style>
</style>
