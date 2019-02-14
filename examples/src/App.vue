<template>
  <div id="app">
    <transition :name="transitionName" :css="!!direction">
      <vnode-cache>
        <router-view class="router-view"></router-view>
      </vnode-cache>
    </transition>
    <TabBar v-show="isTab"></TabBar>
  </div>
</template>

<script>
import TabBar from '@/ComponentsLayout/TabBar/index'
export default {
  name: 'App',
  components: {
    TabBar
  },
  data () {
    return {
      transitionName: '',
      direction: '',
      isTab: true
    }
  },
  created () {
    this.$direction.on('forward', (direction) => {
      this.transitionName = direction.transitionName
      this.direction = direction.type
      this.isTab = direction.isTab
    })
    this.$direction.on('reverse', (direction) => {
      this.transitionName = direction.transitionName
      this.direction = direction.type
      this.isTab = direction.isTab
    })
  }
}
</script>

<style lang="stylus">
@import './assets/css/mxin'
#app
  width: 100%;
  height:100%;
  .router-view
    width: 100%;
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:50px;
    z-index:5
    .sub-view
      position: relative;
      width: 100%;
      height: calc(100% + 50px);
      background: #252525;
      z-index: 12;
      .bd
        overflow-y scroll
        -webkit-overflow-scrolling : touch

</style>
