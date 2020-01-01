<template>
  <div
    class='tab border-half-bottom'
    :class="{'border-half-top':fixed}"
    v-show="show"
  >
    <div class="tab-list" :class="{'fixed':fixed}">
      <div class="tab-list-item left">
        <span class="left">排行榜共 {{total}} 首</span>
      </div>
      <div class="tab-list-item right">
        <span class="right" @click='handlePlayAll'>全部播放</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    fixed:{
      type: Boolean,
      default: false,
    },
    show:{
      type: Boolean,
      default: true,
    },
    total:{
      type: Number,
      default: 0,
    }
  },
  methods:{
    handlePlayAll(){
      this.$emit('playAll')
    }
  }
}
</script>

<style lang="stylus">
.tab
  width: 100%;
  height 40px
  position: relative;
  .tab-list
    background: transparent;
    transition: background 0.5s ease;
    width: 100%;
    display: flex;
    line-height: 40px;
    position: absolute;
    top: 0;
    left: 0
    &.fixed
      position: fixed;
      top: 40px;
      left: 0;
      z-index: 2;
      background: #252525;
      transition: background 0.5s ease;
    .tab-list-item
      font-size: 15px;
      font-weight 700
      flex: 1;
      color: rgba(255,255,255,0.5);
      span
        padding: 0 15px;
      &.left
        text-align: left;
      &.right
        text-align: right
</style>
