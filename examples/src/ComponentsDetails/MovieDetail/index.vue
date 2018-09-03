<template>
  <div>
    <div class="sub-view">
      <Header :title="'视频详情'" :show="true" :bg="true" :border="true"></Header>
      <div class="container">
        <div class="bd">
          <div class="info">当前是 {{name}}</div>
          <div class="info">
            <p v-if="id!=99" @click='goDetail(99,`详情页99`)'>点击打开详情页99</p>
          </div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
          <div class="info">当前是 {{name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/ComponentsLayout/Header/index'
export default {
  name: 'album-detail',
  components: {
    Header
  },
  data () {
    return {
      id: 0,
      name: '',
      defaultImg: require('@/assets/images/album.png')
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.name = this.$route.params.name
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
    }
  }

}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/common'
.container
  width 100%
  position absolute
  top 40px
  left 0
  bottom 0
  right 0
  .bd
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    .info
      padding 10px
      font-size $fontM
      p
        font-size $fontS
        background #ccc;
        color #666666
        display inline-block
        line-height 30px
        height 30px
        border-radius 10px
        padding 0 10px
</style>
