<template>
  <div class="column">
    <div
      v-if="showName"
      @click="toggleTopIcons"
      :title="character.status.name"
      class="name-tag"
    >
      {{
        character.status.name.length > 5
          ? character.status.name.slice(0, 5) + "..."
          : character.status.name
      }}
    </div>
    <div class="card-container">
      <div class="column">
        <div v-if="showTopIcons" :class="showingTopIcons">
          <i
            :title="
              `<<< stats >>>\n` +
              `STR: ${character.sheet.stats.strength}\n` +
              `CON: ${character.sheet.stats.constitution}\n` +
              `AGI: ${character.sheet.stats.agility}\n` +
              `WIL: ${character.sheet.stats.willpower}\n` +
              `PER: ${character.sheet.stats.perception}\n` +
              `ABS: ${character.sheet.stats.abstract}\n` +
              `<<< assets >>>\n` +
              `HAR: ${character.sheet.assets.harm}\n` +
              `RES: ${character.sheet.assets.resolve}\n` +
              `MAN: ${character.sheet.assets.mana}\n` +
              `DEF: ${character.sheet.assets.defense}\n` +
              `PUR: ${character.sheet.assets.purge}\n` +
              `ACT: ${character.sheet.assets.actions}\n` +
              `SPO: ${character.sheet.assets.spot}\n` +
              `<<< skills >>>\n` +
              `MEL: ${character.sheet.skills.melee}\n` +
              `ARC: ${character.sheet.skills.arcane}\n` +
              `PSI: ${character.sheet.skills.psionics}\n` +
              `TRA: ${character.sheet.skills.traps}\n` +
              `HID: ${character.sheet.skills.hide}\n` +
              `TAC: ${character.sheet.skills.tactics}\n` +
              `APO: ${character.sheet.skills.apothecary}\n` +
              `SOC: ${character.sheet.skills.social}\n` +
              `TRV: ${character.sheet.skills.travel}\n` +
              `SAI: ${character.sheet.skills.sail}\n`
            "
            class="fa-solid fa-clipboard"
          ></i>
          <i
            :title="
              `<<< inventory >>>\n` +
              `head: ${
                character.inventory.head
                  ? character.inventory.head.category
                  : '..'
              }\n` +
              `body: ${
                character.inventory.body
                  ? character.inventory.body.category
                  : '..'
              }\n` +
              `mainhand: ${
                character.inventory.mainhand
                  ? character.inventory.mainhand.category
                  : '..'
              }\n` +
              `offhand: ${
                character.inventory.offhand
                  ? character.inventory.offhand.category
                  : '..'
              }\n` +
              `ranged: ${
                character.inventory.ranged
                  ? character.inventory.ranged.category
                  : '..'
              }\n`
            "
            class="fa-solid fa-shield-halved"
          ></i>
          <i
            :title="
              `<<< status >>>\n` +
              `entity level ${character.status.entityLevel}\n` +
              `name ${character.status.name}\n` +
              `quests finished ${character.status.nrOfQuestsFinished}\n` +
              `race ${character.status.traits.race}\n` +
              `culture ${character.status.traits.culture}\n` +
              `class ${character.status.traits.class}\n` +
              `tradition ${character.status.traits.tradition}\n` +
              `<<< fame >>>\n` +
              `${character.status.fame}\n`
            "
            class="fa-solid fa-user"
          ></i>
          <i
            :title="
              `<<< gameplay >>>\n` +
              `Alive? ${character.status.gameplay.isAlive}\n` +
              `Hidden? ${character.status.gameplay.isHidden}\n` +
              `Locked? ${character.status.gameplay.isLocked}\n` +
              `NPC? ${character.status.gameplay.isNpc}\n`
            "
            class="fa-solid fa-circle-half-stroke"
          ></i>
        </div>
        <i
          v-if="showLvlup"
          title="Character has gained experience in battle"
          :class="showHideLevelup"
          style="color: #1fd19b"
        ></i>
        <img
          :title="title"
          @click="wasClicked"
          :src="getImage"
          :class="getEntityLevelBorderClass()"
        />
        <i
          v-if="showLocked"
          title="Character is locked to modify at this point in time"
          :class="showHideIsLocked"
          class="fa-solid fa-circle-xmark is-locked"
          style="color: #8b2727"
        ></i>
        <div v-if="showBottomIcons" :class="showingBottomIcons">
          <i class="fa-solid fa-clipboard"></i>
          <i class="fa-solid fa-clipboard"></i>
          <i class="fa-solid fa-clipboard"></i>
          <i class="fa-solid fa-clipboard"></i>
        </div>
      </div>
    </div>
    <div
      v-if="showHealthBars"
      :title="`Resolve left: ${character.sheet.assets.resolveLeft} \nMana left: ${character.sheet.assets.manaLeft}`"
      class="column"
    >
      <div class="hpbar">
        <div
          :title="`Resolve left: ${character.sheet.assets.resolveLeft} / ${character.sheet.assets.resolve}`"
          :style="calculateHpLeft"
          class="hpbar-inside"
        ></div>
      </div>
      <div class="manabar">
        <div
          :title="`Mana left: ${character.sheet.assets.manaLeft} / ${character.sheet.assets.mana}`"
          :style="calculateManaLeft"
          class="manabar-inside"
        ></div>
      </div>
    </div>
    <div
      v-if="showClass"
      @click="toggleBottomIcons"
      title="Character's class"
      class="class-tag"
    >
      {{ character.status.traits.class }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, inject, defineEmits } from "vue";
