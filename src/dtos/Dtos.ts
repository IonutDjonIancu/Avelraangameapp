// api
export interface Authenticator {
  setupCode: string;
  setupImage: string;
}

export interface PlayerLogin {
  playerName: string;
  code: string;
}

export interface Player {
  identity: PlayerIdentity;
  lastAction: string;
  isAdmin: boolean;
  characters: Character[];
}

export interface Players {
  count: number;
  playerNames: string[];
}

export interface PlayerIdentity {
  id: string;
  name: string;
  token: string;
}

//TODO: turn all any types to their actual types
export interface Character {
  identity: CharacterIdentity;
  status: CharacterStatus;
  levelUp: any;
  sheet: any;
  inventory: any;
  mercenaries: Character[];
}

export interface CharacterStub {
  playerId: string;
  entityLevel: number;
  statPoints: number;
  skillPoints: number;
}

export interface CharacterIdentity {
  id: string;
  playerId: string;
}

export interface CharacterStatus {
  name: string;
  entityLevel: number;
  dateOfBirth: string;

  traits: any;
  gameplay: any;
  position: any;

  worth: number;
  wealth: number;
  fame: string;

  nrOfQuestsFinished: number;
  questsFinished: string[];
}

// app
export interface SetQrCode {
  playerName: string;
  qrCode: string;
}
