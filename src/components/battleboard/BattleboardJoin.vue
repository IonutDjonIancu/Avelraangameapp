AvCharacterCardSmall
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
                :title="'is creating a warparty'"
                :show-class="false"
                @on-card-click="selectCharacter(index)"
              ></AvCharacterCard>
            </div>
          </div>
          <div
            v-if="character && character.status.gameplay.battleboardId === ''"
            class="column"
          >
            <div>
              <p>These are the warparty leads in your character's area</p>
            </div>
            <div class="row row-center column-80">
              <div
                v-for="(board, index) in getBattleboards"
                :key="index"
                class="column mx1"
              >
                <AvCharacterCardSmall
                  :title="
                    board.goodGuys.find(
                      (s) => s.identity.id === board.goodGuyPartyLeadId
                    ).status.name
                  "
                  :race="
                    board.goodGuys.find(
                      (s) => s.identity.id === board.goodGuyPartyLeadId
                    ).status.traits.race
                  "
                  :icon="
                    board.goodGuys.find(
                      (s) => s.identity.id === board.goodGuyPartyLeadId
                    ).status.traits.icon
                  "
                  :entity-level="
                    board.goodGuys.find(
                      (s) => s.identity.id === board.goodGuyPartyLeadId
                    ).status.entityLevel
                  "
                ></AvCharacterCardSmall>
                <span class="text-xsmall text-center">{{
                  board.goodGuys
                    .find((s) => s.identity.id === board.goodGuyPartyLeadId)
                    .status.name.slice(0, 5)
                }}</span>
              </div>
            </div>
          </div>
          <div
            v-if="character && character.status.gameplay.battleboardId !== ''"
          >
            <p>This character is already in a warparty</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="my3">
      You have no characters that can create warparties.
    </div>
    <div class="row">
      <AvButton
        @click="props.gotoSibling('')"
        :size="'large'"
        :source="'ico_back_arrow'"
        :title="'Back to fellowship'"
        :name="'Back'"
        :sound="'back'"
      ></AvButton>
      <AvButton
        v-if="
          selectedCharIndex != null &&
          character.status.gameplay.battleboardId == ''
        "
        @click="joinParty()"
        :size="'large'"
        :source="'ico_party_join_accept'"
        :title="'Join this warparty'"
        :name="'Join'"
        :sound="'click'"
      ></AvButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed, onMounted, defineProps } from "vue";
import { useStore } from "vuex";
import { Battleboard, BattleboardActor, Character, Player } from "@/dtos/Dtos";
import AvCharacterCard from "@/components/small/AvCharacterCard.vue";
import AvCharacterCardSmall from "../small/AvCharacterCardSmall.vue";
import AvButton from "@/components/small/AvButton.vue";
import { HttpService } from "@/services/HttpService";
import { StoreData } from "@/dtos/Enums";

const updateAvText: any = inject("updateAvText");

const store = useStore();
const playerProfile = computed<Player | null>(() => store.state.playerProfile);
const characters = computed<Character[]>(() => playerProfile.value.characters);
const character = computed<Character | null>(() => getSelectedCharacter());
const getBattleboards = computed<Battleboard[] | null>(
  () => battleboards.value
);

const selectedCharIndex = ref<number>(null);
const battleboards = ref<Battleboard[] | null>(null);

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

const selectCharacter = (index: number): void => {
  const character = characters.value[index];
  store.commit(StoreData.SetCharacterId, character.identity.id);

  selectedCharIndex.value = index;

  setBattleboards();
};

const setClass = (index: number): string => {
  return selectedCharIndex.value === index ? "mx0 selected" : "mx0";
};

const getSelectedCharacter = (): Character | null => {
  return characters.value[selectedCharIndex.value];
};

const setBattleboards = (): void => {
  HttpService.httpGet("Battleboards/GetBattleboards")
    .then((s) => {
      if (s.ok) {
        return s.json();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((boards: Battleboard[]) => {
      battleboards.value = boards;
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

const joinParty = (): void => {
  console.log("joining party");
};

onMounted(() => {
  updateAvText("Select a character before joining a warparty.");
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

ul {
  list-style: none;
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
