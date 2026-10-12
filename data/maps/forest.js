// ===========================================================================
// MAP: The Forest — generic monsters (Milestone 8).
//   Moss the Hermit (1) lives in the clearing, near two sinkholes (o).
//   Wolves (F), Shroomlings (G), a Grumpy Boar (Q). < = road to the Plains,
//   v = forest path south to Guard Town.
// ===========================================================================
DBG.addMap("forest", {
  "name": "The Forest",

  "legend": {
    "<": {"name": "Road to the Plains", "art": "path", "exit": "plains", "arrive": "fromForest"},
    "w": {"arrival": "fromPlains"},
    "v": {"name": "Path to Guard Town", "art": "path", "exit": "guardtown", "arrive": "fromForest", "warning": "Guard Town ahead: guards with real training. Still not enough training."},
    "z": {"arrival": "fromGuardtown"},
    "F": {"spawn": "wolf"},
    "G": {"spawn": "shroomling"},
    "Q": {"spawn": "boar"},
    "1": {"npc": "moss"}
  },

  "grid": `
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
TT...T...T........TT.T.......TT.TT..TTTTT.T.TT
TTTTT...TTTTTTTT......TT...T.T..T..T..TT....TT
TT.T...T..TTT..T..............TTT..T..T.....TT
TTT....TTT..TT.......TT..TTTT..TT.........TTTT
TTTT.TT.T..T.TTT..T...T.TT.....T..........T.TT
TT....T.TTTT..T..TT....T............F....TT.TT
TTT....T..T....TTT.T....T..TT.............TTTT
TT...T.T.TT..TT..TTT.T.T..............F..TT.TT
TT.T...T.T.........,.............,.......TTTTT
TT..T.TT.......TT..TM...G.................T.TT
TTT......T........M.,.............T..TT.....TT
TT..TT......T...TT,.$.M.......M.....T..T..T.TT
TT.T...T...T...TT.............oo.........T..TT
TT.........T..TTTT............oo....T.....T.TT
<<=w=================...M..1........TT..TT..TT
<<===================.............,....T.T.TTT
TT....T.T......T.,.,..G..........M.TTTTTTTTTTT
TT..T..T..T.....T,M........M.....,......T..TTT
TT.T.T.TT.....T..T.,.oo....M.G....,TT.,..T.TTT
TTTT......T.......T.M..,..........,.....TTT.TT
TT.T...T..T..........T..................T...TT
TTT...T.T.T.TT.T...T....TT................T.TT
TT..T..T...TT.T....T.T...,.TTT........F....TTT
TT..T.T....T..T..........TTT...............TTT
TT.T..T...TT.T.......T....T...T....F........TT
TT..T..T........T...T....TT.T.....Q.......TTTT
TT..T...T....T..T,.,T....T.,.TT.T.......T..TTT
TT.T.T..T....T.TT..TT.......T.TT...T.......TTT
TT..T..T......TT..TTT.z...T.T.T.T.T.T.T....TTT
TT.T.TTTT......T...T......T...........T....TTT
TTTTTTTTTTTTTTTTTTTTTTvvTTTTTTTTTTTTTTTTTTTTTT
TTTTTTTTTTTTTTTTTTTTTTvvTTTTTTTTTTTTTTTTTTTTTT
`
});
