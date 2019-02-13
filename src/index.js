import VnodeCache from './vnode-cache'
export default {
  install: (Vue, { router, store, tabbar, common = '' } = {}) => {
    if (!router || !store || !tabbar) {
      console.error('vue-app-effect need options: router, tabbar and store')
      return
    }
    const bus = new Vue()
    // 注册一个store模块
    store.registerModule('NAV_DIRECTION', {
      state: {
        direction: 'forward'
      },
      mutations: {
        'NAV_DIRECTION_UPDATE' (state, payload) {
          state.direction = payload.direction
        }
      }
    })
    // 监听页面主动刷新
    window.addEventListener('load', () => {
      router.replace({path: '/'})
    })
    // 返回和前进管理
    window.sessionStorage.clear()
    window.sessionStorage.setItem('count', 0)
    window.sessionStorage.setItem('/', 0)
    common && window.sessionStorage.setItem(common, 999999)

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

    router.beforeEach(function (to, from, next) {
      const toIndex = Number(window.sessionStorage.getItem(to.path))
      const fromIndex = Number(window.sessionStorage.getItem(from.path))
      // 进入新路由 判断是否为tabBar
      let find = tabbar.findIndex(item => item === to.path)
      // 不是回tabBar
      if (find === -1) {
        if (toIndex) {
          // 不是返回
          if ((toIndex > fromIndex)) {
            bus.$emit('forward', {type:'forward',isTab:false})
            store.commit('NAV_DIRECTION_UPDATE', {direction: 'forward'})
          } else {
            // 判断是否是ios左滑返回
            if (!isPush && (Date.now() - endTime) < 377) {
              bus.$emit('reverse', { type:'', isTab:false })
              store.commit('NAV_DIRECTION_UPDATE', {direction: ''})
            } else {
              bus.$emit('reverse', { type:'reverse', isTab:false })
              store.commit('NAV_DIRECTION_UPDATE', { direction: 'reverse' })
            }
          }
        // 是返回
        } else {
          let count = ++window.sessionStorage.count
          window.sessionStorage.setItem('count', count)
          window.sessionStorage.setItem(to.path, count)
          bus.$emit('forward', { type:'forward', isTab:false })
          store.commit('NAV_DIRECTION_UPDATE', {direction: 'forward'})
        }
        // 是外链
        if (/\/http/.test(to.path)) {
          let url = to.path.split('http')[1]
          window.location.href = `http${url}`
        } else {
          next()
        }
      // 是回 tabbar
      } else {
        // 判断是否是ios左滑返回
        if (!isPush && (Date.now() - endTime) < 377) {
          bus.$emit('reverse', { type:'', isTab:true })
          store.commit('NAV_DIRECTION_UPDATE', {direction: ''})
        } else {
          bus.$emit('reverse', { type:'reverse', isTab:true })
          store.commit('NAV_DIRECTION_UPDATE', { direction: 'reverse' })
        }
        next()
      }
    })

    router.afterEach(function () {
      isPush = false
    })

    Vue.component('vnode-cache', VnodeCache(bus, tabbar))
    
    Vue.direction = Vue.prototype.$direction = {
      on: (event, callback) => {
        bus.$on(event, callback)
      }
    }
  }
}
