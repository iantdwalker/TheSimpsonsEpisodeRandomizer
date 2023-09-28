<template>
  <v-layout>
    <v-container class="container">
      <v-main>
        <AppTitle title="The Simpsons" subTitle="Episode Randomizer"></AppTitle>
        <v-row>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn block rounded="xl" elevation="8" aria-label="Random Episode" class="episode-btn"
              @click="onRandomEpisodeBtnClicked">Random Episode</v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row class="mt-1">
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-tooltip text="Previous Season" location="top">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" density="comfortable" aria-label="Previous Season"
                  class="episode-btn episode-btn-margin" icon="fas fa-step-backward"
                  @click="onPreviousSeasonBtnClicked"></v-btn>
              </template>
            </v-tooltip>
            <v-tooltip text="Previous Episode" location="top">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" density="comfortable" aria-label="Previous Episode"
                  class="episode-btn episode-btn-margin" icon="fas fa-backward"
                  @click="onPreviousEpisodeBtnClicked"></v-btn>
              </template>
            </v-tooltip>
            <v-tooltip text="Next Episode" location="top">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" density="comfortable" aria-label="Next Episode"
                  class="episode-btn episode-btn-margin" icon="fas fa-forward" @click="onNextEpisodeBtnClicked"></v-btn>
              </template>
            </v-tooltip>
            <v-tooltip text="Next Season" location="top">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" density="comfortable" aria-label="Next Season" class="episode-btn"
                  icon="fas fa-step-forward" @click="onNextSeasonBtnClicked"></v-btn>
              </template>
            </v-tooltip>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row class="mt-3">
          <v-col>
            <p :class="computedEpisodeTitleFont">
              "{{ currentEpisode.title }}"
            </p>
          </v-col>
        </v-row>
        <v-row class="mt-1">
          <v-col>
            <star-rating v-model:rating="currentEpisode.rating" class="d-flex justify-center align-center"
              :show-rating="false" :increment="0.5" clearable rounded-corners :padding="5" :star-size="35"
              :active-color="simpsonsYellow" inactive-color="black" @update:rating="setEpisodedRating"></star-rating>
          </v-col>
        </v-row>
        <v-row class="mt-1">
          <v-col cols="12" md="4" lg="4" :class="computedEpisodeInfoFont">
            <p>Season {{ currentEpisode.season }}</p>
            <p>Episode {{ currentEpisode.episode }}</p>
            <p>Episode {{ currentEpisode.totalEpisode }} overall</p>
            <p>
              {{ currentEpisode.originalAirDate }}
            </p>
            <p>
              {{ currentEpisode.productionCode }}
            </p>
            <p>
              <a :href="currentEpisode.url" target="_blank">View In Wiki Simpsons 👁️</a>
            </p>
          </v-col>
          <v-col cols="12" md="4" lg="4">
            <p :class="computedEpisodeSynopsisFont" class="inconsolata-font synopsis-spacer">
              {{ currentEpisode.synopsis }}.
            </p>
            <p :class="computedEpisodeSynopsisFont" class="inconsolata-font quote-divider" v-for="quote in getQuotes"
              :key="quote">
              {{ quote }}
            </p>
          </v-col>
          <v-col cols="12" md="4" lg="4">
            <v-img class="episode-image" alt="Episode Image" :src="currentEpisode.imageUrl" max-height="250">
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular :color="simpsonsYellow" indeterminate></v-progress-circular>
                </div>
              </template>
              <template v-slot:error>
                <p>Episode image not found 😔</p>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-main>
    </v-container>
  </v-layout>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { useDisplay } from "vuetify";
import { useEpisodeStore } from "@/stores/episode";
import StarRating from "vue-star-rating";
import { storeToRefs } from "pinia";
import AppTitle from "@/components/AppTitle.vue";
import createStyleForDisplay from "@/utilities/styleUtils";

const simpsonsYellow = "#ffd920";
const { name } = useDisplay();
var episodeStore = useEpisodeStore();
const { currentEpisode } = storeToRefs(episodeStore);

onBeforeMount(async () => {
  await episodeStore.importEpisodeData();
  episodeStore.getRandomEpisode();
});

const computedEpisodeTitleFont = computed(() => {
  return createStyleForDisplay("episode-title-font", name.value);
});

const computedEpisodeInfoFont = computed(() => {
  return createStyleForDisplay("episode-info-font", name.value);
});

const computedEpisodeSynopsisFont = computed(() => {
  return createStyleForDisplay("episode-synopsis-font", name.value);
});

const getQuotes = computed(() => {
  return episodeStore.currentEpisode.quotes
    ? episodeStore.currentEpisode.quotes.split("~")
    : null;
});

function onRandomEpisodeBtnClicked() {
  episodeStore.getRandomEpisode();
}

function onPreviousSeasonBtnClicked() {
  episodeStore.getPreviousSeason();
}

function onPreviousEpisodeBtnClicked() {
  episodeStore.getPreviousEpisode();
}

function onNextEpisodeBtnClicked() {
  episodeStore.getNextEpisode();
}

function onNextSeasonBtnClicked() {
  episodeStore.getNextSeason();
}

function setEpisodedRating(rating: number): void {
  episodeStore.saveCurrentEpisodeRating(rating);
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inconsolata&display=swap");

.container {
  min-height: 100vh;
  background-color: var(--simpsons-blue);
  color: var(--simpsons-yellow);
  text-shadow:
    1px 1px 2px black,
    1px 1px 2px black,
    0px 0px 2px black,
    0px 0px 2px black;
}

/* extra small - small to large phone */
.episode-title-font {
  font-size: 1.4em;
}

.episode-info-font {
  font-size: 1.1em;
}

.episode-synopsis-font {
  font-size: 1em;
}

/* small - small to medium tablet */
.episode-title-font-sm {
  font-size: 1.6em;
}

.episode-info-font-sm {
  font-size: 1.2em;
}

.episode-synopsis-font-sm {
  font-size: 1.1em;
}

/* medium - large tablet to laptop */
.episode-title-font-md {
  font-size: 2em;
}

.episode-info-font-md {
  font-size: 1.3em;
}

.episode-synopsis-font-md {
  font-size: 1.1em;
}

/* largePlus - Laptop to desktop, 1080p to 1440p desktop, 4k and ultra-wide */
.episode-title-font-lgPlus {
  font-size: 2.25em;
}

.episode-info-font-lgPlus {
  font-size: 1.5em;
}

.episode-synopsis-font-lgPlus {
  font-size: 1.2em;
}

/******/

.inconsolata-font {
  font-family: "Inconsolata", monospace;
}

a {
  background-color: var(--simpsons-blue);
  color: var(--simpsons-yellow);
  font-weight: 550;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

p {
  text-align: center;
}

.episode-btn {
  color: black;
  background-color: var(--simpsons-yellow);
}

.episode-btn-margin {
  margin-right: 4px;
}

.episode-image {
  display: block;
  margin: auto;
}

.synopsis-spacer {
  padding-bottom: 15px;
}

.quote-divider {
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>
