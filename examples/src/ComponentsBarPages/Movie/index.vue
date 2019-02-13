<template>
  <div>
    <div class="view">
      <Header :title="'视频'" :show="false" :bg="true" :border="true"></Header>
      <div ref="bd" @scroll="scroll" class="bd">
        <div class='mvlist' style="min-height:101%">
          <div class='list' v-for="(item,index) in new Array(30)" :key="index">
            <div class='detail' @click='goDetail(index+1,`详情页${index+1}`)'>
              <img class='img' :src="defaultImg">
              <div class="title-box">
                <div class='title'>vue-app-effect {{index+1}}</div>
              </div>
              <div class='date'>播放: {{index+1}}.99 万</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/ComponentsLayout/Header/index'
export default {
  name: 'movie',
  components: {
    Header
  },
  data () {
    return {
      scrollTop: 0,
      defaultImg: require('@/assets/images/mv.png')
    }
  },
  activated () {
    this.$refs.bd.scrollTop = this.scrollTop
  },
  methods: {
    goDetail (index, name) {
      // 创建一个新路由
      let newPath = `/movie/${index}`
      let newRoute = [{
        path: newPath,
        name: newPath,
        component: {extends: this.$router.extends.MovieDetail}
      }]
      // 判断路由是否存在 不存在 添加一个新路由
      let find = this.$router.options.routes.findIndex(item => item.path === newPath)
      if (find === -1) {
        this.$router.options.routes.push(newRoute[0])
        this.$router.addRoutes(newRoute)
      }
      // 存在直接跳转到路由
      this.$router.push({
        name: newPath,
        params: { id: index, name: name }
      })
    },
    scroll (e) {
      this.scrollTop = e.target.scrollTop
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/common'
.mvlist
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
