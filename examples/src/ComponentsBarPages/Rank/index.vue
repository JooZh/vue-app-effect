<template>
  <div>
    <div class="view">
      <Header :title="'排行'" :show="false"></Header>
      <div class="bd">ranking</div>
    </div>
  </div>
</template>

<script>
import Header from '@/ComponentsLayout/Header/index'

export default {
  name: 'rank',
  components: {
    Header
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/mxin';

</style>
