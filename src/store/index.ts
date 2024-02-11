import { Character, CharacterStub, Player } from "@/dtos/Dtos";
import { createStore } from "vuex";

interface State {
  playerProfile?: Player;
  characterId?: string;
  characterStub?: CharacterStub;
}

export default createStore<State>({
  state: {
    playerProfile: null,
    characterId: null,
    characterStub: null,
  },
  getters: {},
  mutations: {
    setPlayerProfile(state, playerProfile: Player) {
      state.playerProfile = playerProfile;
    },
    setCharacterId(state, charId: string) {
      state.characterId = charId;
    },
    setCharacterStub(state, charStub: CharacterStub) {
      state.characterStub = charStub;
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
