<template>
  <div class="av-container">
    <div class="column">
      <div v-if="text === ''" class="row row-options">
        <AvButton
          @click="gotoSibling('worth')"
          :size="'large'"
          :source="'ico_char_worth'"
          :title="'Townhall of heroes and their worth'"
          :name="'Heroes'"
          :sound="Sounds.SoundButtonClick"
        ></AvButton>
        <AvButton
          @click="gotoSibling('wealth')"
          :size="'large'"
          :source="'ico_char_wealth'"
          :title="'Townhall of nobles and their wealth'"
          :name="'Nobles'"
          :sound="Sounds.SoundButtonClick"
        ></AvButton>
      </div>
      <TownhallWealth
        v-if="text === 'wealth'"
        :gotoSibling="gotoSibling"
      ></TownhallWealth>
      <TownhallWorth
        v-if="text === 'worth'"
        :gotoSibling="gotoSibling"
      ></TownhallWorth>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import TownhallWealth from "@/components/townhall/TownhallWealth.vue";
import TownhallWorth from "@/components/townhall/TownhallWorth.vue";
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
  updateAvImage("img_townhall");
  updateAvSound(Sounds.SoundTownhall, 0.2);
  updateAvText("Behold the statues of those worthy of tales and songs.");
});
</script>
