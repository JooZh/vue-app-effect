<template>
    <transition :name="Direction.transitionName" :css="!!Direction.type">
      <div class="sub-view">
        <Header :title="'公共页面'" :show="true" :bg="true" :border="true" :music="false"></Header>
        <div class="container">
          <div class="bd">
            <div class="play"></div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import Header from '@/ComponentsLayout/Header/index'
export default {
  name: 'player',
  data () {
    return {
      Direction:{
        type: '',
        isTabBar: true,
        transitionName: ''
      }
    }
  },
  components: {
    Header
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

<style lang="stylus" scoped>
@import '../../assets/css/mxin';
.container
  width 100%
  position absolute
  top 40px
  left 0
  bottom 0
  right 0
  .bd
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    display flex
    justify-content center
    align-items center
    .play
      width 250px
      height 250px
      border 20px solid #454545
      border-radius 50%
      &:before
        content ' '
        display block
        width 100%
        height 100%
        background #222222
        border-radius 50%
</style>
