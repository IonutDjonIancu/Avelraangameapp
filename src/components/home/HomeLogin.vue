<template>
  <div>
    <form name="characterLogin" class="form" autocomplete="nope">
      <div class="form-item">
        <div class="form-item" style="margin-bottom: 10px">
          <label style="font-weight: bold; margin-bottom: 5px" for="name"
            >Player name</label
          >
          <input
            v-model="name"
            id="name"
            type="text"
            maxlength="20"
            name="nameInput"
            autocomplete="nope"
          />
        </div>
        <div class="form-item">
          <label style="font-weight: bold; margin-bottom: 5px" for="code"
            >Code</label
          >
          <input
            v-model="code"
            id="code"
            type="text"
            name="codeInput"
            maxlength="6"
            autocomplete="nope"
          />
        </div>
      </div>
      <div class="submit">
        <AvButton
          @click="goBack"
          :size="'large'"
          :source="'ico_back_arrow'"
          :title="'Back to home'"
          :name="'Back'"
          :sound="Sounds.SoundButtonClickBack"
        ></AvButton>
        <AvButton
          @click.prevent="loginPlayer"
          :size="'large'"
          :source="'ico_login_player_submit'"
          :title="'Creates this player'"
          :name="'Submit'"
          :sound="Sounds.SoundButtonClick"
        ></AvButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, inject, ref } from "vue";
import store from "@/store";
import { HttpService } from "@/services/HttpService";
import AvButton from "@/components/small/AvButton.vue";
import { Player, PlayerLogin } from "@/dtos/Dtos";
import { Sounds, StoreData } from "@/dtos/Enums";

const updateAvText: any = inject("updateAvText");

const name = ref<string>("");
const code = ref<string>("");

const props = defineProps({
  gotoSibling: {
    type: Function,
  },
});

const loginPlayer = (): void => {
  const data: PlayerLogin = {
    playerName: name.value,
    code: code.value,
  };

  HttpService.httpPutNoIdentity("Player/Loginplayer", data)
    .then((s) => {
      if (s.ok) {
        return s.text();
      } else {
        s.text().then((r) => updateAvText(r));
      }
    })
    .then((res: string) => {
      if (
        res.toLowerCase().includes("failed") ||
        res.toLowerCase().includes("invalid")
      ) {
        updateAvText("Authorization failed...");
      } else {
        localStorage.setItem("playerName", data.playerName);
        localStorage.setItem("playerToken", res);
        updateAvText(
          `Welcome ${data.playerName}, your rite of passage is now complete. You can now access the other sections of the game located in the navbar.`
        );

        HttpService.getPlayer().then((player: Player) => {
          store.commit(StoreData.SetPlayerProfile, player);
          name.value = "";
          code.value = "";

          props.gotoSibling("");
        });
      }
    })
    .catch((err) => {
      updateAvText(err.message);
      return;
    });
};

const goBack = (): void => {
  updateAvText("Welcome back.");
  props.gotoSibling("");
};

onMounted(() => {
  updateAvText(
    "Use the name and the code from the Google authenticator app.\n" +
      "After you scanned it there will be an entry there that looks like this:\n" +
      "Avelraangame: myname\n" +
      "999 999"
  );
});
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}

.form-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.submit {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
}
</style>
