<template>
  <v-row>
    <v-spacer></v-spacer>
    <v-col>
      <v-btn
        block
        rounded="xl"
        elevation="8"
        :aria-label="randomEpisodeButtonLabel"
        class="episode-btn"
        @click="$emit('randomEpisodeBtnClicked')"
        >{{ randomEpisodeButtonLabel }}</v-btn
      >
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
  <v-row class="mt-1">
    <v-spacer></v-spacer>
    <v-col cols="auto">
      <v-tooltip :text="previousSeasonButtonLabel" location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            density="comfortable"
            :aria-label="previousSeasonButtonLabel"
            class="episode-btn episode-btn-margin"
            icon="fas fa-step-backward"
            @click="$emit('previousSeasonBtnClicked')"
          ></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip :text="previousEpisodeButtonLabel" location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            density="comfortable"
            :aria-label="previousEpisodeButtonLabel"
            class="episode-btn episode-btn-margin"
            icon="fas fa-backward"
            @click="$emit('previousEpisodeBtnClicked')"
          ></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip :text="nextEpisodeButtonLabel" location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            density="comfortable"
            :aria-label="nextEpisodeButtonLabel"
            class="episode-btn episode-btn-margin"
            icon="fas fa-forward"
            @click="$emit('nextEpisodeBtnClicked')"
          ></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip :text="nextSeasonButtonLabel" location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            density="comfortable"
            :aria-label="nextSeasonButtonLabel"
            class="episode-btn"
            icon="fas fa-step-forward"
            @click="$emit('nextSeasonBtnClicked')"
          ></v-btn>
        </template>
      </v-tooltip>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script setup lang="ts">
defineProps<{
  randomEpisodeButtonLabel: string;
  previousSeasonButtonLabel?: string;
  previousEpisodeButtonLabel?: string;
  nextEpisodeButtonLabel?: string;
  nextSeasonButtonLabel?: string;
}>();
</script>

<style scoped>
.episode-btn {
  color: black;
  background-color: var(--simpsons-yellow);
}

.episode-btn-margin {
  margin-right: 4px;
}
</style>
