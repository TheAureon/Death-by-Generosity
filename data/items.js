// ===========================================================================
// ITEMS — everything the hero can carry and give away.
//
//   "slot"  : where it's worn: weapon, armor, helmet, shield, cape
//   "stats" : what it adds to whoever wears it (attack, defense, maxHp, speed)
//   "art"   : how it's drawn. "type" picks the shape (see the list below),
//             "color" is the main colour, "trim" the second colour.
//
// Shapes:  weapon: sword, axe, club, spear, staff, pan, fish
//          armor : plate, leather, robe
//          helmet: helm, hat, crown, pot
//          shield: round, kite, door
//          cape  : cape
// ===========================================================================
DBG.data.items = {
  "rusty_sword": {
    "name": "Rusty Sword", "slot": "weapon",
    "art": { "type": "sword", "color": "#b07a5a", "trim": "#6b4428" },
    "stats": { "attack": 5 },
    "description": "Mostly rust. Some sword."
  },
  "legendary_sword": {
    "name": "Legendary Sword of Mild Inconvenience", "slot": "weapon",
    "art": { "type": "sword", "color": "#bfe8ff", "trim": "#f2c14e" },
    "stats": { "attack": 400 },
    "description": "Forged in dragonfire. Mostly used to open jars."
  },
  "war_axe": {
    "name": "Big War Axe", "slot": "weapon",
    "art": { "type": "axe", "color": "#c3c8cf", "trim": "#7a5232" },
    "stats": { "attack": 120, "speed": -5 },
    "description": "Heavy. Sharp. Has 'NO REFUNDS' carved on the handle."
  },
  "frying_pan": {
    "name": "Frying Pan", "slot": "weapon",
    "art": { "type": "pan", "color": "#3a3a44", "trim": "#7a5232" },
    "stats": { "attack": 25 },
    "description": "Still has a bit of egg on it. Adds flavour to violence."
  },
  "wet_fish": {
    "name": "Slightly Wet Fish", "slot": "weapon",
    "art": { "type": "fish", "color": "#7fa7c9", "trim": "#e8505b" },
    "stats": { "attack": 3 },
    "description": "It's a fish. It's wet. You're welcome."
  },
  "wizard_staff": {
    "name": "Wizard Staff", "slot": "weapon",
    "art": { "type": "staff", "color": "#8a5a2b", "trim": "#7cf0ff" },
    "stats": { "attack": 60, "maxHp": 20 },
    "description": "The gem hums. Nobody knows what it does. Neither does the gem."
  },
  "pointy_spear": {
    "name": "Pointy Spear", "slot": "weapon",
    "art": { "type": "spear", "color": "#c3c8cf", "trim": "#a8814f" },
    "stats": { "attack": 45 },
    "description": "The pointy end goes toward the hero. Usually."
  },
  "leather_vest": {
    "name": "Leather Vest", "slot": "armor",
    "art": { "type": "leather", "color": "#8a5a2b", "trim": "#c99560" },
    "stats": { "defense": 10 },
    "description": "Smells like a cow. Protects like a cow."
  },
  "plate_armor": {
    "name": "Spare Plate Armour", "slot": "armor",
    "art": { "type": "plate", "color": "#c3c8cf", "trim": "#6c717b" },
    "stats": { "defense": 150, "speed": -10 },
    "description": "Your old armour, from before the curse. It misses you."
  },
  "wizard_robe": {
    "name": "Wizard Robe", "slot": "armor",
    "art": { "type": "robe", "color": "#5b4bc4", "trim": "#f6d743" },
    "stats": { "defense": 5, "maxHp": 50 },
    "description": "Has stars on it. Makes you 40% more mysterious."
  },
  "iron_helm": {
    "name": "Iron Helmet", "slot": "helmet",
    "art": { "type": "helm", "color": "#9aa0a8", "trim": "#6c717b" },
    "stats": { "defense": 30 },
    "description": "A bucket with ambition."
  },
  "straw_hat": {
    "name": "Straw Hat", "slot": "helmet",
    "art": { "type": "hat", "color": "#ecd9a0", "trim": "#c8323c" },
    "stats": { "defense": 1 },
    "description": "Perfect for farming. Terrible for war."
  },
  "cooking_pot": {
    "name": "Cooking Pot", "slot": "helmet",
    "art": { "type": "pot", "color": "#55555f", "trim": "#2b2b33" },
    "stats": { "defense": 15 },
    "description": "Technically a helmet if you believe hard enough."
  },
  "gold_crown": {
    "name": "Golden Crown", "slot": "helmet",
    "art": { "type": "crown", "color": "#f2c14e", "trim": "#e8505b" },
    "stats": { "maxHp": 100 },
    "description": "Gives no protection, but tons of confidence."
  },
  "round_shield": {
    "name": "Round Shield", "slot": "shield",
    "art": { "type": "round", "color": "#a8814f", "trim": "#9aa0a8" },
    "stats": { "defense": 40 },
    "description": "Round. Shieldy. Does what it says."
  },
  "knight_shield": {
    "name": "Knight's Shield", "slot": "shield",
    "art": { "type": "kite", "color": "#3f6fb4", "trim": "#f2c14e" },
    "stats": { "defense": 80 },
    "description": "Borrowed from a knight. Permanently."
  },
  "barn_door": {
    "name": "Barn Door", "slot": "shield",
    "art": { "type": "door", "color": "#b5503a", "trim": "#f4f1e8" },
    "stats": { "defense": 200, "speed": -20 },
    "description": "Somewhere, a barn is very cold right now."
  },
  "hero_cape": {
    "name": "Spare Hero Cape", "slot": "cape",
    "art": { "type": "cape", "color": "#c8323c", "trim": "#8e1f2a" },
    "stats": { "speed": 10, "maxHp": 25 },
    "description": "Makes anyone feel like the main character. Dangerous."
  }
};
