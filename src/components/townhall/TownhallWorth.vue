<template>
  <div class="column">
    <div v-if="characters" class="column">
      <p class="av-label">Characters' worth</p>
      <div
        :key="index"
        v-for="(char, index) in characters"
        class="row row-center"
      >
        <img :src="setImage(char.race, char.icon)" class="m-x-1" />
        <span title="character worth" class="m-x-1 text-bold">{{
          char.worth
        }}</span>
        <span title="character name" class="m-x-1">{{
          char.characterName
        }}</span>
        <span title="player" class="m-x-1">{{ char.playerName }}</span>
      </div>
    </div>
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
import { HttpService } from "@/services/HttpService";
import AvButton from "@/components/small/AvButton.vue";
import { CharacterLadder, Ladder } from "@/dtos/Dtos";

const updateAvText: any = inject("updateAvText");
const characters = ref<CharacterLadder[]>(null);

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

const getLadder = () => {
  HttpService.httpGet("Gameplay/GetLadder")
    .then((s) => {
      if (s.ok) {
        return s.json();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((ladder: Ladder) => {
      characters.value = ladder.charactersByWorth.slice(0, 6);
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

const setImage = (race: string, icon: number): string => {
  return require(`@/assets/ico_${race.toLowerCase()}_${icon}.png`);
};

onMounted(() => {
  updateAvText(
    "The known men of the realm based on their worth, their achievements and their renown."
  );
  getLadder();
});
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
  border-radius: 30px;
}
</style>
