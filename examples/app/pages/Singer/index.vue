<template>
  <PageView title="歌手" isTab>
    <div class="mvlist">
      <div class="list" v-for="(item, index) in items" :key="index">
        <div class="detail" @click="goDetail(index + 1, `Singer`)">
          <img class="img" :src="defaultImg" />
          <div class="title-box">
            <div class="title">vue-app-effect Sge {{ index + 1 }}</div>
          </div>
          <div class="date">播放: {{ index + 1 }}.99 万</div>
        </div>
      </div>
    </div>
  </PageView>
</template>
<script>
export default {
  name: "singer",
  data() {
    return {
      show: false,
      items: [],
      defaultImg: require("../../assets/images/singer.png")
    };
  },
  created() {
    setTimeout(() => {
      this.items = new Array(30);
    }, 500);
  },
  mounted() {
    this.show = true;
  },
  methods: {
    goDetail(index, name) {
      this.$vueAppEffect.next({
        path: `/pages/SingerDetail/index/${index}`,
        params: { id: index, name: name }
      });
    }
  }
};
</script>
