<template>
  <div class="container">
    <hr />
    <div class="column container container-b">
      <!-- insert testing stuff below -->
      <!-- insert testing stuff below -->
      <!-- insert testing stuff below -->
      <p>Export</p>
      <form name="exportForm" class="row">
        <label for="exportPass" class="m-h">pass</label>
        <input
          v-model="exportPass"
          name="exportPassInput"
          id="exportPass"
          placeholder="speak friend and enter"
          class="m-h"
        />
        <label for="exportSecret" class="m-h">secret</label>
        <input
          v-model="exportSecret"
          name="exportSecretInput"
          id="exportSecret"
          placeholder="speak friend and enter"
          class="m-h"
        />
        <button @click.prevent="exportSnapshot" type="submit" class="m-h">
          submit
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { HttpService } from "@/services/HttpService";
import { DbRequestsInfo } from "@/dtos/Dtos";

const exportPass = ref<string>("");
const exportSecret = ref<string>("");

const exportSnapshot = () => {
  const data: DbRequestsInfo = {
    password: exportPass.value,
    secret: exportSecret.value,
    isShortOperation: true,
  };

  HttpService.httpPut("Database/ExportSnapshot", data)
    .then((s) => s.text())
    .then(console.log)
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
</style>
