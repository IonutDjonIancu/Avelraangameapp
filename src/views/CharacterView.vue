<template>
  <div class="av-container">
    <CharacterMain
      v-if="text === ''"
      :gotoSibling="gotoSibling"
    ></CharacterMain>
    <CharacterCreate
      v-else-if="text === 'create'"
      :gotoSibling="gotoSibling"
    ></CharacterCreate>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { Howl } from "howler";
import CharacterMain from "@/components/character/CharacterMain.vue";
import CharacterCreate from "@/components/character/CharacterCreate.vue";

const updateAvImage: any = inject("updateAvImage");

const text = ref<string>("");
const canPlaySounds = ref<string>("");

const turnPage: any = new Howl({
  src: require("@/assets/sound_page_flip.mp3"),
  volume: 0.3,
  loop: false,
});

const pageTurn = (): void => {
  if (canPlaySounds.value !== "true") return;
  turnPage.play();
};

const gotoSibling = (value: string) => {
  text.value = value;
};

onMounted(() => {
  canPlaySounds.value = localStorage.getItem("canPlaySounds")!;
  updateAvImage("img_character");

  if (canPlaySounds.value === "true") {
    pageTurn();
  }
});
</script>
