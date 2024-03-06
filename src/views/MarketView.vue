<template>
  <div class="av-container">
    <div class="column">
      <div v-if="text === ''" class="row row-options">
        <AvButton
          @click="gotoSibling('trade')"
          :size="'large'"
          :source="'ico_market'"
          :title="'Go to marketplace'"
          :name="'Market'"
          :sound="Sounds.SoundButtonClick"
        ></AvButton>
        <AvButton
          @click="gotoSibling('mercs')"
          :size="'large'"
          :source="'ico_mercs'"
          :title="'Hire mercenaries'"
          :name="'Mercs'"
          :sound="Sounds.SoundButtonClick"
        ></AvButton>
        <AvButton
          @click="gotoSibling('quests')"
          :size="'large'"
          :source="'ico_quests'"
          :title="'Look for quests'"
          :name="'Quests'"
          :sound="Sounds.SoundButtonClick"
        ></AvButton>
      </div>
    </div>
    <div class="column">
      <MarketMain
        v-if="text === 'trade'"
        :gotoSibling="gotoSibling"
      ></MarketMain>
      <MarketMercs
        v-if="text === 'mercs'"
        :gotoSibling="gotoSibling"
      ></MarketMercs>
      <MarketQuests
        v-if="text === 'quests'"
        :gotoSibling="gotoSibling"
      ></MarketQuests>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import MarketMain from "@/components/market/MarketMain.vue";
import MarketMercs from "@/components/market/MarketMercs.vue";
import MarketQuests from "@/components/market/MarketQuests.vue";
import AvButton from "@/components/small/AvButton.vue";
import { Sounds } from "@/dtos/Enums";

const text = ref<string>("");

const updateAvImage: any = inject("updateAvImage");
const updateAvSound: any = inject("updateAvSound");
const updateAvText: any = inject("updateAvText");

const gotoSibling = (value: string) => {
  text.value = value;
};

onMounted(() => {
  updateAvImage("img_market");
  updateAvSound("market", 0.8);
  updateAvText("You walk down the busy, muddy, streets of the known lands.");
});
</script>

<style scoped>
.row-options {
  align-items: center;
  justify-content: center;
}
</style>
