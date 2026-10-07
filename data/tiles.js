// ===========================================================================
// TILE LEGEND — what each character in a map file means.
//
//   "art"    : which generated picture to use (see src/art/tileArt.js)
//   "solid"  : true = you can't walk through it
//   "object" : true = a tall thing (tree, rock...) drawn standing up, so you
//              can walk BEHIND it. Its "ground" is what's drawn underneath.
//   "copyNeighbor": true = looks like the tile to its left (used by "P",
//              so the start spot blends into a path, grass, sand...)
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
  "P": { "name": "Player start", "playerStart": true, "copyNeighbor": true }
};
