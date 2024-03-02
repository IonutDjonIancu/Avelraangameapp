<template>
  <div class="column">
    <div v-if="characters" class="column">
      <!-- CHARACTERS -->
      <div class="row">
        <div class="column">
          <div class="row">
            <div
              :class="setClass(index)"
              :key="index"
              v-for="(character, index) in characters"
            >
              <AvCharacterCard
                :character="character"
                :title="'is looking for work'"
                :show-class="false"
                @on-card-click="selectCharacter(index)"
              ></AvCharacterCard>
            </div>
          </div>
          <div class="row">
            <p v-if="character" class="my0 text-xsmall text-center">
              Provs. {{ character.inventory.provisions }}
            </p>
          </div>
        </div>
      </div>
      <!-- QUESTS -->
      <div
        v-if="quests !== null && quests.length > 0 && character"
        class="column"
      >
        <div class="row">
          <p class="text-bold my0">
            Quests available at {{ location.position.location }},
            {{ location.position.land }}
          </p>
        </div>
        <div class="row">
          <ul class="my0">
            <li v-for="(quest, index) in quests" :key="index" class="my2">
              <i
                @click="acceptQuest()"
                title="Accept quest"
                class="fa-solid fa-lg fa-thumbs-up"
              ></i>
              {{ quest.fame }} |
              <span :title="`${quest.description}`" class="description"
                >description</span
              >
              | rewards
              <i
                :title="`rewards: ${quest.reward}`"
                :class="getQuestRewardIcon(quest.reward)"
              ></i>
              <i
                v-if="quest.isRepeatable"
                title="This quest can be repeated"
                class="fa-solid fa-arrow-rotate-left mx1"
              ></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="my3">You have no characters that can do quests.</div>
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
import { Character, Player, Location, Quest } from "@/dtos/Dtos";
import AvCharacterCard from "@/components/small/AvCharacterCard.vue";
import AvButton from "@/components/small/AvButton.vue";
import { HttpService } from "@/services/HttpService";
import { StoreData } from "@/dtos/Enums";

const updateAvText: any = inject("updateAvText");

const store = useStore();
const playerProfile = computed<Player | null>(() => store.state.playerProfile);
const characters = computed<Character[]>(() => playerProfile.value.characters);
const quests = computed<Quest[] | null>(() => {
  return characterLocation.value !== null
    ? characterLocation.value.quests
    : null;
});
const character = computed<Character | null>(() => getSelectedCharacter());
const location = computed<Location | null>(() => store.state.location);
const characterLocation = computed<Location | null>(
  (): Location => store.state.location
);

const selectedCharIndex = ref<number>(null);

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

const getQuestRewardIcon = (val: string) => {
  if (val === "Item") {
    return "fa-solid fa-lg fa-shield item";
  } else if (val === "Wealth") {
    return "fa-solid fa-lg fa-coins gold";
  } else {
    return "fa-solid fa-lg fa-circle-question notimplemented";
  }
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

      if (quests.value.length == 0) {
        updateAvText("There are no available quests at this location.");
      }
    })
    .catch((err) => {
      updateAvText(err.message);
    });
};

const getSelectedCharacter = (): Character | null => {
  return characters.value[selectedCharIndex.value];
};

const acceptQuest = (): void => {
  alert("Work in progress.");
};

onMounted(() => {
  updateAvText(
    "Select a character to see all the quests that you manage to find out about by talking to townsfolk."
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

.description {
  cursor: pointer;
}

.row {
  align-items: center;
}

.notimplemented {
  color: #e10505;
}

.gold {
  color: goldenrod;
}

.item {
  color: darkblue;
}

i {
  cursor: pointer;
  opacity: 0.7;
}

i:hover {
  opacity: 1;
  transition: 0.3;
}

ul {
  list-style: none;
}
</style>
