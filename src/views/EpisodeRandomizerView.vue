<template>
  <v-layout>
    <v-container class="container">
      <v-main>
        <v-row no-gutters>
          <v-col>
            <p :class="computedAppTitleFontSize">The Simpsons</p>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <p :class="computedAppSubTitleFontSize">Episode Randomizer</p>
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
        <v-row>
          <v-col>
            <p :class="computedEpisodeTitleFontSize">
              "{{ episodeStore.currentEpisode.title }}"
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="8">
            <v-row :column="mdAndDown">
              <v-col cols="12" md="6" :class="computedEpisodeInfoFontSize">
                <p>Season {{ episodeStore.currentEpisode.season }}</p>
                <p>Episode {{ episodeStore.currentEpisode.episode }}</p>
                <p>
                  Episode {{ episodeStore.currentEpisode.totalEpisode }} overall
                </p>
                <p>
                  {{ episodeStore.currentEpisode.originalAirDate }}
                </p>
                <p>
                  <a :href="episodeStore.currentEpisode.url" target="_blank"
                    >Wiki Simpsons Episode Link</a
                  >
                </p>
              </v-col>
              <v-col cols="12" md="6" :class="computedEpisodeSynopsisFontSize">
                <p>
                  {{ episodeStore.currentEpisode.synopsis }}
                </p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" lg="4">
            <v-img
              class="episode-image"
              alt="Episode Image"
              :src="episodeStore.currentEpisode.imageUrl"
              width="320"
              height="179"
            />
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

const { name, mdAndDown } = useDisplay();
var episodeStore = useEpisodeStore();

onBeforeMount(async () => {
  await episodeStore.importEpisodeData();
  episodeStore.getRandomEpisode();
});

const computedAppTitleFontSize = computed(() => {
  return createStyleForDisplay("app-title-font-size");
});

const computedAppSubTitleFontSize = computed(() => {
  return createStyleForDisplay("app-sub-title-font-size");
});

const computedEpisodeTitleFontSize = computed(() => {
  return createStyleForDisplay("episode-title-font-size");
});

const computedEpisodeInfoFontSize = computed(() => {
  return createStyleForDisplay("episode-info-font-size");
});

const computedEpisodeSynopsisFontSize = computed(() => {
  return createStyleForDisplay("episode-synopsis-font-size");
});

function onNextRandomEpisodeBtnClicked() {
  episodeStore.getRandomEpisode();
}

function createStyleForDisplay(style: string): string {
  switch (name.value) {
    case "sm":
      console.log("sm");
      return `${style}-sm`;
    case "md":
      console.log("md");
      return `${style}-md`;
    case "lg":
    case "xl":
    case "xxl":
      console.log("lg & up");
      return `${style}-lgPlus`;
    default:
      console.log("xs");
      return style;
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: var(--simpsons-blue);
  color: var(--simpsons-yellow);
  text-shadow:
    0 0 2px black,
    0 0 2px black,
    0 0 2px black,
    0 0 2px black;
}

.spacer {
  background-color: aquamarine;
}

/* extra small - small to large phone */
.app-title-font-size {
  font-size: 3.25em;
  text-shadow:
    2px 2px 3px black,
    2px 2px 3px black,
    2px 2px 2px black,
    2px 3px 2px black;
}

.app-sub-title-font-size {
  font-size: 2em;
  text-shadow:
    1px 1px 3px black,
    1px 1px 3px black,
    1px 1px 2px black,
    1px 1px 2px black;
}

.episode-title-font-size {
  font-size: 1.4em;
}

.episode-info-font-size {
  font-size: 1.1em;
}

.episode-synopsis-font-size {
  font-size: 0.8em;
}

/* small - small to medium tablet */
.app-title-font-size-sm {
  font-size: 3.5em;
  text-shadow:
    2px 2px 3px black,
    2px 2px 3px black,
    2px 2px 2px black,
    2px 3px 2px black;
}

.app-sub-title-font-size-sm {
  font-size: 2.25em;
  text-shadow:
    1px 1px 3px black,
    1px 1px 3px black,
    1px 1px 2px black,
    1px 1px 2px black;
}

.episode-title-font-size-sm {
  font-size: 1.6em;
}

.episode-info-font-size-sm {
  font-size: 1.2em;
}

.episode-synopsis-font-size-sm {
  font-size: 0.9em;
}

/* medium - large tablet to laptop */
.app-title-font-size-md {
  font-size: 3.75em;
  text-shadow:
    2px 2px 4px black,
    2px 2px 3px black,
    2px 2px 2px black,
    2px 3px 2px black;
}

.app-sub-title-font-size-md {
  font-size: 2.5em;
  text-shadow:
    2px 1px 3px black,
    1px 1px 3px black,
    1px 1px 2px black,
    1px 1px 2px black;
}

.episode-title-font-size-md {
  font-size: 2em;
}

.episode-info-font-size-md {
  font-size: 1.3em;
}

.episode-synopsis-font-size-md {
  font-size: 1em;
}

/* largePlus - Laptop to desktop, 1080p to 1440p desktop, 4k and ultra-wide */
.app-title-font-size-lgPlus {
  font-size: 4em;
  text-shadow:
    2px 2px 4px black,
    2px 2px 4px black,
    2px 2px 2px black,
    2px 4px 2px black;
}

.app-sub-title-font-size-lgPlus {
  font-size: 2.75em;
  text-shadow:
    2px 1px 3px black,
    1px 1px 3px black,
    1px 1px 2px black,
    1px 1px 2px black;
}

.episode-title-font-size-lgPlus {
  font-size: 2.25em;
}

.episode-info-font-size-lgPlus {
  font-size: 1.5em;
}

.episode-synopsis-font-size-lgPlus {
  font-size: 1.1em;
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
</style>
