<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif" alt="loading">
    <p class="desc">{{ title }}</p>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    },
    components: {},
    methods: {}
  }
</script>
<style rel="stylesheet/stylus" lang="stylus" scoped>
  @import "~common/stylus/variable"
  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l

</style>
