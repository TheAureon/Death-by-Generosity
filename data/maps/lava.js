// ===========================================================================
// MAP: Lava Fields — lava monsters (Milestone 8). Basalt (d), a river of
//   lava (^) with rock bridges. Ignatius the Fire-Juggler (1) by a lava pool.
//   Magma Slimes (S), Fire Imps (J). to the Fortress, up Dragon Mountain.
// ===========================================================================
// OPEN WORLD: this area is one 64x48 piece of the big seamless world.
// Where it sits is set in data/world.js. Its edges are open: walk off any
// side and you're in the next area. Roads (=) link up with the neighbours.
DBG.addMap("lava", {
  "name": "Lava Fields",

  "legend": {
    "w": {"arrival": "fromFortress"},
    "n": {"arrival": "fromDragon"},
    "S": {"spawn": "magma_slime"},
    "J": {"spawn": "fire_imp"},
    "1": {"npc": "ignatius"}
  },

  "grid": `
.kdkkddkkddkkdkdddddkkkkkkkdkkk==kddkkkrdddkkddddkdkdkdkdkkkddk#
d.kdddkrddddkkddddkkdkdkdddkddk==kdddkkkdddddddddddddkdddkrkrdd#
d..dkkddddkddddddkkddddddddkddd==ddkdddkddddkdkdddddddrdddddddd#
..d.dddddddddddddddkdkdddkddddd==dkdkddddddrdddrdddddddddrddrdd#
d..ddrddddddddrdddddddddddddddd==ddrddddddddddddddddddddddddddd#
.dddddddddddddddddddddddddddddd==ddddddddddddddddddrddddddddddd#
d.ddddddddddddddddddddddddddddd==ddddrddddddddddddddddddddddddd#
dddddddddddddddrddddddddddddddddddddddddddddddddddddddddddddddd#
.dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd#
.d.dddddddddddddddddddddddddrddddddddddddddrddddddddddddddddddd#
.ddddddddddddddddddddddddddddddnddddddddddddddddddddddrdddddddd#
rdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd#
dddddddddddddddddddddddddddddddddddddddddd^dddddddddddddddddddd#
.d.drddddddddddSdddddddddddJdddddddddddd^^^^^dddddddddddddddddd#
dd.ddddddddddddddddddddddddddddddddrdd1^^^^^^^dddddddddddrddddr#
d.dddddddddddddddddddddddddddddddddddddd^^^^^dddddddddddddddddd#
...dddddddrddddddddddddrdddddddddddddddddd^dddddddrdddddddddddd#
.ddddddddddddddddddddddddddddd^^^dd^ddddddddddddddSdddddrdddddd#
..ddddddddddddddddrdddddddddd^^^^dd^^dddddddddddddddddddddddddd#
dddddddddddddddddddddddddddr^^^^^dd^^^ddddddddddddddddddddddddd#
ddddddrdddddddddddddddddddd^^^dddddd^^^dddddddddddddddddddddddr#
ddddrddddddddddddddddddddd^^^dddddddd^^^ddddddddddddddddddddddd#
.dddddddddddddddddddddddd^^^dddddddddd^^^dddddddddddddddddddddd#
====dddddddddddddddddddd^^^dddddddddddd^^^ddddddddddddddddddddd#
====dddddddddddddddddddd^^dddddddddddddd^^^dddddddddddddddddddd#
.d=======dddwdddddddddd^^dddddddddddddddd^^^ddddddddddddddddddd#
.d=======dddddddddddrd^^dddddddddddddddddr^^^dddddddddddddddddr#
dddddddddddddddddddd^^^^ddddddddddddddddddd^^^dddddd^dddddddddd#
d.dddddddddd^^^^^^dd^^^ddddddddddddddddddddd^^^dJ^^^^dddddddddd#
..ddddddddddd^^^^^dd^^ddddddddddddddddddddddd^^dd^^^^dddddddddd#
ddddddrdddddd$^^^^dddddddddddddddddddddddddddd^dd^^^ddddddddddd#
.ddddddddddddddddddddddddddddddddddddddSddddddddddddddddddddddd#
ddd.ddddddrdddddddd^ddddddddddddddddddddddddd^ddddddddddddrdddd#
.dd.ddddddddddddd^^^^^dddSdddddddddddddddddd^^^dddddddddddddddd#
d.d.dddddddddddd^^^^^^^dddddddddddddddddddd^^^^^ddddddddddddddd#
dd.ddddddrddddddd^^^^^drdddddddddddddddddddd^^^dddddddddddddddr#
...dddddddddddddddd^ddddddddddddddddddddddddd^dddddddddddrddddd#
ddddrddddddddddddddddddddddddddddddJddddddddddddddddddddddddddd#
dd.dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddr#
..dddddddddddddddddddrdddddddddddddddddrdddddddrddddddddddddddd#
dd.ddddddddrddrddddddddddddddddddddddddddddddddddddrddddddddddr#
.dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd#
d..dddddddddddddddddddddddddrdddddddddddddddddddddddddddddddddd#
...drddddddddddddddddddddddddddddddddddddddddddddddrddddddddddd#
.ddddddddddddddddddddddddddddddddddrdddddddddddddddddddrddddddr#
....ddddddddddddrddddddddddddddddddddddddddddddddrddddddddddddd#
dddddddddrddddddddddddddddddddddddddddddddddddddddddddddddddddd#
################################################################
`
});
