<template>
    <div class="view">
      <Header :title="'歌手'" :show="false"></Header>
      <div class="bd">
        <scroller
          :scrollingY="true"
          :mousewheel="true"
          :data="items">
          <div class='mvlist'>
            <div class='list' v-for="(item,index) in items" :key="index">
              <div class='detail' @click='goDetail(index+1,`Singer`)'>
                <img class='img' :src="defaultImg">
                <div class="title-box">
                  <div class='title'>vue-app-effect Sge {{index+1}}</div>
                </div>
                <div class='date'>播放: {{index+1}}.99 万</div>
              </div>
            </div>
          </div>
        </scroller>
      </div>
    </div>
</template>

<script>
import Header from '@/ComponentsLayout/Header/index'
export default {
  name: 'singer',
  components: {
    Header
  },
  data () {
    return {
      items:[],
      defaultImg: require('@/assets/images/singer.png')
    }
  },
  mounted () {
    setTimeout(()=>{
      this.items = new Array(30)
    },50)
  },
  methods: {
    goDetail (index, name) {
      this.$vueAppEffect.next({
        vm:this,
        path:`/singer/${index}`,
        component:this.repeatComponents.SingerDetail,
        params:{ id: index, name: name }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/mxin'
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

</style>
