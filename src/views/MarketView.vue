<template>
  <div class="av-container">
    <MarketMain
      v-if="text === ''"
      :gotoSibling="gotoSibling"
      :characters="characters"
    ></MarketMain>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { Character, Player } from "@/dtos/Dtos";
import { HttpService } from "@/services/HttpService";
import MarketMain from "@/components/market/MarketMain.vue";

const text = ref<string>("");
const characters = ref<Character[]>([]);

const updateAvText: any = inject("updateAvText");
const updateAvImage: any = inject("updateAvImage");
const updateAvSound: any = inject("updateAvSound");

const gotoSibling = (value: string) => {
  text.value = value;
};

onMounted(() => {
  updateAvImage("img_market");
  updateAvSound("page_flip", 0.8);
  updateAvText("Select the character that wishes to trade.");
  HttpService.getPlayer()
    .then((s: Player) => (characters.value = s.characters))
    .then(() => console.log(characters.value));
});
</script>
