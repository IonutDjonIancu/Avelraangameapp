<template>
  <div class="row">
    <AvButton
      @click="props.gotoSibling('create')"
      :size="'large'"
      :source="'ico_create_player'"
      :title="'Create new player account'"
      :name="'Create'"
      :sound="'click'"
    ></AvButton>
    <AvButton
      @click="props.gotoSibling('login')"
      :class="isDisabled === 'true' ? 'disabled' : ''"
      :size="'large'"
      :source="'ico_login_player'"
      :title="'Login to an existing player account'"
      :name="'Login'"
      :sound="'click'"
    ></AvButton>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue";
import AvButton from "../small/AvButton.vue";

const isDisabled = ref<string>("false");

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

onMounted(() => {
  const playerName: string = localStorage.getItem("playerName")!;
  const playerToken: string = localStorage.getItem("playerToken")!;

  if (playerName && playerToken) {
    isDisabled.value = "true";
  }
});
</script>

<style>
.disabled {
  pointer-events: none;
}
</style>
