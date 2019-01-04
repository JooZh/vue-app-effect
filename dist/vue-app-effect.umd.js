/**
* vue-app-effect v1.0.1
* https://github.com/JooZh/vue-app-effect
* Released under the MIT License.
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueAppEffect = factory());
}(this, (function () { 'use strict';

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
        direction: '',
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
        _this2.direction = 'reverse';
        _this2.reverse();
      });

      bus.$on('forward', function () {
        _this2.direction = 'forward';
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

        var findTo = this.tabBar.findIndex(function (item) {
          return item === _this3.$route.fullPath;
        });

        var findRouterIndex = routes.findIndex(function (item) {
          return item.path === beforePath;
        });

        if (findTo === -1 && findRouterIndex >= this.routerLen) {
          this.$router.options.routes.pop();

          delete window.sessionStorage[beforePath];
          window.sessionStorage.count -= 1;
        }

        var key = findTo === -1 ? this.$route.fullPath : '';
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
        store = _ref.store,
        tabbar = _ref.tabbar,
        _ref$common = _ref.common,
        common = _ref$common === undefined ? '' : _ref$common;

    if (!router || !store || !tabbar) {
      console.error('vue-app-effect need options: router, tabbar and store');
      return;
    }
    var bus = new Vue();

    store.registerModule('NAV_DIRECTION', {
      state: {
        direction: 'forward'
      },
      mutations: {
        'NAV_DIRECTION_UPDATE': function NAV_DIRECTION_UPDATE(state, payload) {
          state.direction = payload.direction;
        }
      }
    });

    window.sessionStorage.clear();
    window.sessionStorage.setItem('count', 0);
    window.sessionStorage.setItem('/', 0);
    common && window.sessionStorage.setItem(common, 99999);
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

    router.beforeEach(function (to, from, next) {
      var toIndex = Number(window.sessionStorage.getItem(to.path));
      var fromIndex = Number(window.sessionStorage.getItem(from.path));

      var find = tabbar.findIndex(function (item) {
        return item === to.path;
      });

      if (find === -1) {
        if (toIndex) {
          if (toIndex > fromIndex) {
            bus.$emit('forward', 'forward');
            store.commit('NAV_DIRECTION_UPDATE', { direction: 'forward' });
          } else {
            if (!isPush && Date.now() - endTime < 377) {
              bus.$emit('reverse', '');
              store.commit('NAV_DIRECTION_UPDATE', { direction: '' });
            } else {
              bus.$emit('reverse', 'reverse');
              store.commit('NAV_DIRECTION_UPDATE', { direction: 'reverse' });
            }
          }
        } else {
          var count = ++window.sessionStorage.count;
          window.sessionStorage.setItem('count', count);
          window.sessionStorage.setItem(to.path, count);
          bus.$emit('forward', 'forward');
          store.commit('NAV_DIRECTION_UPDATE', { direction: 'forward' });
        }

        if (/\/http/.test(to.path)) {
          var url = to.path.split('http')[1];
          window.location.href = 'http' + url;
        } else {
          next();
        }
      } else {
        if (!isPush && Date.now() - endTime < 377) {
          bus.$emit('reverse', '');
          store.commit('NAV_DIRECTION_UPDATE', { direction: '' });
        } else {
          bus.$emit('reverse', 'reverse');
          store.commit('NAV_DIRECTION_UPDATE', { direction: 'reverse' });
        }
        next();
      }
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

return index;

})));
