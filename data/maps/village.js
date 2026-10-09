// ===========================================================================
// MAP: Little Givington — the starting village (Milestone 5).
//
//   North-west : Farmer Bob's farm (straw-roof house, crops, chicken pen)
//   North-east : Brunhilde's forge (slate roof, hot coals *, anvil)
//   Centre     : town square (cobblestones) with the well O, Mayor's house
//   West       : Grandma Gertrude's house and flower garden
//   South-west : Kevin's house, the cliff % and the old mine shaft o
//   East       : the pond and the dock _ where Sir Reginald keeps watch
//   South      : the road out (closed for now — Milestone 8)
//
// Each character is one tile (see data/tiles.js). Numbers are villagers,
// C is a chicken, P is where the hero starts. Edit freely!
// ===========================================================================
DBG.addMap("village", {
  "name": "Little Givington",

  // Characters that only mean something on THIS map
  "legend": {
    "1": { "npc": "bob" },
    "2": { "npc": "gertrude" },
    "3": { "npc": "kevin" },
    "4": { "npc": "brunhilde" },
    "5": { "npc": "reginald" },
    "6": { "npc": "mayor" },
    "C": { "spawn": "pen_chicken" }
  },

  "grid": `
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
TT........................................................TT
TT........................................................TT
TT..YYYYYY..;;;;;;;;.B....................KKKKKKKK........TT
TT..YYYYYY..;;;;;;;;.......,.,........T,..KKKKKKKK........TT
TT..YYYYYY..;;;;;;;;,....T...........,....KKKKKKKK........TT
TT..HW+WHH..;;;;;;;;......................###+####........TT
TT....=====.;;;;;;;;....T,..........T...ccccccccccbc...T..TT
TT.......1=.;;;;;;;;....................ccc***cccccb......TT
TT.ffffff.=.;;;;;;;;......RRRRRRRR......ccc***ccaccc....,.TT
TT.fh..Cf.=...........,...RRRRRRRR......ccccccc4cccc......TT
TT.f.C....=...............RRRRRRRR.B....cxcccccccccc......TT
TT.f..C.f.=...............HWH+HWWH...........=......,.T...TT
TT.ffffff.=.................ccc.......========.......r....TT
TT........============cccccccccccccccc...,................TT
TT...,...,...RRRRRR...cbccccccccccccbc...B................TT
TT....,......RRRRRR..,cccccccccccccccc........,...........TT
TT...T.......RRRRRR...cccccccccccccccc....................TT
TT...........HW+HWH...cccccccOOccccccc..........sss~sss...TT
TT..........,..=======cccccccOOccccccc........ss~~~~~~~ss.TT
TT..........,,,.2,,,..cccccccccccccccc.......ss~~~~~~~~~ssTT
TT.....T..............ccccccc6cccccccc======_____5~~~~~~~sTT
TT....................cccccccccccccccc......s~~~~~~~~~~~~~TT
TT....................cxccccccccccccbc......s~~~~~~~~~~~~~TT
TT......,.......B.....cccccccccccccccc......s~~~~~~~~~~~~~TT
TT......................r....==.............s~~~~~~~~~~~~~TT
TT..T........................P=........,....s~~~~~~~~~~~~~TT
TT.................YYYYYY....==....D.........s~~~~~~~~~~~sTT
TT.................YYYYYY....==..............ss~~~~~~~~~ssTT
TT.......T.........YYYYYY....==......B........ss~~~~~~~ss.TT
TT.................HW+WHH....==.................sss~sss...TT
TT...................==========...........................TT
TT..B................3.......==...T.......................TT
TT.......,...................==...........................TT
TT......%%%%%%%%%%%%%%%%%%...==...........................TT
TT....,.%%%%%%%%%%%%%%%%%%...==..,......T...........T.....TT
TT..,..,...roo.......,.......==.!.........................TT
TT...,T,.,..oo...B...........==.....r.........T.......,.T.TT
TT......,.....r..............==,..........,...............TT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTffffTTTTTTTTTTTTTTTTTTTTTTTTTTTT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
`
});
