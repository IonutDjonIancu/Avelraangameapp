<template>
  <div class="container">
    <hr />
    <!-- insert testing stuff below -->
    <!-- insert testing stuff below -->
    <!-- insert testing stuff below -->
    <div class="column container container-b">
      <!-- EXPORT FUNCTIONALITY -->
      <p>Export players</p>
      <form name="exportForm" class="row">
        <label for="exportPass" class="m-h">pass</label>
        <input
          v-model="exportPass"
          name="exportPassInput"
          id="exportPass"
          placeholder="speak friend and enter"
          class="m-h"
          autocomplete="false"
        />
        <label for="exportSecret" class="m-h">secret</label>
        <input
          v-model="exportSecret"
          name="exportSecretInput"
          id="exportSecret"
          placeholder="speak friend and enter"
          class="m-h"
          autocomplete="false"
        />
        <button @click.prevent="exportSnapshot" type="submit" class="m-h">
          submit
        </button>
      </form>
    </div>
    <div class="column container container-b">
      <!-- IMPORT FUNCTIONALITY -->
      <p>Import player</p>
      <form name="exportForm">
        <div class="row">
          <label for="exportPass" class="m-h">pass</label>
          <input
            v-model="exportPass"
            name="exportPassInput"
            id="exportPass"
            placeholder="speak friend and enter"
            class="m-h"
            autocomplete="false"
          />
          <label for="exportSecret" class="m-h">secret</label>
          <input
            v-model="exportSecret"
            name="exportSecretInput"
            id="exportSecret"
            placeholder="speak friend and enter"
            class="m-h"
            autocomplete="false"
          />
          <button @click.prevent="importPlayer" type="submit" class="m-h">
            submit
          </button>
        </div>
        <div class="row">
          <label for="importPlayer" class="m-h">player</label>
          <input
            v-model="playerJson"
            name="importPlayerInput"
            id="importPlayer"
            placeholder="player json"
            class="m-h"
            autocomplete="false"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { HttpService } from "@/services/HttpService";
import { DbRequestsInfo } from "@/dtos/Dtos";

const updateAvText: any = inject("updateAvText");

const exportPass = ref<string>("");
const exportSecret = ref<string>("");
const playerJson = ref<string>("");

const exportSnapshot = () => {
  const data: DbRequestsInfo = {
    password: exportPass.value,
    secret: exportSecret.value,
  };

  HttpService.httpPut("Database/ExportSnapshot", data)
    .then((s) => {
      if (s.ok) {
        return s.text();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then(console.log) // this console log is allowed
    .catch((err) => console.error(err.message));
};

const importPlayer = () => {
  const data: DbRequestsInfo = {
    password: exportPass.value,
    secret: exportSecret.value,
    playerJsonString: playerJson.value,
  };

  HttpService.httpPut("Database/ImportPlayer", data)
    .then((s) => {
      if (s.ok) {
        return s.text();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then(console.log) // this console log is allowed
    .catch((err) => console.error(err.message));
};
</script>

<style scoped>
.m-h {
  margin-left: 2px;
  margin-right: 2px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container-b {
  width: 80%;
  border: 2px solid darkgray;
  margin: 5px;
  border-radius: 5px;
}

.row {
  align-items: center;
  justify-content: center;
}
</style>
