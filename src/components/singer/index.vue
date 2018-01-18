<template>
  <div class="singer">
    歌手页面
  </div>
</template>
<script>
  import { getSingerList } from 'api/singer'
  import { ERR_OK } from 'api/config'

  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    components: {},
    methods: {
      async _getSingerList() {
        try {
          const response = await getSingerList()
          if (response.code === ERR_OK) {
            this.singers = response.data.list
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
  .singer {
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
  }
</style>
