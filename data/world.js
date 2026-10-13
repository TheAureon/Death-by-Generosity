// ===========================================================================
// THE WORLD — how all the areas fit together into one big open map.
//
// Every area file in data/maps/ is the same size (64 x 48 tiles), so they
// sit next to each other like tiles on a board. Walk off the edge of one
// area and you're simply in the next one. No loading, no gates.
//
//   "layout" : rows of area names (file names in data/maps/), north at the top
//   "start"  : the area where a new game begins (its "P" tile)
//
// To move an area, swap names in the layout. To add one, make a new 64 x 48
// map file, add it to index.html, and put its name in the layout.
// ===========================================================================
DBG.data.world = {
  "name": "The World",
  "cellWidth": 64,
  "cellHeight": 48,
  "start": "village",

  "layout": [
    ["hills",  "village",   "oldwoods",  "edge"],
    ["lake",   "plains",    "forest",    "ancient"],
    ["marsh",  "city",      "guardtown", "dragon"],
    ["meadow", "kingsroad", "fortress",  "lava"]
  ]
};
