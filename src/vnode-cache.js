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
      direction: '',
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
        this.direction = 'reverse'
        this.reverse()
      })
      // 监听前进事件
      bus.$on('forward', () => {
        this.direction = 'forward'
      })
    },
    destroyed () {
      for (const key in this.cache) {
        const vnode = this.cache[key]
        vnode && vnode.componentInstance.$destroy()
      }
    },
    methods: {
      reverse () {
        let path = this.paths.pop()
        let routes = this.$router.options.routes
        // console.log('删除前：', this.cache)
        let findTo = this.tabBar.findIndex(item => item === this.$route.fullPath)
        // 删除上一个路由
        let findRouterIndex = routes.findIndex(item => item.path === path)
        if (findTo === -1 && findRouterIndex >= this.routerLen) {
          this.$router.options.routes.pop()
          // this.$router.addRoutes([])
          delete window.sessionStorage[path]
          window.sessionStorage.count -= 1
        }
        // 删除上一个缓存
        let key = findTo === -1 ? this.$route.fullPath : '/tab-bar'
        if (this.cache[key]) {
          this.cache[path].componentInstance.$destroy()
          delete this.cache[path]
        }
        // console.log(window.sessionStorage)
        // console.log('删除后：', this.cache)
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
        } else {
          this.cache[key] = vnode
        }
        // console.log('保存后：', this.cache)
        vnode.data.keepAlive = true
      }
      return vnode
    }
  }
}
