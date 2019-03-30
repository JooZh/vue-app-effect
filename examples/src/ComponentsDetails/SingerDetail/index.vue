<template>
  <div>
    <div class="sub-view">
      <Header :title="'歌手详情'" :show="true" :bg="true" :border="true"></Header>
      <div class="container">
        <div class="bd">
          <scroller
            :scrollingY="true"
            :data="items">
            <div class='lists'>
              <div class="content">当前是{{name}}详情页{{id}}</div>
              <div class='info' v-for="(item,index) in items" :key="index">
                <p class="info-button" @click='goDetailSinger(id+1,`Singer`)'>Singer详情页{{id+1}}</p>
                <p class="info-button" @click='goDetailMv(id+1,`MV`)'>MV详情页{{id+1}}</p>
              </div>
            </div>
          </scroller>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/ComponentsLayout/Header/index'
export default {
  name: 'singer-detail',
  components: {
    Header
  },
  data () {
    return {
      id: 0,
      name: '',
      items:[],
    }
  },
  created() {
    this.id = this.$route.params.id
    this.name = this.$route.params.name
  },
  mounted () {
    setTimeout(()=>{
      this.items = new Array(5)
    },0)
  },
  methods: {
    goDetailMv (index, name) {
      this.$vueAppEffect.next({
        vm:this,
        path:`/movie/${index}`,
        component:this.repeatComponents.MovieDetail,
        params:{ id: index, name: name }
      })
    },
    goDetailSinger (index, name) {
      this.$vueAppEffect.next({
        vm: this,
        path: `/singer/${index}`,
        component: this.repeatComponents.SingerDetail,
        params: { id: index, name: name }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/mxin'
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
    .lists
      margin 0px 10px 20px 10px
      padding-top 20px
      .content
        font-size $fontXL
        background #444444
        height 500px
        text-align center
        border-radius 5px
        line-height 500px
        margin-bottom 20px;
        margin 0px 10px 20px 10px
      .info
        font-size $fontM
        display flex
        p.info-button
          flex 1
          font-size $fontM
          background #444444;
          color #ccc
          display inline-block
          line-height 50px
          // height 50px
          border-radius 5px
          margin 0 10px 20px 10px
          padding 0 20px
</style>
