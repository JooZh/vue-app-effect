<template>
  <div>
    <div class="view">
      <Header :title="'歌手'" :show="false"></Header>
      <div class="bd"></div>
    </div>
  </div>
</template>

<script>
import Header from '@/ComponentsLayout/Header/index'
export default {
  name: 'singer',
  components: {
    Header
  },
  data () {
    return {
      defaultImg: require('@/assets/images/singer.png')
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/common';

</style>
