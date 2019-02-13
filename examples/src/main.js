// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'

import router from './router'
import store from './store/index'

import '@/assets/css/reset.css'
import '@/assets/css/vux.css'

import VnodeCache from '../../src/index'

Vue.config.productionTip = false

FastClick.attach(document.body)

Vue.use(VnodeCache, {
  router,
  store,
  tabbar: ['/movie', '/rank', '/song', '/singer'],
  common: '/player'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
