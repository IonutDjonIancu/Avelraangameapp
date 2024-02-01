import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CharacterView from "../views/CharacterView.vue";
import TestView from "../views/TestView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/character",
    name: "character",
    component: CharacterView,
  },
  {
    path: "/test",
    name: "test",
    component: TestView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
