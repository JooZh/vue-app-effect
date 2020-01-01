<template>
  <PageScrollView isTab>
    <div class="container">
      <div class='list-warpper' v-for="(item,index) in toplist" :key="index">
        <div class="list" @click='goDetail(item.top_id, item.top_title, item.top_pic)'>
          <div class='img'><img :src="item.top_pic"></div>
          <div class='info'>
            <div class='title text-line'>
              <span class="pix">{{item.top_title}}</span>
            </div>
            <div class='name-list text-line' v-for="(value,key) in item.song_list" :key="key">
              <div class="pix">
                {{key+1}}<span class='color-h'> {{value.song_name}}</span> - {{value.singer_name}}
              </div>
            </div>
          </div>
          <div class='right'>
            <div class='v'></div>
          </div>
        </div>
      </div>
    </div>
  </PageScrollView>
</template>

<script>
import {topList } from '@/service/api'
export default {
  name: 'ranking',
  data () {
    return {
      toplist: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    goDetail (id,title,img) {
      this.$vueAppEffect.next({
        path: `/pages/RankDetail/index`,
        params: {
          id: id,
          title: title,
          img: img
        }
      });
    },
    getData () {
      topList().then(res=>{
        this.toplist = res
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable';
.container
  padding: 5px 5px
  .list-warpper
    padding: 5px
    .list
      display: flex;
      background: #303030
      .img
        flex: 110px 0 0
        img
          width: 100%
          height: 100%
          display: block
      .info
        flex: 1
        margin-left: 10px
        .title
          font-size: 14px
          padding-top 5px
          height 30px
          line-height: 30px
          position relative
          color: rgba(255,205,50,0.7)
        .name-list
          position relative
          line-height: 25px;
          height: 25px;
          font-size: 12px;
          color: #777;
          .color-h
            color #ccc
            font-family: "hiragino sans gb",arial;
      .right
        flex: 25px 0 0;
        display: flex;
        justify-content: center;
        align-items: center
        .v
          display: inline-block;
          border-top: 1px solid #777;
          border-right: 1px solid #777;
          transform: rotate(45deg);
          width: 10px;
          height: 10px
</style>

