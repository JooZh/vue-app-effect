import Vue from 'vue'
import Router from 'vue-router'

// tabBar 容器
import TabCon from '@/ComponentsLayout/TabCon/index'

// tabBar 页面
import Movie from '@/ComponentsBarPages/Movie/index'
import Rank from '@/ComponentsBarPages/Rank/index'
import Singer from '@/ComponentsBarPages/Singer/index'
import Song from '@/ComponentsBarPages/Song/index'

// 需要重复使用的组件
import MovieDetail from '@/ComponentsDetails/MovieDetail/index'
import SingerDetail from '@/ComponentsDetails/SingerDetail/index'

// 公共打开的页面
import Player from '@/ComponentsCommon/Player/index'

// 每个动态注册的路由重复使用的页面组件。
Vue.prototype.repeatComponents = {
  MovieDetail,
  SingerDetail
}

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: TabCon,
    redirect: '/movie',
    children: [
      {
        path: '/movie',
        name: '/movie',
        component: Movie
      }, {
        path: '/singer',
        name: '/singer',
        component: Singer
      }, {
        path: '/rank',
        name: '/rank',
        component: Rank
      }, {
        path: '/song',
        name: '/song',
        component: Song
      }]
    }, {
      path: '/player',
      name: '/player',
      component: Player
    }
  ]
})
