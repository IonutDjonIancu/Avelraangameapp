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

export enum Sounds {
  SoundBook = "sound_book",
  SoundButtonClick = "sound_button_click",
  SoundButtonClickBack = "sound_button_click_back",
  SoundHallFootsteps = "sound_hall_footsteps",
  SoundHorseSnort = "sound_horse_snort",
  SoundItemBuy = "sound_item_buy",
  SoundItemSell = "sound_item_sell",
  SoundItemWear = "sound_item_wear",
  SoundMarket = "sound_market",
  SoundPageFlip = "sound_page_flip",
  SoundParty = "sound_party",
  SoundSwordFar = "sound_sword_far",
  SoundTownhall = "sound_townhall",
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
