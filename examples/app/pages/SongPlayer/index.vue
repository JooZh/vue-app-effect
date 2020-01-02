<template>
    <div id="song-player">
      <div class="player" v-show="playerState">
        <div class="play-title border-half-bottom">
          <div class="back-btn" @click="changePlayer">
            <Icon type="ios-arrow-back"/>
          </div>
          <div class="title">
            <div class="song-name">
              <div class="pix">{{playSongName}}</div>
            </div>
            <div class="singer-name">
              <div class="pix">{{playSongSinger}}</div>
            </div>
          </div>
          <div class="show-cd"><Icon type="ios-disc"/></div>
        </div>
        <div class='play-bg'>
          <img class='background' :src='playSongImage' :onerror="defaultImg">
        </div>
        <div class='play-center'>
          <div class="circle" @click="toggleLyric" :class="{'toggleShow':playLyricShow,'toggleHide':!playLyricShow}">
            <img class="cd" :class="{'paused':!playStatus}" :src='playSongImage' :onerror="defaultImg">
          </div>
          <div ref="lyric" @click="toggleLyric" class="lyric" :class="{'center': playLyric.length == 1,'toggleShow':!playLyricShow,'toggleHide':playLyricShow}">
            <ScrollView :data="playLyric" :scrollingY="true">
              <div
                class="list"
                ref="lyricLine"
                :class="{'current':index == playLyricCurrent}"
                v-for="(item,index) in playLyric"
                :key="index">{{item.text}}</div>
            </ScrollView>
          </div>
        </div>
        <div class='play-bottom'>
          <div class='play-progress'>
            <div class='this-time'>{{playCurrentTime}}</div>
            <div class='progress-box'>
                <Progress
                  :bufferPercent="bufferPercent"
                  :percent="playPercent"
                  @percentChange="onPercentChange"
                  @percentStart="onPercentStart"
                  @percentEnd="onPercentEnd">
                </Progress>
            </div>
            <div class='all-time'>{{playInterval}}</div>
          </div>
          <div class='play-buttons'>
            <div class='button'>
              <div class='ls-btn loops' @click="changeLoops">
                <Icon v-show="playLoopsState===0" type="ios-repeat" />
                <Icon v-show="playLoopsState===1" type="ios-refresh" />
                <Icon v-show="playLoopsState===2" type="ios-shuffle" />
              </div>
            </div>
            <div class='button'>
              <div class='ls-btn' @click='handlePrev'>
                <Icon type="md-skip-backward" />
              </div>
            </div>
            <div class='button'>
              <div class='cltr'>
                <div class='play' v-show="!playStatus" @click='handlePlay'>
                  <Icon type="md-play" />
                </div>
                <div class='pause' v-show="playStatus" @click='handlePause'>
                  <Icon type="md-pause" />
                </div>
              </div>
            </div>
            <div class='button'>
              <div class='ls-btn' @click='handleNext'>
                <Icon type="md-skip-forward" />
              </div>
            </div>
            <div class='button'>
              <div class='ls-btn loops' @click='togglePlayList'>
                <Icon type="ios-menu-outline" />
              </div>
            </div>
          </div>
        </div>
        <div class="play-list" :class="{'list-show':openList}">
          <div class="play-list-bg" @click='togglePlayList'></div>
          <div class='play-list-container'>
            <div class='play-list-nav border-half-bottom'>
              <div class='nav-state' v-show="playLoopsState===0" @click="changeLoops"> 列表循环 [{{playerList.length}}]</div>
              <div class='nav-state' v-show="playLoopsState===1" @click="changeLoops"> 单曲循环 [{{playerList.length}}]</div>
              <div class='nav-state' v-show="playLoopsState===2" @click="changeLoops"> 随机播放 [{{playerList.length}}]</div>
              <div class='nav-center'></div>
              <div class='nav-clear' @click="clearPlayerList"><Icon class="icon" type="md-trash" /> 清空</div>
            </div>
            <PlayList @delOneSong="delOneSong"></PlayList>
            <div class='close border-half-top' @click='togglePlayList'>
              <Icon type="ios-arrow-down" />
            </div>
          </div>
        </div>
      </div>
      <audio id='audio' ref="audio" @canplay="onCanplay" @timeupdate="onTimeUpdate" @ended="onEnded" :src="playSongUrl"></audio>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Progress from '@/components/Base/Progress'
import PlayList from '@/components/Lists/PlayList'

import { songPlay,songLyric,songDetail } from '@/service/api'

