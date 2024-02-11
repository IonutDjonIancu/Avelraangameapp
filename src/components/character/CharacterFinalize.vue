<template>
  <div v-if="character" class="column">
    <div class="row">
      <label class="label" for="name">Name</label>
      <input
        v-model="name"
        id="name"
        name="nameInput"
        :placeholder="character.status.name"
      />
    </div>
    <div class="row">
      <ul>
        <p>Stats</p>
        <li>{{ character.sheet.stats.strength }} strength</li>
        <li>{{ character.sheet.stats.constitution }} constitution</li>
        <li>{{ character.sheet.stats.agility }} agility</li>
        <li>{{ character.sheet.stats.willpower }} willpower</li>
        <li>{{ character.sheet.stats.perception }} perception</li>
        <li>{{ character.sheet.stats.abstract }} abstract</li>
      </ul>
      <ul>
        <p>Assets</p>
        <li>{{ character.sheet.assets.resolve }} resolve</li>
        <li>{{ character.sheet.assets.mana }} mana</li>
        <li>{{ character.sheet.assets.actions }} actions</li>
        <li>{{ character.sheet.assets.defense }}% defense</li>
        <li>{{ character.sheet.assets.purge }}% purge</li>
        <li>{{ character.sheet.assets.harm }} harm</li>
        <li>{{ character.sheet.assets.spot }} spot</li>
      </ul>
      <ul>
        <p>Skills</p>
        <li>{{ character.sheet.skills.apothecary }} apothecary</li>
        <li>{{ character.sheet.skills.arcane }} arcane</li>
        <li>{{ character.sheet.skills.hide }} hide</li>
        <li>{{ character.sheet.skills.melee }} melee</li>
        <li>{{ character.sheet.skills.psionics }} psionics</li>
        <li>{{ character.sheet.skills.sail }} sail</li>
        <li>{{ character.sheet.skills.social }} social</li>
        <li>{{ character.sheet.skills.tactics }} tactics</li>
        <li>{{ character.sheet.skills.traps }} traps</li>
        <li>{{ character.sheet.skills.travel }} travel</li>
      </ul>
      <ul>
        <p>Misc</p>
        <li>{{ character.status.wealth }} wealth</li>
        <li>{{ character.status.worth }} worth</li>
        <li>{{ character.inventory.provisions }} provisions</li>
        <li>{{ character.inventory.supplies.length }} items</li>
        <li>
          {{ character.status.position.location }},
          {{ character.status.position.land }}
        </li>
      </ul>
    </div>
    <div>
      <ul>
        <p>Items</p>
        <li
          class="item"
          :key="item.identity.id"
          :title="item.description"
          v-for="item in character.inventory.supplies"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <AvButton
      @click="finalizeCharacter"
      :size="'large'"
      :source="`ico_character_create_finalize`"
      :title="'Save and go back to character sheets'"
      :name="'Save'"
      :sound="'click'"
    ></AvButton>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, inject, ref, computed } from "vue";
import { useStore } from "vuex";
import { HttpService } from "@/services/HttpService";
import { StoreData } from "@/dtos/Enums";
import { Character, CharacterData, Player } from "@/dtos/Dtos";
import AvButton from "@/components/small/AvButton.vue";

const updateAvText: any = inject("updateAvText");

const store = useStore();
const playerProfile = computed<Player | null>(() => store.state.playerProfile);
const characterId = computed<string | null>(() => store.state.characterId);

const character = ref<Character | null>(
  playerProfile.value.characters.find((c) => c.identity.id == characterId.value)
);
const name = ref<string>("");

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

const finalizeCharacter = (): void => {
  const data: CharacterData = {
    playerId: character.value.identity.playerId,
    characterId: character.value.identity.id,
    characterName: name.value,
  };

  if (name.value.length === 0) {
    props.gotoSibling("");
    return;
  }

  HttpService.httpPut("Character/UpdateCharacterName", data)
    .then((s) => {
      if (s.ok) {
        return s.json();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((character: Character) => {
      store.commit(StoreData.UpdateCharacter, character);
      props.gotoSibling("");
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

onMounted(() => {
  updateAvText(
    "This is your character around the age of adventuring. You may change the name only once. A more detailed information of your character is in the character sheet."
  );
});
</script>

<style scoped>
.label {
  margin-right: 5px;
  align-self: center;
}

p {
  font-weight: bold;
  margin-top: 3px;
  margin-bottom: 5px;
}

.item {
  cursor: pointer;
}
</style>
