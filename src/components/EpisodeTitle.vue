<template>
  <v-row class="mt-3">
    <v-col>
      <p :class="computedEpisodeTitleFont">"{{ episodeTitle }}"</p>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import createStyleForDisplay from "@/utilities/styleUtils";

defineProps<{
  episodeTitle: string;
}>();

const { name } = useDisplay();

const computedEpisodeTitleFont = computed(() => {
  return createStyleForDisplay("episode-title-font", name.value);
});
</script>

<style scoped>
/* extra small - small to large phone */
.episode-title-font {
  font-size: 1.4em;
}

/* small - small to medium tablet */
.episode-title-font-sm {
  font-size: 1.6em;
}

/* medium - large tablet to laptop */
.episode-title-font-md {
  font-size: 2em;
}

/* largePlus - Laptop to desktop, 1080p to 1440p desktop, 4k and ultra-wide */
.episode-title-font-lgPlus {
  font-size: 2.25em;
}

p {
  text-align: center;
}
</style>
