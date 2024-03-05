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
          <div v-if="character">
            <p class="my0 text-xsmall text-center">
              Mercenaries {{ character.mercenaries.length }}
            </p>
            <div
              v-if="character.status.gameplay.battleboardId == ''"
              class="my3"
            >
              This will create a warparty with this character as party lead.
              Character worth is {{ character.status.worth }}.
            </div>
            <div
              v-if="character.status.gameplay.battleboardId != ''"
              class="my3"
            >
              You are now in a warparty.
            </div>
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
        @click="createParty()"
        :size="'large'"
        :source="'ico_party_create_accept'"
        :title="'Accept and create warparty'"
        :name="'Accept'"
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
import AvButton from "@/components/small/AvButton.vue";
import { HttpService } from "@/services/HttpService";
import { StoreData } from "@/dtos/Enums";

const updateAvText: any = inject("updateAvText");

const store = useStore();
const playerProfile = computed<Player | null>(() => store.state.playerProfile);
const characters = computed<Character[]>(() => playerProfile.value.characters);
const character = computed<Character | null>(() => getSelectedCharacter());

const selectedCharIndex = ref<number>(null);

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

const selectCharacter = (index: number): void => {
  const character = characters.value[index];
  store.commit(StoreData.SetCharacterId, character.identity.id);

  selectedCharIndex.value = index;
};

const setClass = (index: number): string => {
  return selectedCharIndex.value === index ? "mx0 selected" : "mx0";
};

const getSelectedCharacter = (): Character | null => {
  return characters.value[selectedCharIndex.value];
};

const createParty = (): void => {
  if (!character.value) return;

  var data: BattleboardActor = {
    mainActor: character.value.identity,
    wantsToBeGood: true,
  };

  HttpService.httpPost("Battleboards/CreateBattleboard", data)
    .then((s) => {
      if (s.ok) {
        return s.json();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((battleboard: Battleboard) => {
      store.commit(StoreData.SetBattleboard, battleboard);

      character.value.status.gameplay.battleboardId = battleboard.id;
      store.commit(StoreData.UpdateCharacter, character.value);

      updateAvText(
        "You announce yourself to the local marshals that you account to your fame."
      );
    })
    .catch((err) => {
      updateAvText(err.message);
    });
};

onMounted(() => {
  updateAvText("Select a character before creating a warparty.");
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
