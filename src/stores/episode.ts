import { reactive } from "vue";
import { defineStore } from "pinia";
import type { Episode } from "@/models/episode";
import { getRandomElement } from "@/utilities/shuffle";

export const useEpisodeStore = defineStore("episode", () => {
  const placeholderSynopsis =
    "This is a placeholder synopsis while the episode data is being updated..";
  const placeholderImage =
    "https://static.simpsonswiki.com/images/0/08/The_Leader.png";
  const localStorageKeyPrefix = "the-simpsons-episode-randomizer-";
  let episodeData: Episode[];
  const currentEpisode: Episode = reactive({
    season: 0,
    episode: 0,
    totalEpisode: 0,
    title: "",
    url: "",
    originalAirDate: "",
    productionCode: "",
    synopsis: placeholderSynopsis,
    imageUrl: placeholderImage,
    quotes: "",
    rating: 0,
  });
  let currentEpisodeIndex = 0;

  async function importEpisodeData(): Promise<void> {
    const modules = import.meta.glob(
      "@/assets/data/the-simpsons-episodes.json",
    );
    for (const path in modules) {
      await modules[path]().then((mod: any) => {
        episodeData = mod.default as Episode[];
      });
    }
  }

  function getRandomEpisode(): void {
    currentEpisodeIndex = getRandomElement(episodeData.length);
    updateCurrentEpisode(episodeData[currentEpisodeIndex]);
  }

  function getPreviousSeason(): void {
    if (currentEpisode.season > 1) {
      currentEpisodeIndex = episodeData.findIndex(
        (x) => x.season == currentEpisode.season - 1 && x.episode == 1,
      );
      updateCurrentEpisode(episodeData[currentEpisodeIndex]);
    }
  }

  function getPreviousEpisode(): void {
    if (currentEpisodeIndex > 0) {
      currentEpisodeIndex = currentEpisodeIndex - 1;
      updateCurrentEpisode(episodeData[currentEpisodeIndex]);
    }
  }

  function getNextEpisode(): void {
    if (currentEpisodeIndex < episodeData.length - 1) {
      currentEpisodeIndex = currentEpisodeIndex + 1;
      updateCurrentEpisode(episodeData[currentEpisodeIndex]);
    }
  }

  function getNextSeason(): void {
    if (currentEpisode.season < 34) {
      currentEpisodeIndex = episodeData.findIndex(
        (x) => x.season == currentEpisode.season + 1 && x.episode == 1,
      );
      updateCurrentEpisode(episodeData[currentEpisodeIndex]);
    }
  }

  function updateCurrentEpisode(newEpisode: Episode): void {
    currentEpisode.season = newEpisode.season;
    currentEpisode.episode = newEpisode.episode;
    currentEpisode.totalEpisode = newEpisode.totalEpisode;
    currentEpisode.title = newEpisode.title;
    currentEpisode.url = newEpisode.url;
    currentEpisode.originalAirDate = newEpisode.originalAirDate;
    currentEpisode.productionCode = newEpisode.productionCode;
    currentEpisode.synopsis = newEpisode.synopsis ?? placeholderSynopsis;
    currentEpisode.imageUrl = newEpisode.imageUrl ?? placeholderImage;
    currentEpisode.quotes = newEpisode.quotes;
    currentEpisode.rating = getCurrentEpisodeRating(
      currentEpisode.productionCode,
    );
  }

  function saveCurrentEpisodeRating(newRating: number): void {
    currentEpisode.rating = newRating;
    localStorage.setItem(
      localStorageKeyPrefix + currentEpisode.productionCode,
      currentEpisode.rating.toString(),
    );
  }

  function getCurrentEpisodeRating(productionCode: string): number {
    const rating = localStorage.getItem(localStorageKeyPrefix + productionCode);
    return rating ? parseInt(rating) : 0;
  }

  return {
    importEpisodeData,
    getRandomEpisode,
    getPreviousSeason,
    getPreviousEpisode,
    getNextEpisode,
    getNextSeason,
    saveCurrentEpisodeRating,
    currentEpisode,
  };
});
