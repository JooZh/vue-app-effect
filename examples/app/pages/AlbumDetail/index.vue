<template>
  <PageScrollView :title="headerTitle" :onScroll="onScroll">
    <div class="menu-detail">
      <div id='infos' class='infos'>
        <div class='singer-bg'>
          <img class='background' v-lazy='{src:albumInfo.img,error:defaultImg,loading:defaultImg}'>
        </div>
        <div class='info-content'>
          <img class='min-avatar' v-lazy='{src:albumInfo.img,error:defaultImg,loading:defaultImg}'>
          <div class='info'>
            <div class='name'>{{albumInfo.album_name}}</div>
            <div class='fans'>{{albumInfo.singer_name}}</div>
            <div class='fans'>流派: {{albumInfo.genre}} </div>
            <div class='fans'>发行时间: {{albumInfo.time}}</div>
          </div>
        </div>
      </div>
      <TabPosition @playAll="handlePlayAll" :total="albumInfo.total" :show="true" />
      <SongList :data="songlist"></SongList>
    </div>
    <TabPosition slot="position" @playAll="handlePlayAll" :total="albumInfo.total" :show="fixed" :fixed="fixed" />
  </PageScrollView>
</template>

<script>
import SongList from '@/components/Lists/SongList'
import TabPosition from './tabPosition'

import {AlbumDetail } from '@/service/api'
import { mapMutations } from 'vuex'
export default {
  name: 'album-detail',
  components: {
    SongList,
    TabPosition,
  },
  data () {
    return {
      tabTop: 230,
      headerTitle: '',
      img:'',

      fixed: false,
      songlist: [],
      albumInfo: {},
      defaultImg: require('@/assets/images/album.png')
    }
  },
  mounted () {
    // 获取参数
    let mid = this.$route.params.id
    this.headerTitle = this.$route.params.title
    // 获取当前页面高度
    this.getMusicList(mid)
  },
  methods: {
    ...mapMutations([
      'playAll'
    ]),
    handlePlayAll () {
      this.playAll(this.songlist)
    },
    onScroll (pos) {
      this.fixed = this.tabTop - pos.y <= 0
    },
    // 获取单曲数据
    getMusicList (mid) {
      AlbumDetail({
        album_mid: mid
      }).then((res) => {
        // topInfo.img = this.X.img(topInfo.mid, 2)
        this.albumInfo = res
        this.songlist = res.list
        // 吸顶效果
        // this.tabTop = this.$refs.tab.getBoundingClientRect().top - 40
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable'
.menu-detail
  // padding 40px 0 10px 0
  position relative
  // left 0
  // right 0
  width 100%
  height 100%
  background $bgColor
  z-index 12

.infos{
  height: 230px;
  // margin-top 40px
  width: 100%;
  position relative
}
.infos .singer-bg{
  background: #353535;
  height: 100%;
  margin-bottom -40px
  -webkit-filter: blur(30px);
  filter: blur(30px);
  opacity: 0.4;
}
.infos .singer-bg .background{
  width: 100%;
  height: 100%;
}
.infos .info-content{
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  color: #ccc;
}
.infos .info-content .min-avatar{
  width: 120px;
  height: 120px;
  flex: 0 0 120px;
  margin: 25px 20px 25px 30px;
  background: #353535;
}
.infos .info-content .info{
  display: inline-block;
  margin: 25px 20px 0 0;
  flex: 1;
  height: 100px;
}
.infos .info-content .info .name{
  font-size: 18px;
  line-height: 1.2;
  padding: 10px 0;
  overflow: hidden;
  color: #ffcd32;
}
.infos .info-content .info .fans{
  font-size: 14px;
  line-height: 1.5
}
</style>
