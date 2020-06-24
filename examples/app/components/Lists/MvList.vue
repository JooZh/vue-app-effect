<template>
  <div id="mvlist" class='mvlist'>
    <div class='list' v-for="(item,index) in data" :key="index">
      <div class='detail' @click='getPlay(index)'>
        <img ref="img" class='img' v-lazy='{src:item.mv_pic,error:defaultImg,loading:defaultImg}'>
        <div class="title-box">
          <div class='title'>{{item.mv_title}}</div>
        </div>
        <div class='date'><Icon type="ios-videocam" /> {{item.play_str}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      defaultImg: require('@/assets/images/mv.png')
    }
  },
  methods: {
    getPlay (index) {
      let data = this.data[index]
      this.$vueAppEffect.next({
        path: `/pages/MvPlayer/index`,
        params: { mid: data.mv_mid}
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable'
#mvlist
  color:rgba(255,255,255,0.5)
  display flex
  padding 5px
  flex-wrap wrap
  .list
    flex 50% 0 0
    .detail
      padding 5px
      position relative
      .img
        width: 100%;
      .title-box
        height: 30px;
        position relative
        line-height: 30px;
      .title
        position absolute
        left 0
        right 0
        font-size: $fontS;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
      .date
        font-size: $fontXS
        i
          font-size 20px
          position relative
          top -1px
@media screen and (max-width:480px)
  .img
    height 108px
@media screen and (max-width:375px)
  .img
    height 97px
@media screen and (max-width:320px)
  .img
    height 82px

</style>
