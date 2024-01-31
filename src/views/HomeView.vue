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

const updateAvImage: any = inject("updateAvImage");

const canPlaySounds = ref<string>("");
const text = ref<string>("");
const qrCode = ref<string>("");
const playerName = ref<string>("");

const mainTheme: any = new Howl({
  src: require("@/assets/song_main_theme.wav"),
  volume: 0.2,
  loop: false,
});

const eastTheme: any = new Howl({
  src: require("@/assets/song_east_theme.wav"),
  volume: 0.2,
  loop: false,
});

const endTheme: any = new Howl({
  src: require("@/assets/song_end_theme.wav"),
  volume: 0.2,
  loop: false,
});

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

const playMainTheme = (): void => {
  mainTheme.play();
  localStorage.setItem("isSongPlaying", "true");

  mainTheme.on("end", () => {
    localStorage.setItem("isSongPlaying", "false");
  });
};

const playRandomTheme = (): void => {
  const number = Math.floor(Math.random() * 10 + 1);

  if (number <= 4) {
    playMainTheme();
  } else if (number > 4 && number <= 7) {
    eastTheme.play();
    eastTheme.on("end", () => {
      localStorage.setItem("isSongPlaying", "false");
    });
  } else {
    endTheme.play();
    endTheme.on("end", () => {
      localStorage.setItem("isSongPlaying", "false");
    });
  }

  localStorage.setItem("isSongPlaying", "true");
};

const pageTurn = (): void => {
  if (canPlaySounds.value !== "true") return;
  turnPage.play();
};

onMounted(() => {
  canPlaySounds.value = localStorage.getItem("canPlaySounds")!;
  updateAvImage("img_planet");

  if (!canPlaySounds.value) {
    if (
      confirm(
        "Do you allow Avelraan to sometimes play its theme music? Alternatively you can always right-click on the tab and select 'Mute site' if you get tired of it."
      )
    ) {
      localStorage.setItem("canPlaySounds", "true");
      playMainTheme();
    } else {
      localStorage.setItem("canPlaySounds", "false");
    }
  }

  if (
    canPlaySounds.value === "true" &&
    (localStorage.getItem("isSongPlaying") === "false" ||
      !localStorage.getItem("isSongPlaying"))
  ) {
    playRandomTheme();
  }

  if (canPlaySounds.value === "true") {
    pageTurn();
  }
});
</script>
