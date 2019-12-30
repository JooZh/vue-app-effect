//
import FastClick from "fastclick";
import router from "./router";
import VnodeCache from './core/index'
import VueAppScroller from 'vue-app-scroller'

import App from "./components/App";
import PageView from "./components/PageView";
import TabBar from "./components/TabBar";
import { config } from './util.js'

require("./base.css");

function InitEffectApp (Vue,options){
  Vue.config.productionTip = false;
  // 引入
  FastClick.attach(document.body);
  // 安装组件
  Vue.component("PageView", PageView);
  Vue.component("TabBar", TabBar);
  // 使用插件
  Vue.use(VueAppScroller);
  Vue.use(VnodeCache, {
    router,
    tabbar: config.tabBar.list.map(item => `/${item.path}`),
    common: "/" + config.commonPage
  });

  if(options.plugins.length){
    options.plugins.map(plugin=>{
      if(Array.isArray(plugin)){
        Vue.use(...plugin);
      } else {
        Vue.use(plugin);
      }
    })
  }
  // 初始化
  let newVueConfig = {
    router,
    render: h => h(App)
  }
  if(options && options.store){
    newVueConfig.store = options.store;
  }
  window.vm = new Vue(newVueConfig).$mount("#app");
}

export default InitEffectApp
