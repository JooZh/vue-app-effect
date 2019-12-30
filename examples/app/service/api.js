import sendRequest from './axios.js'
import getApiHost from './host';
const { API_HOST } = getApiHost();

export const recommendNewAlbum = params =>{
  return sendRequest({
    path: API_HOST + '/recommend_new_album',
    params: params
  })
}
export const recommendMvList = params =>{
  return sendRequest({
    path: API_HOST + '/mv_list',
    params: params
  })
}


