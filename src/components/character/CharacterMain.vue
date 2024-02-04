<template>
  <div class="column">
    <div class="characters">
      <AvCharacterButton
        v-for="character in characters"
        :key="character.identity.id"
        :character="character"
      ></AvCharacterButton>
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
import { onMounted, ref, defineProps, inject } from "vue";
import { HttpService } from "@/services/HttpService";
import { Character, Player } from "@/dtos/Dtos";
import AvButton from "@/components/small/AvButton.vue";
import AvCharacterButton from "@/components/small/AvCharacterButton.vue";

const updateAvText: any = inject("updateAvText");

const characters = ref<Character[]>([]);
const playerName = ref<string>("");
const playerToken = ref<string>("");

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

const getPlayer = (): void => {
  HttpService.httpGet(
    `metadata/getplayer?playerName=${playerName.value}&token=${playerToken.value}`
  )
    .then((s) => s.json())
    .then((res: Player) => {
      console.log(res);

      updateAvText(
        res.characters.length > 0
          ? `You have ${res.characters.length} playable characters out of 5 maximum alive.`
          : "Create some characters..."
      );

      characters.value = res.characters;
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

onMounted(() => {
  playerName.value = localStorage.getItem("playerName");
  playerToken.value = localStorage.getItem("playerToken");

  getPlayer();
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
