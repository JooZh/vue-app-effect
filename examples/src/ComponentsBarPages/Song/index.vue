<template>
  <div>
    <div class="view">
      <Header :title="'歌单'" :show="false"></Header>
      <div class="bd">song</div>
    </div>
  </div>
</template>

<script>
import Header from '@/ComponentsLayout/Header/index'
export default {
  name: 'song',
  components: {
    Header
  },
  data () {
    return {}
  },
  mounted () {

  },
  activated () {

  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>

</style>
