<template>
  <PageScrollView
    isTab
    title="song"
    :pullRefresh="pullRefresh"
    :reachBottom="reachBottom"
    :onScroll="onScroll"
  >
    <div>sfafaf</div>
    <div class="num" slot="position">{{ y }}</div>
  </PageScrollView>
</template>

<script>
export default {
  name: "song",
  data() {
    return {
      y: 0
    };
  },
  mounted() {},
  methods: {
    pullRefresh() {},
    reachBottom() {},
    onScroll(e) {
      this.y = e.y;
    }
  }
};
</script>

<style lang="stylus">
.num
  position absolute
  left 10px
  top 10px
</style>
