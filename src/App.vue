<template>
  <div class="background-container">
    <div class="background-image-container">
      <img class="av-image" :src="avImage" />
    </div>
    <nav style="display: flex; justify-content: space-between">
      <div class="row">
        <router-link to="/" class="av-nav-item">Home</router-link>
        <router-link v-if="isLoggedIn" to="/character" class="av-nav-item"
          >| Character</router-link
        >
        <div v-if="!isLoggedIn" style="color: #859c71">
          * you will have to login first in order to see the rest of the content
        </div>
      </div>
      <div class="row">
        <router-link to="/rulebook" class="av-nav-item">Rulebook</router-link> |
        <AvMusic
          :avMusicType="avMusicType"
          :avMusicName="AvMusicName"
        ></AvMusic>
      </div>
    </nav>
    <AvSays :avText="avText"></AvSays>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from "vue";
import { MusicType } from "@/dtos/Enums";
import AvSays from "@/components/general/AvSays.vue";
import AvMusic from "@/components/general/AvMusic.vue";

const avText = ref(
  "Welcome adventurer! I will be your dungeonmaster and I will guide your story through the world of Av'el'Raan..."
);
const avImage = ref<string>(require("./assets/img_planet_2.png"));
const canPlaySounds = ref<string>("");
const isLoggedIn = ref<boolean>(false);

const avMusicType = ref<string>("");
const AvMusicName = ref<string>("");

const updateAvMusic = (type: MusicType, name: string) => {
  avMusicType.value = type;
  AvMusicName.value = `${name}.${Math.floor(Math.random() * 100000)}`;
};

const updateAvText = (newText: string) => {
  avText.value = newText;
};

const updateAvImage = (value: string) => {
  avImage.value = require(`./assets/${value}.png`);
};

const updateAvAuth = () => {
  const playerName = localStorage.getItem("playerName");
  const playerToken = localStorage.getItem("playerToken");

  if (playerName && playerToken) {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
};

provide("updateAvMusic", updateAvMusic);
provide("updateAvText", updateAvText);
provide("updateAvImage", updateAvImage);
provide("updateAvAuth", updateAvAuth);

onMounted(() => {
  localStorage.clear();

  if (
    confirm(
      "Do you allow Avelraan to sometimes play its theme music? Alternatively you can always right-click on the tab and select 'Mute site' if you get tired of it."
    )
  ) {
    localStorage.setItem("noMusic", "false");
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
  border-radius: 2px;
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
  justify-content: center;
  margin-top: 30px;
  align-items: center;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.row {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
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

.m-h-1 {
  margin-left: 3px;
  margin-right: 3px;
}
</style>
