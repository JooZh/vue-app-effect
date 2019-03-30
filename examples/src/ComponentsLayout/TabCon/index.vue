<template>
  <div>
    <keep-alive>
      <router-view id="tab-router-view"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'tabCon'
}
</script>

<style lang="stylus">
#tab-router-view
  width 100%
  height 100%
  &.view
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
</style>
