<template>
  <page title="公共页面">
    <div class="play"></div>
  </page>
</template>

<script>
export default {
  name: 'player',

}
</script>

<style lang="stylus">
@import '../../assets/css/mxin';
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
