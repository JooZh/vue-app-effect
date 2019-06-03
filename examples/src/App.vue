<template>
  <div id="app">
    <transition :name="Direction.transitionName" :css="!!Direction.type">
      <vnode-cache>
        <router-view id="page-view"></router-view>
      </vnode-cache>
    </transition> 
    <TabBar v-show="Direction.isTabBar"></TabBar>
  </div>
</template>

<script>
import TabBar from '@/ComponentsLayout/TabBar/index'

export default {
  name: 'App',
  components: {
    TabBar,
  },
  data () {
    return {
      Direction:{
        type: '',
        isTabBar: true,
        transitionName: ''
      }
    }
  },
  created () {
    this.$vueAppEffect.on('forward', (direction) => {
      this.Direction = direction
    })
    this.$vueAppEffect.on('reverse', (direction) => {
      this.Direction = direction
    })
  }
}
</script>

<style lang="stylus">
@import './assets/css/mxin'
#app
  width: 100%;
  height:100%;
  #page-view
    width: 100%;
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:50px;
    z-index:5
    #tab-router-view
      width 100%
      height 100%
      .view
        width 100%
        height 100%
        position relative
        .bd
          position absolute
          top 40px
          left 0
          right 0
          bottom 0
          overflow hidden
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
