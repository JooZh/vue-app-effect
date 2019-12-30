<template>
  <div class='lists'>
    <div class='list' v-for="(item,index) in menulist" :key="index">
      <div class='detail' @click='goDetail(item.dissid,item.dissname)'>
        <img class='img' v-lazy='{src:item.pic,error:defaultImg,loading:defaultImg}'>
        <div class='title-box'><div class="title">{{item.dissname}}</div></div>
        <div class='name-box'><div class='name'>{{item.creator_name}}</div></div>
        <div class='date'><Icon type="ios-headset" /> {{item.listen_count}} 万</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menulist: {
      type: Array,
      description: '歌单列表'
    }
  },
  data () {
    return {
      defaultImg: require('@/assets/images/album.png')
    }
  },
  methods: {
    goDetail (dissid, dissname) {
      let newPath = `/menu/${dissid}`
      let newRoute = [{
        path: newPath,
        name: newPath,
        component: {extends: this.$router.extends.MenuDetail}
      }]
      // 判断路由是否存在 不存在 添加一个新路由
      let find = this.$router.options.routes.findIndex(item => item.path === newPath)
      if (find === -1) {
        this.$router.options.routes.push(newRoute[0])
        this.$router.addRoutes(newRoute)
      }
      // 存在直接跳转到路由
      this.$router.push({
        name: newPath,
        params: {id: dissid, title: dissname}
      })
    }
  }
}
</script>

<style scoped>
.lists{
  color:rgba(255,255,255,0.5);
  display: flex;
  padding: 5px;
  flex-wrap: wrap;
}
.lists .list{
  flex: 33.333% 0 0;
}
.lists .list .detail{
  padding: 5px;
  margin-bottom:5px;
  position: relative
}
.lists .list .detail .img{
  width: 100%;
  height: 100%;
  background: #ccc;
}
.lists .list .detail .title-box{
  height: 22px;
  line-height: 22px;
  margin-bottom: 2px;
  position: relative;
}
.lists .list .detail .title-box .title{
  position: absolute;
  left: 0;
  right: 0;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lists .list .detail .name-box{
  height: 18px;
  line-height: 18px;
  position: relative;
}
.lists .list .detail .name-box .name{
  position: absolute;
  left: 0;
  right: 0;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lists .list .detail .date{
  font-size: 10px
}
.lists .list .detail .date i{
  font-size: 12px;
  position: relative;
  top: -2px
}
</style>
