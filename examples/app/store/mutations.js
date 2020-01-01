import * as types from "./types";

function find(list,id){
  return list.findIndex(item => item.song_id === id);
}
export default {
  // 路由方向
  [types.playBackType](state, payload) {
    state.backType = payload;
  },

  // 切换播放器状态
  [types.togglePlayer](state) {
    // 当无播放列表的时候
    if (state.playerList.length === 0) {
      state.playStatus = false;
    }
    state.playerState = !state.playerState;
  },

  // 非播放列表点击全部播放
  [types.playAll](state, list) {
    // 数组深拷贝防止播放列表的歌曲和当前列表相同被导致删除被修改
    let listArr = [];
    list.forEach(item => {
      listArr.push(item);
    });
    state.playerList = listArr;
    state.playSong = listArr[0];
    state.playerState = !state.playerState;
    state.playSongindex = 0;
    state.playStatus = true
  },

  // 非播放列表点击播放单首
  [types.playOne](state, song) {
    // 传过来的是song对象进行对象深拷贝
    let index = find(state.playerList, song.song_id)
    if(index === -1){
      let newSong = JSON.parse(JSON.stringify(song));
      state.playerList.unshift(newSong);
      state.playSongindex = 0;
      state.playSong = state.playerList[0];
    } else {
      state.playSong = state.playerList[index];
      state.playSongindex = index;
    }
  },

  // 清空播放列表
  [types.clearList](state) {
    state.playerList = [];
    state.playSongindex = 0;
  },

  // 播放列表点击播放
  [types.playSome](state, index) {
    state.playSong = state.playerList[index];
    state.playSongindex = index;
  },

  // 点击添加歌曲
  [types.playAdd](state, song) {
    let newSong = JSON.parse(JSON.stringify(song));
    if(find(state.playerList, song.song_id) === -1){
      state.playerList.unshift(newSong);
    }
  },

  // 删除一条歌曲
  [types.delOne](state, index) {
    if (index === state.playSongindex) {
      state.playSong = state.playerList[index + 1];
    } else if (index < state.playSongindex) {
      state.playSongindex -= 1;
    }
    state.playerList.splice(index, 1);
  },

  // 点击下一曲
  [types.next](state) {
    let long = state.playerList.length - 1;
    if (state.playSongindex !== long) {
      state.playSongindex += 1;
    } else {
      state.playSongindex = 0;
    }
    state.playSong = {};
    state.playSong = state.playerList[state.playSongindex];
  },

  // 点击上一曲
  [types.prev](state) {
    if (state.playSongindex !== 0) {
      state.playSongindex -= 1;
    } else {
      state.playSongindex = state.playerList.length - 1;
    }
    state.playSong = {};
    state.playSong = state.playerList[state.playSongindex];
  },

  // 重复播放
  [types.repeat](state) {
    let red = state.playSong;
    state.playSong = {};
    state.playSong = red;
  },

  // 随机播放
  [types.random](state) {
    let random = Math.floor(Math.random() * state.playerList.length);
    console.log(random);
    state.playSongindex = random;
    state.playSong = {};
    state.playSong = state.playerList[random];
  },

  // 点击播放
  [types.play](state) {
    state.playStatus = true;
  },

  // 点击暂停
  [types.pause](state) {
    state.playStatus = false;
  },

  // mv的数据
  [types.playMv](state, mvObj) {
    state.playMvData = mvObj;
  }
};
