<template>
  <PageScrollView isTab>
    <div class="container">
        <!-- <Swiper :items="imageList"></!-->
      <Mvlist :data="mvlist"></Mvlist>
    </div>
  </PageScrollView>
</template>

<script>
import Mvlist from '@/components/Lists/MvList'
import {recommendNewAlbum,recommendMvList } from '@/service/api'
export default {
  name: 'recomment',
  components: {
    Mvlist,
  },
  data () {
    return {
      showLoading: false,
      // 路由使用
      headerTitle: '推荐',
      imageList: [],
      mvlist: [],
      // 滑动控制
      current: 0,
      timer: null,
      startX: 0,
      startY: 0
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    onPullingDown () {
      this.showLoading = true
      setTimeout(() => {
        this.getData()
      }, 1000)
    },
    getData () {
      recommendMvList().then(res=>{
        this.mvlist = res.mv_list
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../assets/css/common'
  .recomment
    position absolute
    left 0
    right 0
    top 0
    width 100%
    height 100%
    .pulldown-wrapper
      height 50px
      width 100%
      text-align center
      position absolute
      top 40px
    .scroll-layout
      top 40px
      bottom 50px
      .hd
        margin-top 10px
        height 40px
        line-height 40px
        text-align center
        color $themeColor
        font-size $fontM
</style>
