<template>
  <v-layout>
    <v-container class="container">
      <v-main>
        <v-row no-gutters>
          <v-col>
            <p :class="computedAppTitleFont">The Simpsons</p>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <p :class="computedAppSubTitleFont">Episode Randomizer</p>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn
              block
              rounded="xl"
              elevation="8"
              class="next-epsiode-btn"
              @click="onNextRandomEpisodeBtnClicked"
              >Next Random Episode</v-btn
            >
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row class="mt-3">
          <v-col>
            <p :class="computedEpisodeTitleFont">
              "{{ episodeStore.currentEpisode.title }}"
            </p>
          </v-col>
        </v-row>
        <v-row class="mt-1">
          <v-col>
            <star-rating
              v-model:rating="episodeStore.currentEpisode.rating"
              class="d-flex justify-center align-center"
              :show-rating="false"
              clearable
              rounded-corners
              :padding="5"
              :star-size="35"
              :active-color="simpsonsYellow"
              inactive-color="black"
              @update:rating="setEpisodedRating"
            ></star-rating>
          </v-col>
        </v-row>
        <v-row class="mt-1">
          <v-col cols="12" md="4" lg="4" :class="computedEpisodeInfoFont">
            <p>Season {{ episodeStore.currentEpisode.season }}</p>
            <p>Episode {{ episodeStore.currentEpisode.episode }}</p>
            <p>
              Episode {{ episodeStore.currentEpisode.totalEpisode }} overall
            </p>
            <p>
              {{ episodeStore.currentEpisode.originalAirDate }}
            </p>
            <p>
              {{ episodeStore.currentEpisode.productionCode }}
            </p>
            <p>
              <a :href="episodeStore.currentEpisode.url" target="_blank"
                >View In Wiki Simpsons 👁️</a
              >
            </p>
          </v-col>
          <v-col cols="12" md="4" lg="4">
            <p
              :class="computedEpisodeSynopsisFont"
              class="inconsolata-font synopsis-spacer"
            >
              {{ episodeStore.currentEpisode.synopsis }}.
            </p>
            <p
              :class="computedEpisodeSynopsisFont"
              class="inconsolata-font quote-divider"
              v-for="quote in getQuotes"
              :key="quote"
            >
              {{ quote }}
            </p>
          </v-col>
          <v-col cols="12" md="4" lg="4">
            <v-img
              class="episode-image"
              alt="Episode Image"
              :src="episodeStore.currentEpisode.imageUrl"
              max-height="250"
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular
                    :color="simpsonsYellow"
                    indeterminate
                  ></v-progress-circular>
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

const simpsonsYellow = "#ffd920";
const { name } = useDisplay();
var episodeStore = useEpisodeStore();

onBeforeMount(async () => {
  await episodeStore.importEpisodeData();
  episodeStore.getRandomEpisode();
});

const computedAppTitleFont = computed(() => {
  return createStyleForDisplay("app-title-font");
});

const computedAppSubTitleFont = computed(() => {
  return createStyleForDisplay("app-sub-title-font");
});

const computedEpisodeTitleFont = computed(() => {
  return createStyleForDisplay("episode-title-font");
});

const computedEpisodeInfoFont = computed(() => {
  return createStyleForDisplay("episode-info-font");
});

const computedEpisodeSynopsisFont = computed(() => {
  return createStyleForDisplay("episode-synopsis-font");
});

const getQuotes = computed(() => {
  return episodeStore.currentEpisode.quotes
    ? episodeStore.currentEpisode.quotes.split("~")
    : null;
});

function onNextRandomEpisodeBtnClicked() {
  episodeStore.getRandomEpisode();
}

function createStyleForDisplay(style: string): string {
  switch (name.value) {
    case "sm":
      return `${style}-sm`;
    case "md":
      return `${style}-md`;
    case "lg":
    case "xl":
    case "xxl":
      return `${style}-lgPlus`;
    default:
      return style;
  }
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

.spacer {
  background-color: aquamarine;
}

/* extra small - small to large phone */
.app-title-font {
  font-size: 3.25em;
  text-shadow:
    2px 2px 3px black,
    2px 2px 3px black,
    2px 2px 2px black,
    2px 3px 2px black;
}

.app-sub-title-font {
  font-size: 2em;
  text-shadow:
    1px 1px 3px black,
    1px 1px 3px black,
    1px 1px 2px black,
    1px 1px 2px black;
}

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
.app-title-font-sm {
  font-size: 3.5em;
  text-shadow:
    2px 2px 3px black,
    2px 2px 3px black,
    2px 2px 2px black,
    2px 3px 2px black;
}

.app-sub-title-font-sm {
  font-size: 2.25em;
  text-shadow:
    1px 1px 3px black,
    1px 1px 3px black,
    1px 1px 2px black,
    1px 1px 2px black;
}

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
.app-title-font-md {
  font-size: 3.75em;
  text-shadow:
    2px 2px 4px black,
    2px 2px 3px black,
    2px 2px 2px black,
    2px 3px 2px black;
}

.app-sub-title-font-md {
  font-size: 2.5em;
  text-shadow:
    2px 1px 3px black,
    1px 1px 3px black,
    1px 1px 2px black,
    1px 1px 2px black;
}

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
.app-title-font-lgPlus {
  font-size: 4em;
  text-shadow:
    2px 2px 4px black,
    2px 2px 4px black,
    2px 2px 2px black,
    2px 4px 2px black;
}

.app-sub-title-font-lgPlus {
  font-size: 2.75em;
  text-shadow:
    2px 1px 3px black,
    1px 1px 3px black,
    1px 1px 2px black,
    1px 1px 2px black;
}

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

.next-epsiode-btn {
  color: black;
  background-color: var(--simpsons-yellow);
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
