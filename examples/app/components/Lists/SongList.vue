<template>
<div class='songlist'>
  <div class='list' v-for="(item,index) in musicList" :key="index">
    <div class='number'>{{index+1}}</div>
    <div class='detail' @click='handlePlayOne(index)'>
      <div class='songname-box'><div class='songname'>{{item.songname}}</div></div>
      <div class='albumname-box'><div class='albumname'>{{item.singer}} · {{item.albumname}}</div></div>
    </div>
    <div class='time' @click='handleAddSong(index)'>
      <div class='c'>+</div>
    </div>
  </div>
</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  props: {
    musicList: {
      type: Array,
      description: '歌曲列表'
    }
  },
  data () {
    return {}
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
      'playAdd',
      'playBackType'
    ]),
    // 点击播放
    handlePlayOne (index) {
      this.$router.push({
        path: `/player`
      })
      this.playBackType('ios')
      // 添加到列表
      this.playOne(this.getSong(index))
      // 打开播放器
      this.togglePlayer()
      // 播放
      let timer = setTimeout(() => {
        this.audio = document.getElementById('audio')
        this.audio.play()
        clearTimeout(timer)
      }, 100)
    },
    // 点击添加歌曲
    handleAddSong (index) {
      let notice = ''
      if (this.isIn(index) === -1) {
        this.playAdd(this.getSong(index))
        notice = '添加成功'
      } else {
        notice = '歌曲已存在'
      }
      this.$toast(notice, {duration: '800'})
    },
    // 获取歌曲对象
    getSong (index) {
      let find = this.isIn(index)
      if (find === -1) {
        return this.musicList[index]
      } else {
        return find
      }
    },
    // 判断添加歌曲是否已经在列表
    isIn (index) {
      let songid = this.musicList[index].songid
      return this.playerList.findIndex(song => song.songid === songid)
    }
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
  align-items: center
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
  font-size: 12px;
  flex: 0 0 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.songlist .list .time .c{
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 18px;
  border: 1px solid #ccc;
  color: #ccc;
  font-size: 15px;
}
</style>
