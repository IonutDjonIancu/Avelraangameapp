<template>
  <div class="av-container">
    <HomeMain v-if="text === ''" :gotoSibling="gotoSibling"></HomeMain>
    <HomeCreate
      v-else-if="text === 'create'"
      :gotoSibling="gotoSibling"
      v-on:on-player-create="setQrCode"
    ></HomeCreate>
    <HomeQr
      v-else-if="text === 'code'"
      :gotoSibling="gotoSibling"
      :name="playerName"
      :qrCode="qrCode"
    ></HomeQr>
    <HomeLogin
      v-else-if="text === 'login'"
      :gotoSibling="gotoSibling"
    ></HomeLogin>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import { Howl } from "howler";
import HomeMain from "@/components/home/HomeMain.vue";
import HomeCreate from "@/components/home/HomeCreate.vue";
import HomeQr from "@/components/home/HomeQr.vue";
import HomeLogin from "@/components/home/HomeLogin.vue";
import { SetQrCode } from "../dtos/Dtos";
import { MusicType } from "@/dtos/Enums";

const updateAvImage: any = inject("updateAvImage");
const updateAvMusic: any = inject("updateAvMusic");

const canPlaySounds = ref<string>("");
const text = ref<string>("");
const qrCode = ref<string>("");
const playerName = ref<string>("");

const turnPage: any = new Howl({
  src: require("@/assets/sound_page_flip.mp3"),
  volume: 0.3,
  loop: false,
});

const setQrCode = (setQrCode: SetQrCode): void => {
  playerName.value = setQrCode.playerName;
  qrCode.value = setQrCode.qrCode;
};

const gotoSibling = (value: string): void => {
  text.value = value;
};

const playRandomTheme = (): void => {
  const hasPlayedMainTheme = localStorage.getItem("hasPlayedMainTheme");

  if (hasPlayedMainTheme === "true") {
    const number = Math.floor(Math.random() * 10 + 1);

    if (number <= 4) {
      updateAvMusic(MusicType.Song, "main_theme");
    } else if (number > 4 && number <= 7) {
      updateAvMusic(MusicType.Song, "east_theme");
    } else {
      updateAvMusic(MusicType.Song, "end_theme");
    }
  } else {
    updateAvMusic(MusicType.Song, "main_theme");
    localStorage.setItem("hasPlayedMainTheme", "true");
  }
};

const pageTurn = (): void => {
  if (canPlaySounds.value !== "true") return;
  turnPage.play();
};

onMounted(() => {
  updateAvImage("img_planet_2");
  playRandomTheme();

  if (canPlaySounds.value === "true") {
    pageTurn();
  }
});
</script>
