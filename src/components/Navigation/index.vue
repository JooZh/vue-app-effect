<template>
  <div class="hd-view" v-if="title">
    <div class="back-btn">
      <div @click="back"><i v-if="backShow" class="fa fa-angle-left"></i></div>
    </div>
    <div class="title">{{title}}</div>
    <div class="show-cd" @click="changePlayer">
      <!-- <Music v-if="music"></Music> -->
    </div>
  </div>
</template>

<script>
// import Music from '../../components/Music/index'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    backShow:{
      type: Boolean,
      // default: false
    }
  },
  methods: {
    back () {
      this.$vueAppEffect.back()
    },
    changePlayer () {
      this.$vueAppEffect.next({
        path: `/pages/Player/index`
      })
    }
  }
}
</script>

<style lang="stylus">
  .hd-view
    display flex
    height 40px
    font-size 16px
    line-height 40px
    text-align center
    color #ffcd32
    width 100%
    position fixed !important
    top 0
    left 0
    right 0
    z-index 9
    transition background 0.4s
    &.bg
      transition background 0.4s
      background #252525
    .title
      flex 1
      text-align center
    .back-btn
      flex 40px 0 0
      font-size 28px
      text-align center
      &.hide
        visibility hidden
    .show-cd
      flex 40px 0 0
      font-size 20px
      text-align center
      display flex
      justify-content center
      align-items center
      .pi
        width 30px
        height 30px
        border-radius: 50%
        border 1px solid #ffcd32
        display flex
        justify-content center
        align-items center
</style>
