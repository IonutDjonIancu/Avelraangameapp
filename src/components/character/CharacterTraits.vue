<template>
  <div v-if="races" class="column">
    <div class="traits">
      <!-- labels -->
      <div class="traits-labels">
        <label
          title="Your race will both help you and gimp you along the way, every race has its special perks."
          for="races"
          class="av-label"
          >Race</label
        >
        <label
          title="The culture in which you have grown, and where you can thrive as a member, every culture gives some bonuses."
          for="cultures"
          class="av-label"
          >Culture</label
        >
        <label
          title="The tradition from which you descend, martial rolls with a d20, common rolls with a d100."
          for="traditions"
          class="av-label"
          >Tradition</label
        >
        <label
          title="The path which your character has chosen during his first years of life. It will influence how your character will spend its starting points."
          for="classes"
          class="av-label"
          >Class</label
        >
      </div>

      <!-- selects -->
      <div>
        <div class="select">
          <select id="races" v-model="race">
            <option disabled value="">choose a race</option>
            <option v-for="(value, key) in races" :key="key" :value="value">
              {{ value }}
            </option>
          </select>
        </div>
        <div class="select">
          <select :disabled="race.length === 0" id="cultures" v-model="culture">
            <option value="">choose a culture</option>
            <option
              v-for="(value, key) in getCultures()"
              :key="key"
              :value="value"
            >
              {{ value }}
            </option>
          </select>
        </div>
        <div class="select">
          <select
            :disabled="culture.length === 0"
            id="traditions"
            v-model="tradition"
          >
            <option value="">choose a tradition</option>
            <option
              v-for="(value, key) in traditions"
              :key="key"
              :value="value"
            >
              {{ value }}
            </option>
          </select>
        </div>
        <div class="select">
          <select
            :disabled="tradition.length === 0"
            id="classes"
            v-model="classor"
          >
            <option value="">choose a class</option>
            <option v-for="(value, key) in classes" :key="key" :value="value">
              {{ value }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="race.length > 0" class="images">
      <img
        @click="selectImage(index)"
        :key="index"
        v-for="(src, index) in getImages()"
        :src="src"
        :alt="src"
        :style="{
          border: selectedImageIndex === index ? '3px solid #859c71' : 'none',
        }"
        class="image"
      />
    </div>
    <div class="buttons">
      <AvButton
        @click="props.gotoSibling('')"
        :size="'large'"
        :source="`ico_back_arrow`"
        :title="'Go to Character'"
        :name="'Back'"
        :sound="Sounds.SoundButtonClickBack"
      ></AvButton>
      <div :class="classor.length === 0 ? 'disabled' : ''">
        <AvButton
          @click="saveCharacter"
          :size="'large'"
          :source="`ico_character_create_traits`"
          :title="'Proceed'"
          :name="'Proceed'"
          :sound="Sounds.SoundButtonClick"
        ></AvButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, inject, computed } from "vue";
import { useStore } from "vuex";
import AvButton from "@/components/small/AvButton.vue";
import { HttpService } from "@/services/HttpService";
import {
  CharacterCultures,
  CharacterStub,
  CharacterTraits,
  CharacterRacialTraits,
  Character,
} from "@/dtos/Dtos";
import { Sounds, StoreData } from "@/dtos/Enums";

const updateAvText: any = inject("updateAvText");

const store = useStore();
const characterStub = computed<CharacterStub | null>(
  () => store.state.characterStub
);

const races = ref<string[]>(null);
const race = ref<string>("");
const cultures = ref<CharacterCultures>();
const culture = ref<string>("");
const traditions = ref<string[]>();
const tradition = ref<string>("");
const classes = ref<string[]>();
const classor = ref<string>("");
const selectedImageIndex = ref<number>(null);
const icon = ref<number>(0);

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

const getTraits = (): void => {
  HttpService.httpGetMetadata("Metadata/GetTraits")
    .then((s) => {
      if (s.ok) {
        return s.json();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((res: CharacterTraits) => {
      races.value = res.races;
      cultures.value = res.cultures;
      traditions.value = res.traditions;
      classes.value = res.classes;
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

const getCultures = (): string[] => {
  if (race.value === "Human") {
    return cultures.value.human;
  } else if (race.value === "Elf") {
    return cultures.value.elf;
  } else if (race.value === "Dwarf") {
    return cultures.value.dwarf;
  } else if (race.value === "Orc") {
    return cultures.value.orc;
  } else {
    return ["select race first"];
  }
};

const getImages = (): string[] => {
  if (race.value.length === 0) {
    return [];
  }

  let arr = [];
  for (let i = 1; i <= 3; i++) {
    arr.push(require(`@/assets/ico_${race.value.toLowerCase()}_${i}.png`));
  }

  return arr;
};

const selectImage = (index: number): void => {
  icon.value = index + 1;
  selectedImageIndex.value = index;
};

const saveCharacter = (): void => {
  const characterTraits: CharacterRacialTraits = {
    race: race.value,
    culture: culture.value,
    tradition: tradition.value,
    class: classor.value,
    icon: icon.value > 0 ? icon.value : 1,
  };

  HttpService.httpPost(`Character/SaveCharacter`, characterTraits)
    .then((s) => {
      if (s.ok) {
        return s.json();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((char: Character) => {
      store.commit(StoreData.CreateCharacter, char);
      store.commit(StoreData.SetCharacterId, char.identity.id);
      props.gotoSibling("finalize");
    })
    .catch((err) => {
      updateAvText(err.message);
    });
};

onMounted(() => {
  updateAvText(
    `You have entity level ${characterStub.value.entityLevel}, stat pts. ${characterStub.value.statPoints}, and skill pts. ${characterStub.value.skillPoints}.\n` +
      "Your character will decide how to best spend these points after you choose the below traits. This will determine your birthright and your starting values for your skills.\n" +
      "There is more information on character traits in the rulebook, but there is also a short description if you hover over race, culture, tradition or class."
  );

  getTraits();
});
</script>

<style scoped>
.traits {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.images {
  margin-bottom: 10px;
}

.image {
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 3px;
  cursor: pointer;
}

.traits-labels {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-right: 5px;
}

.select {
  margin-bottom: 5px;
}

.buttons {
  display: flex;
  flex-direction: row;
}
</style>
