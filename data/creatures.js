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
    "respawnSeconds": 10, "shout": "HONK!",
    "drops": [ { "item": "goose_feather", "chance": 1, "min": 1, "max": 2 }, { "item": "straw_hat", "chance": 0.05 } ]
  },
  "boar": {
    "name": "Grumpy Boar", "behavior": "monster", "art": "boar", "color": "#8a5a2b", "style": "charge",
    "maxHp": 60, "attack": 12, "speed": 40, "aggro": 100, "attackRange": 18, "attackCooldown": 2,
    "respawnSeconds": 14, "shout": "SNORT!",
    "drops": [ { "item": "boar_hide", "chance": 1, "min": 1, "max": 1 }, { "item": "boar_tusk", "chance": 0.6, "min": 1, "max": 2 }, { "item": "rusty_sword", "chance": 0.05 } ]
  },

  "pen_chicken": {
    "name": "Chicken",
    "behavior": "chicken"  // pecks around forever; flees from people
  }
};
