import {
  Battleboard,
  Character,
  CharacterStub,
  Location,
  Player,
} from "@/dtos/Dtos";
import { createStore } from "vuex";

interface State {
  playerProfile?: Player;
  characterId?: string;
  characterStub?: CharacterStub;
  location?: Location;
  battleboard?: Battleboard;
}

export default createStore<State>({
  state: {
    playerProfile: null,
    characterId: null,
    characterStub: null,
    location: null,
    battleboard: null,
  },
  getters: {},
  mutations: {
    // player
    setPlayerProfile(state, playerProfile: Player) {
      state.playerProfile = playerProfile;
    },
    // character
    setCharacterId(state, charId: string) {
      state.characterId = charId;
    },
    setCharacterStub(state, charStub: CharacterStub) {
      state.characterStub = charStub;
    },
    createCharacter(state, character: Character) {
      state.playerProfile.characters.push(character);
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
    deleteCharacter(state, charId: string) {
      if (state.playerProfile) {
        const index = state.playerProfile.characters.findIndex(
          (c) => c.identity.id === charId
        );
        if (index !== -1) {
          state.playerProfile.characters.splice(index, 1);
        }
      }
    },
    // location
    setLocation(state, location: Location) {
      state.location = location;
    },
    removeLocationItem(state, itemId: string) {
      const itemIndex = state.location.market.findIndex(
        (i) => i.identity.id === itemId
      );

      if (itemIndex !== -1) {
        state.location.market.splice(itemIndex, 1);
      }
    },
    removeLocationMercenary(state, mercId: string) {
      const itemIndex = state.location.mercenaries.findIndex(
        (i) => i.identity.id === mercId
      );

      if (itemIndex !== -1) {
        state.location.mercenaries.splice(itemIndex, 1);
      }
    },
    // battleboard
    setBattleboard(state, battleboard: Battleboard) {
      state.battleboard = battleboard;
    },
  },
  actions: {},
  modules: {},
});
