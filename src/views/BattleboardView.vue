<template>
  <div class="av-container">
    <div class="column">
      <div v-if="text === ''" class="row row-options">
        <AvButton
          @click="gotoSibling('create')"
          :size="'large'"
          :source="'ico_party_create'"
          :title="'Create a fellowship'"
          :name="'Create'"
          :sound="Sounds.SoundButtonClick"
        ></AvButton>
        <AvButton
          @click="gotoSibling('join')"
          :size="'large'"
          :source="'ico_party_join'"
          :title="'Join a fellowship'"
          :name="'Join'"
          :sound="Sounds.SoundButtonClick"
        ></AvButton>
        <AvButton
          @click="gotoSibling('manage')"
          :size="'large'"
          :source="'ico_party_view'"
          :title="'View fellowships'"
          :name="'View'"
          :sound="Sounds.SoundButtonClick"
        ></AvButton>
      </div>
      <BattleboardCreate
        v-if="text === 'create'"
        :gotoSibling="gotoSibling"
      ></BattleboardCreate>
      <BattleboardJoin
        v-if="text === 'join'"
        :gotoSibling="gotoSibling"
      ></BattleboardJoin>
      <BattleboardManage
        v-if="text === 'manage'"
        :gotoSibling="gotoSibling"
      ></BattleboardManage>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import BattleboardCreate from "@/components/battleboard/BattleboardCreate.vue";
import BattleboardJoin from "@/components/battleboard/BattleboardJoin.vue";
import BattleboardManage from "@/components/battleboard/BattleboardManage.vue";
import AvButton from "@/components/small/AvButton.vue";
import { Sounds } from "@/dtos/Enums";

const updateAvImage: any = inject("updateAvImage");
const updateAvSound: any = inject("updateAvSound");
const updateAvText: any = inject("updateAvText");

const text = ref<string>("");

const gotoSibling = (value: string): void => {
  text.value = value;
};

onMounted(() => {
  updateAvImage("img_party");
  updateAvSound(Sounds.SoundParty, 0.4);
  updateAvText("You are here to create a warparty.");
});
</script>

<style scoped>
.row-options {
  align-items: center;
  justify-content: center;
}
</style>
