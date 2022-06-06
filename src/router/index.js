import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Home_Banner from "../views/Banner.vue";

// import SearchMapView from "../views/SearchMapView.vue";
import SearchView from "../views/SearchView.vue";
// import SharedView from "../views/SharedView.vue";

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
    // {
    //   path: "/nearby",
    //   name: "nearBy",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "../views/nearByView.vue"),
    // },
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
      path: "/shared",
      name: "Shared",
      component: () => import("../views/SharedView.vue"),
    },
  ],
});

export default router;
