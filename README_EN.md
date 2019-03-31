# vue-app-effect
The front-end design scheme is designed to simulate the switching effect and caching effect of the native App page. The operation mode of the App is simulated on the behavior, and the data and page state are saved by forward refreshing and back caching. And you can always save the content of the TAB menu page without being cleared by the router switch.

[Englist Document](https://github.com/JooZh/vue-app-effect/blob/master/README_EN.md)

## Premise
Need vue 2.x , vue-router 2.x 

The library is only a core file, and the page structure and configuration need to be built against the results in the examples folder

**Note**: the component root node under each routing needs to be positioned in an absolute manner, and switching without this will be problematic.

**Recommendation**: each routing page takes [better-scroll](https://github.com/ustbhuangyi/better-scroll) the scroll plug-in handles the scrolling of the page. You don't have to deal with the scroll bar location after routing switching.

You can use it `-webkit-overflow-scrolling:touch` see the demo example for a way to do overflow scrolling on a stationary container, which requires you to handle the scroll bar location on your own

## Demo

[Simple Demo](https://joozh.github.io/vue-app-effect/)

[Full Music App Demo](https://joozh.cn/music/)

## Install

```bash
$ npm install vue-app-effect -S
```

### Options

```js
import Vue from 'vue'
import router from './router' 
import VnodeCache from 'vue-app-effect'
// Parameter configuration
Vue.use(VnodeCache, {
  router, // necessary
  tabbar: ['/bar1', '/bar2', '/bar3', '/bar4'], // necessary
  common: '/common_route' // optional
})
```
options necessary：[ tabbar ] The route name of the navigation menu advice with / .

options optional：[ common ] you can add a public route that can be opened anywhere.

### Event
Instantiation `vue-app-effect` use `this.$direction.on()` event monitoring

```js
created () {
  // listen forward
  this.$direction.on('forward', (direction) => {
   console.log(direction)  //{type:'forward',isTab:false}
  })
  // listen reverse
  this.$direction.on('reverse', (direction) => {
    console.log(direction)  // {type:'reverse',isTab:false}
  })
  // type value are 'forward', 'reverse', ''
}
```
### `<vnode-cache>`

Instantiation `vue-app-effect` and then you can use `<vnode-cache></vnode-cache>` non-navigational menu cache management，similar to the `<keep-alive>`

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
Used under the container for subpaths of tabbar routing `<keep-alive>` cache for navigation pages.

```vue
<template>
  <div>
    <keep-alive>
      <router-view class="tab-router-view"></router-view>
    </keep-alive>
  </div>
</template>
```

Specific configuration reference [Sample files](https://github.com/JooZh/vue-app-effect/tree/master/examples)

## Dynamic routing realizes multicomponent independent reuse

In cases where you need different routes to open the same component and open yourself in the same component, you can dynamically register the routing

router.js

```js
import Router from 'vue-router'
// Components that need to be inherited
import Detail from '@/components/Detail/index'
// Mount to prototype
Router.prototype.extends = {
  Detail
}
```
with methods

```js
methods:{
  goDetail (index, name) {
    // new router
    let newPath = `/movie/${index}`
    let newRoute = [{
      path: newPath,
      name: newPath,
      component: {extends: this.$router.extends.Detail}
    }]
    // To determine if a routing exists or does not exist add a new routing
    let find = this.$router.options.routes.findIndex(item => item.path === newPath)
    if (find === -1) {
      this.$router.options.routes.push(newRoute[0])
      this.$router.addRoutes(newRoute)
    }
    // There is a direct jump to routing
    this.$router.replace({
      name: newPath,
      params: { id: index, name: name }
    })
  }
}

```
The back button use a special method

```js
methods: {
  back () {
    window.NavStorage.paths.pop()
    let newNavStorage = window.NavStorage.paths.concat([])
    let path = newNavStorage.pop()
    this.$router.replace({
      name: path
    })
  }
}

```