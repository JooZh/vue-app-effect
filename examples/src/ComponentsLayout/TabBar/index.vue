<template>
  <div id="tab-bar">
    <div class="container border-half-top">
      <router-link class="bar" :to="'/movie'" replace>
        <div class="button">
          <div class="icon"><i class="fa fa-video-camera"></i></div>
          <div class="text">视频</div>
        </div>
      </router-link>
      <router-link class="bar" :to="'/singer'" replace>
        <div class="button">
          <div class="icon"><i class="fa fa-camera-retro"></i></div>
          <div class="text">歌手</div>
        </div>
      </router-link>
      <router-link class="bar" :to="'/rank'" replace>
        <div class="button">
          <div class="icon"><i class="fa fa-camera-retro"></i></div>
          <div class="text">排行</div>
        </div>
      </router-link>
      <router-link class="bar" :to="'/song'" replace>
        <div class="button">
          <div class="icon"><i class="fa fa-camera-retro"></i></div>
          <div class="text">歌单</div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="stylus" scoped>
  @import '../../assets/css/mxin';
  #tab-bar
    height 50px
    background $bgColor
    position fixed
    bottom 0
    left 0
    right 0
    z-index 4
    .container
      display flex
      width 100%
      height 100%
      .bar
        flex 1
        display flex
        justify-content center
        align-items center
        color $defaultColor
        text-align center
        &.router-link-active
          color $themeColor
        .icon
          font-size 23px
        .text
          font-size 10px
</style>
