<template>
  <div class="row">
    <AvButton
      @click="props.gotoSibling('create')"
      :class="playerProfile ? 'disabled' : ''"
      :size="'large'"
      :source="'ico_create_player'"
      :title="'Create new player account'"
      :name="'Create'"
      :sound="Sounds.SoundButtonClick"
    ></AvButton>
    <AvButton
      @click="props.gotoSibling('login')"
      :class="playerProfile ? 'disabled' : ''"
      :size="'large'"
      :source="'ico_login_player'"
      :title="'Login to an existing player account'"
      :name="'Login'"
      :sound="Sounds.SoundButtonClick"
    ></AvButton>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useStore } from "vuex";
import AvButton from "../small/AvButton.vue";
import { Player } from "@/dtos/Dtos";
import { Sounds } from "@/dtos/Enums";

const store = useStore();
const playerProfile = computed<Player | null>(
  (): Player => store.state.playerProfile
);

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});
</script>

<style>
.disabled {
  pointer-events: none;
}
</style>
