// api
export interface Authenticator {
  setupCode: string;
  setupImage: string;
}

export interface PlayerLogin {
  playerName: string;
  code: string;
}

export interface PlayerInfo {
  playerName: string;
  playerToken: string;
}

export interface Player {
  identity: PlayerIdentity;
  lastAction: string;
  isAdmin: boolean;
  characters: Character[];
}

export interface PlayerData {
  playerId?: string;
  playerName: string;
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
  levelUp: CharacterLevelUp;
  sheet: CharacterSheet;
  inventory: CharacterInventory;
  mercenaries: Character[];
}

export interface CharacterLevelUp {
  statPoints: number;
  assetPoints: number;
  skillPoints: number;
  deedPoints: number;
}

export interface CharacterSheet {
  stats: CharacterStats;
  assets: CharacterAssets;
  skills: CharacterSkills;
  specialSkills: SpecialSkill[];
}

export interface CharacterStats {
  strength: number;
  constitution: number;
  agility: number;
  perception: number;
  willpower: number;
  abstract: number;
}

export interface CharacterAssets {
  actions: number;
  actionsLeft: number;
  defense: number;
  defenseFinal: number;
  harm: number;
  mana: number;
  manaLeft: number;
  purge: number;
  resolve: number;
  resolveLeft: number;
  spot: number;
}

export interface CharacterSkills {
  apothecary: number;
  arcane: number;
  hide: number;
  melee: number;
  psionics: number;
  sail: number;
  social: number;
  tactics: number;
  traps: number;
  travel: number;
}

export interface SpecialSkillIdentity {
  id: string;
  name: string;
}

export interface CharacterTraits {
  races: string[];
  cultures: CharacterCultures;
  traditions: string[];
  classes: string[];
}

export interface CharacterRacialTraits {
  race: string;
  culture: string;
  tradition: string;
  class: string;
  icon: number;
}

export interface CharacterCultures {
  human: string[];
  elf: string[];
  dwarf: string[];
  orc: string[];
}

export interface CharacterStub {
  id: string;
  playerId?: string;
  entityLevel: number;
  statPoints: number;
  skillPoints: number;
}

export interface CharacterIdentity {
  id: string;
  playerId: string;
}

export interface CharacterInventory {
  head: Item;
  body: Item;
  mainhand: Item;
  offhand: Item;
  ranged: Item;
  heraldry: Item[];
  provisions: number;
  supplies: Item[];
}

export interface CharacterEquip {
  characterIdentity: CharacterIdentity;
  itemId: string;
  inventoryLocation: string;
}

export interface CharacterTrade {
  characterIdentity: CharacterIdentity;
  itemId?: string;
  isToBuy?: boolean;
  amount?: number;
  targetIdentity?: CharacterIdentity;
}

export interface CharacterStatus {
  name: string;
  entityLevel: number;
  dateOfBirth: string;

  traits: CharacterRacialTraits;
  gameplay: CharacterGameplay;
  position: Position;

  worth: number;
  wealth: number;
  fame: string;

  nrOfQuestsFinished: number;
  questsFinished: string[];
}

export interface CharacterGameplay {
  isNpc: boolean;
  isAlive: boolean;
  isLocked: boolean;
  isHidden: boolean;
  battleboardId: string;
  isGoodGuy: boolean;
}

export interface CharacterLadder {
  characterName: string;
  playerName: string;
  race: string;
  entityLevel: number;
  icon: number;
  worth: number;
  wealth: number;
}

export interface CharacterData {
  playerId: string;
  characterId: string;
  characterName: string;
}

export interface Item {
  identity: ItemIdentity;
  inventoryLocations: string[];
  sheet: CharacterSheet;
  category: string;
  description: string;
  hasTaint: boolean;
  level: number;
  levelName: string;
  lore: string;
  name: string;
  quality: string;
  subcategory: string;
  subtype: string;
  type: string;
  value: number;
  icon: number;
}

export interface ItemIdentity {
  id: string;
  characterId: string;
}

export interface SpecialSkill {
  identity: SpecialSkillIdentity;
  description: number;
  lore: string;
  type: string;
  subtype: string;
  category: string;
  dDeedsCost: number;
}

export interface Position {
  region: string;
  subregion: string;
  land: string;
  location: string;
}

export interface Location {
  name: string;
  fullName: string;
  position: Position;
  description: string;
  effort: number;
  travelCostFromArada: number;
  lastTimeVisited: string;
  market: Item[];
  mercenaries: Character[];
  quests: Quest[];
}

export interface Quest {
  fame: string;
  description: string;
  result: string;
  isRepeatable: boolean;
  id: string;
  effortLvl: number;
  encounters: number;
  encountersLeft: number;
  reward: string;
}

export interface Ladder {
  charactersByWorth: CharacterLadder[];
  charactersByWealth: CharacterLadder[];
}

export interface DbRequestsInfo {
  password: string;
  secret: string;
  playerJsonString?: string;
}

// app
export interface SetQrCode {
  playerName: string;
  qrCode: string;
}
