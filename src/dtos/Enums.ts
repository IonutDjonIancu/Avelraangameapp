export enum Emits {
  // characters
  OnCharacterUpdate = "on-character-update",
  OnCharacterDelete = "on-character-delete",
  // items
  OnItemEquip = "on-item-equip",
  OnItemSell = "on-item-sell",
}

export enum InventoryLocations {
  Head = "Head",
  Body = "Body",
  Mainhand = "Mainhand",
  Offhand = "Offhand",
  Ranged = "Ranged",
  Heraldry = "Heraldry",
}

export enum Songs {
  MainTheme = "main_theme",
  EastTheme = "east_theme",
  EndTheme = "end_theme",
}

export enum StoreData {
  SetPlayerProfile = "setPlayerProfile",
  SetCharacterId = "setCharacterId",
  SetCharacterStub = "setCharacterStub",
  UpdateCharacter = "updateCharacter",
}
