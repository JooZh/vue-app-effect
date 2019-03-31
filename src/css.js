function css(){
  return `
    .vue-app-effect-out-enter-active,
    .vue-app-effect-out-leave-active,
    .vue-app-effect-in-enter-active,
    .vue-app-effect-in-leave-active {
      will-change: transform;
      transition: all 500ms cubic-bezier(0.075, 0.82, 0.165, 1) ;
      bottom: 0;
      top: 0;
      position: absolute;
      backface-visibility: hidden;
      perspective: 1000;
    }
    .vue-app-effect-out-enter {
      opacity: 0;
      transform: translate3d(-70%, 0, 0);
    }
    .vue-app-effect-out-leave-active {
      opacity: 0 ;
      transform: translate3d(70%, 0, 0);
    }
    .vue-app-effect-in-enter {
      opacity: 0;
      transform: translate3d(70%, 0, 0);
    }
    .vue-app-effect-in-leave-active {
      opacity: 0;
      transform: translate3d(-70%, 0, 0);
    }
  `
}
function appendCss(){
  let cssText = css()
  let head = document.head || document.getElementsByTagName('head')[0]
  let style = document.createElement('style')
  style.type = 'text/css'
  if (style.styleSheet){ 
    style.styleSheet.cssText = cssText; 
  }else { 
    style.appendChild(document.createTextNode(cssText))
  } 
  head.appendChild(style)
}

export default appendCss