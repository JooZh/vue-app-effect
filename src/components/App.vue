<template>
  <div id="vue-app-effect">
    <transition :name="Direction.transitionName" :css="!!Direction.type">
      <vnode-cache>
        <router-view id="vue-app-effect__page-view"></router-view>
      </vnode-cache>
    </transition>
    <TabBar v-show="Direction.isTabBar"></TabBar>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
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
