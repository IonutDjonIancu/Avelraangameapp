<template>
  <div class="av-container">
    <TravelMain v-if="text === ''" :gotoSibling="gotoSibling"></TravelMain>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import TravelMain from "@/components/travel/TravelMain.vue";

const updateAvImage: any = inject("updateAvImage");
const updateAvSound: any = inject("updateAvSound");
const updateAvText: any = inject("updateAvText");

const text = ref<string>("");

const gotoSibling = (value: string): void => {
  text.value = value;
};

onMounted(() => {
  updateAvImage("img_market");
  updateAvSound("horse_snort", 0.7);
  updateAvText(
    "Select a character that prepares itself for travel. Packing supplies, drying out coats."
  );
});
</script>
