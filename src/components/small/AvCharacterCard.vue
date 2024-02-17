<template>
  <div
    @mouseover="toggleActions(true)"
    @mouseleave="toggleActions(false)"
    v-if="character"
    tabindex="-1"
    :class="setCardClass"
    @click="wasClicked()"
  >
    <img
      :class="setImgClass"
      :src="getImage"
      :title="`${props.character.status.traits.race} ${props.character.status.traits.class}`"
      @click="wasClicked()"
    />
    <p
      @mouseover="toggleName(true)"
      @mouseleave="toggleName(false)"
      :class="setNameClass"
      :title="props.title"
      @click="wasClicked()"
    >
      {{
        props.character.status.name.length > 7
          ? props.character.status.name.substring(0, 7) + "..."
          : props.character.status.name
      }}
    </p>
    <!-- LEVEL UP -->
    <i
      v-if="getLevelup"
      class="fa-solid fa-circle-plus levelup"
      style="color: #859c71"
    ></i>
    <div v-if="showActions">
      <!-- STATS -->
      <i
        :title="
          `STR: ${props.character.sheet.stats.strength}\n` +
          `CON: ${props.character.sheet.stats.constitution}\n` +
          `AGL: ${props.character.sheet.stats.agility}\n` +
          `WIL: ${props.character.sheet.stats.willpower}\n` +
          `PER: ${props.character.sheet.stats.perception}\n` +
          `ABS: ${props.character.sheet.stats.abstract}`
        "
        class="fa-solid fa-user stats"
        style="color: #ffd43b"
      ></i>
      <!-- ASSETS -->
      <i
        :title="
          `RES: ${props.character.sheet.assets.resolve}\n` +
          `MAN: ${props.character.sheet.assets.mana}\n` +
          `DEF: ${props.character.sheet.assets.defense}\n` +
          `PUR: ${props.character.sheet.assets.purge}\n` +
          `HAR: ${props.character.sheet.assets.harm}\n` +
          `SPO: ${props.character.sheet.assets.spot}\n` +
          `ACT: ${props.character.sheet.assets.actions}\n`
        "
        class="fa-solid fa-star assets"
        style="color: #ffd43b"
      ></i>
      <!-- SKILLS -->
      <i
        :title="
          `MEL: ${props.character.sheet.skills.melee}\n` +
          `ARC: ${props.character.sheet.skills.arcane}\n` +
          `PSI: ${props.character.sheet.skills.psionics}\n` +
          `HID: ${props.character.sheet.skills.hide}\n` +
          `TRA: ${props.character.sheet.skills.travel}\n` +
          `TAC: ${props.character.sheet.skills.tactics}\n` +
          `SOC: ${props.character.sheet.skills.social}\n` +
          `APO: ${props.character.sheet.skills.apothecary}\n` +
          `TRV: ${props.character.sheet.skills.travel}\n` +
          `SAI: ${props.character.sheet.skills.sail}\n`
        "
        class="fa-solid fa-hand skills"
        style="color: #ffd43b"
      ></i>
      <!-- INVENTORY -->
      <i
        :title="
          `head: ${
            props.character.inventory.head
              ? props.character.inventory.head.category
              : '...'
          }\n` +
          `body: ${
            props.character.inventory.body
              ? props.character.inventory.body.category
              : '...'
          }\n` +
          `mainhand: ${
            props.character.inventory.mainhand
              ? props.character.inventory.mainhand.category
              : '...'
          }\n` +
          `offhand: ${
            props.character.inventory.offhand
              ? props.character.inventory.offhand.category
              : '...'
          }\n` +
          `ranged: ${
            props.character.inventory.ranged
              ? props.character.inventory.ranged.category
              : '...'
          }\n`
        "
        class="fa-solid fa-shield inventory"
        style="color: #ffd43b"
      ></i>
      <!-- LOCKED -->
      <i
        v-if="!props.character.status.gameplay.isLocked"
        title="Character is not locked"
        class="fa-solid fa-eye locked"
        style="color: #ffd43b"
      ></i>
      <i
        v-else
        title="Locked to modify"
        class="fa-solid fa-eye-slash locked"
        style="color: red"
      ></i>
      <!-- LOCATION -->
      <i
        :title="
          `Region: ${props.character.status.position.region}\n` +
          `Subregion: ${props.character.status.position.subregion}\n` +
          `Land: ${props.character.status.position.land}\n` +
          `Location: ${props.character.status.position.location}\n`
        "
        class="fa-solid fa-earth-americas location"
        style="color: #ffd43b"
      ></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, defineProps, ref, defineEmits } from "vue";
