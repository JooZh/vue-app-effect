import VnodeCache from './vnode-cache.js'
function install (Vue,bus,tabbar){
  // vnode-cache 组件
  Vue.component('vnode-cache', VnodeCache(bus, tabbar))

  Vue.prototype.$vueAppEffect = {
    on: (event, callback) => {
      bus.$on(event, callback)
    },
    back: ()=>{
      window.$VueAppEffect.paths.pop()
      window.vm.$router.replace({
        name: window.$VueAppEffect.paths.concat([]).pop()
      })
    },
    backTo: (options)=>{
      //
    },
    next: (options)=>{
      let routePath = options.path
      routePath = routePath.indexOf('/') !== 0 ? `/${routePath}` : routePath;
      // 判断路由是否存在
      let find = window.vm.$router.options.routes.findIndex(item => {
        return item.path === routePath
      })
      // 不存在 添加一个新路由
      if (find === -1) {
        // 找出匹配的重复使用组件
        let routeName=  routePath.split('/')
        routeName.pop()
        routeName = routeName.join('/');

        let route = window.vm.$router.options.routes.find(item => {
          return item.path === routeName
        })
        if(!route){
          throw Error(routeName+' is not defined');
        }
        let newRoute = [{
          path: routePath,
          name: routePath,
          component: {extends: route.component}
        }]

        window.vm.$router.options.routes.push(newRoute[0])
        window.vm.$router.addRoutes(newRoute)
      }
      // 然后跳转
      window.vm.$router.replace({
        name: routePath,
        params: options.params
      })
    }
  }
}

export default install
