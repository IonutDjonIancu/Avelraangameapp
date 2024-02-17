<template>
  <div @mouseenter="onHover(true)" @mouseleave="onHover(false)">
    <!-- BUTTON SMALL -->
    <div v-if="!isHovered" :class="`img-small item-level_${item.level}`">
      <img style="width: 20px; height: 20px" :src="getComputedImage" />
      <span class="mini-text harm">{{ props.item.sheet.assets.harm }}</span>
      <span class="mini-text defense">{{
        props.item.sheet.assets.defense
      }}</span>
    </div>

    <!-- BUTTON LARGE -->
    <div
      v-if="isHovered"
      :title="item.name"
      :class="`column item item-level_${item.level}`"
    >
      <span class="mini-text-category">{{ item.category }}</span>
      <img class="img" :src="getComputedImage" />

      <!-- first row of icons -->
      <div class="row">
        <i
          :title="`Level ${item.level}, ${item.levelName}`"
          :class="`mini fa-solid fa-dice-${getComputedLevel}`"
        ></i>
        <i
          :title="
            `Subtype: ${item.subtype}\n` +
            `Type: ${item.type}\n` +
            `Category: ${item.subcategory} ${item.category}\n` +
            `Quality: ${item.quality}`
          "
          class="mini fa-solid fa-wand-sparkles"
        ></i>
        <i
          :title="`Lore: ${item.lore}\n` + `Description: ${item.description}`"
          class="mini fa-solid fa-dungeon"
        ></i>
        <i
          :title="
            `Magical: ${item.hasTaint === true ? 'yes' : 'no'}\n` +
            `<<< assets >>>\n` +
            `harm: ${item.sheet.assets.harm}\n` +
            `resolve: ${item.sheet.assets.resolve}\n` +
            `mana: ${item.sheet.assets.mana}\n` +
            `defense: ${item.sheet.assets.defense}\n` +
            `purge: ${item.sheet.assets.purge}\n` +
            `actions: ${item.sheet.assets.actions}\n` +
            `spot: ${item.sheet.assets.spot}\n` +
            `<<< skills >>>\n` +
            `apothecary: ${item.sheet.skills.apothecary}\n` +
            `arcane: ${item.sheet.skills.arcane}\n` +
            `hide: ${item.sheet.skills.hide}\n` +
            `melee: ${item.sheet.skills.melee}\n` +
            `psionics: ${item.sheet.skills.psionics}\n` +
            `sail: ${item.sheet.skills.sail}\n` +
            `social: ${item.sheet.skills.social}\n` +
            `tactics: ${item.sheet.skills.tactics}\n` +
            `traps: ${item.sheet.skills.traps}\n` +
            `travel: ${item.sheet.skills.travel}\n` +
            `apothecary: ${item.sheet.skills.apothecary}\n` +
            `<<< stats >>>\n` +
            `strength: ${item.sheet.stats.strength}\n` +
            `constitution: ${item.sheet.stats.constitution}\n` +
            `agility: ${item.sheet.stats.agility}\n` +
            `willpower: ${item.sheet.stats.willpower}\n` +
            `perception: ${item.sheet.stats.perception}\n` +
            `abstract: ${item.sheet.stats.abstract}\n`
          "
          class="mini fa-solid fa-scroll"
        ></i>
      </div>
      <!-- second row of icons -->
      <div v-if="item.identity.characterId != emptyGuid" class="row">
        <i
          title="equip item"
          @click="equipMain"
          :class="
            props.item.inventoryLocations.length === 0
              ? 'mini fa-solid fa-arrow-up disabled'
              : 'mini fa-solid fa-arrow-up'
          "
        ></i>
        <i
          title="equip offhand"
          @click="equipOff"
          :class="
            hasOffhand
              ? 'mini fa-solid fa-arrow-right'
              : 'mini fa-solid fa-arrow-right disabled'
          "
        ></i>
        <i
          title="equip ranged"
          @click="equipRanged"
          :class="
            hasRanged
              ? 'mini fa-solid fa-arrow-up-from-bracket'
              : 'mini fa-solid fa-arrow-up-from-bracket disabled'
          "
        ></i>
        <i
          :title="`quick sell item for: ${item.value}`"
          @click="sellItem"
          class="mini fa-solid fa-rotate-right"
        ></i>
      </div>
      <div v-else class="row">
        <i
          :title="`buy item for: ${item.value}`"
          @click="buyItem"
          class="mini fa-solid fa-handshake"
        ></i>
      </div>
      <!-- third row of icons -->
      <div class="row">
        <span title="Harm" class="mini-5 text" style="margin-right: 3px">{{
          item.sheet.assets.harm
        }}</span>
        <span title="Defense" class="mini-5 text" style="margin-right: 3px">{{
          item.sheet.assets.defense
        }}</span>
        <span title="Resolve" class="mini-5 text" style="margin-right: 3px">{{
          item.sheet.assets.resolve
        }}</span>
        <span title="Mana" class="mini-5 text">{{
          item.sheet.assets.mana
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed, inject } from "vue";
import { useStore } from "vuex";
import {
  Character,
  CharacterEquip,
  CharacterTrade,
  Item,
  Player,
  Location,
} from "@/dtos/Dtos";
import { InventoryLocations, StoreData } from "@/dtos/Enums";
import { HttpService } from "@/services/HttpService";

const emptyGuid = "00000000-0000-0000-0000-000000000000";

const updateAvText: any = inject("updateAvText");
const updateAvSound: any = inject("updateAvSound");

const store = useStore();
const playerProfile = computed<Player | null>(() => store.state.playerProfile);
const characterId = computed<string | null>(() => store.state.characterId);
const characterLocation = computed<Location | null>(
  (): Location => store.state.location
);

const getComputedImage = computed((): string => {
  return require(`@/assets/ico_${props.item.subtype.toLowerCase()}_${
    props.item.icon
  }.png`);
});

const getComputedLevel = computed((): string => {
  if (props.item.level === 1) {
    return "one";
  } else if (props.item.level === 2) {
    return "two";
  } else if (props.item.level === 3) {
    return "three";
  } else if (props.item.level === 4) {
    return "four";
  } else if (props.item.level === 5) {
    return "five";
  } else {
    return "six";
  }
});

const hasOffhand = computed((): boolean => {
  return props.item.inventoryLocations.includes(InventoryLocations.Offhand);
});

const hasRanged = computed((): boolean => {
  return props.item.inventoryLocations.includes(InventoryLocations.Ranged);
});

const isHovered = ref<boolean>(false);

const props = defineProps({
  item: {
    type: Object as () => Item,
    require: false,
  },
});

const onHover = (value: boolean): void => {
  isHovered.value = value;
};

const equipMain = (): void => {
  let location = "";

  if (props.item.type === "Weapon") {
    if (props.item.subtype === "Bow") {
      location = InventoryLocations.Ranged;
    } else {
      location = InventoryLocations.Mainhand;
    }
  } else if (props.item.type === "Protection") {
    location =
      props.item.subtype === "Armour"
        ? InventoryLocations.Body
        : props.item.subtype === "Helm"
        ? InventoryLocations.Head
        : InventoryLocations.Mainhand;
  } else {
    location = InventoryLocations.Heraldry;
  }

  equipItem(location);
};

const equipOff = (): void => {
  equipItem(InventoryLocations.Offhand);
};

const equipRanged = (): void => {
  equipItem(InventoryLocations.Ranged);
};

const equipItem = (location: string): void => {
  const equip: CharacterEquip = {
    characterIdentity: {
      id: props.item.identity.characterId,
      playerId: playerProfile.value.identity.id,
    },
    itemId: props.item.identity.id,
    inventoryLocation: location,
  };

  HttpService.httpPut("Character/EquipItem", equip)
    .then((s) => {
      if (s.ok) {
        return s.json();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((character: Character) => {
      store.commit(StoreData.UpdateCharacter, character);
      updateAvSound("item_wear", 1);
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

const sellItem = (): void => {
  var trade: CharacterTrade = {
    characterIdentity: {
      id: props.item.identity.characterId,
      playerId: playerProfile.value.identity.id,
    },
    itemId: props.item.identity.id,
    isToBuy: null,
    amount: null,
    targetIdentity: null,
  };

  HttpService.httpPut("Character/SellItem", trade)
    .then((s) => {
      if (s.ok) {
        return s.json();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((character: Character) => {
      store.commit(StoreData.UpdateCharacter, character);

      HttpService.httpPost("Gameplay/FindLocation", character.status.position)
        .then((s) => {
          if (s.ok) {
            return s.json();
          } else {
            s.text().then((r) => updateAvText(r));
          }
        })
        .then((loc: Location) => {
          store.commit(StoreData.SetLocation, loc);
        })
        .catch((err) => {
          updateAvText(err.message);
          return;
        });

      updateAvSound("item_sell", 1);
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

const buyItem = () => {
  const trade: CharacterTrade = {
    characterIdentity: {
      id: characterId.value,
      playerId: playerProfile.value.identity.id,
    },
    itemId: props.item.identity.id,
    isToBuy: true,
  };

  HttpService.httpPut("Character/BuyItem", trade)
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

      const itemIndex = characterLocation.value.market.findIndex(
        (i) => i.identity.id === props.item.identity.id
      );

      if (itemIndex !== -1) {
        characterLocation.value.market.splice(itemIndex, 1);
      }
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};
</script>

<style scoped>
.img {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  object-fit: contain;
}

.img-small {
  width: 30px;
  height: 30px;
  border-style: solid;
  border-width: 2px;
  border-radius: 20px;
  margin-right: 2px;
  margin-left: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item {
  width: 60px;
  height: auto;
  border-style: solid;
  border-width: 2px;
  border-radius: 3px;
  overflow: hidden;
  background-color: #859c7155;
  padding: 4px;
  padding-top: 0px;
  margin-left: 3px;
  margin-right: 3px;
}

.item-level_1 {
  border-color: whitesmoke;
}

.item-level_2 {
  border-color: goldenrod;
}

.item-level_3 {
  border-color: green;
}

.item-level_4 {
  border-color: orangered;
}

.item-level_5 {
  border-color: blue;
}

.item-level_6 {
  border-color: purple;
}

.mini {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
  opacity: 0.3;
}

.mini:hover {
  opacity: 1;
  transition: 0.3s;
}

.mini-5 {
  cursor: pointer;
  opacity: 0.5;
}

.mini-5:hover {
  opacity: 1;
  transition: 0.3s;
}

.mini-text-category {
  color: #2c3e50;
  font-size: xx-small;
  font-weight: bold;
}

.mini-text {
  color: #2c3e50;
  font-size: x-small;
  font-weight: bold;
  position: absolute;
  z-index: 2;
}

.harm {
  margin-left: -25px;
  margin-top: -30px;
}

.defense {
  margin-left: 25px;
  margin-top: 30px;
}

.text {
  font-size: x-small;
}

.row {
  margin-bottom: 0px;
  margin-top: 3px;
}

i {
  margin-left: 1px;
  margin-right: 1px;
}

.no {
  pointer-events: none;
}
</style>
