import Vue from 'vue'
import Router from 'vue-router'

import Rank from 'components/rank'
import Recommend from 'components/recommend'
import Search from 'components/search'
import Singer from 'components/singer'
import SingerDetails from 'components/singer-details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetails
        }
      ]
    }
  ]
})
