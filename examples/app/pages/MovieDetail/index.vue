<template>
  <PageView title="视频详情">
    <div class="lists">
      <div class="content">当前是{{ name }}详情页{{ id }}</div>
      <div class="info" v-for="(item, index) in items" :key="index">
        <p class="info-button" @click="goDetailSinger(id + 1, `Singer`)">
          Singer详情页{{ id + 1 }}
        </p>
        <p class="info-button" @click="goDetailMv(id + 1, `MV`)">
          MV详情页{{ id + 1 }}
        </p>
      </div>
    </div>
  </PageView>
</template>

<script>
export default {
  name: "mv-detail",
  data() {
    return {
      id: 0,
      name: "",
      items: []
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.name = this.$route.params.name;
  },
  mounted() {
    setTimeout(() => {
      this.items = new Array(5);
    }, 50);
  },
  methods: {
    goDetailMv(index, name) {
      this.$vueAppEffect.next({
        path: `/pages/MovieDetail/index/${index}`,
        params: { id: index, name: name }
      });
    },
    goDetailSinger(index, name) {
      this.$vueAppEffect.next({
        path: `/pages/SingerDetail/index/${index}`,
        params: { id: index, name: name }
      });
    }
  }
};
</script>
