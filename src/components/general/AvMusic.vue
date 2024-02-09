<template>
  <div @click="stopMusic" class="m-h-1 music">
    <i
      :title="songPlaying ? `Currently playing: ${nameOfSong} song` : ''"
      :class="musicClass"
    ></i>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, onMounted } from "vue";
import { Howl } from "howler";
import { MusicType } from "@/dtos/Enums";

let songPlaying = ref<Howl>(null);
const nameOfSong = ref<string>("");
const musicClass = ref<string>("");
const canPlayMusic = ref<boolean>(true);

const props = defineProps({
  avMusicType: {
    type: String,
    required: true,
  },
  avMusicName: {
    type: String,
    required: true,
  },
});

watch(
  () => props.avMusicName,
  () => {
    if (props.avMusicType === MusicType.Sound) {
      playSound();
    } else {
      playSong();
    }
  }
);

const playSong = (): void => {
  if (canPlayMusic.value === false) return;
  if (songPlaying.value) return;
  const name = props.avMusicName.split(".")[0];

  const audio: Howl = new Howl({
    src: require(`@/assets/song_${name}.wav`),
    volume: 0.2,
    loop: false,
  });

  audio.play();
  songPlaying.value = audio;
  nameOfSong.value = name;
  toggleMusicClass();

  audio.on("end", () => {
    songPlaying.value = null;
    nameOfSong.value = "";
    toggleMusicClass();
  });
};

const playSound = (): void => {
  const name = props.avMusicName.split(".")[0];

  const audio: Howl = new Howl({
    src: require(`@/assets/sound_${name}.mp3`),
    volume: 1,
    loop: false,
  });

  audio.play();
};

const stopMusic = (): void => {
  songPlaying.value.stop();
  songPlaying.value = null;
  toggleMusicClass();
};

const toggleMusicClass = () => {
  if (songPlaying.value) {
    musicClass.value = "fa-solid fa-music color-on";
  } else {
    musicClass.value = "fa-solid fa-music color-off";
  }
};

onMounted(() => {
  canPlayMusic.value = localStorage.getItem("noMusic") === "false";
  toggleMusicClass();
});
</script>

<style scoped>
.music {
  cursor: pointer;
}

.color-on {
  color: #1e3050;
  transition: color 0.3s ease;
}

.color-off {
  color: #b0b2b5;
  transition: color 0.7s ease;
}
</style>
