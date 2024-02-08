<template>
  <div class="column">
    <div class="characters">
      <AvCharacterButton
        @click="seeCharacterSheet(character.identity.id)"
        v-for="character in props.characters"
        :key="character.identity.id"
        :character="character"
      ></AvCharacterButton>
    </div>
    <div>
      <AvButton
        @click="props.gotoSibling('roll')"
        :size="'large'"
        :source="`ico_character_roll`"
        :title="'Create a new character'"
        :name="'Create'"
        :sound="'click'"
      ></AvButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { Character } from "@/dtos/Dtos";
import AvButton from "@/components/small/AvButton.vue";
import AvCharacterButton from "@/components/small/AvCharacterButton.vue";

const emit = defineEmits(["on-character-sheet"]);

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
  characters: {
    type: Array as () => Character[],
    required: true,
  },
});

const seeCharacterSheet = (charId: string): void => {
  let character: Character = props.characters.find(
    (s) => s.identity.id === charId
  );

  emit("on-character-sheet", character);

  props.gotoSibling("sheet");
};
</script>

<style scoped>
.characters {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-bottom: 20px;
}
</style>
