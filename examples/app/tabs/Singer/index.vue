<template>
  <Page title="歌手" isTab>
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
  </Page>
</template>
<script>
export default {
  name: 'singer',
  data () {
    return {
      show:false,
      items:[],
      defaultImg: require('../../assets/images/singer.png')
    }
  },
  created () {
    setTimeout(()=>{
      this.items = new Array(30)
    },500)
  },
  mounted(){
    this.show = true
  },
  methods: {
    goDetail (index, name) {
      this.$vueAppEffect.next({
        path:`/pages/SingerDetail/index/${index}`,
        params:{ id: index, name: name }
      })
    }
  }
}
</script>

<style lang="stylus">
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
