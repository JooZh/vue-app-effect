<template>
  <PageScrollView :title="headerTitle" :onScroll="onScroll" >
    <div id="ranking-list">
      <div class="container">
        <div id='infos' class='infos'>
          <div class='singer-bg'>
            <img class='background' v-lazy='{src:img,error:defaultImg,loading:defaultImg}'>
          </div>
          <div class='info-content'>
            <img class='min-avatar' v-lazy='{src:img,error:defaultImg,loading:defaultImg}'>
            <div class='info'>
              <div class='name'>{{topInfo.pts}}</div>
              <div class='fans'>{{topInfo.listen_str}} 粉丝</div>
              <div class='fans'>{{topInfo.update_time}} 更新</div>
            </div>
          </div>
        </div>
        <TabPosition @playAll="handlePlayAll" :show="true" :total="topInfo.total" />
        <SongList :data="songlist"></SongList>
      </div>
    </div>
    <TabPosition slot="position" @playAll="handlePlayAll" :total="topInfo.total" :show="fixed" :fixed="fixed" />
  </PageScrollView>
</template>

<script>
import SongList from '@/components/Lists/SongList'
import TabPosition from './tabPosition'

import { topDetail } from '@/service/api'
import { mapMutations } from 'vuex'

export default {
  name: 'ranking-detail',
  components: {
    SongList,
    TabPosition
  },
  data () {
    return {
      tabTop: 220,
      headerTitle: '',
      img:'',

      fixed: false,
      songlist: [],
      topInfo: {},
      defaultImg: require('@/assets/images/album.png')
    }
  },
  mounted () {
    let id = this.$route.params.id
    this.headerTitle = this.$route.params.title
    this.img = this.$route.params.img
    // 获取当前页面高度
    this.getMusicList(id)
  },
  methods: {
    ...mapMutations([
      'playAll',
    ]),
    handlePlayAll () {
      this.playAll(this.songlist)
    },
    onScroll (pos) {
      this.fixed = this.tabTop - pos.y <= 0
    },
    // 获取单曲数据
    getMusicList (id) {
      topDetail({top_id:id}).then(res=>{
        let topInfo = res
        topInfo.pts = `第${topInfo.week}周`
        this.topInfo = topInfo
        this.songlist = res.song_list
        // 吸顶效果
        // this.tabTop = this.$refs.tab.getBoundingClientRect().top - 40
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/common'
#ranking-list
  width 100%
  height 100%
  position relative
  z-index 12
  background $bgColor
  .container
    .infos
      height: 220px;
      width: 100%;
      position relative
      .singer-bg
        background: #353535;
        height: 100%;
        -webkit-filter: blur(30px);
        filter: blur(30px);
        opacity: 0.4;
        .background
          width: 100%;
          height: 100%;
      .info-content
        position: absolute;
        top: 40px;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        color: #ccc;
        .min-avatar
          width: 120px;
          height: 120px;
          flex: 0 0 120px;
          margin: 25px 30px;
          background: #353535;
        .info
          display: inline-block;
          margin: 25px 20px 0 0;
          flex: 1;
          height: 100px;
          .name
            font-size: 18px;
            line-height: 1.2;
            padding: 10px 0;
            overflow: hidden;
            color: #ffcd32;
          .fans
            font-size: 14px;
            line-height: 1.5

</style>
