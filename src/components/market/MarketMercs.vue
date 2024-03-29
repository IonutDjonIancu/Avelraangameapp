<template>
  <div class="column">
    <div v-if="characters" class="column">
      <!-- CHARACTERS -->
      <div class="row">
        <div
          :class="setClass(index)"
          :key="index"
          v-for="(character, index) in characters"
        >
          <AvCharacterCard
            :character="character"
            :title="'is looking for sellswords'"
            :show-class="false"
            :show-top-icons="true"
            @on-card-click="selectCharacter(index)"
          ></AvCharacterCard>
        </div>
      </div>
      <div v-if="character" class="row text-xsmall">
        <span class="mx1"
          >Social: {{ character ? character.sheet.skills.social : "" }}</span
        >
        <span class="mx1"
          >Wealth: {{ character ? character.status.wealth : "" }}</span
        >
      </div>
    </div>
    <div v-else class="my3">You have no characters that can employ.</div>
    <div
      v-if="mercenaries !== null && mercenaries.length > 0 && character"
      class="column"
    >
      <!-- MERCENARIES -->
      <div class="row">
        <p class="text-bold my0">
          Mercenaries for hire in {{ location.position.location }},
          {{ location.position.land }}
        </p>
      </div>
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
          <p class="text-xsmall text-center my1">Will join for:</p>
          <p class="text-small text-bold text-center my1">
            {{ merc.status.worth }}
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="showHire && mercenaries !== null && mercenaries.length > 0"
      class="column my3"
    >
      <p class="my1">
        Hire mercenary for {{ mercenaries[selectedMercIndex].status.worth }}?
      </p>
      <div class="my2">
        <i
          @click="hireMercenary()"
          title="Hire mercenary"
          class="fa-solid fa-handshake fa-2xl"
        ></i>
      </div>
    </div>
    <div class="my3">
      <AvButton
        @click="props.gotoSibling('')"
        :size="'large'"
        :source="'ico_back_arrow'"
        :title="'Back to market'"
        :name="'Back'"
        :sound="Sounds.SoundButtonClickBack"
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
import { Sounds, StoreData } from "@/dtos/Enums";

const updateAvText: any = inject("updateAvText");
const updateAvSound: any = inject("updateAvSound");

const store = useStore();
const playerProfile = computed<Player | null>(() => store.state.playerProfile);
const characters = computed<Character[]>(() => playerProfile.value.characters);
const mercenaries = computed<Character[] | null>(() => {
  return location.value !== null ? location.value.mercenaries : null;
});
const character = computed<Character | null>(() => getSelectedCharacter());
const location = computed<Location | null>(() => store.state.location);
const showHire = computed<boolean>((): boolean => {
  return selectedCharIndex.value != null && selectedMercIndex.value != null;
});

const selectedCharIndex = ref<number>(null);
const selectedMercIndex = ref<number>(null);

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

const selectCharacter = (index: number): void => {
  const character = characters.value[index];
  store.commit(StoreData.SetCharacterId, character.identity.id);

  getLocation(character);

  selectedCharIndex.value = index;
};

const setClass = (index: number): string => {
  return selectedCharIndex.value === index ? "mx0 selected" : "mx0";
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

      if (mercenaries.value.length == 0) {
        updateAvText("There are no mercenaries at this location.");
      }
    })
    .catch((err) => {
      updateAvText(err.message);
    });
};

const getSelectedCharacter = (): Character | null => {
  return characters.value[selectedCharIndex.value];
};

const selectedMerc = (index: number): string => {
  return selectedMercIndex.value === index ? "mx0 selected-merc" : "mx0";
};

const selectMerc = (index: number): void => {
  selectedMercIndex.value = index;
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
      selectedMercIndex.value = null;
      updateAvSound(Sounds.SoundItemBuy, 1);
      store.commit(StoreData.UpdateCharacter, character);
      store.commit(StoreData.RemoveLocationMercenary, data.mercenaryId);

      updateAvText("The mercenary joins your ranks.");
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

onMounted(() => {
  updateAvText(
    "Select a character to check all available selswords looking for work in this town."
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
