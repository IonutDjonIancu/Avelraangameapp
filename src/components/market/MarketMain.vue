<template>
  <div class="column">
    <!-- SELECT CHARACTERS -->
    <div class="row">
      <span>Select character</span>
      <img
        :title="character.status.name"
        @click="selectCharacter(index)"
        :key="index"
        v-for="(character, index) in characters"
        :src="getImage(character)"
        :class="getClass(index)"
      />
    </div>
    <div v-if="character" class="row text-small">
      <span class="m-h-1"
        >Social: {{ character ? character.sheet.skills.social : "" }}</span
      >
      <span class="m-h-1"
        >Wealth: {{ character ? character.status.wealth : "" }}</span
      >
    </div>
    <div v-if="character" class="row">
      <div v-if="character.inventory.supplies.length === 0">
        <span class="text-small">Character supplies stock is empty.</span>
      </div>
      <div class="row">
        <AvItemCard
          @on-item-sell="sellItem"
          :key="index"
          v-for="(item, index) in character.inventory.supplies"
          :item="item"
        ></AvItemCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { Character } from "@/dtos/Dtos";
import AvItemCard from "@/components/small/AvItemCard.vue";

const isSelected = ref<boolean>(false);
const selectedImageIndex = ref<number>(null);
const character = ref<Character>(null);

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
  characters: {
    type: Array as () => Character[],
    required: true,
  },
});

const getClass = (index: number): string => {
  return selectedImageIndex.value === index ? "m-h-1 selected" : "m-h-1";
};

const selectCharacter = (index: number): void => {
  character.value = props.characters[index];
  selectedImageIndex.value = index;
  isSelected.value = !isSelected.value;
};

const getImage = (chr: Character): string => {
  return require(`@/assets/ico_${chr.status.traits.race.toLowerCase()}_${
    chr.status.traits.icon
  }.png`);
};

const sellItem = (): void => {
  console.log("selling item...");
};
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
  border-radius: 30px;
}

img:hover {
  cursor: pointer;
}

.selected {
  border: 3px solid #859c71;
}

.row {
  align-items: center;
}
</style>
