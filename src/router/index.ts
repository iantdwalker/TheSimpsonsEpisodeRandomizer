import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/episode-randomizer",
      name: "episode-randomizer",
      component: () => import("../views/EpisodeRandomizerView.vue"),
    },
  ],
});

export default router;
