import VnodeCache from './vnode-cache'
export default {
  install: (Vue, { router, tabbar, common = '' } = {}) => {
    // 判断参数的完整性
    if (!router || !tabbar) {
      console.error('vue-app-effect need options: router, tabbar')
      return
    }
    
    // 监听页面主动刷新
    window.addEventListener('load', () => {
      router.replace({path: '/'})
    })
    // 返回和前进管理
    window.NavStorage = {
      'count':0,
      'paths':[]
    }
    if(common){
      window.NavStorage[common] = 9999999
    }
    
    let isPush = false
    let endTime = Date.now()
    let methods = ['push', 'go', 'replace', 'forward', 'back']
    document.addEventListener('touchend', () => {
      endTime = Date.now()
    })
    methods.forEach(key => {
      let method = router[key].bind(router)
      router[key] = function (...args) {
        isPush = true
        method.apply(null, args)
      }
    })

    // 数据传递
    const bus = new Vue()
    router.beforeEach((to, from, next)=>{
      // 如果是外链直接跳转
      if (/\/http/.test(to.path)) {
        window.location.href = to.path
        return
      }
      // 不是外链的情况下
      // 得到来去的路由序列编号
      let toIndex = Number(window.NavStorage[to.path])
      let fromIndex = Number(window.NavStorage[from.path])
      fromIndex = fromIndex ? fromIndex : 0
      // 进入新路由 判断是否为 tabBar
      let toIsTabBar = tabbar.findIndex(item => item === to.path)
      // 当前路由 判断是否为 tabBar
      let formIsTabBar = tabbar.findIndex(item => item === from.path)
      // 不是进入 tabBar 路由 --------------------------
      if (toIsTabBar === -1) {
        // 层级大于0 即非导航层级
        if (toIndex > 0) {
          // 判断是不是返回
          if (toIndex > fromIndex) { // 不是返回
            bus.$emit('forward', {type:'forward',isTab:false})
            window.NavStorage.paths.push(to.path)
          } else {                // 是返回
            // 判断是否是ios左滑返回
            if (!isPush && (Date.now() - endTime) < 377) {  
              bus.$emit('reverse', { type:'', isTab:false })
            } else {
              bus.$emit('reverse', { type:'reverse', isTab:false })
            }
          }
        // 是返回
        } else {
          let count = ++ window.NavStorage.count
          window.NavStorage.count = count
          window.NavStorage[to.path] = count
          bus.$emit('forward', { type:'forward', isTab:false })
          window.NavStorage.paths.push(to.path)
        }
      // 是进入 tabbar 路由 ---------------------------------------
      } else {
        window.NavStorage.paths.pop()
        // 判断是否是ios左滑返回
        if (!isPush && (Date.now() - endTime) < 377) {
          bus.$emit('reverse', { type:'', isTab:true })
        } else {
          bus.$emit('reverse', { type:'reverse', isTab:true })
        }
        window.NavStorage.paths.push(to.path)
      }
      next()
    })

    router.afterEach(function () {
      isPush = false
    })

    // vnode-cache 组件
    Vue.component('vnode-cache', VnodeCache(bus, tabbar))
    
    Vue.direction = Vue.prototype.$direction = {
      on: (event, callback) => {
        bus.$on(event, callback)
      }
    }
  }
}
