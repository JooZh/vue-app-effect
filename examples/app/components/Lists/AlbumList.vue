<template>
  <div class='lists'>
    <div class='list' v-for="(item,index) in data" :key="index">
      <div class='detail' @click='getDetail(item.album_mid,item.album_name)'>
        <img class='img' v-lazy='{src:item.album_pic,error:defaultImg,loading:defaultImg}'>
        <div class='title'>{{item.album_name}}</div>
        <div class='date'>{{item.pub_time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      description: '专辑列表'
    }
  },
  data () {
    return {
      defaultImg: require('@/assets/images/album.png')
    }
  },
  methods: {
    getDetail (mid, title) {
      this.$vueAppEffect.next({
        path: `/pages/AlbumDetail/index`,
        params: {id: mid, title: title}
      });
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
  margin-bottom: 5px;
}
.lists .list .detail .img{
  width: 100%;
  height: 100%;
  background: #ccc;
}
.lists .list .detail .title{
  font-size: 12px;
  height: 15px;
  line-height: 15px;
  margin-bottom: 5px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.lists .list .detail .date{
  font-size: 10px
}
</style>
