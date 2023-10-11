import { reactive, ref } from "vue";
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
  const season = ref(0);
  const episode = ref(0);
  const totalEpisode = ref(0);
  const title = ref("");
  const url = ref("");
  const originalAirDate = ref("");
  const productionCode = ref("");
  const synopsis = ref(placeholderSynopsis);
  const imageUrl = ref(placeholderImage);
  const quotes = ref("");
  const rating = ref(0);
  const currentEpisode: Episode = reactive({
    season,
    episode,
    totalEpisode,
    title,
    url,
    originalAirDate,
    productionCode,
    synopsis,
    imageUrl,
    quotes,
    rating,
  });
  let currentEpisodeIndex = 0;
  const latestSeason = 34;

  async function importEpisodeData(): Promise<void> {
    const modules = import.meta.glob(
      "@/assets/data/the-simpsons-episodes.json"
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
        (x) => x.season == currentEpisode.season - 1 && x.episode == 1
      );
      updateCurrentEpisode(episodeData[currentEpisodeIndex]);
    } else if (currentEpisode.season == 1) {
      currentEpisodeIndex = episodeData.findIndex(
        (x) => x.season == latestSeason && x.episode == 1
      );
      updateCurrentEpisode(episodeData[currentEpisodeIndex]);
    }
  }

  function getPreviousEpisode(): void {
    if (currentEpisodeIndex > 0) {
      currentEpisodeIndex = currentEpisodeIndex - 1;
      updateCurrentEpisode(episodeData[currentEpisodeIndex]);
    } else if (currentEpisodeIndex == 0) {
      currentEpisodeIndex = episodeData.length - 1;
      updateCurrentEpisode(episodeData[currentEpisodeIndex]);
    }
  }

  function getNextEpisode(): void {
    if (currentEpisodeIndex < episodeData.length - 1) {
      currentEpisodeIndex = currentEpisodeIndex + 1;
      updateCurrentEpisode(episodeData[currentEpisodeIndex]);
    } else if (currentEpisodeIndex == episodeData.length - 1) {
      currentEpisodeIndex = 0;
      updateCurrentEpisode(episodeData[currentEpisodeIndex]);
    }
  }

  function getNextSeason(): void {
    if (currentEpisode.season < latestSeason) {
      currentEpisodeIndex = episodeData.findIndex(
        (x) => x.season == currentEpisode.season + 1 && x.episode == 1
      );
      updateCurrentEpisode(episodeData[currentEpisodeIndex]);
    } else if (currentEpisode.season == latestSeason) {
      currentEpisodeIndex = episodeData.findIndex(
        (x) => x.season == 1 && x.episode == 1
      );
      updateCurrentEpisode(episodeData[currentEpisodeIndex]);
    }
  }

  function updateCurrentEpisode(newEpisode: Episode): void {
    season.value = newEpisode.season;
    episode.value = newEpisode.episode;
    totalEpisode.value = newEpisode.totalEpisode;
    title.value = newEpisode.title;
    url.value = newEpisode.url;
    originalAirDate.value = newEpisode.originalAirDate;
    productionCode.value = newEpisode.productionCode;
    synopsis.value = newEpisode.synopsis ?? placeholderSynopsis;
    imageUrl.value = newEpisode.imageUrl ?? placeholderImage;
    quotes.value = newEpisode.quotes;
    rating.value = getEpisodeRating(
      newEpisode.productionCode,
      newEpisode.rating
    );
  }

  function saveCurrentEpisodeRating(newRating: number): void {
    currentEpisode.rating = newRating;
    localStorage.setItem(
      localStorageKeyPrefix + currentEpisode.productionCode,
      currentEpisode.rating.toString()
    );
  }

  function getEpisodeRating(productionCode: string, rating: number): number {
    const localCacheRating = getEpisodeRatingFromLocalCache(productionCode);
    if (localCacheRating == 0) {
      return rating;
    }
    return localCacheRating;
  }

  function getEpisodeRatingFromLocalCache(productionCode: string): number {
    const rating = localStorage.getItem(localStorageKeyPrefix + productionCode);
    return rating ? parseFloat(rating) : 0;
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
