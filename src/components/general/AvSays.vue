<template>
  <div class="av-says-container">
    <textarea
      name="avsays"
      title="The dungeonmaster Avelraan will display information here."
      :value="`Avelraan says: ${props.avText}`"
      readonly
      disabled
      class="av-says-textarea"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  avText: {
    type: String,
    required: false,
  },
});
</script>

<style scoped>
.av-says-container {
  display: flex;
  justify-content: center;
}

.av-says-textarea {
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
  border-color: #2c3e50;
  width: 80%;
  text-align: center;
  color: #2c3e50;
  background-color: rgba(128, 128, 128, 0.103);
  transition: background-color 0.3s ease;
  padding-top: 10px;
}

.av-says-textarea:hover {
  background-color: rgba(255, 255, 255, 1);
  transition: background-color 0.3s ease;
}
</style>
