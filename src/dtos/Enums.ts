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
  // player
  SetPlayerProfile = "setPlayerProfile",
  // character
  SetCharacterId = "setCharacterId",
  SetCharacterStub = "setCharacterStub",
  CreateCharacter = "createCharacter",
  UpdateCharacter = "updateCharacter",
  DeleteCharacter = "deleteCharacter",
  // location
  SetLocation = "setLocation",
  RemoveLocationItem = "removeLocationItem",
  RemoveLocationMercenary = "removeLocationMercenary",
  // battleboard
  SetBattleboard = "setBattleboard",
}

export enum Emits {
  OnCardClick = "on-card-click",
}
