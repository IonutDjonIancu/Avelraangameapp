<template>
  <div class="column">
    <div v-if="characters" class="column">
      <p class="text-xsmall">
        {{
          `You have ${characters.length} out of 5 maximum alive playable characters.`
        }}
      </p>
      <div class="characters">
        <AvCharacterCard
          v-on:on-card-click="setCharacterId(character.identity.id)"
          v-for="(character, index) in characters"
          :key="index"
          :character="character"
        ></AvCharacterCard>
      </div>
    </div>
    <div>
      <AvButton
        @click="goToRoll()"
        :size="'large'"
        :source="`ico_character_roll`"
        :title="'Create a new character'"
        :name="'Create'"
        :sound="'click'"
      ></AvButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, inject, onMounted } from "vue";
import { useStore } from "vuex";
import { Character, Player } from "@/dtos/Dtos";
import AvButton from "@/components/small/AvButton.vue";
import AvCharacterCard from "@/components/small/AvCharacterCard.vue";
import { StoreData } from "@/dtos/Enums";
import { HttpService } from "@/services/HttpService";

const store = useStore();
const playerProfile = computed<Player | null>(() => store.state.playerProfile);
const characters = computed<Character[]>(() => playerProfile.value.characters);

const updateAvText: any = inject("updateAvText");

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

const setCharacterId = (charId: string): void => {
  store.commit(StoreData.SetCharacterId, charId);
  props.gotoSibling("sheet");
};

const goToRoll = (): void => {
  HttpService.httpGet("Character/Character")
    .then((s) => {
      if (s.ok) {
        return;
      }
    })
    .then(() => {
      props.gotoSibling("roll");
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

onMounted(() => {
  updateAvText(
    characters.value
      ? `You come looking for someone, whom do you choose?`
      : "Create some characters..."
  );
});
</script>

<style scoped>
.characters {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-bottom: 20px;
}
</style>
