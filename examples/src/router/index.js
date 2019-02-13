import Vue from 'vue'
import Router from 'vue-router'

// tabBar 容器
import TabCon from '@/ComponentsLayout/TabCon/index'

// tabBar 页面
import Movie from '@/ComponentsBarPages/Movie/index'
import Rank from '@/ComponentsBarPages/Rank/index'
import Singer from '@/ComponentsBarPages/Singer/index'
import Song from '@/ComponentsBarPages/Song/index'

// 需要被继承的组件
import MovieDetail from '@/ComponentsDetails/MovieDetail/index'

// 公共打开的页面
import Player from '@/ComponentsCommon/Player/index'

// 每个动态注册的路由重复使用的组件
Router.prototype.extends = {
  MovieDetail
}

Vue.use(Router)

export default new Router({
  mode: 'history',
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
  }, {
    path: '/player',
    name: '/player',
    component: Player
  }]
})
