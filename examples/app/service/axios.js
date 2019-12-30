import axios from 'axios'

function sendRequest(options){
  return new Promise((resolve,reject)=>{
    axios.get(options.path, {
      params:options.params
    }).then(res=>{
      if(res.data.status === 0){
        resolve(res.data.data)
      } else {
        reject()
      }
    })
  })
}

export default sendRequest
