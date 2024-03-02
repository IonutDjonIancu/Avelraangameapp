<template>
  <div class="background-container">
    <div class="background-image-container">
      <img class="av-image" :src="avImage" />
    </div>
    <nav style="display: flex; justify-content: space-between">
      <!-- LEFT SIDE CONTENTS -->
      <div class="row">
        <router-link to="/" class="av-nav-item">Home</router-link>
        <router-link v-if="playerProfile" to="/character" class="av-nav-item"
          >| Characters</router-link
        >
        <router-link v-if="playerProfile" to="/market" class="av-nav-item"
          >| Marketplace</router-link
        >
        <router-link v-if="playerProfile" to="/townhall" class="av-nav-item"
          >| Townhall</router-link
        >
        <router-link v-if="playerProfile" to="/location" class="av-nav-item"
          >| Locations</router-link
        >
        <div v-if="!playerProfile" style="color: #859c71">
          * you will have to login first in order to see the rest of the content
        </div>
      </div>

      <!-- RIGHT SIDE CONTENTS -->
      <div class="row row-center">
        <span @click="seePlayer" class="av-nav-item text-xsmall">
          {{
            playerProfile
              ? "Player: " + playerProfile.identity.name
              : "no player logged in"
          }}
        </span>

        <router-link to="/rulebook" class="av-nav-item">Rulebook</router-link> |
        <AvMusic :avMusicName="avMusicName"></AvMusic>
        <AvSound
          :avSoundName="avSoundName"
          :avSoundVolume="avSoundVolume"
        ></AvSound>
      </div>
    </nav>
    <AvSays :avText="avText"></AvSays>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, computed } from "vue";
import { useStore } from "vuex";
import AvSays from "@/components/general/AvSays.vue";
import AvMusic from "@/components/general/AvMusic.vue";
import AvSound from "@/components/general/AvSound.vue";
import { Player } from "./dtos/Dtos";

const store = useStore();
const playerProfile = computed<Player | null>(() => store.state.playerProfile);

const avText = ref(
  "Welcome adventurer! I will be your dungeonmaster and I will guide your story through the world of Av'el'Raan..."
);
const avImage = ref<string>(require("./assets/img_planet_2.png"));

const avMusicName = ref<string>("");
const avSoundName = ref<string>("");
const avSoundVolume = ref<number>(1);

const updateAvMusic = (name: string) => {
  avMusicName.value = `${name}.${Math.floor(Math.random() * 100000)}`;
};

const updateAvSound = (name: string, volume: number) => {
  avSoundVolume.value = volume;
  avSoundName.value = `${name}.${Math.floor(Math.random() * 100000)}`;
};

const updateAvText = (newText: string) => {
  avText.value = newText;
};

const updateAvImage = (value: string) => {
  avImage.value = require(`./assets/${value}.png`);
};

const seePlayer = () => {
  console.log(store.state);
};

provide("updateAvMusic", updateAvMusic);
provide("updateAvSound", updateAvSound);
provide("updateAvText", updateAvText);
provide("updateAvImage", updateAvImage);

onMounted(() => {
  localStorage.clear();
  if (
    confirm(
      "Do you allow Avelraan to sometimes play its theme music? Alternatively you can always right-click on the tab and select 'Mute site' if you get tired of it."
    )
  ) {
    localStorage.setItem("canPlayMusic", "true");
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #859c71;
    text-decoration: underline;

    &.router-link-exact-active {
      color: #2c3e50;
      text-decoration: none;
    }
  }
}

input {
  border-radius: 4px;
  text-align: center;
}

.av-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.av-nav-item {
  margin-right: 5px;
}

.av-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  align-items: center;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.column-80 {
  width: 80%;
}

.row {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.row-center {
  justify-content: center;
  align-items: center;
}

.normal {
  color: #2c3e50;
}

.meta {
  color: #859c71;
  font-weight: bold;
}

.av-image {
  width: 100%;
}

.background-container {
  background-color: #efefefd0;
  border-radius: 5px;
  padding-bottom: 50px;
}

.background-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-size: cover;
  background-position: center;
  z-index: -1;
  pointer-events: none;
}

.disabled {
  pointer-events: none;
}

.my0 {
  margin-top: 0px;
  margin-bottom: 0px;
}

.my1 {
  margin-top: 3px;
  margin-bottom: 3px;
}

.my2 {
  margin-top: 6px;
  margin-bottom: 6px;
}

.my3 {
  margin-top: 9px;
  margin-bottom: 9px;
}

.my4 {
  margin-top: 12px;
  margin-bottom: 12px;
}

.my5 {
  margin-top: 15px;
  margin-bottom: 15px;
}

.mx0 {
  margin-left: 0px;
  margin-right: 0px;
}

.mx1 {
  margin-left: 3px;
  margin-right: 3px;
}

.mx2 {
  margin-left: 6px;
  margin-right: 6px;
}

.mx3 {
  margin-left: 9px;
  margin-right: 9px;
}

.w-80 {
  width: 80%;
}

.w-10 {
  width: 10%;
}

.text-bold {
  font-weight: bold;
  color: #2c3e50;
}

.text-center {
  text-align: center;
}

.text-small {
  font-size: small;
}

.text-xsmall {
  font-size: x-small;
}

.text-xxsmall {
  font-size: xx-small;
}

.text-large {
  font-size: large;
}

.image-lvl-1 {
  border-top-color: gray;
}
.image-lvl-2 {
  border-top-color: green;
}
.image-lvl-3 {
  border-top-color: goldenrod;
}
.image-lvl-4 {
  border-top-color: orangered;
}
.image-lvl-5 {
  border-top-color: blue;
}
.image-lvl-6 {
  border-top-color: purple;
}
</style>
