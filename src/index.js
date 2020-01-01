//
import Vue from "vue";
import FastClick from "fastclick";
import router from "./router";
import VnodeCache from './effect-core/index'
import VueAppScroller from 'vue-app-scroller'

import App from "./components/App";
import PageView from "./components/PageView";
import PageScrollView from "./components/PageScrollView";
import TabBar from "./components/TabBar";
import ScrollView from "./components/ScrollView";

import { config } from './util.js'

// 加载必须的样式文件
require("./base.css");

function CreateEffectApp (options){
  // 引入 移动端点击延迟
  FastClick.attach(document.body);

  // 安装内置布局组件
  Vue.component("PageView", PageView);
  Vue.component("PageScrollView", PageScrollView);
  Vue.component("ScrollView", ScrollView);
  Vue.component("TabBar", TabBar);

  // 使用必须的插件
  // 滚动插件
  Vue.use(VueAppScroller);

  // 效果插件
  Vue.use(VnodeCache, {
    router,
    tabbar: config.tabBar.list.map(item => `/${item.path}`),
    common: "/" + config.commonPage
  });

  // 使用第三方组件
  if(options.components.length){
    options.components.map(component =>{
      if(Array.isArray(component)){
        Vue.component(...component);
      } else {
        throw new Error('component maybe for ["componentName", component]')
      }
    })
  }

  // 使用第三方插件
  if(options.plugins.length){
    options.plugins.map(plugin=>{
      if(Array.isArray(plugin)){
        Vue.use(...plugin);
      } else {
        Vue.use(plugin);
      }
    })
  }

  // 使用自定义配置
  if(Object.keys(options.config).length){
    Object.assign(Vue.config, options.config)
  }

  // 初始化
  let newVueConfig = {
    router,
    render: h => h(App)
  }

  // 如果使用 stroe
  if(options && options.store){
    newVueConfig.store = options.store;
  }

  // 需要在window上挂载一个 vm
  window.vm = new Vue(newVueConfig).$mount("#app");

}

export default CreateEffectApp
