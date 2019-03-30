// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import VueAppScroller from 'vue-app-scroller';

import router from './router'
import VnodeCache from '../../src/index'

import '@/assets/css/reset.css'
import '@/assets/css/common.styl'

Vue.config.productionTip = false

FastClick.attach(document.body)

Vue.use(VueAppScroller);

Vue.use(VnodeCache, {
  router,
  tabbar: ['/movie', '/rank', '/song', '/singer'],
  common: '/player'
})


window.vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})