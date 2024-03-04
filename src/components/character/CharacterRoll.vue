<template>
  <div class="column">
    <div class="text-large" style="text-align: center">
      <p v-if="entityLevel === 2" :class="getEntityLvlClass">
        You have been born... gifted
      </p>
      <p v-else-if="entityLevel === 3" :class="getEntityLvlClass">
        At your birth you were the one... chosen
      </p>
      <p v-else-if="entityLevel === 4" :class="getEntityLvlClass">
        You were born... a hero
      </p>
      <p v-else-if="entityLevel === 5" :class="getEntityLvlClass">
        Your birthright is of... an olympian
      </p>
      <p v-else-if="entityLevel === 6" :class="getEntityLvlClass">
        Among mortals you are... a planar
      </p>
      <p v-else :class="getEntityLvlClass">Character stub</p>
      <p :class="getEntityLvlClass">Entity level {{ entityLevel }}</p>
    </div>
    <div class="column">
      <p>Stat points {{ statPts }}</p>
      <p>Skill points {{ skillPts }}</p>
    </div>
    <div class="row my2">
      <AvButton
        @click="props.gotoSibling('')"
        :size="'large'"
        :source="`ico_back_arrow`"
        :title="'Go to Character'"
        :name="'Back'"
        :sound="'back'"
      ></AvButton>
      <AvButton
        @click="rollCharacter($event)"
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
import { defineProps, onMounted, inject, ref, computed } from "vue";
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

const getEntityLvlClass = computed((): string => {
  return `entity-lvl-${entityLevel.value}`;
});

const entityLevel = ref<number>(1);
const statPts = ref<number>(1);
const skillPts = ref<number>(1);
const id = ref<string>();

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

const rollCharacter = (event: Event): void => {
  if (!event.isTrusted) {
    console.warn("script detected");
    return;
  }

  HttpService.httpGetWithParams(
    "Character/CreateCharacter",
    `&stubId=${id.value}`
  )
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
      id.value = char.id;

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

<style scoped>
.entity-lvl-1 {
  color: #2c3e50;
  font-weight: bold;
}

.entity-lvl-2 {
  color: green;
  font-weight: bold;
}

.entity-lvl-3 {
  color: goldenrod;
  font-weight: bold;
}

.entity-lvl-4 {
  color: orangered;
  font-weight: bold;
}

.entity-lvl-5 {
  color: blue;
  font-weight: bold;
}

.entity-lvl-6 {
  color: purple;
  font-weight: bold;
}

p {
  margin: 10px 0px;
}
</style>
