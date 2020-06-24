// production
// import config from "../../../src/app.json";

// function getComponent(name){
//   if(name){
//     return require(`../../../src/${name}`).default
//   } else {
//     return null
//   }
// }

// develpment
import config from "../examples/app/app.json";

function getComponent(name){
    if(name){
      return require(`../examples/app/${name}`).default
    } else {
      return null
    }
}

export {
    config,
    getComponent
}
