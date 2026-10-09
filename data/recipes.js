// ===========================================================================
// RECIPES — what Brunhilde can forge from monster bits.
//   "result": the item you get (id from data/items.js)
//   "needs" : which materials, and how many of each
// Add new recipes by copying a line.
// ===========================================================================
DBG.data.recipes = [
  { "result": "goo_sword",    "needs": { "slime_goo": 3 } },
  { "result": "slime_shield", "needs": { "slime_goo": 4 } },
  { "result": "feather_cape", "needs": { "goose_feather": 3 } },
  { "result": "hide_armor",   "needs": { "boar_hide": 2 } },
  { "result": "tusk_spear",   "needs": { "boar_tusk": 2, "slime_goo": 1 } }
];
