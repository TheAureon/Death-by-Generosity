// ===========================================================================
// MAP: The Plains — monster farming grounds south of the village (Milestone 6).
//
//   North      : the road back to Little Givington (@ = exit)
//   West < to the Lake, East > to the Forest, South v to Central City
//   $ = waystone (fast travel)
//   West       : open grass with Slimes (S) and Blue Slimes (U)
//   Middle     : a ravine (%) and a sinkhole (o)
//   South-west : the goose pond, home of the Angry Geese (G)
//   East       : the forest, where Grumpy Boars (Q) live
//   Road       : Rudy the Bandit (7) hangs around here
//
// Monsters are defined in data/creatures.js. & is where you arrive.
// ===========================================================================
DBG.addMap("plains", {
  "name": "The Plains",

  "legend": {
    "@": { "name": "Road to the village", "art": "path", "exit": "village", "arrive": "fromPlains" },
    "&": { "arrival": "fromVillage" },
    "!": { "name": "Signpost", "art": "signpost", "solid": true, "object": true, "ground": ".",
           "sign": "THE PLAINS. Monsters ahead. Don't worry: they will lose. Bring their bits to Brunhilde's forge." },
    "?": { "name": "Signpost", "art": "signpost", "solid": true, "object": true, "ground": ".",
           "sign": "SOUTH: Central City. WEST: the Lake. EAST: the Forest. (The City only lets in heroes who have gifted at least 1 person to death.)" },
    "<": { "name": "Road to the Lake", "art": "path", "exit": "lake", "arrive": "fromPlains" },
    ">": { "name": "Road to the Forest", "art": "path", "exit": "forest", "arrive": "fromPlains" },
    "v": { "name": "Road to Central City", "art": "path", "exit": "city", "arrive": "fromPlains", "requires": 1,
           "gateText": "CITY GATE GUARD: Halt! Only heroes who've gifted {need} person to death may enter Central City. (You: {have}.)" },
    "w": { "arrival": "fromLake" },
    "e": { "arrival": "fromForest" },
    "z": { "arrival": "fromCity" },
    "S": { "spawn": "slime" },
    "U": { "spawn": "blue_slime" },
    "G": { "spawn": "goose" },
    "Q": { "spawn": "boar" },
    "7": { "npc": "rudy" }
  },

  "grid": `
TTTTTTTTTTTTTTTTTTTTTTTTT@@TTTTTTTTTTTTTTTTTTTTTTTTT
TTTTTTTTTTTTTTTTTTTTTTTTT@@TTTTTTTTTTTTTTTTTTTTTTTTT
TT.......................==.......................TT
TT...................,...&=,......................TT
TT................,.....!==$,......,...T...T.T..T.TT
TT............S........,.==.........TT.TTTT.,.....TT
TT..,...S.........r......==.......T.,...T.T.....,TTT
TT................U......==....,,T..,.T..TT...TTTTTT
TT....B..............r...==..S...,T..T.T.T.TT....TTT
TT........,..B.r......Br.==.........T.........T...TT
TT............%%%%%%%%%..==..................T....TT
TT.......,B...%%%%%%%%%..==.B....TT.T...Q....T....TT
TT.......................==.U.....TTT............TTT
TT...B.B.................==......TT.......Q.......TT
TT....,..S,...........,..7=....r...............T..TT
TT...,.......,......S....==...S,........T.T..T,...TT
TT....,......,...,.......==r.....TT..TT......T....TT
TT.......................==..,......T.....TT.TT...TT
TT.......................==..........TT.T....TT.T.TT
TT.............B.....,...==..,...TTT.,.....T.TT..TTT
<<=w============================================e=>>
<<...G............,.........,..........T...=......>>
TT....,..........G,.........,........T,...T=T.T..TTT
TT...,...sss~sss.................T.......TT=......TT
TT.....ss~~~~~~~ss...,....................T=..T...TT
TT....s~~~~~~~~~~~s.......................T=T.....TT
TT....s~~~~~~~~~~~s....,.....oo..T....Q.,..=.T.T,TTT
TT.,.s~~~~~~~~~~~~~s.........oo..T.........=.,.T..TT
TT....s~~~~~~~~~~~s............,...........=T...T.TT
TT....s~~~~~~~~~~~s...............TT...T...=TTTT..TT
TT.....ss~~~~~~~ss................TTT..,TT.=......TT
TT....,..sss~sss.................T..T...TT.=?.....TT
TT..G..............G.......................z......TT
TT.........................................=......TT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTvvTTTTTTT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTvvTTTTTTT
`
});
