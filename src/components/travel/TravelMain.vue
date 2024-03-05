<template>
  <div class="column">
    <div v-if="characters && !isMapBeingHovered" class="column">
      <!-- CHARACTERS -->
      <div class="row">
        <div class="column">
          <div class="row">
            <div
              :class="setClass(index)"
              :key="index"
              v-for="(character, index) in characters"
            >
              <AvCharacterCard
                :character="character"
                :title="'is going to travel'"
                :show-class="false"
                @on-card-click="selectCharacter(index)"
              ></AvCharacterCard>
            </div>
          </div>
        </div>
      </div>
      <!-- CHARACTER LOCATION -->
      <div v-if="character" class="column my2">
        <span class="text-xsmall my1">Character is at ...</span>
        <div class="row">
          <!-- Region -->
          <span class="mx1 row">
            <span>
              {{ character.status.position.region }}
            </span>
            <img
              :src="
                getMapSource(character.status.position.region.toLowerCase())
              "
              class="mx1"
            />
          </span>
          <!-- Subregion -->
          <span class="mx1 row">
            <span>
              {{ character.status.position.subregion }}
            </span>
            <img
              :src="
                getMapSource(character.status.position.subregion.toLowerCase())
              "
              class="mx1"
            />
          </span>
          <!-- Land -->
          <span class="mx1 row">
            <span>
              {{ character.status.position.land }}
            </span>
            <img
              :src="getMapSource(character.status.position.land.toLowerCase())"
              class="mx1"
            />
          </span>
          <!-- Location -->
          <span class="mx1 row">
            <span>
              {{ character.status.position.location }}
            </span>
            <img
              :src="
                getMapSource(character.status.position.location.toLowerCase())
              "
              class="mx1"
            />
          </span>
        </div>
      </div>
      <!-- CHARACTER DESTINATION -->
      <div v-if="character" class="column my2">
        <span class="text-xsmall my1">... and is travelling to</span>
        <div class="row">
          <!-- Region -->
          <span class="mx1">
            <select
              v-if="!chosenRegion"
              :disabled="!character"
              id="region"
              v-model="chosenRegion"
            >
              <option value="">select region</option>
              <option
                v-for="(region, index) in getRegions"
                @click="chosenRegion = region"
                :key="index"
                :value="region"
              >
                {{ region }}
              </option>
            </select>
            <span v-else>
              {{ chosenRegion }}
              <img :src="getMapSource(chosenRegion)" class="mx0" />
            </span>
          </span>
          <!-- Subregion -->
          <span class="mx1">
            <select
              v-if="!chosenSubregion"
              :disabled="!chosenRegion"
              id="subregion"
              v-model="chosenSubregion"
            >
              <option value="">select subregion</option>
              <option
                v-for="(subregion, index) in getSubregions"
                @click="chosenSubregion = subregion"
                :key="index"
                :value="subregion"
              >
                {{ subregion }}
              </option>
            </select>
            <span v-else>
              {{ chosenSubregion }}
              <img
                :src="getMapSource(chosenSubregion.toLowerCase())"
                class="mx0"
              />
            </span>
          </span>
          <!-- Land -->
          <span class="mx1">
            <select
              v-if="!chosenLand"
              :disabled="!chosenSubregion"
              id="land"
              v-model="chosenLand"
            >
              <option value="">select land</option>
              <option
                v-for="(land, index) in getLands"
                @click="chosenLand = land"
                :key="index"
                :value="land"
              >
                {{ land }}
              </option>
            </select>
            <span v-else>
              {{ chosenLand }}
              <img :src="getMapSource(chosenLand.toLowerCase())" class="mx0" />
            </span>
          </span>
          <!-- Location -->
          <span class="mx1">
            <select
              v-if="!chosenLocation"
              :disabled="!chosenLand"
              id="location"
              v-model="chosenLocation"
            >
              <option value="">select location</option>
              <option
                v-for="(location, index) in getLocations"
                @click="chosenLocation = location"
                :key="index"
                :value="location"
                :title="
                  allLocations.find((s) => s.name === location).description
                "
              >
                {{ location }}
              </option>
            </select>
            <span
              v-else
              :title="
                allLocations.find((s) => s.name === chosenLocation).description
              "
              class="question"
            >
              {{ chosenLocation }}
              <img
                :src="getMapSource(chosenLocation.toLowerCase())"
                class="mx0"
              />
            </span>
          </span>
          <div class="mx1">
            <i
              @click="clearLocation()"
              title="clear location"
              class="fa-solid fa-xl fa-xmark"
              style="color: #be2727"
            ></i>
          </div>
          <div class="mx1">
            <i
              @click="clearDestination()"
              title="reset destination"
              class="fa-solid fa-rotate-right fa-lg fa-flip-horizontal"
            ></i>
          </div>
        </div>
      </div>
      <!-- SUBMIT -->
      <div v-if="chosenLocation !== ''" class="column my3">
        <div class="row text-small">
          They say it takes about
          {{
            allLocations.find((s) => s.name === chosenLocation)
              .travelCostFromArada
          }}
          provisions for a man to reach {{ chosenLocation }} (you and your men
          have a total of {{ calculateProvisions() }})
        </div>
        <div class="my3">
          <AvButton
            @click="travel()"
            :size="'large'"
            :source="'ico_travel'"
            :title="'Travel'"
            :name="'Travel'"
            :sound="'click'"
          ></AvButton>
        </div>
      </div>
    </div>
    <div v-else class="my3">You have no characters that can travel.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";
