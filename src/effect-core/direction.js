function deriection(router,bus,tabbar,common){
  // 添加一个新的战队列存放
  router.$task = [];
  const tabBar = router.options.routes[0].children

  console.log(tabBar)

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

  router.beforeEach((to, from, next)=>{
    // 如果是外链直接跳转
    if (/\/http/.test(to.path)) {
      window.location.href = to.path
      return
    }
    // 否则保存待跳转的路由
    router.$task.push(router.history.pending)

    console.log(router)

    // 不是外链的情况下
    // 得到来去的路由序列编号
    let toIndex = Number(window.$VueAppEffect[to.path])
    let fromIndex = Number(window.$VueAppEffect[from.path])
    fromIndex = fromIndex ? fromIndex : 0
    // 进入新路由 判断是否为 tabBar
    let toIsTabBar = tabbar.findIndex(item => item.path === to.path)
    // 当前路由 判断是否为 tabBar
    // let formIsTabBar = tabbar.findIndex(item => item === from.path)
    // 不是进入 tabBar 路由 --------------------------
    if (toIsTabBar === -1) {
      // 层级大于0 即非导航层级
      if (toIndex > 0) {
        // 判断是不是返回
        if (toIndex > fromIndex) { // 不是返回
          bus.$emit('forward', {
            type:'forward',
            isTabBar:false,
            transitionName:'vue-app-effect-in'
          })
          window.$VueAppEffect.paths.push(to.path)
        } else {                // 是返回
          // 判断是否是ios左滑返回
          if (!isPush && (Date.now() - endTime) < 377) {
            bus.$emit('reverse', {
              type:'',
              isTabBar:false,
              transitionName:'vue-app-effect-out'
            })
          } else {
            bus.$emit('reverse', {
              type:'reverse',
              isTabBar:false,
              transitionName:'vue-app-effect-out'
            })
          }
        }
      // 是返回
      } else {
        let count = ++ window.$VueAppEffect.count
        window.$VueAppEffect.count = count
        window.$VueAppEffect[to.path] = count
        bus.$emit('forward', {
          type:'forward',
          isTabBar:false,
          transitionName:'vue-app-effect-in'
        })
        window.$VueAppEffect.paths.push(to.path)
      }
    // 是进入 tabbar 路由 ---------------------------------------
    } else {
      window.$VueAppEffect.paths.pop()
      // 判断是否是ios左滑返回
      if (!isPush && (Date.now() - endTime) < 377) {
        bus.$emit('reverse', {
          type:'',
          isTabBar:true,
          transitionName:'vue-app-effect-out'
        })
      } else {
        bus.$emit('reverse', {
          type:'reverse',
          isTabBar:true,
          transitionName:'vue-app-effect-out'
        })
      }
      window.$VueAppEffect.paths.push(to.path)
    }
    next()
  })

  router.afterEach(function () {
    isPush = false
  })
}

export default deriection
