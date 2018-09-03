# vue-app-effect
实现模拟原生app页面切换效果和缓存效果的前端设计方案, 行为上模拟了app的操作模式，前进刷新，后退缓存，保存数据和页面状态。并且可以始终保存tab菜单页面的内容不会被路由切换清除。

## 使用前提
需要 vue 2.x , vue-router 2.x , vuex 2.x

库只是一个核心处理文件，页面结构和配置还需要参考 examples 文件夹中的结果进行搭建

注意：每个路由下的组件根节点都需要采用绝对定位的方式，不采用的话切换会有一定问题。

推荐：每个路由页面采用 [better-scroll](https://github.com/ustbhuangyi/better-scroll) 滚动插件来处理页面的滚动。可以不用自行处理路由切换后滚动条位置的问题。

也可以使用 `-webkit-overflow-scrolling:touch` 对固定容器进行溢出滚动的方式，使用这个需要自行处理滚动条位置问题，可以参考 demo示例

## 在线演示

[Demo演示示例](https://joozh.github.io/vue-app-effect/)

[完整音乐App示例](https://joozh.cn/music/)

## 安装使用

```bash
$ npm install vue-app-effect -S
```

### 参数配置 options

```js
import Vue from 'vue'
import router from './router' 
import store from './store' 
import VnodeCache from 'vue-app-effect'
// 参数配置
Vue.use(VnodeCache, {
  router, // 必须
  store,  // 必须
  tabbar: ['/bar1', '/bar2', '/bar3', '/bar4'], // 必须：
  common: '/common_route'
})
```
参数 必须：[ tabbar ] 导航菜单的路由名称建议带 / 。

参数 可选：[ common ] 可以添加一个公共路由，这个路由可以在任何地方都能打开。

### 监听事件 event
实例化 `vue-app-effect` 使用 `this.$direction.on()` 进行事件监听

```js
created () {
  // 监听前进事件
  this.$direction.on('forward', (direction) => {
   console.log(direction)  // 空 或者 forward
  })
  // 监听返回事件
  this.$direction.on('reverse', (direction) => {
    console.log(direction)  // 空 或者 reverse
  })
}
```
### 数据缓存

实例化 `vue-app-effect` 之后可以使用 `<vnode-cache></vnode-cache>` 进行非导航菜单缓存管理，类似于 `<keep-alive>`

```vue
<template>
  <div id="app">
    <transition :name="transitionName" :css="!!direction">
      <vnode-cache>
        <router-view class="router-view"></router-view>
      </vnode-cache>
    </transition>
    <TabBar></TabBar>
  </div>
</template>
```
在 tabbar 路由的子路由的容器下使用 `<keep-alive>` 进行导航页面的路由缓存。

```vue
<template>
  <div>
    <keep-alive>
      <router-view class="tab-router-view"></router-view>
    </keep-alive>
  </div>
</template>
```

具体配置参考 [示例文件](https://github.com/JooZh/vue-app-effect/tree/master/examples)

## 动态路由实现多组件独立复用

在有些情况下需要不同路由打开同一个组件，而且在同一个组件中打开自己，这种情况下可以采用动态注册路由的方式

路由部分

```js
import Router from 'vue-router'
// 需要被继承的组件
import Detail from '@/components/Detail/index'
// 挂载到原型
Router.prototype.extends = {
  Detail
}
```
组件中调用

```js
goDetail (index, name) {
  // 创建一个新路由
  let newPath = `/movie/${index}`
  let newRoute = [{
    path: newPath,
    name: newPath,
    component: {extends: this.$router.extends.Detail}
  }]
  // 判断路由是否存在 不存在 添加一个新路由
  let find = this.$router.options.routes.findIndex(item => item.path === newPath)
  if (find === -1) {
    this.$router.options.routes.push(newRoute[0])
    this.$router.addRoutes(newRoute)
  }
  // 存在直接跳转到路由
  this.$router.push({
    name: newPath,
    params: { id: index, name: name }
  })
}

```
