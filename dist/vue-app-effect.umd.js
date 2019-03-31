/**
* vue-app-effect v1.0.3
* https://github.com/JooZh/vue-app-effect
* Released under the MIT License.
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueAppEffect = factory());
}(this, (function () { 'use strict';

function css() {
  return '\n    .vue-app-effect-out-enter-active,\n    .vue-app-effect-out-leave-active,\n    .vue-app-effect-in-enter-active,\n    .vue-app-effect-in-leave-active {\n      will-change: transform;\n      transition: all 500ms cubic-bezier(0.075, 0.82, 0.165, 1) ;\n      bottom: 0;\n      top: 0;\n      position: absolute;\n      backface-visibility: hidden;\n      perspective: 1000;\n    }\n    .vue-app-effect-out-enter {\n      opacity: 0;\n      transform: translate3d(-70%, 0, 0);\n    }\n    .vue-app-effect-out-leave-active {\n      opacity: 0 ;\n      transform: translate3d(70%, 0, 0);\n    }\n    .vue-app-effect-in-enter {\n      opacity: 0;\n      transform: translate3d(70%, 0, 0);\n    }\n    .vue-app-effect-in-leave-active {\n      opacity: 0;\n      transform: translate3d(-70%, 0, 0);\n    }\n  ';
}
function appendCss() {
  var cssText = css();
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = cssText;
  } else {
    style.appendChild(document.createTextNode(cssText));
  }
  head.appendChild(style);
}

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
          delete window.$VueAppEffect[beforePath];
          window.$VueAppEffect.count -= 1;
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

function install(Vue, bus, tabbar) {
  Vue.component('vnode-cache', VnodeCache(bus, tabbar));

  Vue.prototype.$vueAppEffect = {
    on: function on(event, callback) {
      bus.$on(event, callback);
    },
    back: function back(vm) {
      window.$VueAppEffect.paths.pop();
      vm.$router.replace({
        name: window.$VueAppEffect.paths.concat([]).pop()
      });
    },
    next: function next(options) {
      var newPath = options.path;
      var newRoute = [{
        path: newPath,
        name: newPath,
        component: { extends: options.component }
      }];

      var find = options.vm.$router.options.routes.findIndex(function (item) {
        return item.path === newPath;
      });

      if (find === -1) {
        options.vm.$router.options.routes.push(newRoute[0]);
        options.vm.$router.addRoutes(newRoute);
      }

      options.vm.$router.replace({
        name: newPath,
        params: options.params
      });
    }
  };
}

function deriection(router, bus, tabbar, common) {
  window.addEventListener('load', function () {
    router.replace({ path: '/' });

    var newVueAppEffect = {
      count: 0,
      paths: window.$VueAppEffect.paths
    };
    if (common) {
      newVueAppEffect[common] = 9999999;
    }
    window.$VueAppEffect = newVueAppEffect;
  });

  window.$VueAppEffect = {
    'count': 0,
    'paths': []
  };
  if (common) {
    window.$VueAppEffect[common] = 9999999;
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

  router.beforeEach(function (to, from, next) {
    if (/\/http/.test(to.path)) {
      window.location.href = to.path;
      return;
    }

    var toIndex = Number(window.$VueAppEffect[to.path]);
    var fromIndex = Number(window.$VueAppEffect[from.path]);
    fromIndex = fromIndex ? fromIndex : 0;

    var toIsTabBar = tabbar.findIndex(function (item) {
      return item === to.path;
    });

    if (toIsTabBar === -1) {
      if (toIndex > 0) {
        if (toIndex > fromIndex) {
          bus.$emit('forward', {
            type: 'forward',
            isTabBar: false,
            transitionName: 'vue-app-effect-in'
          });
          window.$VueAppEffect.paths.push(to.path);
        } else {
          if (!isPush && Date.now() - endTime < 377) {
            bus.$emit('reverse', {
              type: '',
              isTabBar: false,
              transitionName: 'vue-app-effect-out'
            });
          } else {
            bus.$emit('reverse', {
              type: 'reverse',
              isTabBar: false,
              transitionName: 'vue-app-effect-out'
            });
          }
        }
      } else {
        var count = ++window.$VueAppEffect.count;
        window.$VueAppEffect.count = count;
        window.$VueAppEffect[to.path] = count;
        bus.$emit('forward', {
          type: 'forward',
          isTabBar: false,
          transitionName: 'vue-app-effect-in'
        });
        window.$VueAppEffect.paths.push(to.path);
      }
    } else {
      window.$VueAppEffect.paths.pop();

      if (!isPush && Date.now() - endTime < 377) {
        bus.$emit('reverse', {
          type: '',
          isTabBar: true,
          transitionName: 'vue-app-effect-out'
        });
      } else {
        bus.$emit('reverse', {
          type: 'reverse',
          isTabBar: true,
          transitionName: 'vue-app-effect-out'
        });
      }
      window.$VueAppEffect.paths.push(to.path);
    }
    next();
  });

  router.afterEach(function () {
    isPush = false;
  });
}

var index = {
  install: function install$$1(Vue) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        router = _ref.router,
        tabbar = _ref.tabbar,
        _ref$common = _ref.common,
        common = _ref$common === undefined ? '' : _ref$common;

    if (!router || !tabbar) {
      console.error('vue-app-effect need options: router, tabbar');
      return;
    }

    var bus = new Vue();

    appendCss();

    install(Vue, bus, tabbar);

    deriection(router, bus, tabbar, common);
  }
};

return index;

})));
