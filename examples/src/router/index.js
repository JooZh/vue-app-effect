import Vue from 'vue'
import Router from 'vue-router'

import TabCon from '@/ComponentsLayout/TabCon/index'

import Movie from '@/ComponentsBarPages/Movie/index'
import Rank from '@/ComponentsBarPages/Rank/index'
import Singer from '@/ComponentsBarPages/Singer/index'
import Song from '@/ComponentsBarPages/Song/index'

// 需要被继承的组件
import MovieDetail from '@/ComponentsDetails/MovieDetail/index'
// import RankDetail from '@/ComponentsDetails/RankDetail/index'
// import SongDetail from '@/ComponentsDetails/SongDetail/index'
// import SingerDetail from '@/ComponentsDetails/SingerDetail/index'

Vue.use(Router)

// 每个动态注册的路由重复使用的组件
Router.prototype.extends = {
  MovieDetail
}

export default new Router({
  routes: [{
    path: '/',
    component: TabCon,
    redirect: '/movie',
    children: [ {
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
  }]
})
