<template>
  <div></div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, onMounted } from "vue";
import { Howl } from "howler";

const canPlayMusic = ref<boolean>(true);
let songPlaying = ref<Howl>(null);

const props = defineProps({
  avSoundName: {
    type: String,
    required: true,
  },
  avSoundVolume: {
    type: Number,
    required: true,
  },
});

watch(
  () => props.avSoundName,
  () => {
    playSound();
  }
);

const playSound = (): void => {
  if (canPlayMusic.value === false) return;

  const name = props.avSoundName.split(".")[0];
  const audio: Howl = new Howl({
    src: require(`@/assets/${name}.mp3`),
    volume: props.avSoundVolume,
    loop: false,
  });

  audio.play();
  songPlaying.value = audio;
};

onMounted(() => {
  canPlayMusic.value = localStorage.getItem("canPlayMusic") === "true";
});
</script>
