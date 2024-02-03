<template>
  <div class="av-container">
    <CharacterMain
      v-if="text === ''"
      :gotoSibling="gotoSibling"
    ></CharacterMain>
    <CharacterRoll
      v-else-if="text === 'roll'"
      v-on:on-character-stub-create="saveCharacterStub"
      :gotoSibling="gotoSibling"
    ></CharacterRoll>
    <CharacterTraits
      v-else-if="text === 'traits'"
      :stub="characterStub"
      :gotoSibling="gotoSibling"
    ></CharacterTraits>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { Howl } from "howler";
import CharacterMain from "@/components/character/CharacterMain.vue";
import CharacterRoll from "@/components/character/CharacterRoll.vue";
import CharacterTraits from "@/components/character/CharacterTraits.vue";
import { CharacterStub } from "@/dtos/Dtos";

const updateAvImage: any = inject("updateAvImage");

const text = ref<string>("");
const characterStub = ref<CharacterStub>();
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

const saveCharacterStub = (stub: CharacterStub): void => {
  characterStub.value = stub;
};

onMounted(() => {
  canPlaySounds.value = localStorage.getItem("canPlaySounds")!;
  updateAvImage("img_character");

  if (canPlaySounds.value === "true") {
    pageTurn();
  }
});
</script>
