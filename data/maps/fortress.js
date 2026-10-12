// ===========================================================================
// MAP: Knight Fortress (Milestone 8). A courtyard (g) inside walls (#),
//   surrounded by a moat (~). Dame Ironsides (1) guards the north drawbridge,
//   Sir Clankston (2) loves the moat. Armoured Slimes (S) roam the courtyard.
//   N = road to Guard Town, < = road to Central City,
//   > = road east to the Lava Fields.
// ===========================================================================
DBG.addMap("fortress", {
  "name": "Knight Fortress",

  "legend": {
    "N": {"name": "Road to Guard Town", "art": "path", "exit": "guardtown", "arrive": "fromFortress"},
    "<": {"name": "Road to Central City", "art": "path", "exit": "city", "arrive": "fromFortress"},
    ">": {"name": "Road to the Lava Fields", "art": "path", "exit": "lava", "arrive": "fromFortress", "warning": "A SCORCHED SIGN: Lava Fields ahead. Bring a fire extinguisher. For THEM."},
    "n": {"arrival": "fromGuardtown"},
    "e": {"arrival": "fromLava"},
    "w": {"arrival": "fromCity"},
    "S": {"spawn": "armored_slime"},
    "1": {"npc": "ironsides"},
    "2": {"npc": "clankston"}
  },

  "grid": `
TTTTTTTTTTTTTTTTTTTTTTNNTTTTTTTTTTTTTTTTTTTTTT
TTTTTTTTTTTTTTTTTTTTTTNNTTTTTTTTTTTTTTTTTTTTTT
TT....................==....................TT
TT....................n=.,.....,............TT
TT....................==....................TT
TT....................==....................TT
TT....~~~~~~~~~~~~~~~~__~~~~~~~~~~~~~~~~....TT
TT....~~~~~~~~~~~~~~~~__~~~~~~~~~~~~~~~~....TT
TT....~~##############__##############~~....TT
TT....~~#gggggggggggggggggggggggggggg#~~....TT
TT....~~#ggggggggggggg1gggggggggggggg#~~....TT
TT....~~#ggg$gggKKKKKKKKKKKKKKggggggg#~~....TT
TT....~~#gggggggKKKKKKKKKKKKKKgggSggg#~~....TT
TT....~~#gggggggKKKKKKKKKKKKKKggggggg#~~....TT
TT....~~#ggggggg######+#######ggggggg#~~....TT
TT,...~~#gggggggggggggggggggggggggggg#~~....TT
TT....~~#gggggggggggggggggggggggggggg#~~....TT
TT....~~#gggggDggggggggggggggggDggggg#~~....TT
<<=w==___gggggggggggggggggggggggggggg___=e==>>
<<====___gggggggggggggggggggggggggggg___====>>
TT....~~#gggSgggggggggggggSgggggggggg#~~....TT
TT....~~#gggggggggggggggggggggggggggg#~~....TT
TT....~~#gggggggggggggggggggggggggggg#~~....TT
TT....~~#ggggggggSggggggggggggggggggg#~~....TT
TT....~~#ggggggggggggggggggggg2gggggg#~~....TT
TT....~~#gggggggggggggggggggggggggggg#~~....TT
TT....~~#gggggggggggggggggggggggggggg#~~....TT
TT....~~##############################~~....TT
TT....~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~....TT
TT....~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~....TT
TT..........................................TT
TT..........................................TT
TT....................,.....................TT
TT..........................................TT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
`
});
