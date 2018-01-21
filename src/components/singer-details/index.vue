<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getSingerDetails } from 'api/singer'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'
  import musicList from 'components/music-list'

  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      bgImage() {
        return this.singer.avatar
      },
      title() {
        return this.singer.name
      },
      ...mapGetters(['singer'])
    },
    created() {
      this._getSingerDetails()
    },
    components: {
      musicList
    },
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
            // console.log(response.data.list)
            this.songs = this._normalizeSongs(response.data.list)
            console.log(this.songs)
          }
        } catch (err) {
          console.log(err)
        }
      },
      _normalizeSongs(list) {
        const result = []
        list.forEach(({ musicData }) => {
          if (musicData.songid && musicData.albummid) {
            result.push(createSong(musicData))
          }
        })
        return result
      }
    }
  }
</script>
<style rel="stylesheet/stylus" lang="stylus" scoped>

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease
  }
  .slide-enter, .slider-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
