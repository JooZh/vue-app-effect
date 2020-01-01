<template>
  <div id="vue-app-effect__tab-bar" v-if="navs.length > 0">
    <div class="nav border-half-top">
      <template v-for="(nav, index) in navs">
        <router-link class="bar" :to="nav.path" replace :key="index">
          <div class="button">
            <div class="icon" v-if="nav.iconFont" v-html="nav.iconFont"></div>
            <div class="icon" v-else-if="nav.iconImagePath">
              <img :src="nav.iconImagePath" alt="" />
            </div>
            <div class="text">{{ nav.text }}</div>
          </div>
        </router-link>
      </template>
    </div>
  </div>
</template>
<script>
import {config} from '../util.js'
export default {
  name: "Tab-Bar",
  data() {
    let tabBar = config.tabBar;
    return {
      navs: tabBar.list.map(item => {
        item.path = "/" + item.path;
        return item;
      })
    };
  }
};
</script>
