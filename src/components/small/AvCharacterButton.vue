<template>
  <div
    @click="playSound()"
    :class="`av-char-btn av-char-${getComputedLevelUpClass}`"
    tabindex="-1"
  >
    <img
      :class="'av-icon-large'"
      :src="getComputedImage"
      :title="`${props.character.status.traits.race} ${props.character.status.traits.class}`"
    />
    <p :style="{ color: hasLevelUp === true ? 'gold' : 'white' }">
      {{ props.character.status.name }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, defineProps } from "vue";
import { Howl } from "howler";
import { Character } from "@/dtos/Dtos";

const click: any = new Howl({
  src: require("@/assets/sound_button_click.mp3"),
  volume: 1,
  loop: false,
});

const canPlaySounds = ref<string>("");

const getComputedImage = computed((): string => {
  return require(`@/assets/ico_${props.character.status.traits.race.toLowerCase()}_${
    props.character.status.traits.icon
  }.png`);
});

const getComputedLevelUpClass = computed(() => {
  return hasLevelUp.value === true ? "levelup" : "simple";
});

const hasLevelUp = computed((): boolean => {
  const total =
    props.character.levelUp.assetPoints +
    props.character.levelUp.deedPoints +
    props.character.levelUp.skillPoints +
    props.character.levelUp.statPoints;

  return total > 0;
});

const props = defineProps({
  character: {
    type: Object as () => Character,
    require: false,
  },
});

const playSound = (): void => {
  if (canPlaySounds.value !== "true") return;
  click.play();
};

onMounted(() => {
  canPlaySounds.value = localStorage.getItem("canPlaySounds");
});
</script>

<style scoped>
p {
  margin: 5px;
  text-align: center;
}

.av-char-simple {
  color: black;
  border-color: black;
}

.av-char-levelup {
  color: #859c71;
  border: 25px solid #859c71;
  margin-bottom: 5px;
}

.av-char-btn {
  width: 60px;
  font-size: xx-small;
  border-width: 3px;
  border-style: solid;
  border-radius: 5px;
  background-color: black;
  opacity: 0.6;
  transition: opacity 0.1s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 2px;
  margin-right: 2px;
  margin-bottom: 5px;
}

.av-icon-large {
  width: 60px;
  height: auto;
}

.av-char-btn:hover,
.av-icon-large:hover {
  opacity: 1;
  color: whitesmoke;
}
</style>
