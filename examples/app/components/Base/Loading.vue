<template>
  <div id="loading">
    <div class="loading"></div>
    <div class="text">加载中...</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
#loading
  text-align center
  width 100%
  height 35px
  line-height 15px
  padding 10px 0 10px 0
  color #999
  font-size 12px
  margin-bottom 10px
  .text
    vertical-align middle
    display inline-block
    margin-left 5px
  .loading
    vertical-align middle
    display inline-block
    width: 10px
    height 10px
    border-radius 50%
    border 2px solid #BEBEBE
    border-left 2px solid #666
    animation load 0.5s linear infinite
@keyframes load
    from
      transform:rotate(0deg)
    to
      transform:rotate(360deg)
</style>