import { useStore } from "vuex";
import {
  Character,
  Player,
  Location,
  CharacterTravel,
  CharacterTravelResponse,
} from "@/dtos/Dtos";
import AvCharacterCard from "@/components/small/AvCharacterCard.vue";
import AvButton from "@/components/small/AvButton.vue";
import { HttpService } from "@/services/HttpService";
import { StoreData } from "@/dtos/Enums";

const updateAvText: any = inject("updateAvText");
const updateAvMusic: any = inject("updateAvMusic");

const store = useStore();
const playerProfile = computed<Player | null>(() => store.state.playerProfile);

const characters = computed<Character[]>(() => playerProfile.value.characters);

const character = computed<Character>(() => getSelectedCharacter());

const getRegions = computed<Set<string> | null>(() => regions.value);
const getSubregions = computed<Set<string> | null>(() => subregions.value);
const getLands = computed<Set<string> | null>(() => lands.value);
const getLocations = computed<Set<string> | null>(() => locations.value);

const isMapBeingHovered = computed((): boolean => {
  return isMapHovered.value;
});

const selectedCharIndex = ref<number>(null);
const isMapHovered = ref<boolean>(false);
const chosenRegion = ref<string>("");
const chosenSubregion = ref<string>("");
const chosenLand = ref<string>("");
const chosenLocation = ref<string>("");
const regions = ref<Set<string> | null>(new Set<string>());
const subregions = ref<Set<string> | null>(new Set<string>());
const lands = ref<Set<string> | null>(new Set<string>());
const locations = ref<Set<string> | null>(new Set<string>());
const allLocations = ref<Location[] | null>(null);

const calculateProvisions = (): number => {
  var total = 0;

  total += character.value.inventory.provisions;

  character.value.mercenaries.forEach((merc) => {
    total += merc.inventory.provisions;
  });

  return total;
};

const getMapSource = (val: string) => {
  return require(`@/assets/map_${val.toLowerCase()}.jpg`);
};

const selectCharacter = (index: number): void => {
  const character = characters.value[index];
  store.commit(StoreData.SetCharacterId, character.identity.id);

  updateAvMusic("character_travel");

  selectedCharIndex.value = index;
  clearDestination();
  getAllLocations();
};

const setClass = (index: number): string => {
  return selectedCharIndex.value === index ? "mx0 selected" : "mx0";
};

const getSelectedCharacter = (): Character | null => {
  return characters.value[selectedCharIndex.value];
};

const clearDestination = (): void => {
  chosenRegion.value = "";
  chosenSubregion.value = "";
  chosenLand.value = "";
  chosenLocation.value = "";
};

const clearLocation = (): void => {
  chosenLocation.value = "";
};

const getAllLocations = (): void => {
  HttpService.httpGetMetadata("Metadata/GetAllLocations")
    .then((s) => {
      if (s.ok) {
        return s.json();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((res: Location[]) => {
      allLocations.value = res;

      res.forEach((loc) => {
        regions.value.add(loc.position.region);
        subregions.value.add(loc.position.subregion);
        lands.value.add(loc.position.land);
        locations.value.add(loc.position.location);
      });
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

const travel = (): void => {
  if (
    !chosenRegion.value ||
    !chosenSubregion.value ||
    !chosenLand.value ||
    !chosenLocation.value
  ) {
    return;
  }

  const data: CharacterTravel = {
    characterIdentity: character.value.identity,
    destination: {
      region: chosenRegion.value,
      subregion: chosenSubregion.value,
      land: chosenLand.value,
      location: chosenLocation.value,
    },
  };

  HttpService.httpPut("Character/TravelToLocation", data)
    .then((s) => {
      if (s.ok) {
        return s.json();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((travelResponse: CharacterTravelResponse) => {
      store.commit(StoreData.UpdateCharacter, travelResponse.character);
      clearDestination();
      updateAvText(travelResponse.result);
      selectedCharIndex.value = null;
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};
</script>

<style scoped>
.selected {
  border: 3px solid #859c71;
  border-radius: 3px;
  padding-bottom: 5px;
}

.question {
  cursor: help;
}

.row {
  margin-top: 0px;
  margin-bottom: 0px;
}

i {
  cursor: pointer;
  opacity: 0.7;
}

i:hover {
  opacity: 1;
  transition: 0.3;
}

img {
  height: 10px;
  width: auto;
  border: solid 2px rgba(110, 34, 34, 0.663);
  border-radius: 5px;
  transition: 0.2s;
  cursor: auto;
}

img:hover {
  height: 600px;
  width: auto;
  transition: 0.4s;
}
</style>
