export default (bus, tabbar) => {
  return {
    name: 'vnode-cache',
    abstract: true,
    props: {},
    data: () => ({
      routerLen: 0,
      route: {},
      to: {},
      from: {},
      tabBar: tabbar,
      // direction: '',
      paths: []
    }),
    computed: {},
    watch: {
      route (to, from) {
        this.to = to
        this.from = from
        let findTo = this.tabBar.findIndex(item => item === this.$route.fullPath)
        if (findTo === -1) {
          this.paths.push(to.fullPath)
          this.paths = [...new Set(this.paths)]
        }
        // console.log(window.sessionStorage)
        // console.log('路径：', this.paths)
        // console.log('路由', this.$router.options.routes)
      }
    },
    created () {
      this.cache = {}
      this.routerLen = this.$router.options.routes.length
      this.route = this.$route
      this.to = this.$route
      // 监听返回事件
      bus.$on('reverse', () => {
        // this.direction = 'reverse'
        this.reverse()
      })
      // 监听前进事件
      // bus.$on('forward', () => {
      //   this.direction = 'forward'
      // })
    },
    destroyed () {
      for (const key in this.cache) {
        const vnode = this.cache[key]
        vnode && vnode.componentInstance.$destroy()
      }
    },
    methods: {
      reverse () {
        let beforePath = this.paths.pop()

        let routes = this.$router.options.routes
        // 查询是不是导航路由
        let isTabBar = this.tabBar.findIndex(item => item === this.$route.fullPath)
        // 查询当前路由在路由列表中的位置
        let routerIndex = routes.findIndex(item => item.path === beforePath)
        // 当不是导航路由，并且不是默认配置路由
        if (isTabBar === -1 && routerIndex >= this.routerLen) {
          // 清除对应历史记录
          delete  window.$VueAppEffect[beforePath]
          window.$VueAppEffect.count -= 1
        }
        // 当不是导航的时候 删除上一个缓存
        let key = isTabBar === -1 ? this.$route.fullPath : ''
        if (this.cache[key]) {
          this.cache[beforePath].componentInstance.$destroy()
          delete this.cache[beforePath]
        }
        // console.log('删除：', this.cache)
      }
    },
    render () {
      // 保存路由
      this.route = this.$route
      // 得到 vnode
      const vnode = this.$slots.default ? this.$slots.default[0] : null
      // 如果 vnode 存在
      if (vnode) {
        // vnode.key = vnode.key || (vnode.isComment ? 'comment' : vnode.tag)
        let findTo = this.tabBar.findIndex(item => item === this.$route.fullPath)
        let key = findTo === -1 ? this.$route.fullPath : '/tab-bar'
        // 判断是否缓存过了
        if (this.cache[key]) {
          vnode.componentInstance = this.cache[key].componentInstance
          // console.log('激活', this.cache)
        } else {
          this.cache[key] = vnode
          // console.log('新增', this.cache)
        }

        vnode.data.keepAlive = true
      }
      return vnode
    }
  }
}
