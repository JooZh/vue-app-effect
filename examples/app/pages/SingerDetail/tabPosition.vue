<template>
  <div class="tab border-half-bottom" v-show="show">
    <div class="tab-list" :class="fixed ? 'fixed':''">
      <div class="tab-list-item" @click="tabChange(0)">
        <span :class="{'on':index==0}">单曲 {{totals.song_total}}</span>
      </div>
      <div class="tab-list-item" @click="tabChange(1)">
        <span :class="{'on':index==1}">专辑 {{totals.album_total}}</span>
      </div>
      <div class="tab-list-item" @click="tabChange(2)">
        <span :class="{'on':index==2}">MV {{totals.mv_total}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    index:{
      type: Number,
      default: 0,
    },
    fixed:{
      type: Boolean,
      default: false,
    },
    show:{
      type: Boolean,
      default: true,
    },
    total:{
      type: Object,
      default: ()=>{},
    }
  },
  watch:{
    total:{
      deep:true,
      handler(val){
        this.totals = val
      }
    }
  },
  data(){
    return {
      totals:{}
    }
  },
  methods:{
    tabChange(index){
      this.$emit('tabChange',{
        index:index
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
/* 导航 */
.tab{
  width: 100%;
  height 40px;
  position: relative;

}
.tab .fixed{
  position: fixed;
  top: 40px;
  left: 0;
  z-index: 2;
  background: #252525;
  transition: background 0.5s ease;
}
.tab-list {
  background: transparent;
  transition: background 0.5s ease;
  width: 100%;
  display: flex;
  border-bottom: 1rpx solid #202020;
  text-align: center;
  line-height: 40px;
  position: absolute;
  top: 0;
  left: 0
}
.tab-list .tab-list-item {
  font-size: 14px;
  flex: 1;
  color: rgba(255,255,255,0.5);
}
.tab-list .tab-list-item .on {
  color: #ffcd32;
}
</style>
