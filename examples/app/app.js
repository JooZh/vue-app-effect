// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import store from "./store/index";
import InitEffectApp from "../../src/index";

import "./assets/css/reset.css";
import "./assets/css/common.styl";

import lazyload from 'vue-lazyload'

InitEffectApp(Vue, {
  store,
  plugins: [
    lazyload
  ]
});
