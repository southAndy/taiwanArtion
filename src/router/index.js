import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Home_Banner from "../views/Banner.vue";

// import SearchMapView from "../views/SearchMapView.vue";
import SearchView from "../views/SearchView.vue";

//import vuex
import store from "@/store";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home_Banner",
      component: Home_Banner,
    },
    {
      path: "/home",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/search",
      name: "SearchView",
      component: SearchView,
      //進入此的預設
      // redirect: "search-map/detail",
    },
    {
      path: "/result",
      name: "ResultView",
      props: true,
      component: () => import("../views/ResultView.vue"),
      children: [],
    },
    {
      path: "/result/detail/:id?",
      name: "DetailView",
      props: true,
      component: () => import("../views/DetailView.vue"),
    },
    {
      path: "/search-map",
      name: "SearchMapView",
      props: true,
      component: () => import("../views/SearchMapView.vue"),
    },
    {
      path: "/shared",
      name: "Shared",
      component: () => import("../views/SharedView.vue"),
    },
  ],
});
//如果進入的是Map,發API
router.beforeEach((to) => {
  if (to.name === "SearchMapView") {
    store.dispatch("getAPI");
  }
});

export default router;
