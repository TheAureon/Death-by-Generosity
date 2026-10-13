// ===========================================================================
// MAP: Knight Fortress (Milestone 8). A courtyard (g) inside walls (#),
//   surrounded by a moat (~). Dame Ironsides (1) guards the north drawbridge,
//   Sir Clankston (2) loves the moat. Armoured Slimes (S) roam the courtyard.
//   road to Guard Town, road to Central City,
//   road east to the Lava Fields.
// ===========================================================================
// OPEN WORLD: this area is one 64x48 piece of the big seamless world.
// Where it sits is set in data/world.js. Its edges are open: walk off any
// side and you're in the next area. Roads (=) link up with the neighbours.
DBG.addMap("fortress", {
  "name": "Knight Fortress",

  "legend": {
    "n": {"arrival": "fromGuardtown"},
    "e": {"arrival": "fromLava"},
    "w": {"arrival": "fromCity"},
    "S": {"spawn": "armored_slime"},
    "1": {"npc": "ironsides"},
    "2": {"npc": "clankston"}
  },

  "grid": `
.....,.......T.,.....,.........==...........................d.B.
......,..........T.......,,....==.B.,...............T....B...d..
.....r..,...,,.....,T...,T,,...==...............T.......,...Td.B
,......,...................B...==........,..................d.dd
....r....B.....................==..T.,.........T.T..............
.....,.......T....T..T..,r.....==..............................d
.........,.,.............,.....==..............,...........B.ddd
.........T.T.,.......r......r..==....B...r,..T.........B........
.T....,........................==.........................B...dd
,..,...........................n=.,.....,.......................
..T............................==.............................dd
........T......................==.........................r....d
........,......~~~~~~~~~~~~~~~~__~~~~~~~~~~~~~~~~.....,.T.....r,
...............~~~~~~~~~~~~~~~~__~~~~~~~~~~~~~~~~.....T...,...dd
.....T.,,,.....~~##############__##############~~..............,
,.,............~~#gggggggggggggggggggggggggggg#~~...............
....T..........~~#ggggggggggggg1gggggggggggggg#~~......,....d.,d
...............~~#ggg$gggKKKKKKKKKKKKKKggggggg#~~....,T..,..dd.B
...............~~#gggggggKKKKKKKKKKKKKKgggSggg#~~...............
T..............~~#gggggggKKKKKKKKKKKKKKggggggg#~~....T....,.T.dd
...B.....T.....~~#ggggggg######+#######ggggggg#~~...........d.dd
..,........,...~~#gggggggggggggggggggggggggggg#~~.......T.....dd
...............~~#gggggggggggggggggggggggggggg#~~..............d
====...........~~#gggggDggggggggggggggggDggggg#~~...........====
============w==___gggggggggggggggggggggggggggg___=e=============
..=============___gggggggggggggggggggggggggggg___=============..
...............~~#gggSgggggggggggggSgggggggggg#~~............d..
.,T..B.........~~#gggggggggggggggggggggggggggg#~~...........d..d
........r......~~#gggggggggggggggggggggggggggg#~~...........dddd
...............~~#ggggggggSggggggggggggggggggg#~~............d..
......B........~~#ggggggggggggggggggggg2gggggg#~~...............
...............~~#gggggggggggggggggggggggggggg#~~.....T...T.....
...............~~#gggggggggggggggggggggggggggg#~~.............T.
......r........~~##############################~~...........d.d.
r,.............~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~...............
.....T.,.......~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~.....T.B.,..T..
.........r...................................................d.d
..........................................................T....d
...B.,.........................,.....................,......T,dd
..,...................................................,.........
......T.......T...................T....,...............B..,..ddd
.................,.............,....,....B..,..............B.ddd
.T,.....T...T........,T.T...........,..........T........T.,..d,.
......,....,.....,.r................................r....,......
.........,.............,..,..,,........T..................T.d.dd
..,....T..T..........................T................T......,..
..........................B,..................,.......,........d
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
`
});
