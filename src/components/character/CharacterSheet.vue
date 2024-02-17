<template>
  <div v-if="character" class="column">
    <!-- Character static data -->
    <div class="row">
      <i
        @click="changeName()"
        title="Change name"
        class="fa-solid fa-pen fa-flip-horizontal"
      ></i>
      <img :title="character.status.name" class="avatar" :src="getImage()" />
    </div>
    <div class="row">
      <ul>
        <li title="character name" class="list-header">
          {{ character.status.name }}:
        </li>
      </ul>
      <!-- Stats -->
      <ul>
        <li class="list-header">Stats</li>
        <li title="strength">Str {{ character.sheet.stats.strength }}</li>
        <li title="constitution">
          Con {{ character.sheet.stats.constitution }}
        </li>
        <li title="agility">Agl {{ character.sheet.stats.agility }}</li>
        <li title="willpower">Wil {{ character.sheet.stats.willpower }}</li>
        <li title="perception">Per {{ character.sheet.stats.perception }}</li>
        <li title="abstract">Abs {{ character.sheet.stats.abstract }}</li>
      </ul>
      <!-- Assets -->
      <ul>
        <li class="list-header">Assets</li>
        <li title="resolve and resolve left">
          Res {{ character.sheet.assets.resolve }} /
          {{ character.sheet.assets.resolveLeft }}
        </li>
        <li title="mana and mana left">
          Man {{ character.sheet.assets.mana }} /
          {{ character.sheet.assets.manaLeft }}
        </li>
        <li title="actions and actions left">
          Act {{ character.sheet.assets.actions }} /
          {{ character.sheet.assets.actionsLeft }}
        </li>
        <li title="defense and defense actual">
          Def {{ character.sheet.assets.defense }} /
          {{ character.sheet.assets.defenseFinal }}%
        </li>
        <li title="purge">Pur {{ character.sheet.assets.purge }}%</li>
        <li title="harm">Har {{ character.sheet.assets.harm }}</li>
        <li title="spot">Spo {{ character.sheet.assets.spot }}</li>
      </ul>
      <!-- Skills -->
      <ul>
        <li class="list-header">Skills</li>
        <li title="apothecary">Apo {{ character.sheet.skills.apothecary }}</li>
        <li title="arcane">Arc {{ character.sheet.skills.arcane }}</li>
        <li title="hide">Hid {{ character.sheet.skills.hide }}</li>
        <li title="melee">Mel {{ character.sheet.skills.melee }}</li>
        <li title="psionics">Psi {{ character.sheet.skills.psionics }}</li>
        <li title="sail">Sai {{ character.sheet.skills.sail }}</li>
        <li title="social">Soc {{ character.sheet.skills.social }}</li>
        <li title="tactics">Tac {{ character.sheet.skills.tactics }}</li>
        <li title="traps">Tra {{ character.sheet.skills.traps }}</li>
        <li title="travel">Trv {{ character.sheet.skills.travel }}</li>
      </ul>
      <!-- Inventory -->
      <ul>
        <li class="list-header">Inventory</li>
        <li>
          <div v-if="character.inventory.head != null" class="li-item row">
            <AvItemCard :item="character.inventory.head"></AvItemCard>
            <i title="helm" class="fa-solid fa-user m-r"></i>
          </div>
          <div v-else class="li-item row">
            <i title="helm" class="fa-solid fa-user fa-off m-r"></i>
          </div>
        </li>
        <li>
          <div v-if="character.inventory.body != null" class="li-item row">
            <AvItemCard :item="character.inventory.body"></AvItemCard>
            <i title="armour" class="fa-solid fa-user-shield m-r"></i>
          </div>
          <div v-else class="li-item row">
            <i title="armour" class="fa-solid fa-user-shield fa-off m-r"></i>
          </div>
        </li>
        <li>
          <div v-if="character.inventory.mainhand != null" class="li-item row">
            <AvItemCard :item="character.inventory.mainhand"></AvItemCard>
            <i title="mainhand" class="fa-solid fa-hand-back-fist m-r"></i>
          </div>
          <div v-else class="li-item row">
            <i
              title="mainhand"
              class="fa-solid fa-hand-back-fist fa-off m-r"
            ></i>
          </div>
        </li>
        <li>
          <div v-if="character.inventory.offhand != null" class="li-item row">
            <AvItemCard :item="character.inventory.offhand"></AvItemCard>
            <i title="offhand" class="fa-solid fa-shield-halved m-r"></i>
          </div>
          <div v-else class="li-item row">
            <i title="offhand" class="fa-solid fa-shield-halved fa-off m-r"></i>
          </div>
        </li>
        <li>
          <div v-if="character.inventory.ranged != null" class="li-item row">
            <AvItemCard :item="character.inventory.ranged"></AvItemCard>
            <i title="ranged" class="fa-solid fa-arrows-up-to-line m-r"></i>
          </div>
          <div v-else class="li-item row">
            <i
              title="ranged"
              class="fa-solid fa-arrows-up-to-line fa-off m-r"
            ></i>
          </div>
        </li>
        <li>
          <div
            v-if="character.inventory.heraldry.length > 0"
            class="li-item row"
          >
            <i title="heraldry" class="fa-solid fa-gem m-r"></i>
            {{ character.inventory.heraldry.length }}
          </div>
          <div v-else class="li-item row">
            <i title="heraldry" class="fa-regular fa-gem fa-off m-r"></i>
            <div class="fa-off">
              {{ character.inventory.heraldry.length }}
            </div>
          </div>
        </li>
      </ul>
      <!-- Gameplay -->
      <ul>
        <li class="list-header">Gameplay</li>
        <li title="Is character on a battleboard?">
          {{
            character.status.gameplay.battleboardId.length > 0
              ? "in party"
              : "traveling alone"
          }}
        </li>
        <li title="Is character an NPC?">
          {{ character.status.gameplay.isNpc ? "NPC" : "playable character" }}
        </li>
        <li title="Is character alive?">
          {{ character.status.gameplay.isAlive ? "alive" : "dead" }}
        </li>
        <li title="Is character hidden?">
          {{ character.status.gameplay.isHidden ? "hidden" : "not hidden" }}
        </li>
        <li title="Is character locked to modify?">
          {{ character.status.gameplay.isLocked ? "locked" : "not locked" }}
        </li>
        <li title="Current character location">
          {{
            `${character.status.position.location}, ${character.status.position.land}`
          }}
        </li>
        <li title="Tradition">
          {{ character.status.traits.tradition.toLowerCase() }}
        </li>
        <li title="Culture">
          {{ character.status.traits.culture.toLowerCase() }}
        </li>
        <li title="Race">
          {{ character.status.traits.race.toLowerCase() }}
        </li>
        <li title="Class">
          {{ character.status.traits.class.toLowerCase() }}
        </li>
      </ul>
      <!-- Misc -->
      <ul>
        <li class="list-header">Misc</li>
        <li title="How much wealth a character has.">
          Wealth {{ character.status.wealth }}
        </li>
        <li title="How much is the character worth.">
          Worth {{ character.status.worth }}
        </li>
        <li title="How many quests the character has finished.">
          Quests {{ character.status.nrOfQuestsFinished }}
        </li>
        <li :title="`Character fame and renown: ${character.status.fame}`">
          Fame
        </li>
        <li title="The entity level of the character.">
          Entity {{ character.status.entityLevel }}
        </li>
        <li title="The day the character started adventuring.">
          Adventuring since {{ character.status.dateOfBirth }}
        </li>
        <li title="The amount of provisions the character has.">
          Provisions {{ character.inventory.provisions }}
        </li>
        <li title="The amount of supplies.">
          Supplies {{ character.inventory.supplies.length }}
        </li>
      </ul>
    </div>
    <!-- Character supplies items -->
    <div class="row supplies">
      <AvItemCard
        :key="item.identity.id"
        v-for="item in character.inventory.supplies"
        :item="item"
      ></AvItemCard>
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
        @click="deleteCharacter"
        :size="'large'"
        :source="`ico_character_delete`"
        :title="'Delete character'"
        :name="'Delete'"
        :sound="'click'"
      ></AvButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, inject, computed } from "vue";
