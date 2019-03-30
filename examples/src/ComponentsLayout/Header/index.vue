<template>
  <div class="hd" :class="{'bg':bg,'border-half-bottom':border}">
    <div class="back-btn">
      <div @click="back"><i v-if="show" class="fa fa-angle-left"></i></div>
    </div>
    <div class="title">{{title}}</div>
    <div class="show-cd" @click="changePlayer">
      <Music v-if="music"></Music>
    </div>
  </div>
</template>

<script>
import Music from '@/ComponentsCommon/Music/index'
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    show: {
      type: Boolean,
      default: true
    },
    bg: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    music: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Music
  },
  methods: {
    back () {
      this.$vueAppEffect.back(this)
    },
    changePlayer () {
      this.$router.replace({
        path: `/player`
      })
    }
  }
}
</script>

<style lang="stylus">
  @import '../../assets/css/mxin';
  .hd
    display flex
    height 40px
    font-size $fontM
    line-height 40px
    text-align center
    color $themeColor
    width 100%
    position fixed !important
    top 0
    left 0
    right 0
    z-index 9
    transition background 0.4s
    &.bg
      transition background 0.4s
      background $bgColor
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
        border 1px solid $themeColor
        display flex
        justify-content center
        align-items center
</style>
