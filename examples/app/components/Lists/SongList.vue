<template>
<div class='songlist'>
  <div class='list' v-for="(item,index) in data" :key="index">
    <div class='number'>{{index+1}}</div>
    <div class='detail' @click='handlePlayOne(index)'>
      <div class='songname-box'><div class='songname'>{{item.song_name}}</div></div>
      <div class='albumname-box'>
        <div class='albumname' v-if="item.singers">{{item.singers | nameArrgs }} · {{item.album_name}}</div>
        <div class='albumname' v-else-if="item.album_name">专辑: {{item.album_name }}</div>
      </div>
    </div>
    <div class='time' @click='handleAddSong(index)'>
      <Icon type="md-add" />
    </div>
  </div>
</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  props: {
    data: {
      type: Array,
      description: '歌曲列表'
    }
  },
  data () {
    return {}
  },
  filters:{
    nameArrgs(val){
      let names = '';
      val.map(item=>{
        names+=item.name
      })
      return names
    }
  },
  computed: {
    ...mapGetters([
      'playerList'
    ])
  },
  methods: {
    ...mapMutations([
      'playOne',
      'togglePlayer',
      'playAdd'
    ]),
    // 点击播放
    handlePlayOne (index) {
      // 添加到列表
      this.playOne(this.data[index])
      // 打开播放器
      this.togglePlayer()
    },
    // 点击添加歌曲
    handleAddSong (index) {
      // let notice = ''
      // if (this.isIn(index) === -1) {
      this.playAdd(this.data[index])
      //   notice = '添加成功'
      // } else {
      //   notice = '歌曲已存在'
      // }
      this.$toast('添加成功', {duration: '800'})
    },
    // 获取歌曲对象
    // getSong (index) {
    //   let find = this.isIn(index)
    //   if (find === -1) {
    //     return this.data[index]
    //   } else {
    //     return find
    //   }
    // },
    // 判断添加歌曲是否已经在列表
    // isIn (index) {
    //   let song_id = this.data[index].song_id
    //   return this.playerList.findIndex(song => song.song_id === song_id)
    // }
  }
}
</script>

<style  scoped>
.songlist{
  color: #e5e5e5;
  font-size: 14px;
}
.songlist .list{
  display: flex;
  padding: 5px 0;
}
.songlist .list .number{
  flex: 0 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
}
.songlist .list .detail{
  flex: 1;
  position: relative;
}
.songlist .list .detail .songname-box{
  font-size: 14px;
  line-height: 25px;
  height: 25px;
  position: relative;
}
.songlist .list .detail .songname-box .songname{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.songlist .list .detail .albumname-box{
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: #888;
  position: relative;
}
.songlist .list .detail .albumname-box .albumname{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.songlist .list .time{
  font-size: 20px;
  flex: 0 0 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
