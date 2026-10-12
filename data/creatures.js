// ===========================================================================
// CREATURES — things that live in the world. Only one for now.
// Monsters for farming arrive in Milestone 6.
// ===========================================================================
DBG.data.creatures = {
  "training_dummy": {
    "name": "Training Dummy",
    "behavior": "dummy",   // which code controls it (src/entities/)
    "maxHp": 3000,
    "attack": 120,         // how hard it punches (before the hero's defense)
    "attackRange": 26,     // pixels — how close the hero must be
    "attackCooldown": 1.6, // seconds between punches
    "respawnSeconds": 3,
    "solid": true
  },
  // ---- Monsters (Milestone 6) --------------------------------------------
  //   "art"      : shape — slime, goose or boar.  "color": its main colour
  //   "style"    : how it moves — hop (slime), walk (goose), charge (boar)
  //   "aggro"    : how close (pixels) before it notices the hero
  //   "drops"    : loot. "chance" from 0 to 1, "min"/"max" how many
  //   "respawnSeconds": how long until another one shows up at its spot
  //   "shout"    : what it yells when it spots you (optional)
//   "shoutSound": a sound from data/sounds.js to play with it (optional)
  "slime": {
    "name": "Slime", "behavior": "monster", "art": "slime", "color": "#6dd36d", "style": "hop",
    "maxHp": 20, "attack": 4, "speed": 45, "aggro": 70, "attackRange": 14, "attackCooldown": 1.2,
    "respawnSeconds": 8,
    "drops": [ { "item": "slime_goo", "chance": 1, "min": 1, "max": 2 } ]
  },
  "blue_slime": {
    "name": "Blue Slime", "behavior": "monster", "art": "slime", "color": "#5b8fd6", "style": "hop",
    "maxHp": 35, "attack": 6, "speed": 50, "aggro": 70, "attackRange": 14, "attackCooldown": 1.1,
    "respawnSeconds": 10,
    "drops": [ { "item": "slime_goo", "chance": 1, "min": 2, "max": 3 }, { "item": "wet_fish", "chance": 0.1 } ]
  },
  "goose": {
    "name": "Angry Goose", "behavior": "monster", "art": "goose", "color": "#f4f1e8", "style": "walk",
    "maxHp": 30, "attack": 8, "speed": 70, "aggro": 90, "attackRange": 16, "attackCooldown": 0.9,
    "respawnSeconds": 10, "shout": "HONK!", "shoutSound": "honk",
    "drops": [ { "item": "goose_feather", "chance": 1, "min": 1, "max": 2 }, { "item": "straw_hat", "chance": 0.05 } ]
  },
  "boar": {
    "name": "Grumpy Boar", "behavior": "monster", "art": "boar", "color": "#8a5a2b", "style": "charge",
    "maxHp": 60, "attack": 12, "speed": 40, "aggro": 100, "attackRange": 18, "attackCooldown": 2,
    "respawnSeconds": 14, "shout": "SNORT!",
    "drops": [ { "item": "boar_hide", "chance": 1, "min": 1, "max": 1 }, { "item": "boar_tusk", "chance": 0.6, "min": 1, "max": 2 }, { "item": "rusty_sword", "chance": 0.05 } ]
  },

  // ---- The Forest ----
  "wolf": {
    "name": "Wolf", "behavior": "monster", "art": "wolf", "color": "#7a7f88", "style": "walk",
    "maxHp": 60, "attack": 14, "speed": 75, "aggro": 110, "attackRange": 16, "attackCooldown": 1,
    "respawnSeconds": 12, "shout": "AWOOO!",
    "drops": [ { "item": "wolf_pelt", "chance": 1, "min": 1, "max": 2 } ]
  },
  "shroomling": {
    "name": "Shroomling", "behavior": "monster", "art": "shroom", "color": "#c8323c", "style": "hop",
    "maxHp": 40, "attack": 9, "speed": 40, "aggro": 70, "attackRange": 14, "attackCooldown": 1.2,
    "respawnSeconds": 10,
    "drops": [ { "item": "slime_goo", "chance": 0.5 }, { "item": "wolf_pelt", "chance": 0.15 } ]
  },

  // ---- The Lake (sea monsters) ----
  "crab": {
    "name": "Snappy Crab", "behavior": "monster", "art": "crab", "color": "#e8642c", "style": "walk",
    "maxHp": 70, "attack": 15, "speed": 50, "aggro": 80, "attackRange": 16, "attackCooldown": 1.1,
    "respawnSeconds": 10, "shout": "*snip snip*",
    "drops": [ { "item": "crab_shell", "chance": 1, "min": 1, "max": 2 } ]
  },
  "serpent": {
    "name": "Lake Serpent", "behavior": "monster", "art": "serpent", "color": "#3f9f8f", "style": "charge",
    "maxHp": 140, "attack": 25, "speed": 45, "aggro": 110, "attackRange": 18, "attackCooldown": 1.6,
    "respawnSeconds": 16, "shout": "HSSSSS!",
    "drops": [ { "item": "crab_shell", "chance": 0.5 }, { "item": "wet_fish", "chance": 0.6 }, { "item": "knight_shield", "chance": 0.05 } ]
  },

  // ---- Knight Fortress ----
  "armored_slime": {
    "name": "Armoured Slime", "behavior": "monster", "art": "slime", "color": "#9aa0a8", "style": "hop",
    "maxHp": 200, "attack": 20, "speed": 40, "aggro": 70, "attackRange": 14, "attackCooldown": 1.3,
    "respawnSeconds": 12,
    "drops": [ { "item": "slime_goo", "chance": 1, "min": 2, "max": 4 }, { "item": "plate_armor", "chance": 0.05 }, { "item": "iron_helm", "chance": 0.1 } ]
  },

  // ---- Lava Fields ----
  "magma_slime": {
    "name": "Magma Slime", "behavior": "monster", "art": "slime", "color": "#e8541c", "style": "hop",
    "maxHp": 250, "attack": 35, "speed": 50, "aggro": 80, "attackRange": 14, "attackCooldown": 1.1,
    "respawnSeconds": 12,
    "drops": [ { "item": "ember_core", "chance": 0.7 }, { "item": "slime_goo", "chance": 1, "min": 1, "max": 2 } ]
  },
  "fire_imp": {
    "name": "Fire Imp", "behavior": "monster", "art": "imp", "color": "#b5300f", "style": "walk",
    "maxHp": 180, "attack": 45, "speed": 85, "aggro": 120, "attackRange": 16, "attackCooldown": 0.9,
    "respawnSeconds": 14, "shout": "HEHEHE!",
    "drops": [ { "item": "ember_core", "chance": 1, "min": 1, "max": 2 } ]
  },

  // ---- Dragon Mountain ----
  "drake": {
    "name": "Drake", "behavior": "monster", "art": "drake", "color": "#5b8f3a", "style": "charge",
    "maxHp": 400, "attack": 60, "speed": 50, "aggro": 120, "attackRange": 18, "attackCooldown": 1.8,
    "respawnSeconds": 16, "shout": "RAWR!",
    "drops": [ { "item": "dragon_scale", "chance": 0.5 }, { "item": "ember_core", "chance": 0.5 } ]
  },
  "dragon": {
    "name": "Grumbold the Ancient Dragon", "behavior": "monster", "art": "dragon", "color": "#a8302c", "style": "charge",
    "scale": 2,
    "maxHp": 5000, "attack": 400, "speed": 35, "aggro": 160, "attackRange": 40, "attackCooldown": 2.5,
    "respawnSeconds": 60, "shout": "WHO DARES DISTURB— oh, it's YOU. The shiny one.", "shoutSound": "roar",
    "drops": [ { "item": "dragon_scale", "chance": 1, "min": 3, "max": 5 }, { "item": "dragon_tooth_sword", "chance": 1 } ]
  },

  // ---- The Ancient Realm ----
  "golem": {
    "name": "Ancient Guardian", "behavior": "monster", "art": "golem", "color": "#b8b0c8", "style": "walk",
    "maxHp": 1500, "attack": 120, "speed": 30, "aggro": 110, "attackRange": 20, "attackCooldown": 2,
    "respawnSeconds": 20, "shout": "INTRUDER. ...OH. YOU AGAIN.",
    "drops": [ { "item": "ancient_shard", "chance": 1, "min": 1, "max": 2 } ]
  },

  "pen_chicken": {
    "name": "Chicken",
    "behavior": "chicken"  // pecks around forever; flees from people
  }
};
