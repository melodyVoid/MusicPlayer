<template>
  <div class="singer">
    <list-view :data="singers" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
  import { getSingerList } from 'api/singer'
  import { ERR_OK } from 'api/config'
  import ListView from 'base/listview'
  import { mapMutations } from 'vuex'
  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10
  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    components: {
      ListView
    },
    methods: {
      selectSinger(singer) {
        this.$router.push(`/singer/${singer.id}`)
        this.setSinger(singer)
      },
      async _getSingerList() {
        try {
          const response = await getSingerList()
          if (response.code === ERR_OK) {
            this.singers = this._normalizeSinger(response.data.list)
          }
        } catch (err) {
          console.log(err)
        }
      },
      _normalizeSinger(list) {
        const map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            // 热门歌手里面只加 10 条
            map.hot.items.push({
              id: item.Fsinger_id,
              mid: item.Fsinger_mid,
              name: item.Fsinger_name,
              avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
            })
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push({
            id: item.Fsinger_id,
            mid: item.Fsinger_mid,
            name: item.Fsinger_name,
            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
          })
        })
        const hot = []
        const rest = []
        // 为了得到有序列表，我们需要处理 map
        for (const key of Object.keys(map)) {
          const value = map[key]
          if (value.title.match(/[a-zA-Z]/)) {
            rest.push(value)
          } else if (value.title === HOT_NAME) {
            hot.push(value)
          }
        }
        // 排序
        rest.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return [...hot, ...rest]
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
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
