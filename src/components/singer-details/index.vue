<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getSingerDetails } from 'api/singer'
  import { ERR_OK } from 'api/config'
  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['singer'])
    },
    created() {
      this._getSingerDetails()
    },
    components: {},
    methods: {
      async _getSingerDetails() {
        // 如果没有 mid 就跳转回去
        if (!this.singer.mid) {
          this.$router.push('/singer')
          return
        }
        try {
          const response = await getSingerDetails(this.singer.mid)
          if (response.code === ERR_OK) {
            console.log(response.data.list)
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
</script>
<style rel="stylesheet/stylus" lang="stylus" scoped>
  @import "~common/stylus/variable"
  .singer-detail {
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease
  }
  .slide-enter, .slider-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
