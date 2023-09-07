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
      </v-main>
    </v-container>
  </v-layout>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeMount, watch } from "vue";
import { useEpisodeStore } from "@/stores/episode";

var episodeStore = useEpisodeStore();

onBeforeMount(async () => {
  await episodeStore.importEpisodeData();
  episodeStore.initialiseEpisodeData();
  //hintText.value = questionStore.currentQuestion.hints.toString();
  //questionIcon.value = questionStore.currentQuestion.icon;
});
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #4593E2;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