import { Character } from "@/dtos/Dtos";
import { Emits, Sounds } from "@/dtos/Enums";

const updateAvSound: any = inject("updateAvSound");
const emit = defineEmits([Emits.OnCardClick]);

const getImage = computed((): string => {
  return require(`@/assets/ico_${props.character.status.traits.race.toLowerCase()}_${
    props.character.status.traits.icon
  }.png`);
});

const calculateHpLeft = computed((): string => {
  var percentage = Math.round(
    (props.character.sheet.assets.resolveLeft * 100) /
      props.character.sheet.assets.resolve
  );

  return `width: ${percentage}%`;
});

const calculateManaLeft = computed((): string => {
  var percentage = Math.round(
    (props.character.sheet.assets.manaLeft * 100) /
      props.character.sheet.assets.mana
  );

  return `width: ${percentage}%`;
});

const showHideLevelup = computed((): string => {
  return props.character.levelUp.deedPoints +
    props.character.levelUp.assetPoints +
    props.character.levelUp.statPoints +
    props.character.levelUp.skillPoints >
    0
    ? "fa-solid fa-circle-up level-up level-up-show"
    : "fa-solid fa-circle-up level-up level-up-hide";
});

const showHideIsLocked = computed((): string => {
  return props.character.status.gameplay.isLocked
    ? "fa-solid fa-circle-xmark is-locked is-locked-show"
    : "fa-solid fa-circle-xmark is-locked is-locked-hide";
});

const showingTopIcons = computed((): string => {
  return areTopIconsShown.value
    ? "row top-icons top-icons-show"
    : "row top-icons top-icons-hide";
});

const showingBottomIcons = computed((): string => {
  return areBottomIconsShown.value
    ? "row bottom-icons bottom-icons-show"
    : "row bottom-icons bottom-icons-hide";
});

const areTopIconsShown = ref<boolean>(false);
const areBottomIconsShown = ref<boolean>(false);

