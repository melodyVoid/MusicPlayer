<template>
  <scroll class="listview" :data="data" ref="listview">
    <ul>
      <li v-for="(group, index) in data" :key="index" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li v-for="item in group.items" :key="item.id" class="list-group-item">
            <img v-lazy="item.avatar" alt="头像" class="avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li class="item" v-for="(item, index) in shortcutList" :key="index" :data-index="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </scroll>
</template>
<script>
  import Scroll from 'base/scroll'
  import { getData } from 'common/js/dom'
  const ANCHOR_HEIGHT = 18 // 样式定义来的
  export default {
    data() {
      return {}
    },
    created() {
      this.touch = {}
    },
    components: {
      Scroll
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      shortcutList() {
        return this.data.map(group => group.title.substr(0, 1))
      }
    },
    methods: {
      onShortcutTouchStart(e) {
        // 获取索引
        const anchorIndex = getData(e.target, 'index') // 注意：这里是字符串
        const firstTouch = e.touches[0] // 第一次触碰的位置
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex // 记录第一次点击的时候是第几个锚点的索引
        // this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 0) // 封装在了_scrollTo 方法里面
        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove(e) {
        const firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        const deltaY = this.touch.y2 - this.touch.y1 // Y 轴上的偏移
        const delta = deltaY / ANCHOR_HEIGHT | 0 // 或0是向下取整，这句话的意思是在 Y 轴上偏移了几个锚点
        const anchorIndex = parseInt(this.touch.anchorIndex) + delta // 滑动后的锚点索引
        this._scrollTo(anchorIndex)
      },
      _scrollTo(index) {
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
