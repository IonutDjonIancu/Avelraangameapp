<template>
  <div v-if="characters" class="column">
    <!-- SELECT CHARACTERS -->
    <p class="text-bold">Characters</p>
    <div class="row">
      <img
        :title="character.status.name"
        @click="selectCharacter(index)"
        :key="index"
        v-for="(character, index) in characters"
        :src="setImage(character)"
        :class="setClass(index)"
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
          @on-item-sell="sellItem(item.identity.id)"
          :key="index"
          v-for="(item, index) in character.inventory.supplies"
          :item="item"
        ></AvItemCard>
      </div>
    </div>
  </div>
  <div v-else>You have no characters that can do trade.</div>
</template>

<script setup lang="ts">
import { defineProps, ref, inject, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { Character, CharacterTrade, Player } from "@/dtos/Dtos";
import AvItemCard from "@/components/small/AvItemCard.vue";
import { HttpService } from "@/services/HttpService";
import { StoreData } from "@/dtos/Enums";

const updateAvText: any = inject("updateAvText");

const store = useStore();
const playerProfile = computed<Player | null>(() => store.state.playerProfile);
const characters = computed<Character[]>(() => playerProfile.value.characters);
const character = computed<Character | null>(() => getSelectedCharacter());

const isSelected = ref<boolean>(false);
const selectedImageIndex = ref<number>(null);
const selectedCharacterIndex = ref<number>(null);

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

const selectCharacter = (index: number): void => {
  // const character = characters.value[index];
  selectedCharacterIndex.value = index;
  selectedImageIndex.value = index;
  isSelected.value = !isSelected.value;
};

const getSelectedCharacter = (): Character | null => {
  return characters.value[selectedCharacterIndex.value];
};

const setClass = (index: number): string => {
  return selectedImageIndex.value === index ? "m-h-1 selected" : "m-h-1";
};

const setImage = (chr: Character): string => {
  return require(`@/assets/ico_${chr.status.traits.race.toLowerCase()}_${
    chr.status.traits.icon
  }.png`);
};

const sellItem = (itemId: string): void => {
  var tradeItem: CharacterTrade = {
    characterIdentity: character.value.identity,
    itemId: itemId,
  };

  HttpService.httpPut("Character/SellItem", tradeItem)
    .then((s) => {
      if (s.ok) {
        return s.json();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((character: Character) => {
      store.commit(StoreData.UpdateCharacter, character);
      console.log("item sold");
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

onMounted(() => {
  updateAvText("Select the character that wishes to trade.");
});
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
