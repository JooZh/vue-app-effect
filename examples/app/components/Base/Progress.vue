<template>
  <div class="progress-bar" ref="progressBar" @click="click">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="bufferPercent" :style="'width:'+bufferPercent*100+'%'"></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart.prevent="touchStart"
        @touchmove.prevent="touchMove"
        @touchend="touchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>

const progressBtnWidth = 15

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    },
    bufferPercent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      touch: {}
    }
  },
  mounted () {
  },
  watch: {
    percent (newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const offsetWidth = newPercent * barWidth
        this._offset(offsetWidth)
      }
    }
  },
  methods: {
    // 得到触摸点开始的 页面坐标  和进度条的长度
    touchStart (e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
      this.$emit('percentStart')
    },
    touchMove (e) {
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const maxWith = Math.max(0, this.touch.left + deltaX)
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      const offsetWidth = Math.min(barWidth, maxWith)
      this._offset(offsetWidth)
      this._triggerPercent()
    },
    touchEnd () {
      this.touch.initiated = false
      this._triggerPercent()
      this.$emit('percentEnd')
    },
    click (e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this._offset(offsetWidth)
      this._triggerPercent()
    },
    _triggerPercent () {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    },
    _offset (offsetWidth) {
      this.$refs.progress.style.width = offsetWidth + 'px'
      this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`
    }
  }

}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/variable';
  .progress-bar
    width 100%
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      border-radius: 5px
      background: rgba(0, 0, 0, 0.3)
      .bufferPercent
        position: absolute
        height: 100%
        border-radius: 5px
        z-index 2
        transition width 0.5s
        background: rgba(255, 255, 255, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $themeColor
        border-top-left-radius: 2px
        border-bottom-left-radius: 2px
        z-index 3
      .progress-btn-wrapper
        z-index 4
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid #fff
          border-radius: 50%
          background: #fff
</style>
