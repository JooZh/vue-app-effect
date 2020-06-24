<template>
  <PageScrollView :title="headerTitle" :reachBottom="onPullingUp" :onScroll="onScroll">
    <div class="singer-detail">
      <div id='infos' class='infos'>
        <div class='singer-bg'>
          <img class='background' v-lazy='{src:singerInfo.singer_avatar,error:defaultImg,loading:defaultImg}'>
        </div>
        <div class='info-content'>
          <div class='info'>
            <div class='fans'>粉丝: {{singerInfo.singer_fance}}</div>
          </div>
        </div>
      </div>
      <TabPosition @tabChange="tabChange" :total="totals" :show="true" :index="tabCurrent"/>
      <component :is="componentPlan" :data="componentData" />
    </div>
    <TabPosition slot="position" @tabChange="tabChange" :index="tabCurrent" :total="totals" :show="fixed" :fixed="fixed"/>
  </PageScrollView>
</template>

<script>
import SongList from '@/components/Lists/SongList'
import MvList from '@/components/Lists/MvList'
import AlbumList from '@/components/Lists/AlbumList'
import TabPosition from './tabPosition'

import { singerAlbum,singerSong,singerMv,singerAttention } from '@/service/api'
export default {
  name: 'singer-detail',
  components: {
    SongList,
    MvList,
    AlbumList,
    TabPosition
  },
  data () {
    return {
      componentPlan: SongList,
      componentData: [],
      headerTitle: '',
      fixed: false,
      totals:{
        song_total: 0,
        album_total: 0,
        mv_total: 0,
      },
      tabCurrent: 0,

      mid: -1,
      song: {
        begin: 0,
        num: 30,
        musicList: []
      },
      mv: {
        begin: 0,
        num: 20,
        mvList: []
      },
      album: {
        begin: 0,
        num: 20,
        albumList: []
      },
      singerInfo: {
        singer_avatar: '',
        singer_fance: 0
      },
      defaultImg: require('@/assets/images/singer.png')
    }
  },
  mounted () {
    // 获取参数
    this.mid = this.$route.params.mid
    this.headerTitle = this.$route.params.name
    this.singerInfo.singer_avatar = `https://y.gtimg.cn/music/photo_new/T001R800x800M000${this.mid}.jpg?max_age=2592000`
    // 获取当前页面高度
    this.getFance()
    this.getMusicList()
    this.getMv()
    this.getAlbum()
  },
  methods: {
    tabChange (data) {
      this.tabCurrent = data.index
      if (this.tabCurrent === 0) {
        this.componentData = this.song.musicList
        this.componentPlan = SongList
      } else if (this.tabCurrent === 1) {
        this.componentData = this.album.albumList
        this.componentPlan = AlbumList
      } else if (this.tabCurrent === 2) {
        this.componentData = this.mv.mvList
        this.componentPlan = MvList
      }
    },
    onScroll (pos) {
      this.fixed = 290 - pos.y <= 0
    },
    onPullingUp (done) {
      let timer = setTimeout(() => {
        if (this.tabCurrent === 0) {
          this.getMusicList()
        } else if (this.tabCurrent === 1) {
          this.getAlbum()
        } else if (this.tabCurrent === 2) {
          this.getMv()
        }
        clearTimeout(timer)
      }, 500)
    },
    // 获取粉丝
    getFance(){
      singerAttention({
        singer_mid:this.mid
      }).then(res=>{
        this.singerInfo.singer_fance = res.str
      })
    },
    // 获取单曲数据
    getMusicList () {
      singerSong({
        singer_mid: this.mid,
        begin: this.song.begin,
        num: this.song.num
      }).then(res => {
        if(this.song.begin> 0 && this.song.musicList.length === this.totals.song_total){
          return
        }
        // 合并数组
        this.song.musicList = this.song.musicList.concat(res.list)
        this.componentData = this.song.musicList
        // 只加载一次
        this.totals.song_total = res.total
        // 吸顶效果
        // 设置分页加载数据
        this.song.begin = this.song.begin + this.song.num
      })
    },
    // 获取mv
    getMv () {
      singerMv({
        singer_mid: this.mid,
        begin: this.mv.begin,
        num: this.mv.num
      }).then(res=>{
        if(this.mv.begin>0 && this.mv.mvList.length === this.totals.mv_total){
          return
        }
        this.mv.mvList = this.mv.mvList.concat(res.list)
        // 更新分页加载数据
        this.mv.begin = this.mv.begin + this.mv.num
        if(this.mv.begin>0){
          this.componentData = this.mv.mvList
        }
        this.totals.mv_total = res.total
      })
    },
    // 获取专辑
    getAlbum () {
      singerAlbum({
        singer_mid: this.mid,
        begin: this.album.begin,
        num: this.album.num
      }).then(res=>{
        if(this.album.begin > 0 && this.album.albumList.length === this.totals.album_total){
          return
        }
        // 合并数组
        this.album.albumList = this.album.albumList.concat(res.list)
        this.album.begin = this.album.begin + this.album.num
        if(this.album.begin>0){
          this.componentData = this.album.albumList
        }
        this.totals.album_total = res.total
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable'
.singer-detail
  position relative
  width 100%
  height 100%
  background $bgColor
  z-index 12
.infos{
  height: 290px;
  width: 100%;
  position relative
  overflow hidden
}
.infos .singer-bg{
  background: #353535;
  // height:100%;
  // filter: blur(30px);
  opacity: 0.8;
  overflow: hidden;
  margin-top: -40px;
  margin-bottom -40px
}
.infos .singer-bg .background{
  width: 100%;
  /* height: 280px; */
}
.infos .info-content{
  position: absolute;
  top: 0;
  bottom 0;
  right 0;
  left: 0;
  width: 100%
  display: flex;
  /* display: none; */
}
.infos .info-content .min-avatar{
  width: 100px;
  height: 100px;
  flex: 0 0 100px;
  border-radius: 50%;
  margin: 25px;
  background: #353535;
}
.infos .info-content .info{
  display:flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
}
.infos .info-content .info .name{
  font-size: 14px;
  line-height: 2.5;
  height: 30px;
  overflow: hidden;
}
.infos .info-content .info .fans{
  display: inline-block;
  padding: 2px 15px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0,0,0,0.8);
  background: rgba(255,205,50,0.8);
  border-radius: 50px;
}

</style>
