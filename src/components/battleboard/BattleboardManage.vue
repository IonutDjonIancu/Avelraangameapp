AvCharacterCardSmall
<template>
  <div class="column">
    <div v-if="battleboards" class="row row-center column-80">
      <div
        v-for="(board, index) in getBattleboards"
        :key="index"
        :class="getSelectedPartyClass(index)"
      >
        <AvCharacterCardSmall
          @click="selectParty(index, board)"
          :title="`Warparty of ${
            board.goodGuys.find(
              (s) => s.identity.id === board.goodGuyPartyLeadId
            ).status.name
          }`"
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
    <div v-if="selectedPartyIndex != null" class="row row-center">
      <div class="party-box mx1">
        <p class="text-bold my1">Warparty members</p>
        <div class="row row-items my3">
          <div
            v-for="(character, index) in getBattleboard.goodGuys"
            :key="index"
            :class="getSelectedCharClass(index)"
          >
            <AvCharacterCardSmall
              @click="selectChar(index)"
              :title="`${
                getBattleboard.goodGuyPartyLeadId === character.identity.id
                  ? 'Party lead: '
                  : ''
              } ${character.status.name}`"
              :race="character.status.traits.race"
              :icon="character.status.traits.icon"
              :entity-level="character.status.entityLevel"
            ></AvCharacterCardSmall>
            <span
              :class="
                getBattleboard.goodGuyPartyLeadId === character.identity.id
                  ? 'text-xsmall text-center text-bold-green'
                  : 'text-xsmall text-center'
              "
              >{{ character.status.name.slice(0, 5) }}</span
            >
          </div>
        </div>
      </div>
      <div class="party-box mx1">
        <p class="text-bold my1">All supplies</p>
        <div class="row row-items my3">
          <div
            v-for="(item, index) in getAllBoardItems()"
            :key="index + item.identity.id"
            :class="getSelectedItemClass(index)"
          >
            <AvItemCard
              @click="selectItem(index)"
              :item="item"
              :show-hover-stats="true"
              :block-actions="true"
            ></AvItemCard>
          </div>
        </div>
      </div>
      <div class="column party-box mx1">Fame</div>
      <div class="column party-box mx1">Current adventure</div>
    </div>
    <div class="row">
      <AvButton
        v-if="selectedPartyIndex !== null && selectedCharIndex !== null"
        @click="removeFromParty()"
        :size="'large'"
        :source="'ico_party_remove'"
        :title="'Remove from party'"
        :name="'Banish'"
        :sound="Sounds.SoundButtonClick"
      ></AvButton>
      <AvButton
        v-if="
          selectedPartyIndex !== null &&
          selectedCharIndex !== null &&
          selectedItemIndex !== null
        "
        @click="giveItemToPartyMember()"
        :size="'large'"
        :source="'ico_item_trade'"
        :title="'Give item to party member'"
        :name="'Give'"
        :sound="Sounds.SoundButtonClick"
      ></AvButton>
    </div>
    <div class="row">
      <AvButton
        @click="props.gotoSibling('')"
        :size="'large'"
        :source="'ico_back_arrow'"
        :title="'Back to fellowship'"
        :name="'Back'"
        :sound="Sounds.SoundButtonClickBack"
      ></AvButton>
      <AvButton
        @click="refreshBattleboards()"
        :size="'large'"
        :source="'ico_refresh'"
        :title="'Refresh all warparties'"
        :name="'Refresh'"
        :sound="Sounds.SoundButtonClick"
      ></AvButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed, onMounted, defineProps } from "vue";
import { useStore } from "vuex";
import {
  Battleboard,
  BattleboardActor,
  Character,
  CharacterTrade,
  Item,
  Player,
} from "@/dtos/Dtos";
import AvCharacterCardSmall from "../small/AvCharacterCardSmall.vue";
import AvButton from "@/components/small/AvButton.vue";
import AvItemCard from "@/components/small/AvItemCard.vue";
import { HttpService } from "@/services/HttpService";
import { StoreData, Sounds } from "@/dtos/Enums";

const updateAvText: any = inject("updateAvText");
const updateAvSound: any = inject("updateAvSound");

const store = useStore();
const playerProfile = computed<Player | null>(() => store.state.playerProfile);
const getBattleboards = computed<Battleboard[] | null>(
  () => battleboards.value
);
const getBattleboard = computed<Battleboard | null>(() => battleboard.value);

const selectedCharIndex = ref<number>(null);
const selectedPartyIndex = ref<number>(null);
const selectedItemIndex = ref<number>(null);
const battleboards = ref<Battleboard[] | null>(null);
const battleboard = ref<Battleboard | null>(null);

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

const selectParty = (index: number, board: Battleboard): void => {
  store.commit(StoreData.SetBattleboard, board);
  selectedPartyIndex.value = index;
  battleboard.value = board;

  selectedCharIndex.value = null;
  selectedItemIndex.value = null;

  updateAvSound(Sounds.SoundButtonClick, 1);
};

const selectChar = (index: number): void => {
  selectedCharIndex.value = index;
  updateAvSound(Sounds.SoundButtonClick, 1);
};

const selectItem = (index: number): void => {
  selectedItemIndex.value = index;
  updateAvSound(Sounds.SoundButtonClick, 1);
};

const getSelectedCharClass = (index: number): string => {
  return selectedCharIndex.value === index
    ? "column mx1 selected-character"
    : "column mx1";
};

const getSelectedItemClass = (index: number): string => {
  return selectedItemIndex.value === index
    ? "my1 mx1 clickable selected-item"
    : "my1 mx1 clickable";
};

const getSelectedPartyClass = (index: number): string => {
  return selectedPartyIndex.value === index
    ? "column mx1 selected-party"
    : "column mx1";
};

const filterBattleboards = (boards: Battleboard[]): Battleboard[] => {
  var result: Battleboard[] = [];
  result = boards.filter((board: Battleboard) => {
    return board.goodGuys.find(
      (s) => s.identity.playerId === playerProfile.value.identity.id
    );
  });

  return result;
};

const getAllBoardItems = (): Item[] => {
  var items: Item[] = [];
  battleboard.value.goodGuys.forEach((char) => {
    char.inventory.supplies.forEach((item) => {
      items.push(item);
    });
  });
  return items;
};

const clearSelectedIndexes = (): void => {
  selectedPartyIndex.value = null;
  selectedCharIndex.value = null;
  selectedItemIndex.value = null;
};

const refreshBattleboards = (): void => {
  clearSelectedIndexes();

  HttpService.httpGet("Battleboards/GetBattleboards")
    .then((s) => {
      if (s.ok) {
        return s.json();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((boards: Battleboard[]) => {
      selectedPartyIndex.value = null;
      battleboards.value = filterBattleboards(boards);
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

const removeFromParty = (): void => {
  if (battleboard.value == null) return;

  var data: BattleboardActor = {
    mainActor: battleboard.value.goodGuys.find(
      (s) => s.identity.playerId === playerProfile.value.identity.id
    ).identity,
    targetId: battleboard.value.goodGuys[selectedCharIndex.value].identity.id,
  };

  HttpService.httpPut("Battleboards/KickFromBattleboard", data)
    .then((s) => {
      if (s.ok) {
        return s.json();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((board: Battleboard) => {
      store.commit(StoreData.SetBattleboard, board);
      clearSelectedIndexes();
      updateAvText("You have removed one of your party members.");
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

const giveItemToPartyMember = () => {
  if (battleboard.value == null) return;

  var data: CharacterTrade = {
    characterIdentity: battleboard.value.goodGuys.find(
      (s) => s.identity.playerId === playerProfile.value.identity.id
    ).identity,
    itemId: getAllBoardItems()[selectedItemIndex.value].identity.id,
    targetIdentity:
      battleboard.value.goodGuys[selectedCharIndex.value].identity,
  };

  HttpService.httpPut("Character/GiveItem", data)
    .then(() => {
      clearSelectedIndexes();
      updateAvText(
        "You have allowed items to negotiate between your party members."
      );
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

onMounted(() => {
  updateAvText(
    "These are the warparties that you have characters in. Remember that only party leads can take actions within their ranks. Actions such as trade items, provisions, quests. You can always leave a warparty as long as it's not fighting, and party leads can banish characters."
  );
});
</script>

<style scoped>
.row-items {
  flex-wrap: wrap;
  justify-content: center;
}

.party-box {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #2c3e50;
  width: 220px;
  height: 420px;
  padding: 3px;
  text-overflow: ellipsis;
  white-space: nowrap; /* Prevent wrapping of text */
  overflow: hidden;
}

.selected-character {
  border: 3px solid #2c3e50;
  border-radius: 3px;
  padding: 2px;
}

.selected-item {
  border: 3px solid #2c3e50;
  border-radius: 3px;
  padding: 4px;
}

.selected-party {
  border: 3px solid #859c71;
  border-radius: 3px;
  padding: 2px;
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

.clickable {
  cursor: pointer;
}
</style>
