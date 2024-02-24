<template>
  <div class="column">
    <div v-if="characters" class="column">
      <!-- CHARACTERS -->
      <p class="text-xsmall">Select a character to wishes to employ.</p>
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
            :show-top-icons="true"
            @on-card-click="selectCharacter(index)"
          ></AvCharacterCard>
        </div>
      </div>
      <div v-if="character" class="row text-small">
        <span class="m-x-1"
          >Social: {{ character ? character.sheet.skills.social : "" }}</span
        >
        <span class="m-x-1"
          >Wealth: {{ character ? character.status.wealth : "" }}</span
        >
      </div>
    </div>
    <div v-else class="m-y-3">You have no characters that can employ.</div>
    <div v-if="mercenaries !== null && mercenaries.length > 0" class="column">
      <!-- MERCENARIES -->
      <p class="text-bold">
        Mercenaries for hire in {{ location.position.location }},
        {{ location.position.land }}
      </p>
      <div class="row">
        <div
          :class="selectedMerc(index)"
          :key="index"
          v-for="(merc, index) in mercenaries"
        >
          <AvCharacterCard
            @on-card-click="selectMerc(index)"
            :character="merc"
            :title="'Sellsword looking for work'"
            :show-top-icons="true"
            :show-class="true"
          ></AvCharacterCard>
          <p class="text-xsmall text-center m-y-1">Will join for:</p>
          <p class="text-small text-bold text-center m-y-1">
            {{ merc.status.worth }}
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="showHire && mercenaries !== null && mercenaries.length > 0"
      class="column m-y-3"
    >
      <p class="m-y-1">
        Hire mercenary for {{ mercenaries[selectedMercIndex].status.worth }}?
      </p>
      <div class="m-y-2">
        <i
          @click="hireMercenary()"
          title="Hire mercenary"
          class="fa-solid fa-handshake fa-2xl"
        ></i>
      </div>
    </div>
    <div class="m-y-3">
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
import {
  Character,
  Player,
  Location,
  CharacterHireMercenary,
} from "@/dtos/Dtos";
import AvCharacterCard from "@/components/small/AvCharacterCard.vue";
import AvButton from "@/components/small/AvButton.vue";
import { HttpService } from "@/services/HttpService";
import { StoreData } from "@/dtos/Enums";

const updateAvText: any = inject("updateAvText");
const updateAvSound: any = inject("updateAvSound");

const store = useStore();
const playerProfile = computed<Player | null>(() => store.state.playerProfile);
const characters = computed<Character[]>(() => playerProfile.value.characters);
const mercenaries = computed<Character[] | null>(() => {
  return characterLocation.value !== null
    ? characterLocation.value.mercenaries
    : null;
});
const character = computed<Character | null>(() => getSelectedCharacter());
const location = computed<Location | null>(() => store.state.location);
const showHire = computed<boolean>((): boolean => {
  return selectedCharIndex.value != null && selectedMercIndex.value != null;
});
const characterLocation = computed<Location | null>(
  (): Location => store.state.location
);

const selectedCharIndex = ref<number>(null);
const selectedMercIndex = ref<number>(null);
const selectedCharacterIndex = ref<number>(null);

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
  selectedCharIndex.value = index;
};

const setClass = (index: number): string => {
  return selectedCharIndex.value === index ? "m-x-1 selected" : "m-x-1";
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

      if (mercenaries.value.length == 0) {
        updateAvText("There are no mercenaries at this location.");
      }
    })
    .catch((err) => {
      updateAvText(err.message);
    });
};

const getSelectedCharacter = (): Character | null => {
  return characters.value[selectedCharacterIndex.value];
};

const selectedMerc = (index: number): string => {
  return selectedMercIndex.value === index ? "m-x-1 selected-merc" : "m-x-1";
};

const selectMerc = (index: number): void => {
  selectedMercIndex.value = index;
  const number = Math.floor(Math.random() * 10 + 1);

  if (number <= 4) {
    updateAvSound("acknowledge_1", 0.8);
  } else if (number > 4 && number <= 7) {
    updateAvSound("acknowledge_2", 0.8);
  } else {
    updateAvSound("acknowledge_3", 0.8);
  }
};

const hireMercenary = (): void => {
  if (selectedCharIndex.value === null || selectedMercIndex.value === null)
    return;

  var character: Character = characters.value[selectedCharIndex.value];
  var mercenary: Character = mercenaries.value[selectedMercIndex.value];

  var data: CharacterHireMercenary = {
    characterIdentity: character.identity,
    mercenaryId: mercenary.identity.id,
  };

  HttpService.httpPut("Character/HireMercenary", data)
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

      const itemIndex = characterLocation.value.mercenaries.findIndex(
        (i) => i.identity.id === data.mercenaryId
      );

      if (itemIndex !== -1) {
        characterLocation.value.mercenaries.splice(itemIndex, 1);
      }

      updateAvText("The mercenary joins your ranks.");
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

onMounted(() => {
  updateAvText(
    "These are the available selswords looking for work in this town."
  );
});
</script>

<style scoped>
.selected {
  border: 3px solid #859c71;
  border-radius: 3px;
  padding-bottom: 5px;
}

.selected-merc {
  border: 3px solid #2c3e50c5;
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
