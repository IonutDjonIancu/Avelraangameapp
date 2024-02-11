<template>
  <div class="av-container">
    <div class="column">
      <MarketMain
        v-if="text === ''"
        :gotoSibling="gotoSibling"
        :characters="characters"
      ></MarketMain>
      <!-- no store -->
      <div class="column">
        <div :key="index" v-for="(character, index) in characters">
          {{ character.status.name }} | {{ character.status.wealth }} $$
          <ol>
            <li
              :key="index"
              v-for="(item, index) in character.inventory.supplies"
            >
              {{ item.name }}
            </li>
          </ol>
        </div>
      </div>
      <!-- with store -->
      <div>{{ playerProfile.identity.name }} with store</div>
      <div class="column">
        <div
          :key="index"
          v-for="(character, index) in playerProfile.characters"
        >
          {{ character.status.name }} | {{ character.status.wealth }} $$
          <ol>
            <li
              :key="index"
              v-for="(item, index) in character.inventory.supplies"
            >
              {{ item.name }}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { Character, Player } from "@/dtos/Dtos";
import { HttpService } from "@/services/HttpService";
import MarketMain from "@/components/market/MarketMain.vue";

const text = ref<string>("");
const characters = ref<Character[]>([]);

const updateAvText: any = inject("updateAvText");
const updateAvImage: any = inject("updateAvImage");
const updateAvSound: any = inject("updateAvSound");

const store = useStore();
const playerProfile = computed<Player | null>(() => store.state.playerProfile);

const gotoSibling = (value: string) => {
  text.value = value;
};

onMounted(() => {
  updateAvImage("img_market");
  updateAvSound("page_flip", 0.8);
  updateAvText("Select the character that wishes to trade.");
  HttpService.getPlayer()
    .then((s: Player) => (characters.value = s.characters))
    .then(() => console.log(characters.value));
});
</script>
