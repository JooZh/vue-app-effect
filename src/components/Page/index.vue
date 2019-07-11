<template>
  <div>
    <template v-if="!isTab">
      <div id="sub-router-view">
        <Navigation :title="title" :backShow="!isTab"></Navigation>
        <div class="bd-view" :class="{'bd-view-full': !title }">
          <vue-app-scroller
            :scrollingY="true"
            :mousewheel="true"
            :onPullRefresh="pullRefresh"
            :onReachBottom ="reachBottom"
            :onScroll="onScroll"
            :data="items">
            <div class="container">
              <slot></slot>
            </div>
          </vue-app-scroller>
          <slot name="position"></slot>
        </div>
      </div>
    </template>
    <template v-else>
      <Navigation :title="title" :backShow="!isTab"></Navigation>
      <div class="bd-view" :class="{'bd-view-full': !title }">
        <vue-app-scroller
          :scrollingY="true"
          :mousewheel="true"
          :onPullRefresh="pullRefresh"
          :onReachBottom ="reachBottom"
          :onScroll="onScroll"
          :data="items">
          <div class="container">
            <slot></slot>
          </div>
        </vue-app-scroller>
        <slot name="position"></slot>
      </div>
    </template>
  </div>
</template>
<script>
import Navigation from '../Navigation/index'
export default {
  name: 'tab-Page',
  components: {
    Navigation
  },
  props: {
    isTab:{
      type: Boolean,
      // default: false,
      discription:'是否是tab页面'
    },
    title:{
      type: String,
      default:'',
      discription:'导航标题, 传值显示导航'
    },
    pullRefresh:{
      type: Function,
      default:null,
      discription:'下拉刷新函数'
    },
    reachBottom:{
      type: Function,
      default:null,
      discription:'上拉加载函数'
    },
    onScroll:{
      type: Function,
      default:null,
      discription:'监听滚动函数'
    }
  },
  // watch:{
  //   isTab(nv,ov){
  //     this.backShow = nv
  //     console.log(nv,ov)
  //   }
  // },
  data () {
    return {
      items:[],
    }
  },
  mounted () {
    setTimeout(()=>{
      this.items = new Array(5)
    },500)
  }
}
</script>

<style lang="stylus">
</style>
