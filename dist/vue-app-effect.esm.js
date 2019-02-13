/**
* vue-app-effect v1.0.2
* https://github.com/JooZh/vue-app-effect
* Released under the MIT License.
*/

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var VnodeCache = (function (bus, tabbar) {
  return {
    name: 'vnode-cache',
    abstract: true,
    props: {},
    data: function data() {
      return {
        routerLen: 0,
        route: {},
        to: {},
        from: {},
        tabBar: tabbar,

        paths: []
      };
    },
    computed: {},
    watch: {
      route: function route(to, from) {
        var _this = this;

        this.to = to;
        this.from = from;
        var findTo = this.tabBar.findIndex(function (item) {
          return item === _this.$route.fullPath;
        });
        if (findTo === -1) {
          this.paths.push(to.fullPath);
          this.paths = [].concat(_toConsumableArray(new Set(this.paths)));
        }
      }
    },
    created: function created() {
      var _this2 = this;

      this.cache = {};
      this.routerLen = this.$router.options.routes.length;
      this.route = this.$route;
      this.to = this.$route;

      bus.$on('reverse', function () {
        _this2.reverse();
      });
    },
    destroyed: function destroyed() {
      for (var key in this.cache) {
        var vnode = this.cache[key];
        vnode && vnode.componentInstance.$destroy();
      }
    },

    methods: {
      reverse: function reverse() {
        var _this3 = this;

        var beforePath = this.paths.pop();

        var routes = this.$router.options.routes;

        var isTabBar = this.tabBar.findIndex(function (item) {
          return item === _this3.$route.fullPath;
        });

        var routerIndex = routes.findIndex(function (item) {
          return item.path === beforePath;
        });

        if (isTabBar === -1 && routerIndex >= this.routerLen) {
          delete window.NavStorage[beforePath];
          window.NavStorage.count -= 1;
        }

        var key = isTabBar === -1 ? this.$route.fullPath : '';
        if (this.cache[key]) {
          this.cache[beforePath].componentInstance.$destroy();
          delete this.cache[beforePath];
        }
      }
    },
    render: function render() {
      var _this4 = this;

      this.route = this.$route;

      var vnode = this.$slots.default ? this.$slots.default[0] : null;

      if (vnode) {
        var findTo = this.tabBar.findIndex(function (item) {
          return item === _this4.$route.fullPath;
        });
        var key = findTo === -1 ? this.$route.fullPath : '/tab-bar';

        if (this.cache[key]) {
          vnode.componentInstance = this.cache[key].componentInstance;
        } else {
          this.cache[key] = vnode;
        }

        vnode.data.keepAlive = true;
      }
      return vnode;
    }
  };
});

var index = {
  install: function install(Vue) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        router = _ref.router,
        tabbar = _ref.tabbar,
        _ref$common = _ref.common,
        common = _ref$common === undefined ? '' : _ref$common;

    if (!router || !tabbar) {
      console.error('vue-app-effect need options: router, tabbar');
      return;
    }

    window.addEventListener('load', function () {
      router.replace({ path: '/' });
    });

    window.NavStorage = {
      'count': 0,
      'paths': []
    };
    if (common) {
      window.NavStorage[common] = 9999999;
    }

    var isPush = false;
    var endTime = Date.now();
    var methods = ['push', 'go', 'replace', 'forward', 'back'];
    document.addEventListener('touchend', function () {
      endTime = Date.now();
    });
    methods.forEach(function (key) {
      var method = router[key].bind(router);
      router[key] = function () {
        isPush = true;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        method.apply(null, args);
      };
    });

    var bus = new Vue();
    router.beforeEach(function (to, from, next) {
      if (/\/http/.test(to.path)) {
        window.location.href = to.path;
        return;
      }

      var toIndex = Number(window.NavStorage[to.path]);
      var fromIndex = Number(window.NavStorage[from.path]);
      fromIndex = fromIndex ? fromIndex : 0;

      var toIsTabBar = tabbar.findIndex(function (item) {
        return item === to.path;
      });

      var formIsTabBar = tabbar.findIndex(function (item) {
        return item === from.path;
      });

      if (toIsTabBar === -1) {
        if (toIndex > 0) {
          if (toIndex > fromIndex) {
            bus.$emit('forward', { type: 'forward', isTab: false });
            window.NavStorage.paths.push(to.path);
          } else {
            if (!isPush && Date.now() - endTime < 377) {
              bus.$emit('reverse', { type: '', isTab: false });
            } else {
              bus.$emit('reverse', { type: 'reverse', isTab: false });
            }
          }
        } else {
          var count = ++window.NavStorage.count;
          window.NavStorage.count = count;
          window.NavStorage[to.path] = count;
          bus.$emit('forward', { type: 'forward', isTab: false });
          window.NavStorage.paths.push(to.path);
        }
      } else {
        window.NavStorage.paths.pop();

        if (!isPush && Date.now() - endTime < 377) {
          bus.$emit('reverse', { type: '', isTab: true });
        } else {
          bus.$emit('reverse', { type: 'reverse', isTab: true });
        }
        window.NavStorage.paths.push(to.path);
      }
      next();
    });

    router.afterEach(function () {
      isPush = false;
    });

    Vue.component('vnode-cache', VnodeCache(bus, tabbar));

    Vue.direction = Vue.prototype.$direction = {
      on: function on(event, callback) {
        bus.$on(event, callback);
      }
    };
  }
};

export default index;
