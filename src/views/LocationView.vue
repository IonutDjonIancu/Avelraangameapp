<template>
  <div class="av-container">
    <LocationMain v-if="text === ''" :gotoSibling="gotoSibling"></LocationMain>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import LocationMain from "@/components/location/LocationMain.vue";

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
