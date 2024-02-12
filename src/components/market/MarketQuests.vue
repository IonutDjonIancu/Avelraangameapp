<template>
  market quests works!!
  <AvButton
    @click="gotoSibling('')"
    :size="'large'"
    :source="'ico_back_arrow'"
    :title="'Back to market'"
    :name="'Back'"
    :sound="'back'"
  ></AvButton>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import AvButton from "@/components/small/AvButton.vue";

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});
</script>
