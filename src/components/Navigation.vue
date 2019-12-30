<template>
  <div class="hd-view" v-if="title">
    <div class="back-btn">
      <div @click="back"><i v-if="backShow" class="fa fa-angle-left"></i></div>
    </div>
    <div class="title">{{ title }}</div>
    <div class="show-cd" @click="changePlayer">
      <!-- <Music v-if="music"></Music> -->
    </div>
  </div>
</template>

<script>
// import Music from '../../components/Music/index'
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    backShow: {
      type: Boolean
      // default: false
    }
  },
  methods: {
    back() {
      this.$vueAppEffect.back();
    },
    changePlayer() {
      this.$vueAppEffect.next({
        path: `/pages/Player/index`
      });
    }
  }
};
</script>
