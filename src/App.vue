<template>
  <div class="background-container">
    <div class="background-image-container">
      <img class="av-image" :src="avImage" />
    </div>
    <nav style="display: flex; justify-content: space-between">
      <!-- LEFT SIDE CONTENTS -->
      <div class="row">
        <router-link to="/" class="av-nav-item">Home</router-link>
        <router-link v-if="isLoggedIn" to="/character" class="av-nav-item"
          >| Characters</router-link
        >
        <router-link v-if="isLoggedIn" to="/market" class="av-nav-item"
          >| Marketplace</router-link
        >
        <router-link v-if="isLoggedIn" to="/townhall" class="av-nav-item"
          >| Townhall</router-link
        >
        <div v-if="!isLoggedIn" style="color: #859c71">
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
const isLoggedIn = ref<boolean>(false);

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

const updateAvAuth = () => {
  const playerName = localStorage.getItem("playerName");
  const playerToken = localStorage.getItem("playerToken");

  if (playerName && playerToken) {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
};

const seePlayer = () => {
  console.log(store.state);
};

provide("updateAvMusic", updateAvMusic);
provide("updateAvSound", updateAvSound);
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
  width: 100%;
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

.m-y-1 {
  margin-top: 3px;
  margin-bottom: 3px;
}

.m-y-2 {
  margin-top: 6px;
  margin-bottom: 6px;
}

.m-x-1 {
  margin-left: 3px;
  margin-right: 3px;
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

.text-small {
  font-size: small;
}

.text-xsmall {
  font-size: x-small;
}
</style>
