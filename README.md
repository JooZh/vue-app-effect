# vue-app-effect
实现模拟原生app页面切换效果和缓存效果的前端设计方案, 行为上模拟了app的操作模式，前进刷新，后退缓存，保存数据和页面状态。并且可以始终保存tab菜单页面的内容不会被路由切换清除。

## 使用前提
需要 vue 2.x , vue-router 2.x 

库只是一个核心处理文件，页面结构和配置还需要参考 examples 文件夹中的结果进行搭建

注意：每个路由下的组件根节点都需要采用绝对定位的方式，不采用的话切换会有一定问题。

推荐：每个路由页面采用 [vue-app-scroller](https://github.com/JooZh/vue-app-scroller) 滚动插件来处理页面的滚动。可以不用自行处理路由切换后滚动条位置的问题。

也可以使用 `-webkit-overflow-scrolling:touch` 对固定容器进行溢出滚动的方式，使用这个需要自行处理滚动条位置问题，

## 在线演示

[Demo演示示例](https://joozh.github.io/vue-app-effect/examples)

## 安装使用

```bash
$ npm install vue-app-effect -S
```

### 参数配置 options

```js
import Vue from 'vue'
import router from './router' 
import VnodeCache from 'vue-app-effect'
// 参数配置
Vue.use(VnodeCache, {
  router,  // 必须
  tabbar: ['/bar1', '/bar2', '/bar3', '/bar4'], // 必须：
  common: '/common_route'
})
```
参数 必须：[ tabbar ] 导航菜单的路由名称建议带 / 。

参数 可选：[ common ] 可以添加一个公共路由，这个路由可以在任何地方都能打开。

### 监听事件 event
实例化 `vue-app-effect` 使用 `this.$vueAppEffect.on()` 进行事件监听。

每个一级路由下面都需要进行事件监听来处理前进和后退的结果。
```js
data () {
  return {
    Direction:{
      type: '',
      isTabBar: true,
      transitionName: ''
    }
  }
},
created () {
  // 监听前进事件
  this.$vueAppEffect.on('forward', (direction) => {
    this.Direction = direction
    // direction = {type:'forward',isTabBar:false,transitionName: ''}
  })
  // 监听返回事件
  this.$vueAppEffect.on('reverse', (direction) => {
    this.Direction = direction
    // direction = {type:'reverse',isTabBar:false,transitionName: ''}
  })
}
```
### 数据缓存

实例化 `vue-app-effect` 之后可以使用 `<vnode-cache></vnode-cache>` 进行非导航菜单缓存管理，类似于 `<keep-alive>`

```vue
<template>
  <div id="app">
    <transition :name="Direction.transitionName" :css="!!Direction.type">
      <vnode-cache>
        <router-view id="router-view"></router-view>
      </vnode-cache>
    </transition>
    <TabBar v-show="Direction.isTabBar"></TabBar>
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

路由部分，将被需要复用的组件先读取，然后保存在可全局调用的地方。

```js
import Router from 'vue-router'
// 需要被复用的组件
import Detail from '@/components/Detail/index'
// 每个动态注册的路由重复使用的页面组件。
Vue.prototype.repeatComponents = {
  Detail
}
```
实例化 `vue-app-effect` 后会得到一个 next 方法 使用 `this.$vueAppEffect.next()` 进行复用组件调用的跳转

```js
methods:{
  goDetail (index, name) {
    this.$vueAppEffect.next({
      vm:this,                // 必传，当前的 this 
      path:`/movie/${index}`, // 必传，跳转的路由
      component:this.repeatComponents.Detail,  // 跳转到的组件，可以是保存的复用组件
      params:{ id: index, name: name }              // 传递的参数
    })
  }
}

```

实例化 `vue-app-effect` 后会得到一个 back 方法 使用 `this.$vueAppEffect.back()` 进行 回退操作，一般存在于头部

```js
methods: {
    back () {
      this.$vueAppEffect.back(this)  // 只需要传入 this 
    }
  }

```
