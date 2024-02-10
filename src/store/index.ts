import { Character, Player } from "@/dtos/Dtos";
import { createStore } from "vuex";

interface State {
  playerProfile?: Player;
}

export default createStore<State>({
  state: {
    playerProfile: null,
  },
  getters: {},
  mutations: {
    setPlayerProfile(state, playerProfile: Player) {
      state.playerProfile = playerProfile;
    },
    updateCharacter(state, updatedCharacter: Character) {
      if (state.playerProfile) {
        const index = state.playerProfile.characters.findIndex(
          (c) => c.identity.id === updatedCharacter.identity.id
        );
        if (index !== -1) {
          state.playerProfile.characters[index] = updatedCharacter;
        }
      }
    },
  },
  actions: {},
  modules: {},
});
