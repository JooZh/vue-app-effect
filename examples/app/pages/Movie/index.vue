<template>
  <PageScrollView title="视频" isTab>
    <div class="mvlist">
      <div class="list" v-for="(item, index) in items" :key="index">
        <div class="detail" @click="goDetail(index + 1, `MV`)">
          <img class="img" :src="defaultImg" />
          <div class="title-box">
            <div class="title">vue-app-effect MV {{ index + 1 }}</div>
          </div>
          <div class="date">播放: {{ index + 1 }}.99 万</div>
        </div>
      </div>
    </div>
  </PageScrollView>
</template>
<script>
export default {
  name: "movie",
  data() {
    return {
      show: false,
      items: [],
      defaultImg: require("../../assets/images/mv.png")
    };
  },
  created() {
    setTimeout(() => {
      this.items = new Array(30);
    }, 100);
  },
  mounted() {
    this.show = true;
  },
  methods: {
    goDetail(index, name) {
      this.$vueAppEffect.next({
        path: `/pages/MovieDetail/index/${index}`,
        params: { id: index, name: name }
      });
    }
  }
};
</script>
