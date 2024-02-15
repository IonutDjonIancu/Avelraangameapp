<template>
  <div class="column">
    <div v-if="characters" class="column">
      <p class="text-xsmall">
        {{
          `You have ${characters.length} out of 5 maximum alive playable characters.`
        }}
      </p>
      <div class="characters">
        <AvCharacterButton
          @click="setCharacterId(character.identity.id)"
          v-for="(character, index) in characters"
          :key="index"
          :character="character"
        ></AvCharacterButton>
      </div>
    </div>
    <div>
      <AvButton
        @click="props.gotoSibling('roll')"
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
import AvCharacterButton from "@/components/small/AvCharacterButton.vue";
import { StoreData } from "@/dtos/Enums";

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
