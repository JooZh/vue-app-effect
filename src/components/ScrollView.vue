<template>
  <vue-app-scroller
    :scrollingY="scrollingY"
    :scrollingX="scrollingX"
    :mousewheel="true"
    :onPullRefresh="pullRefresh"
    :onReachBottom="reachBottom"
    :onScroll="onScroll"
    :data="items"
  >
    <div class="container">
      <slot></slot>
    </div>
  </vue-app-scroller>
</template>
<script>
export default {
  name: "Scroll-View",
  props: {
    data:{
      type: [Array,Object,Number],
      discription: "监听数据"
    },
    scrollingY: {
      type: Boolean,
      default: false,
      discription: "开启纵向滚动"
    },
    scrollingX: {
      type: Boolean,
      default: false,
      discription: "开启横向滚动"
    },
    pullRefresh: {
      type: Function,
      default: null,
      discription: "下拉刷新函数"
    },
    reachBottom: {
      type: Function,
      default: null,
      discription: "上拉加载函数"
    },
    onScroll: {
      type: Function,
      default: null,
      discription: "监听滚动函数"
    }
  },
  watch:{
    data(val){
      this.items = val
    }
  },
  data() {
    return {
      items: []
    };
  },
  mounted() {
    setTimeout(() => {
      this.items = new Array(5);
    }, 500);
  }
};
</script>
