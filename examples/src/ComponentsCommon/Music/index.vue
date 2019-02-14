<template>
  <div class="wrap">
    <ul class="music start">
      <li class="s m1"></li>
      <li class="s m2"></li>
      <li class="s m3"></li>
      <li class="s m1"></li>
      <li class="s m2"></li>
      <li class="s m3"></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    play: {
      type: Boolean,
      description: '播放状态'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/mxin';
ul,li
  margin: 0;
  padding: 0;
  border: 0;
  list-style: none;
.wrap
  width: 40px;
  height: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .music
    display: inline-block;
    vertical-align: baseline;
    width 25px
    height 25px
    li
      background-color:$themeColor
      margin-left: 2px;
      float: left;
      width: 2px;
      height: 25px;
    &.start
      .m1
        animation: .8s .1s living linear infinite backwards normal;
        animation-delay: -1.1s;
      .m2
        animation: .8s .3s living linear infinite backwards normal;
        animation-delay: -1.3s;
      .m3
        animation: .8s .6s living linear infinite backwards normal;
        animation-delay: -1.6s;
    &.stop
      position relative
      vertical-align bottom
      .m1
        height 18px
        position relative
        top 7px
      .m2
        height 23px
        position relative
        top 2px
      .m3
        height 13px
        position relative
        top 12px
@keyframes living
  0%{
    transform:scaleY(1);
    transform-origin:0 25px
  }
  50%{
    transform:scaleY(.3);
    transform-origin:0 25px
  }
  100%{
    transform:scaleY(1);
    transform-origin:0 25px
  }
</style>
