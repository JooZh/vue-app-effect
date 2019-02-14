import VnodeCache from './vnode-cache'
// import './transition.css'
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
    // 插入 transition 效果文件 偷懒不用改打包文件---------------------
    const CSS = `
    .vue-app-effect-out-enter-active,
    .vue-app-effect-out-leave-active,
    .vue-app-effect-in-enter-active,
    .vue-app-effect-in-leave-active {
      will-change: transform;
      transition: all 500ms cubic-bezier(0.075, 0.82, 0.165, 1) ;
      bottom: 50px;
      top: 0;
      position: absolute;
      backface-visibility: hidden;
      perspective: 1000;
    }
    .vue-app-effect-out-enter {
      opacity: 0;
      transform: translate3d(-70%, 0, 0);
    }
    .vue-app-effect-out-leave-active {
      opacity: 0 ;
      transform: translate3d(70%, 0, 0);
    }
    .vue-app-effect-in-enter {
      opacity: 0;
      transform: translate3d(70%, 0, 0);
    }
    .vue-app-effect-in-leave-active {
      opacity: 0;
      transform: translate3d(-70%, 0, 0);
    }`
    let head = document.head || document.getElementsByTagName('head')[0]
    let style = document.createElement('style')
    style.type = 'text/css'
    if (style.styleSheet){ 
      style.styleSheet.cssText = CSS; 
    }else { 
      style.appendChild(document.createTextNode(CSS))
    } 
    head.appendChild(style)

    // 返回和前进管理
    window.$VueAppEffect = {
      'count':0,
      'paths':[]
    }
    if(common){
      window.$VueAppEffect[common] = 9999999
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
      let toIndex = Number(window.$VueAppEffect[to.path])
      let fromIndex = Number(window.$VueAppEffect[from.path])
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
            bus.$emit('forward', {type:'forward',isTab:false,transitionName:'vue-app-effect-in'})
            window.$VueAppEffect.paths.push(to.path)
          } else {                // 是返回
            // 判断是否是ios左滑返回
            if (!isPush && (Date.now() - endTime) < 377) {  
              bus.$emit('reverse', { type:'', isTab:false, transitionName:'vue-app-effect-out'})
            } else {
              bus.$emit('reverse', { type:'reverse', isTab:false, transitionName:'vue-app-effect-out'})
            }
          }
        // 是返回
        } else {
          let count = ++ window.$VueAppEffect.count
          window.$VueAppEffect.count = count
          window.$VueAppEffect[to.path] = count
          bus.$emit('forward', { type:'forward', isTab:false, transitionName:'vue-app-effect-in'})
          window.$VueAppEffect.paths.push(to.path)
        }
      // 是进入 tabbar 路由 ---------------------------------------
      } else {
        window.$VueAppEffect.paths.pop()
        // 判断是否是ios左滑返回
        if (!isPush && (Date.now() - endTime) < 377) {
          bus.$emit('reverse', { type:'', isTab:true, transitionName:'vue-app-effect-out'})
        } else {
          bus.$emit('reverse', { type:'reverse', isTab:true, transitionName:'vue-app-effect-out'})
        }
        window.$VueAppEffect.paths.push(to.path)
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
