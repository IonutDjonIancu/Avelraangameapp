<template>
  <div>
    <img :title="title" :src="getImage" :class="getEntityLevelBorderClass()" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

const getImage = computed((): string => {
  return require(`@/assets/ico_${props.race.toLowerCase()}_${props.icon}.png`);
});

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  race: {
    type: String,
    required: true,
  },
  icon: {
    type: Number,
    required: true,
  },
  entityLevel: {
    type: Number,
    required: true,
  },
});

const getEntityLevelBorderClass = () => {
  return `image image-lvl-${props.entityLevel}`;
};
</script>

<style scoped>
.image {
  height: 40px;
  width: 40px;
  border-top-width: 3px;
  border-top-style: solid;
  border-radius: 3px;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.3s;
}

.image:hover {
  opacity: 1;
  transition: 0.1s;
}
</style>
