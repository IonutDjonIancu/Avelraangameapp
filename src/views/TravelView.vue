<template>
  <div class="av-container">
    <TravelMain></TravelMain>
  </div>
</template>

<script setup lang="ts">
import { onMounted, inject } from "vue";
import TravelMain from "@/components/travel/TravelMain.vue";

const updateAvImage: any = inject("updateAvImage");
const updateAvSound: any = inject("updateAvSound");
const updateAvText: any = inject("updateAvText");

onMounted(() => {
  updateAvImage("img_travel");
  updateAvSound("horse_snort", 0.7);
  updateAvText(
    "Select a character that prepares itself for travel. Packing supplies, drying out coats."
  );
});
</script>
