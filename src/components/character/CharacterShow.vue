<template>
  <div>character show works!</div>
</template>

<script setup lang="ts">
import { onMounted, defineProps } from "vue";
import { Character } from "@/dtos/Dtos";

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
  character: {
    type: Object as () => Character,
    required: true,
  },
});

onMounted(() => {
  console.log(props.character);
});
</script>