const props = defineProps({
  character: {
    type: Object as () => Character,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  showTopIcons: {
    type: Boolean,
    required: false,
    default: false,
  },
  showBottomIcons: {
    type: Boolean,
    required: false,
    default: false,
  },
  showHealthBars: {
    type: Boolean,
    required: false,
    default: false,
  },
  showName: {
    type: Boolean,
    required: false,
    default: true,
  },
  showClass: {
    type: Boolean,
    required: false,
    default: true,
  },
  showLvlup: {
    type: Boolean,
    required: false,
    default: true,
  },
  showLocked: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const toggleTopIcons = (): void => {
  if (!props.showTopIcons) return;
  areTopIconsShown.value = !areTopIconsShown.value;
};

const toggleBottomIcons = (): void => {
  if (!props.showBottomIcons) return;
  areBottomIconsShown.value = !areBottomIconsShown.value;
};

const wasClicked = () => {
  emit(Emits.OnCardClick, props.character.identity.id);
  updateAvSound(Sounds.SoundButtonClick, 1);
};

const getEntityLevelBorderClass = () => {
  return `image image-lvl-${props.character.status.entityLevel}`;
};
</script>

<style scoped>
.card-container {
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 1px;
  background-color: black;
  border: solid black 2px;
  border-radius: 3px;
  box-shadow: 3px 2px 8px rgba(0, 0, 0, 0.515);
}

.level-up {
  position: absolute;
  z-index: 2;
  margin-right: -40px;
  margin-top: 6px;
  cursor: pointer;
  opacity: 0.5;
}

.level-up:hover {
  opacity: 1;
}

.level-up-hide {
  visibility: hidden;
}

.level-up-show {
  visibility: visible;
}

.is-locked {
  position: absolute;
  z-index: 2;
  margin-right: 40px;
  margin-top: 6px;
  cursor: pointer;
  opacity: 0.8;
}

.is-locked-hide {
  visibility: hidden;
}

.is-locked-show {
  visibility: visible;
}

.image {
  height: 60px;
  width: auto;
  border-top-width: 3px;
  border-top-style: solid;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.3s;
}

.image:hover {
  opacity: 1;
  transition: 0.1s;
}

.top-icons {
  padding-top: 1px;
  margin-bottom: 0px;
  padding-bottom: 2px;
}

.top-icons-hide {
  visibility: hidden;
  position: absolute;
  z-index: 3;
}

.top-icons-show {
  visibility: visible;
  position: inherit;
  z-index: 3;
}

.bottom-icons {
  margin-top: 0px;
  padding-top: 2px;
  padding-bottom: 1px;
  margin-bottom: 0px;
}

.bottom-icons-hide {
  visibility: hidden;
  position: absolute;
  z-index: 3;
}

.bottom-icons-show {
  visibility: visible;
  position: inherit;
  z-index: 3;
}

.name-tag {
  font-size: small;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  cursor: pointer;
}

.class-tag {
  font-size: x-small;
  font-weight: bold;
  color: #859c71;
  cursor: pointer;
}

.hpbar {
  padding-top: 1px;
  margin-top: 0px;
  height: 5px;
  width: 62px;
  border-top-right-radius: 3px;
  background-color: rgba(250, 235, 215, 0.49);
  cursor: help;
}

.hpbar-inside {
  height: 5px;
  border-top-right-radius: 2px;
  background-color: green;
  opacity: 0.5;
}

.hpbar-inside:hover {
  opacity: 1;
  transition: 0.3;
}

.manabar {
  padding-top: 1px;
  padding-bottom: 1px;
  margin-top: 0px;
  height: 5px;
  width: 62px;
  border-bottom-right-radius: 3px;
  background-color: rgba(250, 235, 215, 0.49);
  cursor: help;
}

.manabar-inside {
  height: 5px;
  border-bottom-right-radius: 2px;
  background-color: darkslategrey;
  opacity: 0.5;
}

.manabar-inside:hover {
  opacity: 1;
  transition: 0.3;
}

i {
  margin-left: 1px;
  margin-right: 1px;
  cursor: pointer;
  color: #859c71;
  opacity: 0.6;
}

i:hover {
  opacity: 1;
  transition: opacity 0.7;
}
</style>
