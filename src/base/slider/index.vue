<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :key="index" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>
<script>
import BetterScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
export default {
  data() {
    return {
      children: [],
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  components: {
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      // 如果autoplay为true,就执行_play方法
      if (this.autoPlay) {
        this._play()
      }
    }, 20) // 20毫秒经验值

    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      } else {
        this._setSliderWidth(true)
        this.slider.refresh()
      }
    })
  },
  // 组件卸载的时候清理定时器
  destroyed() {
    clearTimeout(this.timer)
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = [...this.$refs.sliderGroup.children] // 类数组转换为数组，可以用数组的forEach方法
      let width = 0
      const sliderWidth = this.$refs.slider.clientWidth
      this.children.forEach(item => {
        addClass(item, 'slider-item')
        item.style.width = sliderWidth + 'px'
        width += sliderWidth
      })
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider() {
      this.slider = new BetterScroll(this.$refs.slider, {
        scrollX: true, // 允许横向滚动
        scrollY: false, // 不允许纵向滚动
        momentum: false, // 惯性
        // snap: true,
        // snapLoop: this.loop, // better-scroll升级到最新版，应该用下面的写法
        snap: {
          loop: this.loop
        },
        snapThreshold: 0.3,
        snapSpeed: 400,
        click: true
      })
      this.slider.on('scrollEnd', () => {
        const pageIndex = this.slider.getCurrentPage().pageX
        // if (this.loop) {
        //   // 如果无缝滚动，pageIndex需要减1，因为前面加了一个DOM元素
        //   pageIndex -= 1
        // }
        // 新版本betterScroll修复这个问题
        this.currentPageIndex = pageIndex

        // 滚动完毕时，如果是自动播放就先清理定时器
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _play() {
      // 对应到第几个元素
      const pageIndex = this.currentPageIndex + 1
      this.timer = setInterval(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  }
}
</script>
<style rel="stylesheet/stylus" lang="stylus" scoped>
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
