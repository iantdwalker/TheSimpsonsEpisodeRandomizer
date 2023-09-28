<template>
  <v-row no-gutters>
    <v-col>
      <p :class="computedAppTitleFont">{{ title }}</p>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col>
      <p :class="computedAppSubTitleFont">{{ subTitle }}</p>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import createStyleForDisplay from "@/utilities/styleUtils";

defineProps<{
  title: string
  subTitle: string
}>();

const { name } = useDisplay();

const computedAppTitleFont = computed(() => {
  return createStyleForDisplay("app-title-font", name.value);
});

const computedAppSubTitleFont = computed(() => {
  return createStyleForDisplay("app-sub-title-font", name.value);
});
</script>

<style scoped>
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

/******/

p {
  text-align: center;
}
</style>
