<template>
  <div class="scroll-layout">
    <ScrollView :data="playerList" :scrollingY="true">
      <ul class="songlist">
        <li class="list"
          v-for="(item,index) in playerList"
          :class="{'del':deleteIndex==index,'active':playSongindex == index}"
          :key="index"
        >
          <div class="number">
            <Icon v-if="playSongindex == index" type="md-stats" />
            <Icon v-else type="md-musical-notes" />
          </div>
          <div class="detail" @click.stop="changeSong(index)">
            <div class="songname text-line">
              <div class="pix">{{item.song_name}}</div>
            </div>
            <div class="albumname text-line">
              <div class='pix' v-if="item.singers">{{item.singers | nameArrgs }} · {{item.album_name}}</div>
              <div class='pix' v-else-if="item.album_name">专辑: {{item.album_name }}</div>
            </div>
          </div>
          <div class="time">
            <div class="c" @click.stop="deleteSong(index)">
              <Icon type="md-close" />
            </div>
          </div>
        </li>
      </ul>
    </ScrollView>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      deleteIndex: -1
    };
  },
  filters:{
    nameArrgs(val){
      let names = '';
      val.map(item=>{
        names+=item.name
      })
      return names
    }
  },
  computed: {
    ...mapGetters(["playerList", "playSongindex"])
  },
  methods: {
    changeSong(index) {
      this.playSome(index);
    },
    deleteSong(index) {
      this.deleteIndex = index;
      setTimeout(() => {
        this.delOne(index);
        this.deleteIndex = -1;
        this.$emit("delOneSong");
      }, 300);
    },
    ...mapMutations(["playSome", "delOne"])
  }
};
</script>

<style lang="stylus" scoped>
.scroll-layout
  position: absolute;
  top: 50px
  bottom: 50px
  left 0
  right 0
  .songlist {
    color: #e5e5e5;
    font-size: 14px;
    padding: 10px 0;
  }
  .songlist .list {
    display: flex;
    /* padding: 10px 0; */
    height: 55px;
    /* margin: 10px 0; */
    padding: 8px 0 8px 0;
    position: relative;
  }
.songlist .list.del {
  transition: all 0.3s;
  height: 0;
  padding: 0;
  overflow: hidden;
  transform: scaleY(0);
}
.songlist .list.active {
  color: #ffcd32;
  /* background: rgba(255,205,50,0.2); */
}
.songlist .list.active .detail .albumname {
  color: #aaa;
}
.songlist .list.active .time .c {
  color: #ffcd32;
}
.songlist .list .number {
  flex: 0 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}
.songlist .list .detail {
  flex: 1;
}
.songlist .list .detail .songname {
  position: relative;
  font-size: 14px;
  line-height: 25px;
  height: 25px;
}
.songlist .list .detail .fix {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.songlist .list .detail .albumname {
  position: relative;
  font-size: 12px;
  line-height: 15px;
  height: 20px;
  color: #888;
}
.songlist .list .time {
  font-size: 12px;
  flex: 0 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.songlist .list .time .c {
  /* border-radius: 50%; */
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 18px;
  /* border: 1px solid #ccc; */
  color: #ccc;
  font-size: 20px;
}
</style>
