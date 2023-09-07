import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import type { Episode } from "@/models/episode";
import shuffle from "@/utilities/shuffle";

export const useEpisodeStore = defineStore("episode", () => {
  let episodeData: Episode[];
  const episodes = ref<Episode[]>();
  const episodeIndex = ref(0);
  const currentEpisode: Episode = reactive({
    season: 0,
    episode: 0,
    totalEpisode: 0,
    title: "",
    url: "",
    originalAirDate: "",
    productionCode: "",
  });

  async function importEpisodeData(): Promise<void> {
    const modules = import.meta.glob(
      "@/assets/data/the-simpsons-episodes.json",
    );
    for (const path in modules) {
      await modules[path]().then((mod: any) => {
        episodeData = mod.default as Episode[];
        console.log(episodeData);
      });
    }
  }

  function initialiseEpisodeData(): void {
    episodes.value = shuffle(episodeData) as Episode[];
    next();
  }

  function next(): void {
    if (episodes.value && episodeIndex.value < episodes.value.length) {
      updateEpisode(episodes.value[episodeIndex.value]);
      episodeIndex.value++;
    }
  }

  function updateEpisode(newEpisode: Episode): void {
    currentEpisode.season = newEpisode.season;
    currentEpisode.episode = newEpisode.episode;
    currentEpisode.totalEpisode = newEpisode.totalEpisode;
    currentEpisode.title = newEpisode.title;
    currentEpisode.url = newEpisode.url;
    currentEpisode.originalAirDate = newEpisode.originalAirDate;
    currentEpisode.productionCode = newEpisode.productionCode;
  }

  return { importEpisodeData, initialiseEpisodeData, next, updateEpisode };
});
