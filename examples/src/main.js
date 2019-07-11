// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router.js'
import config from 'app/app.json'
import VueAppScroller from 'vue-app-scroller';
import VnodeCache from '../../src/index'

require(`app/app.js`);

Vue.config.productionTip = false

FastClick.attach(document.body);

Vue.use(VueAppScroller);

Vue.use(VnodeCache, {
  router,
  tabbar: config.barPages.map(item=>`/${item}`),
  common: '/'+config.commonPage
})

window.vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