export default {
  name:"SongPlayer",
  components: {
    Progress,
    PlayList,
  },
  data () {
    const defaultImg = require('@/assets/images/album.png');
    return {
      playLoopsState: 0,
      playLoopsList: [{
        status: 0,
        name: '列表循环'
      }, {
        status: 1,
        name: '单曲循环'
      }, {
        status: 2,
        name: '随机播放'
      }],
      openList: false,
      playLyricShow: true,
      playPercent: 0,
      playSongName: '暂无歌曲',
      playSongSinger: '暂无',
      playSongImage: defaultImg,
      playSongUrl: '',
      playSongid: -1,
      playLyric: [{text: '暂无歌词'}],
      playInterval: '0.00',
      playCurrentTime: '0.00',
      playLyricCurrent: 0,
      playSongLong: 0,
      audio: null,
      scroll: null,
      defaultImg: defaultImg,
      bufferPercent: 0,
      isPercent: false, // 是否拖动滚动条
    }
  },
  mounted () {
    // 获得 audio 对象
    this.audio = this.$refs.audio
  },
  watch: {
    // 监听当前播放的歌曲
    playSong (song) {
      this.getPlaySong(song)
    }
  },
  computed: {
    ...mapGetters([
      'playerState',
      'playSong',
      'playStatus',
      'playerList'
    ])
  },
  methods: {
    // 播放页面改变
    changePlayer () {
      this.togglePlayer()
    },
    // 清空播放列表
    clearPlayerList () {
      this.clearList()
      this.pause()
      this.audio.pause()
      this.changePlayer()
      this.openList = false
    },
    delOneSong () {
      console.log('del')
      if (!this.playerList.length) {
        this.clearPlayerList()
      }
    },
    // 改变循环方式
    changeLoops () {
      let long = this.playLoopsList.length - 1
      if (this.playLoopsState === long) {
        this.playLoopsState = 0
      } else {
        this.playLoopsState++
      }
    },
    // 显示播放列表
    togglePlayList () {
      this.openList = !this.openList
    },
    // 切换cd 和歌词
    toggleLyric () {
      this.playLyricShow = !this.playLyricShow
    },
    // 处理点击播放
    handlePlay () {
      this.play()
      this.audio.play()
    },
    // 处理点击暂停
    handlePause () {
      this.pause()
      this.audio.pause()
    },
    // 处理点击下一曲
    handleNext () {
      this.pause()
      if (this.playLoopsState === 0) {
        this.next()
      } else if (this.playLoopsState === 1) {
        this.repeat()
      } else {
        this.random()
      }
    },
    // 处理点击上一曲
    handlePrev () {
      this.pause()
      if (this.playLoopsState === 0) {
        this.prev()
      } else if (this.playLoopsState === 1) {
        this.repeat()
      } else {
        this.random()
      }
    },
    // 监听是否能播放
    onCanplay () {
      if (!this.isPercent) {
        this.play()
        this.audio.play()
      }
    },
    // 监听播放错误
    // onError () {
    //   this.handlePause()
    //   this.handleNext()
    // },
    // 监听播放中
    onTimeUpdate () {
      // 监听音频缓存
      if (this.audio.buffered.length !== 0 && this.bufferPercent !== 1) {
        let bufferPercent = (this.audio.buffered.end(0) / this.playSongLong).toFixed(0)
        this.bufferPercent = Number(bufferPercent)
      }
      // 取得对应的歌词时间格式
      let formatTime = this.audio.currentTime.toFixed(0)
      let lyricTime = (this.audio.currentTime * 1000).toFixed(0)
      // 修改数据
      this.playCurrentTime = this.formatTime(formatTime)
      this.playLyricCurrent = this.lyricTime(lyricTime)
      this.playPercent = Number(formatTime / this.playSongLong)
    },
    onEnded () {
      this.handleNext()
    },
    // 滚动歌词
    scrollLyric (n) {
      // 去除实时滚动监听，方便滑动歌词
      if (this.playLyricCurrent === n) {
        return
      }
      if (n > 6) {
        let line = this.$refs.lyricLine[n - 6]
        this.scroll.scrollToElement(line, 1000)
      } else {
        this.scroll.scrollTo(0, 0, 1000)
      }
    },
    // 取得当前播放的歌词索引
    lyricTime (time) {
      let number = this.playLyric.filter(item => time >= item.time).length - 1
      // this.scrollLyric(number)
      return number
    },
    // 监听开始拖动进度条
    onPercentStart () {
      this.isPercent = true
      this.pause()
      this.audio.pause()
    },
    // 监听拖动中
    onPercentChange (percent) {
      let currentTime = this.playSongLong * percent
      this.playCurrentTime = this.formatTime(currentTime.toFixed(0))
      this.audio.currentTime = currentTime
    },
    // 监听拖动后
    onPercentEnd () {
      this.isPercent = false
    },
    // 进度格式时间
    formatTime (time) {
      let n = 0
      let m = 0
      let s = time % 60
      if (time < 10) {
        n = 0
        m = `0${time}`
      } else if (time < 60) {
        n = 0
        m = time
      } else {
        n = Math.floor(time / 60)
        m = s < 10 ? `0${s}` : s
      }
      return `${n}:${m}`
    },
    // 获取播放数据
    getPlaySong (song) {
      if (!song) {
        return
      }
      this.playSongName = song.song_name
      if(song.singers){
        this.playSongSinger = song.singers[0].name
      }else {
        this.playSongSinger = ''
      }

      this.playInterval = song.interval_str
      this.playSongLong = song.interval_num
      this.bufferPercent = 0
      // 保存数据
      Promise.all([
        songPlay({song_mid:song.song_mid}),
        songLyric({song_mid:song.song_mid}),
        songDetail({song_mid:song.song_mid,song_id:song.song_id})
      ]).then((values) => {
        this.playSongUrl = values[0].recommend_url
        this.playLyric = values[1].lines
        this.playSongImage = values[2].song_track.track.album_pic
        setTimeout(() => {
          this.audio = this.$refs.audio
          this.play()
          this.audio.play()
        }, 800)
      })
    },
    // 提交动作
    ...mapActions([
      'togglePlayer',
      'next',
      'prev',
      'play',
      'pause',
      'repeat',
      'random',
      'playBackType',
      'clearList'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
