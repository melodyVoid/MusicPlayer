<template>
  <div id="app">
    <m-header></m-header>
    <router-view/>
  </div>
</template>

<script>
import MHeader from './components/m-header'
export default {
  name: 'App',
  components: {
    MHeader
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "common/stylus/variable";
  #app
    color: $color-theme
</style>
