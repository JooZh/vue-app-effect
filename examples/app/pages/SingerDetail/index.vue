<template>
  <page title="歌手详情">
    <div class='lists'>
      <div class="content">当前是{{name}}详情页{{id}}</div>
      <div class='info' v-for="(item,index) in items" :key="index">
        <p class="info-button" @click='goDetailSinger(id+1,`Singer`)'>Singer详情页{{id+1}}</p>
        <p class="info-button" @click='goDetailMv(id+1,`MV`)'>MV详情页{{id+1}}</p>
      </div>
    </div>
  </page>
</template>
<script>
export default {
  name: 'singer-detail',
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
    },50)
  },
  methods: {
    goDetailMv (index, name) {
      this.$vueAppEffect.next({
        path:`pages/MovieDetail/index/${index}`,
        params:{ id: index, name: name }
      })
    },
    goDetailSinger (index, name) {
      this.$vueAppEffect.next({
        path: `pages/SingerDetail/index/${index}`,
        params: { id: index, name: name }
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~app/assets/css/mxin'
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
