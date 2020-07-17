import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home.vue";
import Search from "./views/search.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        default: Home
      }
    },
    {
      path: "/search",
      name: "search",
      components: {
        default: Search
      }
    },
  ]
});
