<template>
  battleboard join works!!!
  <div class="my3">
    <AvButton
      @click="props.gotoSibling('')"
      :size="'large'"
      :source="'ico_back_arrow'"
      :title="'Back to townhall'"
      :name="'Back'"
      :sound="'back'"
    ></AvButton>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, inject, ref } from "vue";
import AvButton from "../small/AvButton.vue";

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});
</script>
