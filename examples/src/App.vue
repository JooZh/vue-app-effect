<template>
  <div id="app">
    <transition :name="transitionName" :css="!!direction">
      <vnode-cache>
        <router-view class="router-view"></router-view>
      </vnode-cache>
    </transition>
    <TabBar></TabBar>
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
      direction: ''
    }
  },
  created () {
    this.$direction.on('forward', (direction) => {
      this.transitionName = 'vux-pop-in'
      this.direction = direction
    })
    this.$direction.on('reverse', (direction) => {
      this.transitionName = 'vux-pop-out'
      this.direction = direction
    })
  }
}
</script>

<style lang="stylus">
@import './assets/css/common'
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
// 效果代码来源 vux
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms cubic-bezier(0.075, 0.82, 0.165, 1)
  bottom: 50px;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-70%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(70%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(70%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-70%, 0, 0);
}
</style>
