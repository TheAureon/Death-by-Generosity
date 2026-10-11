// ===========================================================================
// MAP: The Lake — sea monsters (Milestone 8).
//   Old Finn (1) fishes off the dock. Snappy Crabs (X) on the beaches,
//   Lake Serpents (L) along the shore. > = road back to the Plains. $ = waystone.
// ===========================================================================
DBG.addMap("lake", {
  "name": "The Lake",

  "legend": {
    ">": {"name": "Road to the Plains", "art": "path", "exit": "plains", "arrive": "fromLake"},
    "e": {"arrival": "fromPlains"},
    "X": {"spawn": "crab"},
    "L": {"spawn": "serpent"},
    "1": {"npc": "finn"}
  },

  "grid": `
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
TTT................,.....T.......,..........TT
TT............................T.............TT
TT...............,..s............,..........TT
TT....,,......sssssssssssss..............,..TT
TT....T...Lsssssssss~sssssssss...,..........TT
TT.....,.sssss~~~~~~~~~~~~~sssss..T.........TT
TT......ssss~~~~~~~~~~~~~~~~~ssss...........TT
TT.....sss~~~~~~~~~~~~~~~~~~~~~ssX.,........TT
TT....sss~~~~s~~~~~~~~~~~~~~~~~~sss.........TT
TT...sss~~~sssss~~~~~~~~~~~~~~~~~sss........TT
TT..sss~~~~ssrss~~~~~~~~~~~~~~~~~~Lss.......TT
TT..sss~~~~sssss~~~~~~~~~~~~~~~~~~sss..$....TT
TT.sss~~~~~~~s~~~~~~~~~~~~~~~~~~~~~sss......TT
TT.ssX~~~~~~~~~~~~~~~~~~~~~~~~~~~~~sss.T....TT
TT.sss~~~~~~~~~~~~~~~~~~~~~~~~~~~~~sss..==e=>>
TT.ss~~~~~~~~~~~~~~~~~~~~~~~_1__________====>>
TT.sss~~~~~~~~~~~~~~~~~~~~~~~~~~~~~sss......TT
TT.sss~~~~~~~~~~~~~~~~~~~~~~~~~~~~~sss......TT
TT.sss~~~~~~~~~~~~~~~~~~~~~~~~~~~~~sss......TT
TT..sss~~~~~~~~~~~~~~~~~~~~~~~~~~~Lss,,.....TT
TT..ssL~~~~~~~~~~~~~~~~~~~~~~~~~~~sss.......TT
TT...sss~~~~~~~~~~~~~~~~~~~~~~~~~sss........TT
TT....sss~~~~~~~~~~~~~~~~~~~~~~~sss.........TT
TT.....sss~~~~~~~~~~~~~~~~~~~~~sss..X..,....TT
TT......ssss~~~~~~~~~~~~~~~~~ssss...........TT
TT......Xsssss~~~~~~~~~~~~~sssssT...........TT
TT.........sssssssss~sssssssss.......,......TT
TT............sssssssssssss.................TT
TT.........,........s.........X.............TT
TT..............T......,.T..................TT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
`
});
