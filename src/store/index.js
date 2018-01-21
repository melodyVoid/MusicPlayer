import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import * as gutters from './gutters'
import * as actions from './actions'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
// 开发环境用严格模式，生产环境不用
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  actions,
  mutations,
  gutters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
