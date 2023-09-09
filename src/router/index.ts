import { createRouter, createWebHistory } from "vue-router";
import EpisodeRandomizerView from "@/views/EpisodeRandomizerView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: EpisodeRandomizerView,
    },
  ],
});

export default router;
