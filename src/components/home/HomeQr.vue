<template>
  <div class="code">
    <img :src="props.qrCode" />
    <p style="margin-bottom: 20px; font-weight: bold">
      {{ props.name }}
    </p>
    <AvButton
      @click="props.gotoSibling('login')"
      :size="'large'"
      :source="'ico_login_player'"
      :title="'Continue to login'"
      :name="'Login'"
      :sound="Sounds.SoundButtonClick"
    ></AvButton>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, inject } from "vue";
import AvButton from "@/components/small/AvButton.vue";
import { Sounds } from "@/dtos/Enums";

const updateAvText: any = inject("updateAvText");

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
  name: {
    type: String,
  },
  qrCode: {
    type: String,
  },
});

onMounted(() => {
  updateAvText("Scan the qr code with the Google authenticator app.");
});
</script>

<style scoped>
.code {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
