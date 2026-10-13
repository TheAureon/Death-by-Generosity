// ===========================================================================
// MAP: Dragon Mountain (Milestone 8). Switchback cliffs (%), lava pools (^).
//   Derek the Dragon Fan (1), Drakes (L), and Grumbold the Ancient Dragon (X)
//   in his lair at the top. down to the Lava Fields, the Ancient Realm.
// ===========================================================================
// OPEN WORLD: this area is one 64x48 piece of the big seamless world.
// Where it sits is set in data/world.js. Its edges are open: walk off any
// side and you're in the next area. Roads (=) link up with the neighbours.
DBG.addMap("dragon", {
  "name": "Dragon Mountain",

  "legend": {
    "z": {"arrival": "fromLava"},
    "n": {"arrival": "fromAncient"},
    "L": {"spawn": "drake"},
    "X": {"spawn": "dragon"},
    "1": {"npc": "derek"}
  },

  "grid": `
.k.rkrkkkkkkkkkkkkkkkkkkkkkkkkk==krkkrkkkkkkkkkkkkkkkkkkkrkkkkk#
.kkkkkkkkkkkkkkrkkkkkkkrkkkkkkk==kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk#
kk..kkkkkkkkkkkkkkkkkkkkkrkkkkk==kkkkkkrkkkkkkkkkkkkkkkkkkkkkkr#
.k.kkkkkkkkkkkkkkkkkkkkkkkkkkrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkrkkk#
k.kkrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkrkkkkkkkkkkkkkr#
.k.kkkkkkkkkkkkkkkkkkkkrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk#
.kkkkkkkkkkkkkkkkkkkkkkkkkkkkkknkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk#
rkkkkkkkkkkkkkkkkkkkkk^^^kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk#
k.r.kkkkkkkkkkkkkkkkk^^^^^kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk#
kkkkkrkkkkkkkkkkkkkkkk^^^kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk#
rkk.kkkkkkkkkkkkkkkkkkkkkkkkkkkkXkkkkkkk^^^kkkkkkkkkkkkkkkkkkkk#
..kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk^^^^^kkkkkkkkkkkrkkkkkkk#
...kkkkkkkkkkkkkkkkkkkrkkkrkkkkkkkkkkkkk^^^kkkkkkkkkkkkkkkkkkkk#
.k.kkrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkrkkkkkkkkkkkkkkkkrkkkk#
.k.kkkkkkkkkkkkrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk#
.kkkkrkrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkrkkkkkkkkkk#
kkkkkkkkkkkk%%%%%%%%%%%%%%%%%%%%%%%%%%%kkkkkkkkkkkkkkkkkkkkkkkk#
kk.kkkkkkkkk%%%%%%%%%%%%%%%%%%%%%%%%%%%kkkkkkkkkkkkkkkkkkkkkkkk#
kkkkrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk#
k.kkkkkkkkkkkkkkk^kkkkkkrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk#
.kkkkkkkkkkkkkk^^^^^kkkkkkkkkkkkkkkkkkkkkkkkLkkkkkkkkkkrkrkkrkk#
kkkkkkkkkkkkkk^^^^^^^kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk#
k.kkkkkkkkkkkkk^^^^^Lkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkrkkkkk#
..kkrkkkkkkkkkkkk^kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk#
kkkkkkkkkkkkkkkkkkkkrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk#
k.kkkkkkkkkkkkkkkkkkkkkk%%%%%%%%%%%%%%%%%%%%%%%%%%%%kkkkkkkkkkk#
kkkkkkkkkkkkrkkkkkkkkkkk%%%%%%%%%%%%%%%%%%%%%%%%%%%%kkkkkkkkkkk#
..kkrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkrkkkkkkkk#
k..kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk#
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk1kkkkkkkkkkkkkkkkkkkkkkkkkkkkrkkk#
k.kkkrkkrkkkkkkkkkLkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkrk#
krk.kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkrkkkkLkkkkkkkkkkkkkkkkk#
.k.kkkkkkkkkkkkkkkkkkkkkkkkkkkkkrkkkkkkkkkkkkkkkkkkkkkkkkkrkrkk#
.k.kkkkrkkkkkkkkkkkkkkkkkkkrkkkkkkkkkkkkkkkkkkkkkkkkkkrkkkkkkkk#
kk.kkkkkkkkk%%%%%%%%%%%%%%%%%%%%%%%%%%%%%kkkkkkkkkkkkkkkkkkkkrk#
rkkkkkkkkkkk%%%%%%%%%%%%%%%%%%%%%%%%%%%%%kkkkk^kkkkkkkkkkkkkkkk#
kkk.kkkkkkrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk^^^^^kkkkkkkkkkkkkk#
.kkrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk^^^^^^^kkkkkkkkkkkkk#
kkkkkkkkkkkkrkkkkkkkkkkkkkkrkkkkkkkkkkkkkrkk^^^^^kkkkkkkkkkkkkk#
..kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk^kkkkkkkkkkkkkkkk#
rkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk$kkkkkkkkkkkkkkkkrkkkkkkkkkk#
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkzkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk#
kkrkkkkkkkrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk#
.kkkkkkkkkkkkkkkkkkkrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkrkkkkkkkkkk#
k.kkdkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkrkkkrkkkrkkkkkkkkkkkk#
kdddkkddddkddkkkkkrkkkkkddkdrkk==kkkkdkkkkkkddkkkkkkkdkdkdkkkkk#
rdkkkkkdddrkdrkddkkkkkkkkkkdkkk==kkkkkddkkdkkkddkddkkdkdkrkkkdk#
d.dkkkddddkdkdkkdkkdrdddrdkddkk==kddkdkkdkdddddkkddkkkrkkkkkkkk#
`
});
