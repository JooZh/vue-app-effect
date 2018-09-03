# vue-app-effect
实现模拟原生app页面切换效果和缓存效果的前端设计方案, 行为上模拟了app的操作模式，前进刷新，后退缓存，保存数据和页面状态。（如果是采用带滚动条的方式需要自行处理滚动条切换后的位置。建议使用 better-scroll进行页面滚动结构处理，可以直接保存当前页面的状态，和上拉加载的数据）

## 使用前提
需要 vue 2.x , vue-router 2.x , vuex 2.x

库只是一个核心处理文件，页面结构和配置还需要参考 examples 文件夹中的结果进行搭建

注意：每个路由下的组件根节点都需要采用绝对定位的方式，不采用的话切换会有一定问题。

[Demo演示](https://joozh.github.io/vue-app-effect/)

[音乐App示例](https://joozh.cn/music/)
