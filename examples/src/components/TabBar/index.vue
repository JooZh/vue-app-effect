<template>
  <div id="tab-bar">
    <div class="nav border-half-top">
      <router-link class="bar" :to="'/tabs/Movie/index'" replace>
        <div class="button">
          <div class="icon"><i class="fa fa-video-camera"></i></div>
          <div class="text">视频</div>
        </div>
      </router-link>
      <router-link class="bar" :to="'/tabs/Singer/index'" replace>
        <div class="button">
          <div class="icon"><i class="fa fa-camera-retro"></i></div>
          <div class="text">歌手</div>
        </div>
      </router-link>
      <router-link class="bar" :to="'/tabs/Rank/index'" replace>
        <div class="button">
          <div class="icon"><i class="fa fa-camera-retro"></i></div>
          <div class="text">排行</div>
        </div>
      </router-link>
      <router-link class="bar" :to="'/tabs/Song/index'" replace>
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
<style lang="stylus">
  #tab-bar
    height 50px
    background #252525
    position fixed
    bottom 0
    left 0
    right 0
    z-index 4
    .nav
      display flex
      width 100%
      height 100%
      .bar
        flex 1
        display flex
        justify-content center
        align-items center
        color #ccc
        text-align center
        &.router-link-active
          color #ffcd32
        .icon
          font-size 23px
        .text
          font-size 10px
</style>
