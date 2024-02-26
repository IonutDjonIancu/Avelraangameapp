<template>
  <div class="column">
    <div v-if="characters" class="column">
      <!-- SELECT CHARACTERS -->
      <p class="text-xsmall">Select a character to start trading.</p>
      <div class="row">
        <div
          :class="setClass(index)"
          :key="index"
          v-for="(character, index) in characters"
        >
          <AvCharacterCard
            :character="character"
            :title="'Is trading'"
            :show-class="false"
            @on-card-click="selectCharacter(index)"
          ></AvCharacterCard>
        </div>
      </div>
      <div v-if="character" class="row text-xsmall">
        <span class="mx1"
          >Social: {{ character ? character.sheet.skills.social : "" }}</span
        >
        <span class="mx1"
          >Provisions:
          {{ character ? character.inventory.provisions : "" }}</span
        >
        <span class="mx1"
          >Wealth: {{ character ? character.status.wealth : "" }}</span
        >
      </div>
      <div v-if="character" class="row">
        <div v-if="character.inventory.supplies.length === 0">
          <span class="text-small">Character supplies stock is empty.</span>
        </div>
        <div class="row">
          <AvItemCard
            :key="index"
            v-for="(item, index) in character.inventory.supplies"
            :item="item"
          ></AvItemCard>
        </div>
      </div>
      <!-- MARKET ITEMS -->
      <div v-if="location && character" class="column w-80">
        <p class="text-bold">
          Market of {{ location.position.location }},
          {{ location.position.land }}
        </p>
        <div class="row">
          <AvItemCard
            :key="index + item.identity.id"
            v-for="(item, index) in location.market"
            :item="item"
          ></AvItemCard>
        </div>
      </div>
      <div v-if="character" class="column my5">
        <form class="row row-center" autocomplete="none">
          <label
            title="Provisions help your characters when travelling."
            class="text-small mx1"
            for="provisionsInput"
            >Buy provisions</label
          >
          <input
            v-model="provisions"
            class="mx1 w-10"
            type="number"
            name="provisions"
            id="provisionsInput"
            autocomplete="none"
          />
          <span class="text-xsmall"> x 2 wealth per provision </span>
          <div class="mx1">
            <i
              title="Purchase"
              @click="buyProvisions"
              class="fa-solid fa-hand-holding-dollar fa-xl"
            ></i>
          </div>
        </form>
      </div>
    </div>
    <div v-else>You have no characters that can do trade.</div>
    <div class="my3">
      <AvButton
        @click="props.gotoSibling('')"
        :size="'large'"
        :source="'ico_back_arrow'"
        :title="'Back to market'"
        :name="'Back'"
        :sound="'back'"
      ></AvButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed, onMounted, defineProps } from "vue";
import { useStore } from "vuex";
import { Character, Player, Location, CharacterTrade } from "@/dtos/Dtos";
import AvItemCard from "@/components/small/AvItemCard.vue";

import AvCharacterCard from "@/components/small/AvCharacterCard.vue";
import AvButton from "@/components/small/AvButton.vue";
import { HttpService } from "@/services/HttpService";
import { StoreData } from "@/dtos/Enums";

const updateAvText: any = inject("updateAvText");
const updateAvSound: any = inject("updateAvSound");

const store = useStore();
const playerProfile = computed<Player | null>(() => store.state.playerProfile);
const characters = computed<Character[]>(() => playerProfile.value.characters);
const character = computed<Character | null>(() => getSelectedCharacter());
const location = computed<Location | null>(() => store.state.location);

const selectedImageIndex = ref<number>(null);
const selectedCharacterIndex = ref<number>(null);
const provisions = ref<number>(0);

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

const selectCharacter = (index: number): void => {
  const character = characters.value[index];
  store.commit(StoreData.SetCharacterId, character.identity.id);

  getLocation(character);

  selectedCharacterIndex.value = index;
  selectedImageIndex.value = index;
};

const getSelectedCharacter = (): Character | null => {
  return characters.value[selectedCharacterIndex.value];
};

const setClass = (index: number): string => {
  return selectedImageIndex.value === index ? "mx1 selected" : "mx1";
};

const getLocation = (character: Character) => {
  const position = character.status.position;
  HttpService.httpPost("Gameplay/FindLocation", position)
    .then((s) => {
      if (s.ok) {
        return s.json();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((location: Location) => {
      store.commit(StoreData.SetLocation, location);
      console.log(location);
    })
    .catch((err) => {
      updateAvText(err.message);
    });
};

const buyProvisions = () => {
  if (!character.value) return;
  if (provisions.value <= 0) {
    updateAvText("That makes no sense.");
    return;
  }

  const trade: CharacterTrade = {
    characterIdentity: {
      id: character.value.identity.id,
      playerId: playerProfile.value.identity.id,
    },
    isToBuy: true,
    amount: provisions.value,
  };

  HttpService.httpPut("Character/BuyProvisions", trade)
    .then((s) => {
      if (s.ok) {
        return s.json();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((character: Character) => {
      updateAvSound("item_buy", 1);
      store.commit(StoreData.UpdateCharacter, character);
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
.selected {
  border: 3px solid #859c71;
  border-radius: 3px;
  padding-bottom: 5px;
}

.row {
  align-items: center;
}

i {
  cursor: pointer;
  opacity: 0.7;
}

i:hover {
  opacity: 1;
  transition: 0.3;
}
</style>
