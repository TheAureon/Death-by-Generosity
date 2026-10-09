// ===========================================================================
// TILE LEGEND — what each character in a map file means.
//
//   "art"    : which generated picture to use (see src/art/tileArt.js)
//   "solid"  : true = you can't walk through it
//   "object" : true = a tall thing (tree, rock...) drawn standing up, so you
//              can walk BEHIND it. Its "ground" is what's drawn underneath.
//   "copyNeighbor": true = looks like the tiles around it (used by "P" and
//              creatures, so they blend into a path, grass, sand...)
//   "spawn"  : puts a creature here (name from data/creatures.js)
//   "hazard" : a label for later milestones (NPCs can fall in / burn / sink)
//
// To add a new tile: copy a line, pick an unused character, change values.
// ===========================================================================
DBG.data.tiles = {
  ".": { "name": "Grass",        "art": "grass" },
  ",": { "name": "Flowers",      "art": "flowers" },
  "=": { "name": "Dirt path",    "art": "path" },
  "_": { "name": "Wood planks",  "art": "planks" },
  "s": { "name": "Sand",         "art": "sand" },
  "#": { "name": "Stone wall",   "art": "wall",  "solid": true },
  "~": { "name": "Water",        "art": "water", "solid": true, "hazard": "water" },
  "^": { "name": "Lava",         "art": "lava",  "solid": true, "hazard": "lava" },
  "o": { "name": "Pit",          "art": "pit",   "solid": true, "hazard": "pit" },
  "%": { "name": "Cliff",        "art": "cliff", "solid": true, "hazard": "cliff" },
  "T": { "name": "Tree",         "art": "tree",  "solid": true, "object": true, "ground": "." },
  "B": { "name": "Bush",         "art": "bush",  "solid": true, "object": true, "ground": "." },
  "r": { "name": "Rock",         "art": "rock",  "solid": true, "object": true, "ground": "." },
  "f": { "name": "Fence",        "art": "fence", "solid": true, "object": true, "ground": "." },
  // ---- Village ----
  "c": { "name": "Cobblestone",  "art": "cobble" },
  ";": { "name": "Crops",        "art": "crops" },
  "R": { "name": "Red roof",     "art": "roof_red",   "solid": true },
  "Y": { "name": "Straw roof",   "art": "roof_straw", "solid": true },
  "K": { "name": "Slate roof",   "art": "roof_slate", "solid": true },
  "H": { "name": "House wall",   "art": "house_wall",   "solid": true },
  "W": { "name": "Window",       "art": "house_window", "solid": true },
  "+": { "name": "Door",         "art": "house_door",   "solid": true },
  "*": { "name": "Forge coals",  "art": "coals", "solid": true, "hazard": "forge" },
  "O": { "name": "Well",         "art": "well",  "solid": true, "hazard": "well" },
  "a": { "name": "Anvil",        "art": "anvil",    "solid": true, "object": true, "ground": "c" },
  "h": { "name": "Haystack",     "art": "haystack", "solid": true, "object": true, "ground": "." },
  "b": { "name": "Barrel",       "art": "barrel",   "solid": true, "object": true, "ground": "c" },
  "x": { "name": "Crate",        "art": "crate",    "solid": true, "object": true, "ground": "=" },
  "!": { "name": "Signpost",     "art": "signpost", "solid": true, "object": true, "ground": "=" },

  "P": { "name": "Player start", "playerStart": true, "copyNeighbor": true },
  "D": { "name": "Training dummy", "spawn": "training_dummy", "solid": true, "copyNeighbor": true }
};
