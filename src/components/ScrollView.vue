<template>
  <vue-app-scroller
    :scrollingY="scrollingY"
    :scrollingX="scrollingX"
    :mousewheel="true"
    :onPullRefresh="pullRefresh"
    :onReachBottom="reachBottom"
    :onScroll="onScroll"
  >
    <slot></slot>
  </vue-app-scroller>
</template>
<script>
export default {
  name: "Scroll-View",
  props: {
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
  }
};
</script>
