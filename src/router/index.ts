import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CharacterView from "../views/CharacterView.vue";
import MarketView from "../views/MarketView.vue";
import TownhallView from "../views/TownhallView.vue";
import RulebookView from "../views/RulebookView.vue";
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
    path: "/market",
    name: "market",
    component: MarketView,
  },
  {
    path: "/townhall",
    name: "townhall",
    component: TownhallView,
  },
  {
    path: "/rulebook",
    name: "rulebook",
    component: RulebookView,
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
