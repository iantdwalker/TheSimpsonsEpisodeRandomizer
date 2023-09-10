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
            <p class="title">"{{ episodeStore.currentEpisode.title }}"</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>
              {{ episodeStore.currentEpisode.synopsis }}
            </p>
          </v-col>
          <v-col>
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
          <v-col>
            <v-img
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
import { onBeforeMount } from "vue";
import { useEpisodeStore } from "@/stores/episode";

var episodeStore = useEpisodeStore();

onBeforeMount(async () => {
  await episodeStore.importEpisodeData();
  episodeStore.getRandomEpisode();
});

function onNextRandomEpisodeBtnClicked() {
  episodeStore.getRandomEpisode();
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

.title {
  font-size: 2em;
}

a {
  background-color: var(--simpsons-blue);
  color: var(--simpsons-yellow);
  font-weight: 550;
  text-decoration: underline;
}

p {
  text-align: center;
}

.next-epsiode-btn {
  color: black;
  background-color: var(--simpsons-yellow);
}
</style>
