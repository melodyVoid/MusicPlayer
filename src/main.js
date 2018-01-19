import 'babel-polyfill' // 最先引用, 辅助ES6的一些操作
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: require('common/image/loading.jpg')
})

fastclick.attach(document.body) // 移动端点击没有300毫秒的延迟
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
