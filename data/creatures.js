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
  "pen_chicken": {
    "name": "Chicken",
    "behavior": "chicken"  // pecks around forever; flees from people
  }
};
