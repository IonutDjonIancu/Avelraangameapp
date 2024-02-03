<template>
  <div class="column">
    <div style="text-align: center">
      <p style="font-weight: bold">Character stub</p>
      <p :class="entityLevel > 1 ? 'meta' : 'normal'">
        Entity level {{ entityLevel }}
      </p>
      <p>Stat points {{ statPts }}</p>
      <p>Skill points {{ skillPts }}</p>
    </div>
    <div class="row">
      <AvButton
        @click="saveCharacterStub"
        :size="'large'"
        :source="`ico_character_create_roll`"
        :title="'Continue to character traits'"
        :name="'Proceed'"
        :sound="'click'"
      ></AvButton>
      <AvButton
        @click="rollCharacter"
        :size="'large'"
        :source="`ico_d20_gold`"
        :title="'Roll for new character stats'"
        :name="'Roll'"
        :sound="'click'"
      ></AvButton>
      <AvButton
        @click="props.gotoSibling('')"
        :size="'large'"
        :source="`ico_back_arrow`"
        :title="'Go to Character'"
        :name="'Back'"
        :sound="'back'"
      ></AvButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, onMounted, inject, ref } from "vue";
import { HttpService } from "@/services/HttpService";
import { Howl } from "howler";
import AvButton from "@/components/small/AvButton.vue";
import { CharacterStub } from "@/dtos/Dtos";

const updateAvText: any = inject("updateAvText");
const emit = defineEmits(["on-character-stub-create"]);

const entityLevel = ref<number>(1);
const statPts = ref<number>(1);
const skillPts = ref<number>(1);

const characterCreateTheme: any = new Howl({
  src: require("@/assets/song_character_create.mp3"),
  volume: 0.2,
  loop: false,
});

const entityLevelUpSound: any = new Howl({
  src: require("@/assets/sound_sword_far.mp3"),
  volume: 1,
  loop: false,
});

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

const playCharacterCreateTheme = (): void => {
  if (
    localStorage.getItem("canPlaySounds") === "true" &&
    localStorage.getItem("isSongPlaying") === "false"
  ) {
    characterCreateTheme.play();
    localStorage.setItem("isSongPlaying", "true");
    characterCreateTheme.on("end", () => {
      localStorage.setItem("isSongPlaying", "false");
    });
  }
};

const rollCharacter = (): void => {
  const playerName = localStorage.getItem("playerName");
  const playerToken = localStorage.getItem("playerToken");

  HttpService.httpGet(
    `character/createcharacter?PlayerName=${playerName}&Token=${playerToken}`
  )
    .then((s) => s.json())
    .then((res: CharacterStub) => {
      if (
        res.entityLevel > 1 &&
        localStorage.getItem("canPlaySounds") === "true"
      ) {
        entityLevelUpSound.play();
      }

      entityLevel.value = res.entityLevel;
      statPts.value = res.statPoints;
      skillPts.value = res.skillPoints;
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

const saveCharacterStub = () => {
  const stub: CharacterStub = {
    entityLevel: entityLevel.value,
    statPoints: statPts.value,
    skillPoints: skillPts.value,
  };

  emit("on-character-stub-create", stub);

  props.gotoSibling("traits");
};

onMounted(() => {
  updateAvText(
    "Roll as many times for a character as you want, there is no limit.\n" +
      "This is a character stub, meaning it won't save until you proceed to the next phase to choose a race, culture and class.\n" +
      "You should refer to the rulebook to better understand what these numbers below mean, but in a nutshell:\n" +
      "For every 20 you roll you will have a higher entity level. A normal human is entity level 1 or Normal, everything beyond is a metahuman. Same applies to the other races.\n" +
      "Stat points and skill points will determine your overall starting abilities, the higher the better.\n" +
      "Once you create your character it will decide by itself where to distribute points based on what class you will choose."
  );

  playCharacterCreateTheme();
});
</script>
