<template>
  <v-layout>
    <v-container class="container">
      <v-main class="main">
        <v-row no-gutters>
          <v-spacer></v-spacer>
          <v-col>
            <v-img
              alt="Simpsons Image"
              src="@/assets/images/the-simpsons.png"
              width="600"
              height="125"
            />
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row no-gutters>
          <v-spacer></v-spacer>
          <v-col>
            <v-img
              alt="Episode Randomizer Image"
              src="@/assets/images/episode-randomizer.png"
              width="500"
              height="70"
            />
          </v-col>
          <v-spacer></v-spacer>
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
            <p :class="computedTitleFontSize">
              "{{ episodeStore.currentEpisode.title }}"
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="8">
            <v-row :column="mdAndDown">
              <v-col cols="12" md="6">
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
              <v-col cols="12" md="6">
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

const computedTitleFontSize = computed(() => {
  return createStyleForDisplay("title-font-size");
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
  font-size: 1.25em;
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
.title-font-size {
  font-size: 1.4em;
}

/* small - small to medium tablet */
.title-font-size-sm {
  font-size: 1.6em;
}

/* medium - large tablet to laptop */
.title-font-size-md {
  font-size: 2em;
}

/* largePlus - Laptop to desktop, 1080p to 1440p desktop, 4k and ultra-wide */
.title-font-size-lgPlus {
  font-size: 2.25em;
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
