<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img @load="imageLoad" :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list" :data="discList">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="(item, index) in discList" :key="index">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.cover" alt="图片">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.title"></h2>
                <p class="desc" v-html="item.rcmdcontent"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
  import { getRecommend, getAllList } from 'api/recommend'
  import { ERR_OK } from 'api/config' // 语义化
  import Slider from 'base/slider'
  import Scroll from 'base/scroll'
  export default {
    data() {
      return {
        recommends: [],
        discList: []
      }
    },
    components: {
      Slider,
      Scroll
    },
    created() {
      this._getRecommend()
      this._getAllList()
    },
    methods: {
      _getRecommend() {
        getRecommend()
          .then(response => {
            if (response.code === ERR_OK) {
              this.recommends = response.data.slider
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      _getAllList() {
        getAllList()
          .then(response => {
            if (response.code === ERR_OK) {
              // console.log(response.recomPlaylist.data.v_hot)
              this.discList = response.recomPlaylist.data.v_hot
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      imageLoad() {
        if (!this.checkLoad) {
          this.$refs.scroll.refresh()
          this.checkLoad = true // 保证 scroll 刷新一次就好了
        }
      }
    }
  }
</script>
<style rel="stylesheet/stylus" lang="stylus" scoped>
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
