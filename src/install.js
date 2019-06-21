import VnodeCache from './vnode-cache.js'
function install (Vue,bus,tabbar){
  // vnode-cache 组件
  Vue.component('vnode-cache', VnodeCache(bus, tabbar))
  
  Vue.prototype.$vueAppEffect = {
    on: (event, callback) => {
      bus.$on(event, callback)
    },
    back: (vm)=>{
      window.$VueAppEffect.paths.pop()
      vm.$router.replace({
        name: window.$VueAppEffect.paths.concat([]).pop()
      })
    },
    next: (options)=>{
      let newPath = options.path
      let newRoute = [{
        path: newPath,
        name: newPath,
        component: {extends: options.component}
      }]
      // 判断路由是否存在
      let find = options.vm.$router.options.routes.findIndex(item => {
        return item.path === newPath
      })
      // 不存在 添加一个新路由
      if (find === -1) {
        options.vm.$router.options.routes.push(newRoute[0])
        options.vm.$router.addRoutes(newRoute)
      }
      // 然后跳转
      options.vm.$router.replace({
        name: newPath,
        params: options.params
      })
    }
  }
}
export default install