<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view/>
  </div>
</template>

<script>
import MHeader from 'components/m-header/index'
import Tab from 'components/tab'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "common/stylus/variable";
  #app
    color: $color-theme
</style>
