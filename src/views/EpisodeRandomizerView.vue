<template>
  <v-layout>
    <v-container class="container">
      <v-main class="main">
        <v-row no-gutters>
          <v-col>
            <img
              alt="Simpsons Image"
              src="@/assets/images/the-simpsons.png"
              width="600"
              height="125"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-spacer></v-spacer>
          <v-col>
            <img
              alt="Episode Randomizer Image"
              src="@/assets/images/episode-randomizer.png"
              width="500"
              height="70"
            />
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col>
            <p class="title">"{{ episodeStore.currentEpisode.title }}"</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>Season: {{ episodeStore.currentEpisode.season }}</p>
            <p>Episode: {{ episodeStore.currentEpisode.episode }}</p>
            <p># Overall: {{ episodeStore.currentEpisode.totalEpisode }}</p>
            <p>
              Production Code: {{ episodeStore.currentEpisode.productionCode }}
            </p>
            <p>
              First Aired: {{ episodeStore.currentEpisode.originalAirDate }}
            </p>
            <a :href="episodeStore.currentEpisode.url" target="_blank"
              >Wiki Simpsons Episode Link</a
            >
          </v-col>
        </v-row>
      </v-main>
    </v-container>
  </v-layout>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useEpisodeStore } from "@/stores/episode";

var episodeStore = useEpisodeStore();

onBeforeMount(async () => {
  await episodeStore.importEpisodeData();
  episodeStore.initialiseEpisodeData();
});
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

.title {
  font-size: 2em;
}

a {
  background-color: var(--simpsons-blue);
  color: var(--simpsons-yellow);
  font-weight: 550;
  text-decoration: underline;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
