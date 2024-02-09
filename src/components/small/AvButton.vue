<template>
  <div @click="playSound(props.sound)" class="av-btn" tabindex="-1">
    <img
      :class="`av-icon-${props.size}`"
      :src="getComputedImage"
      :title="props.title"
    />
    <p>
      {{
        props.name.length > 7 ? props.name.substring(0, 5) + "..." : props.name
      }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, inject } from "vue";

const updateAvSound: any = inject("updateAvSound");

const getComputedImage = computed((): string => {
  return require(`@/assets/${props.source}.png`);
});

const props = defineProps({
  size: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sound: {
    type: String,
    required: true,
  },
});

const playSound = (value: string): void => {
  if (value === "click") {
    updateAvSound("button_click", 1);
  } else {
    updateAvSound("button_click_back", 1);
  }
};
</script>

<style scoped>
p {
  margin: 5px;
  text-align: center;
}

.av-btn {
  width: 60px;
  font-size: xx-small;
  color: gray;
  background-color: black;
  border-width: 3px;
  border-style: solid;
  border-color: black;
  border-radius: 5px;
  opacity: 0.6;
  transition: opacity 0.1s; /* Add a transition for smooth opacity change */
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 2px;
  margin-right: 2px;
}

.av-icon-small {
  width: 30px;
  height: auto;
}

.av-icon-large {
  width: 60px;
  height: auto;
}

.av-btn:hover,
.av-icon-small:hover,
.av-icon-large:hover {
  opacity: 1;
  color: whitesmoke;
}
</style>
