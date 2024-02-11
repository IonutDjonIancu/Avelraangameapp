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
      v-on:on-character-create="saveCharacter"
      :gotoSibling="gotoSibling"
    ></CharacterTraits>
    <CharacterFinalize
      v-else-if="text === 'finalize'"
      :character="character"
      :gotoSibling="gotoSibling"
    ></CharacterFinalize>
    <CharacterSheet
      v-else-if="text === 'sheet'"
      v-on:on-item-equip="equipItem"
      v-on:on-item-sell="sellItem"
      v-on:on-character-delete="deleteCharacter"
      :character="character"
      :gotoSibling="gotoSibling"
    ></CharacterSheet>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject } from "vue";
import CharacterMain from "@/components/character/CharacterMain.vue";
import CharacterRoll from "@/components/character/CharacterRoll.vue";
import CharacterTraits from "@/components/character/CharacterTraits.vue";
import CharacterFinalize from "@/components/character/CharacterFinalize.vue";
import CharacterSheet from "@/components/character/CharacterSheet.vue";
import { Character, CharacterStub } from "@/dtos/Dtos";

const updateAvText: any = inject("updateAvText");
const updateAvImage: any = inject("updateAvImage");
const updateAvSound: any = inject("updateAvSound");

const text = ref<string>("");
const characterStub = ref<CharacterStub>();
const character = ref<Character>();

const gotoSibling = (value: string) => {
  text.value = value;
};

const saveCharacterStub = (stub: CharacterStub): void => {
  characterStub.value = stub;
};

const saveCharacter = (chr: Character): void => {
  character.value = chr;
};

const deleteCharacter = (): void => {
  updateAvText("Character deleted.");
};

const equipItem = (chr: Character) => {
  character.value = chr;
};

const sellItem = (chr: Character) => {
  character.value = chr;
};

onMounted(() => {
  updateAvImage("img_character");
  updateAvSound("page_flip", 0.8);
});
</script>
