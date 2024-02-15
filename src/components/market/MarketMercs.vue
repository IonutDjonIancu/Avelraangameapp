<template>
  <div class="column">
    <div class="m-y-2">Module will be added in a future release.</div>
    <AvButton
      @click="props.gotoSibling('')"
      :size="'large'"
      :source="'ico_back_arrow'"
      :title="'Back to market'"
      :name="'Back'"
      :sound="'back'"
    ></AvButton>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, inject } from "vue";
import AvButton from "@/components/small/AvButton.vue";

const updateAvText: any = inject("updateAvText");

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

onMounted(() => {
  updateAvText("This section will be added in a future release, don't worry.");
});
</script>
