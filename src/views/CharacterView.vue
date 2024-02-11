<template>
  <div class="av-container">
    <CharacterMain
      v-if="text === ''"
      :gotoSibling="gotoSibling"
    ></CharacterMain>
    <CharacterRoll
      v-else-if="text === 'roll'"
      :gotoSibling="gotoSibling"
    ></CharacterRoll>
    <CharacterTraits
      v-else-if="text === 'traits'"
      :gotoSibling="gotoSibling"
    ></CharacterTraits>
    <CharacterFinalize
      v-else-if="text === 'finalize'"
      :gotoSibling="gotoSibling"
    ></CharacterFinalize>
    <CharacterSheet
      v-else-if="text === 'sheet'"
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

const updateAvImage: any = inject("updateAvImage");
const updateAvSound: any = inject("updateAvSound");

const text = ref<string>("");

const gotoSibling = (value: string) => {
  text.value = value;
};

onMounted(() => {
  updateAvImage("img_character");
  updateAvSound("page_flip", 0.8);
});
</script>