import { useStore } from "vuex";
import { HttpService } from "@/services/HttpService";
import AvButton from "@/components/small/AvButton.vue";
import AvItemCard from "@/components/small/AvItemCard.vue";
import { Character, Player, CharacterData } from "@/dtos/Dtos";
import { StoreData } from "@/dtos/Enums";

const updateAvImage: any = inject("updateAvImage");
const updateAvText: any = inject("updateAvText");

const store = useStore();
const playerProfile = computed<Player | null>(
  (): Player => store.state.playerProfile
);
const characterId = computed<string | null>(
  (): string => store.state.characterId
);
const character = computed<Character | null>(
  (): Character =>
    playerProfile.value.characters.find(
      (c) => c.identity.id === characterId.value
    )
);

const props = defineProps({
  gotoSibling: {
    type: Function,
    required: true,
  },
});

const getImage = (): string => {
  return require(`@/assets/ico_${character.value.status.traits.race.toLowerCase()}_${
    character.value.status.traits.icon
  }.png`);
};

const deleteCharacter = (): void => {
  if (
    confirm(
      `Are you sure you want to delete character: ${character.value.status.name}?`
    )
  ) {
    // TODO: refactore httpdelete in a future release
    // TODO: it currently has a special url, either change it server side, or app side
    const playerName = localStorage.getItem("playerName");
    const playerToken = localStorage.getItem("playerToken");
    HttpService.httpDelete(
      `Character/DeleteCharacter?PlayerName=${playerName}&Token=${playerToken}&characterId=${character.value.identity.id}`
    )
      .then(() => {
        store.commit(StoreData.DeleteCharacter, character.value.identity.id);
        props.gotoSibling("");
      })
      .catch((err) => {
        updateAvText(err.message);
        return;
      });
  }
};

const changeName = () => {
  const newName = prompt("New character name:");

  if (!newName) return;

  const data: CharacterData = {
    playerId: character.value.identity.playerId,
    characterId: character.value.identity.id,
    characterName: newName,
  };

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
      updateAvText("You have changed this character's name.");
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

onMounted(() => {
  updateAvImage("img_character_sheet");
  updateAvText(
    `Character sheet of the one they call '${character.value.status.name}'.`
  );
});
</script>

<style scoped>
ul {
  list-style-type: none;
}

li {
  cursor: help;
}

.li-item {
  align-items: center;
}

.list-header {
  margin-bottom: 5px;
  color: #2c3e50;
  font-weight: bold;
}

.supplies {
  margin-bottom: 20px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  transition: 0.2s;
}

.avatar:hover {
  width: 128px;
  height: 128px;
  border-radius: 5px;
  transition: 0.2s;
}

.fa-off {
  color: #00000051;
}

.m-r {
  margin-right: 3px;
}

i {
  cursor: pointer;
}
</style>
