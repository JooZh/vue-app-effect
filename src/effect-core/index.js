import install from './install.js'
import direction from './direction.js'

export default {
  install: (Vue, { router, tabbar, common='' } = {}) => {
    // 判断参数的完整性
    if (!router || !tabbar) {
      console.error('vue-app-effect need options: router, tabbar')
      return
    }
    // 数据传递
    const bus = new Vue()
    // 执行 install
    install(Vue,bus,tabbar)
    // 执行 router 监听事件
    direction(router,bus,tabbar,common)
  }
}
