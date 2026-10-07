// ===========================================================================
// THE HERO — the cursed, absurdly overpowered player. Safe to edit.
// ===========================================================================
DBG.data.hero = {
  "name": "Sir Givesalot",

  // Core numbers used by the game
  "maxHp": 99999,
  "regenPerSecond": 2500,  // HP healed every second, always
  "attack": 9999,
  "defense": 999,          // incoming damage is reduced by this (minimum 1)
  "thorns": 10,            // attackers take this many times their own hit back
  "moveSpeed": 90,         // (overrides settings.playerSpeed)

  // The armour that can't be taken off
  "armor": {
    "name": "Cursed Plate of Eternal Coziness",
    "description": "Cannot be removed. You have tried. The armour has also tried. It likes you."
  },

  // Extra lines shown on the character sheet (press C). Pure comedy.
  "sheetStats": [
    ["Strength", "9,999"],
    ["Dexterity", "Yes"],
    ["Luck", "Suspiciously high"],
    ["Wisdom", "1"],
    ["Humility", "0"],
    ["Ways to die", "Searching..."]
  ]
};
