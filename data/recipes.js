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
  { "result": "tusk_spear",   "needs": { "boar_tusk": 2, "slime_goo": 1 } },
  { "result": "pelt_cape",    "needs": { "wolf_pelt": 3 } },
  { "result": "crab_shield",  "needs": { "crab_shell": 4 } },
  { "result": "ember_blade",  "needs": { "ember_core": 4 } },
  { "result": "dragon_armor", "needs": { "dragon_scale": 4, "ember_core": 2 } },
  { "result": "godslayer",    "needs": { "ancient_shard": 5, "dragon_scale": 3 } }
];
