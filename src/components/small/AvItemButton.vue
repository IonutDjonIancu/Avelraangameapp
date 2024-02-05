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
            `Magical: ${item.hasTaint}\n` +
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
      <div class="row">
        <i title="equip item" class="mini fa-solid fa-arrow-up"></i>
        <i title="equip offhand" class="mini fa-solid fa-arrow-right"></i>
        <i
          title="equip ranged"
          class="mini fa-solid fa-arrow-up-from-bracket"
        ></i>
        <i
          :title="`quick sell item for: ${item.value}`"
          class="mini fa-solid fa-rotate-right"
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
import { ref, defineProps, computed } from "vue";
import { Item } from "@/dtos/Dtos";

const isHovered = ref<boolean>(false);

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

const props = defineProps({
  item: {
    type: Object as () => Item,
    require: false,
  },
});

const onHover = (value: boolean): void => {
  isHovered.value = value;
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
  border-color: gray;
}

.item-level_2 {
  border-color: darkgreen;
}

.item-level_3 {
  border-color: darkgoldenrod;
}

.item-level_4 {
  border-color: darkred;
}

.item-level_5 {
  border-color: greenyellow;
}

.item-level_6 {
  border-color: magenta;
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
</style>
