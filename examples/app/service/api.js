import sendRequest from './axios.js'
import getApiHost from './host';
const { API_HOST } = getApiHost();

export const recommendNewAlbum = params =>{
  return sendRequest({
    path: API_HOST + '/recommend_new_album',
    params: params
  })
}

// mv相关
export const recommendMvList = params =>{
  return sendRequest({
    path: API_HOST + '/mv_list',
    params: params
  })
}
export const recommendMvDetailAll = params =>{
  return sendRequest({
    path: API_HOST + '/mv_detail_all',
    params: params
  })
}

// 歌手相关
export const singerList = params =>{
  return sendRequest({
    path: API_HOST + '/singer_list',
    params: params
  })
}
export const singerAlbum = params =>{
  return sendRequest({
    path: API_HOST + '/singer_album',
    params: params
  })
}
export const singerSong = params =>{
  return sendRequest({
    path: API_HOST + '/singer_song',
    params: params
  })
}
export const singerMv = params =>{
  return sendRequest({
    path: API_HOST + '/singer_mv',
    params: params
  })
}
export const singerAttention = params =>{
  return sendRequest({
    path: API_HOST + '/singer_attention',
    params: params
  })
}


// 排行榜相关
export const topList = params =>{
  return sendRequest({
    path: API_HOST + '/top_list',
    params: params
  })
}
export const topDetail = params =>{
  return sendRequest({
    path: API_HOST + '/top_detail',
    params: params
  })
}

// 歌曲相关
export const songPlay = params =>{
  return sendRequest({
    path: API_HOST + '/song_play',
    params: params
  })
}
export const songLyric = params =>{
  return sendRequest({
    path: API_HOST + '/song_lyric',
    params: params
  })
}
export const songDetail = params =>{
  return sendRequest({
    path: API_HOST + '/song_detail',
    params: params
  })
}

// 歌单相关
export const AlbumDetail = params =>{
  return sendRequest({
    path: API_HOST + '/album_detail',
    params: params
  })
}
export const AlbumList = params =>{
  return sendRequest({
    path: API_HOST + '/album_list',
    params: params
  })
}
