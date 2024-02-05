<template>
  <div class="av-container">
    <CharacterMain
      v-if="text === ''"
      v-on:on-character-sheet="setCharacter"
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
      v-on:on-character-create="saveCharacter"
      :gotoSibling="gotoSibling"
    ></CharacterTraits>
    <CharacterShow
      v-else-if="text === 'show'"
      :character="character"
      :gotoSibling="gotoSibling"
    ></CharacterShow>
    <CharacterFinalize
      v-else-if="text === 'finalize'"
      :character="character"
      :gotoSibling="gotoSibling"
    ></CharacterFinalize>
    <CharacterSheet
      v-else-if="text === 'sheet'"
      :character="character"
      :gotoSibling="gotoSibling"
    ></CharacterSheet>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject } from "vue";
import { Howl } from "howler";
import CharacterMain from "@/components/character/CharacterMain.vue";
import CharacterRoll from "@/components/character/CharacterRoll.vue";
import CharacterTraits from "@/components/character/CharacterTraits.vue";
import CharacterShow from "@/components/character/CharacterShow.vue";
import CharacterFinalize from "@/components/character/CharacterFinalize.vue";
import CharacterSheet from "@/components/character/CharacterSheet.vue";
import { Character, CharacterStub } from "@/dtos/Dtos";

const updateAvImage: any = inject("updateAvImage");

const text = ref<string>("");
const characterStub = ref<CharacterStub>();
const character = ref<Character>();
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

const saveCharacter = (chr: Character): void => {
  character.value = chr;
};

const setCharacter = (chr: Character): void => {
  character.value = chr;
};

onMounted(() => {
  updateAvImage("img_character");
  canPlaySounds.value = localStorage.getItem("canPlaySounds")!;

  if (canPlaySounds.value === "true") {
    pageTurn();
  }
});
</script>
