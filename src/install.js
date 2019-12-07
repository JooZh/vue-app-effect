import VnodeCache from './vnode-cache.js'

function install (Vue,bus,tabbar){
  // vnode-cache 组件
  Vue.component('vnode-cache', VnodeCache(bus, tabbar))
  // 挂载方法
  Vue.prototype.$vueAppEffect = {
    // 监听事件
    on: (event, callback) => {
      bus.$on(event, callback)
    },
    // 返回上一页面
    back: ()=>{
      window.$VueAppEffect.paths.pop()
      window.vm.$router.replace({
        name: window.$VueAppEffect.paths.concat([]).pop()
      })
    },
    // 返回上一个指定的页面
    backTo: (options)=>{
      //
    },
    // 跳到下一个页面
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
    },
    // 关闭当前页面跳转到某一个页面
    redirectTo:()=>{

    },
    // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    switchTab:()=>{

    },
    // 关闭所有页面，打开到应用内的某个页面
    reLaunch:()=>{

    }
  }
}

export default install
