<template>
  battleboard disband works!!!
  <div class="my3">
    <AvButton
      @click="props.gotoSibling('')"
      :size="'large'"
      :source="'ico_back_arrow'"
      :title="'Back to townhall'"
      :name="'Back'"
      :sound="Sounds.SoundButtonClickBack"
    ></AvButton>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, inject, ref } from "vue";
import AvButton from "../small/AvButton.vue";
import { Sounds } from "@/dtos/Enums";

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});
</script>
