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
        @click="props.gotoSibling('')"
        :size="'large'"
        :source="`ico_back_arrow`"
        :title="'Go to Character'"
        :name="'Back'"
        :sound="'back'"
      ></AvButton>
      <AvButton
        @click="rollCharacter"
        :size="'large'"
        :source="`ico_d20_gold`"
        :title="'Roll for new character stats'"
        :name="'Roll'"
        :sound="'click'"
      ></AvButton>
      <div :class="entityLevel + statPts + skillPts < 10 ? 'disabled' : ''">
        <AvButton
          @click="props.gotoSibling('traits')"
          :size="'large'"
          :source="`ico_character_create_roll`"
          :title="'Continue to character traits'"
          :name="'Proceed'"
          :sound="'click'"
        ></AvButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, inject, ref } from "vue";
import { useStore } from "vuex";
import { HttpService } from "@/services/HttpService";
import AvButton from "@/components/small/AvButton.vue";
import { CharacterStub } from "@/dtos/Dtos";
import { StoreData } from "@/dtos/Enums";

const updateAvText: any = inject("updateAvText");
const updateAvImage: any = inject("updateAvImage");
const updateAvMusic: any = inject("updateAvMusic");
const updateAvSound: any = inject("updateAvSound");

const store = useStore();

const entityLevel = ref<number>(1);
const statPts = ref<number>(1);
const skillPts = ref<number>(1);

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

const rollCharacter = (): void => {
  HttpService.httpGet(`Character/CreateCharacter`)
    .then((s) => {
      if (s.ok) {
        return s.json();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((char: CharacterStub) => {
      if (char.entityLevel > 1) {
        updateAvSound("sword_far", 1);
      }

      entityLevel.value = char.entityLevel;
      statPts.value = char.statPoints;
      skillPts.value = char.skillPoints;

      store.commit(StoreData.SetCharacterStub, char);
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

onMounted(() => {
  updateAvImage("img_character");
  updateAvText(
    "Roll as many times for a character as you want, there is no limit.\n" +
      "This is a character stub, meaning it won't save until you proceed to the next phase to choose a race, culture and class.\n" +
      "You should refer to the rulebook to better understand what these numbers below mean, but in a nutshell:\n" +
      "For every 20 you roll you will have a higher entity level. A normal human is entity level 1 or Normal, everything beyond is a metahuman. Same applies to the other races.\n" +
      "Stat points and skill points will determine your overall starting abilities, the higher the better.\n" +
      "Once you create your character it will decide by itself where to distribute points based on what class you will choose."
  );
  updateAvMusic("character_create");
});
</script>
