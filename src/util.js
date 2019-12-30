// production
// import config from "../../../src/app.json";

// function getComponent(name){
//   return require(`../../../src/${name}`).default
// }

// develpment
import config from "../examples/app/app.json";

function getComponent(name){
    return require(`../examples/app/${name}`).default
}

export {
    config,
    getComponent
}
