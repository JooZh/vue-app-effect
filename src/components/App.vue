<template>
  <div id="vue-app-effect">
    <transition :name="Direction.transitionName" :css="!!Direction.type">
      <vnode-cache>
        <router-view id="vue-app-effect__page-view"></router-view>
      </vnode-cache>
    </transition>
    <component v-if="showComponent" :is="commonComponent"></component>
    <TabBar v-show="Direction.isTabBar"></TabBar>
  </div>
</template>
<script>
import {config, getComponent} from '../util.js'
export default {
  name: "App-Root",
  data() {
    return {
      showComponent: config.commonComponent,
      commonComponent: getComponent(config.commonComponent),
      Direction: {
        type: "",
        isTabBar: true,
        transitionName: ""
      }
    };
  },
  created() {
    this.$vueAppEffect.on("forward", direction => {
      this.Direction = direction;
    });
    this.$vueAppEffect.on("reverse", direction => {
      this.Direction = direction;
    });
  }
};
</script>
