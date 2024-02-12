<template>
  <div class="av-container">
    <div class="column">
      <MarketMain v-if="text === ''" :gotoSibling="gotoSibling"></MarketMain>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import MarketMain from "@/components/market/MarketMain.vue";

const text = ref<string>("");

const updateAvImage: any = inject("updateAvImage");
const updateAvSound: any = inject("updateAvSound");

const gotoSibling = (value: string) => {
  text.value = value;
};

onMounted(() => {
  updateAvImage("img_market");
  updateAvSound("market", 0.8);
});
</script>
