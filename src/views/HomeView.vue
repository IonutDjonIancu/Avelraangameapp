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
import HomeMain from "@/components/home/HomeMain.vue";
import HomeCreate from "@/components/home/HomeCreate.vue";
import HomeQr from "@/components/home/HomeQr.vue";
import HomeLogin from "@/components/home/HomeLogin.vue";
import { SetQrCode } from "../dtos/Dtos";
import { MusicType } from "@/dtos/Enums";

const updateAvImage: any = inject("updateAvImage");
const updateAvMusic: any = inject("updateAvMusic");
const updateAvSound: any = inject("updateAvSound");

const text = ref<string>("");
const qrCode = ref<string>("");
const playerName = ref<string>("");

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
      updateAvMusic("main_theme");
    } else if (number > 4 && number <= 7) {
      updateAvMusic("east_theme");
    } else {
      updateAvMusic("end_theme");
    }
  } else {
    updateAvMusic("main_theme");
    localStorage.setItem("hasPlayedMainTheme", "true");
  }
};

onMounted(() => {
  updateAvImage("img_planet_2");
  playRandomTheme();
  updateAvSound("page_flip", 0.8);
});
</script>