import { Character } from "@/dtos/Dtos";

const updateAvSound: any = inject("updateAvSound");
const emit = defineEmits(["on-card-click"]);

const showActions = computed((): boolean => {
  return isHovered.value;
});

const setNameClass = computed((): string => {
  return isNameHovered.value ? "name-white" : "name-gray";
});

const setCardClass = computed((): string => {
  if (!isHovered.value) return "card";

  return `card card-${props.character.status.entityLevel}`;
});

const setImgClass = computed((): string => {
  return isHovered.value ? "card-img-hovered" : "card-img";
});

const getImage = computed((): string => {
  return require(`@/assets/ico_${props.character.status.traits.race.toLowerCase()}_${
    props.character.status.traits.icon
  }.png`);
});

const getLevelup = computed((): boolean => {
  return (
    props.character.levelUp.statPoints +
      props.character.levelUp.assetPoints +
      props.character.levelUp.skillPoints +
      props.character.levelUp.deedPoints >
    0
  );
});

const isHovered = ref<boolean>(false);
const isNameHovered = ref<boolean>(false);

const props = defineProps({
  character: {
    type: Object as () => Character,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
});

const toggleActions = (value: boolean) => {
  isHovered.value = value;
};

const toggleName = (value: boolean) => {
  isNameHovered.value = value;
};

const wasClicked = () => {
  emit("on-card-click", props.character.identity.id);
  updateAvSound("button_click", 1);
};
</script>

<style scoped>
.levelup {
  position: absolute;
  z-index: 2;
  margin-top: -65px;
  margin-left: 45px;
  cursor: help;
}

.stats {
  position: absolute;
  z-index: 2;
  margin-top: -75px;
  margin-left: -25px;
  cursor: help;
}

.assets {
  position: absolute;
  z-index: 2;
  margin-top: -75px;
  margin-left: -8px;
  cursor: help;
}

.skills {
  position: absolute;
  z-index: 2;
  margin-top: -75px;
  margin-left: 12px;
  cursor: help;
}

.inventory {
  position: absolute;
  z-index: 2;
  margin-top: -55px;
  margin-left: -26px;
  cursor: help;
}

.locked {
  position: absolute;
  z-index: 2;
  margin-top: -55px;
  margin-left: -9px;
  cursor: help;
}

.location {
  position: absolute;
  z-index: 2;
  margin-top: -55px;
  margin-left: 12px;
  cursor: help;
}

.info {
  position: absolute;
  z-index: 2;
  margin-top: -35px;
  margin-left: -24px;
  cursor: help;
}

.number {
  padding: 0px;
}

.card {
  border-width: 3px;
  border-style: solid;
  border-radius: 5px;
  border-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 2px;
  margin-right: 2px;
  margin-bottom: 5px;
  background-color: black;
}

.card-1 {
  border-width: 3px;
  border-style: solid;
  border-radius: 5px;
  border-color: gray;
}

.card-2 {
  border-width: 3px;
  border-style: solid;
  border-radius: 5px;
  border-color: goldenrod;
}

.card-3 {
  border-width: 3px;
  border-style: solid;
  border-radius: 5px;
  border-color: green;
}

.card-4 {
  border-width: 3px;
  border-style: solid;
  border-radius: 5px;
  border-color: orangered;
}

.card-5 {
  border-width: 3px;
  border-style: solid;
  border-radius: 5px;
  border-color: blue;
}

.card-6 {
  border-width: 3px;
  border-style: solid;
  border-radius: 5px;
  border-color: purple;
}

p {
  margin: 5px;
  text-align: center;
  font-size: x-small;
  cursor: pointer;
}

.name-gray {
  color: gray;
}

.name-white {
  color: whitesmoke;
}

.card-img {
  width: 60px;
  height: auto;
  border-radius: 5px;
  opacity: 1;
  transition: opacity 0.5s;
}

.card-img-hovered {
  width: 60px;
  height: auto;
  border-radius: 5px;
  opacity: 0.5;
  transition: opacity 0.3s;
  cursor: pointer;
}

i {
  opacity: 0.8;
}

i:hover {
  opacity: 1;
}
</style>
