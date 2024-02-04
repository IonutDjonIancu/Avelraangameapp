<template>
  <div class="column">
    <div class="row">
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
        <li
          :title="`Item level: ${
            character.inventory.head != null
              ? character.inventory.head.level
              : ''
          }. Description: ${
            character.inventory.head != null
              ? character.inventory.head.description
              : ''
          }`"
        >
          Head:
          {{
            character.inventory.head != null
              ? character.inventory.head.name
              : "no item"
          }}
        </li>
        <li
          :title="`Item level: ${
            character.inventory.body != null
              ? character.inventory.body.level
              : ''
          }. Description: ${
            character.inventory.body != null
              ? character.inventory.body.description
              : ''
          }`"
        >
          Body:
          {{
            character.inventory.body != null
              ? character.inventory.body.name
              : "no item"
          }}
        </li>
        <li
          :title="`Item level: ${
            character.inventory.mainhand != null
              ? character.inventory.mainhand.level
              : ''
          }. Description: ${
            character.inventory.mainhand != null
              ? character.inventory.mainhand.description
              : ''
          }`"
        >
          Mainhand:
          {{
            character.inventory.mainhand != null
              ? character.inventory.mainhand.name
              : "no item"
          }}
        </li>
        <li
          :title="`Item level: ${
            character.inventory.offhand != null
              ? character.inventory.offhand.level
              : ''
          }. Description: ${
            character.inventory.offhand != null
              ? character.inventory.offhand.description
              : ''
          }`"
        >
          Offhand:
          {{
            character.inventory.offhand != null
              ? character.inventory.offhand.name
              : "no item"
          }}
        </li>
        <li
          :title="`Item level: ${
            character.inventory.shield != null
              ? character.inventory.shield.level
              : ''
          }. Description: ${
            character.inventory.shield != null
              ? character.inventory.shield.description
              : ''
          }`"
        >
          Shield:
          {{
            character.inventory.shield != null
              ? character.inventory.shield.name
              : "no item"
          }}
        </li>
        <li
          :title="`Item level: ${
            character.inventory.ranged != null
              ? character.inventory.ranged.level
              : ''
          }. Description: ${
            character.inventory.ranged != null
              ? character.inventory.ranged.description
              : ''
          }`"
        >
          Ranged:
          {{
            character.inventory.ranged != null
              ? character.inventory.ranged.name
              : "no item"
          }}
        </li>
      </ul>
      <!-- Gameplay -->
      <ul>
        <li class="list-header">Gameplay</li>
        <li title="Is character on a battleboard?">
          {{
            character.status.gameplay.battleboardId.length > 0
              ? "in party"
              : "no party"
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
    <div class="row">items</div>
    <AvButton
      @click="props.gotoSibling('')"
      :size="'large'"
      :source="`ico_back_arrow`"
      :title="'Go to Character'"
      :name="'Back'"
      :sound="'back'"
    ></AvButton>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, inject } from "vue";
import AvButton from "@/components/small/AvButton.vue";
import { Character } from "@/dtos/Dtos";

const updateAvImage: any = inject("updateAvImage");
const updateAvText: any = inject("updateAvText");

const props = defineProps({
  gotoSibling: {
    type: Function,
    required: true,
  },
  character: {
    type: Object as () => Character,
    required: true,
  },
});

onMounted(() => {
  console.log(props.character);
  updateAvImage("img_character_sheet");
  updateAvText(`${props.character.status.name} character sheet`);
});
</script>

<style scoped>
ul {
  list-style-type: none;
}

li {
  cursor: help;
}

.list-header {
  margin-bottom: 5px;
  color: #2c3e50;
  font-weight: bold;
}
</style>
