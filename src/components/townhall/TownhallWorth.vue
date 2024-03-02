<template>
  <div class="column main-col-center">
    <p class="av-label">Characters' worth</p>
    <div v-if="characters" class="column col-start">
      <div
        class="row row-no-margin"
        v-for="(character, index) in characters"
        :key="index"
      >
        <div class="column col-center">
          <AvCharacterCardSmall
            :title="character.characterName"
            :race="character.race"
            :icon="character.icon"
            :entity-level="character.entityLevel"
          ></AvCharacterCardSmall>
        </div>
        <div class="column col-center">
          <div>
            <span class="text-bold">{{ character.worth }}</span>
            {{ character.characterName }} of
            {{ character.playerName }}
          </div>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, inject, ref } from "vue";
import { HttpService } from "@/services/HttpService";
import AvButton from "@/components/small/AvButton.vue";
import AvCharacterCardSmall from "@/components/small/AvCharacterCardSmall.vue";
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

.col-center {
  justify-content: center;
  margin-left: 3px;
  margin-right: 3px;
}
.main-col-center {
  align-items: center;
}

.col-start {
  align-items: flex-start;
}

.row-no-margin {
  margin-bottom: 0px;
}

p {
  margin-bottom: 20px;
}
</style>
