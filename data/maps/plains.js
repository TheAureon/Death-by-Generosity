// ===========================================================================
// MAP: The Plains — monster farming grounds south of the village (Milestone 6).
//
//   North      : the road back to Little Givington (@ = exit)
//   West       : open grass with Slimes (S) and Blue Slimes (U)
//   Middle     : a ravine (%) and a sinkhole (o)
//   South-west : the goose pond, home of the Angry Geese (G)
//   East       : the forest, where Grumpy Boars (Q) live
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
           "sign": "Road to Central City. Closed until Milestone 8. (The road crew died. Of thorns.)" },
    "S": { "spawn": "slime" },
    "U": { "spawn": "blue_slime" },
    "G": { "spawn": "goose" },
    "Q": { "spawn": "boar" }
  },

  "grid": `
TTTTTTTTTTTTTTTTTTTTTTTTT@@TTTTTTTTTTTTTTTTTTTTTTTTT
TTTTTTTTTTTTTTTTTTTTTTTTT@@TTTTTTTTTTTTTTTTTTTTTTTTT
TT.......................==.......................TT
TT...................,...&=,......................TT
TT................,.....!==.,......,...T...T.T..T.TT
TT............S........,.==.........TT.TTTT.,.....TT
TT..,...S.........r......==.......T.,...T.T.....,TTT
TT................U......==....,,T..,.T..TT...TTTTTT
TT....B..............r...==..S...,T..T.T.T.TT....TTT
TT........,..B.r......Br.==.........T.........T...TT
TT............%%%%%%%%%..==..................T....TT
TT.......,B...%%%%%%%%%..==.B....TT.T...Q....T....TT
TT.......................==.U.....TTT............TTT
TT...B.B.................==......TT.......Q.......TT
TT....,..S,...........,..==....r...............T..TT
TT...,.......,......S....==...S,........T.T..T,...TT
TT....,......,...,.......==r.....TT..TT......T....TT
TT.......................==..,......T.....TT.TT...TT
TT.......................==..........TT.T....TT.T.TT
TT.............B.....,...==..,...TTT.,.....T.TT..TTT
TT......====================================.T....TT
TT...G............,.........,..........T...=T.....TT
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
TT..G..............G..............................TT
TT................................................TT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
`
});
