import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
Vue.use(Router);

import index from "./components/index.vue";
import song from "./components/song.vue";

let router = new Router({
  // 路由规则
  routes: [
    {
      path: "/",
      component: index,
    },
    {
      path: "/song",
      component: song,
    },
  ],
});

// 引入reset.css
import "./assets/css/reset.css";
// 引入rem.js
import "./assets/js/rem.js";

new Vue({
  router: router,
  render: (h) => h(App),
}).$mount("#app");
