// ===========================================================================
// MAP: Guard Town (Milestone 8). Sergeant Brick (1), Guard Pete (2) in the
//   training yard, Guard Repeat (3) by the chicken coop. Wolves (F) prowl.
//   < = road to the City, N = forest path to the Forest,
//   v = road south to the Knight Fortress.
// ===========================================================================
DBG.addMap("guardtown", {
  "name": "Guard Town",

  "legend": {
    "<": {"name": "Road to Central City", "art": "path", "exit": "city", "arrive": "fromGuardtown"},
    "N": {"name": "Path to the Forest", "art": "path", "exit": "forest", "arrive": "fromGuardtown"},
    "v": {"name": "Road to the Knight Fortress", "art": "path", "exit": "fortress", "arrive": "fromGuardtown", "warning": "SIGN: Knight Fortress ahead. Proper knights. Heavy armour. Deep moat."},
    "w": {"arrival": "fromCity"},
    "z": {"arrival": "fromFortress"},
    "n": {"arrival": "fromForest"},
    "F": {"spawn": "wolf"},
    "C": {"spawn": "pen_chicken"},
    "1": {"npc": "brick"},
    "2": {"npc": "pete"},
    "3": {"npc": "repeat"}
  },

  "grid": `
TTTTTTTTTTTTTTTTTTTTTTNNTTTTTTTTTTTTTTTTTTTTTT
TTTTTTTTTTTTTTTTTTTTTTNNTTTTTTTTTTTTTTTTTTTTTT
TT....................cc...,................TT
TT............,.###...nc..###...............TT
TT..KKKKKKKKKK..###...cc..###.KKKKKKKKKKKK..TT
TT..KKKKKKKKKK..###,..cc..###.KKKKKKKKKKKK..TT
TT..KKKKKKKKKK..###...cc..###.KKKKKKKKKKKK..TT
TT..####+#####........cc......#####+######..TT
TT....................cc....................TT
TT....................cc....................TT
TT...........T........cc......T......T......TT
TT...,.TF.......T.....cc..............F.....TT
TT...,..T.............cc....T...............TT
TT.................$..cc...............T....TT
TT,.......T.,........Tcc,...................TT
TT....................cc....................TT
<<cwccccccccccccccccccccccccccccccccccccccccTT
<<ccccccccccccccccccccccccccccccccccccccccccTT
TT..................1.cc....................TT
TT.......,,...........cc....................TT
TT..fffffffffff....,..cc.,..................TT
TT..f.........f.......cc......ffffffff......TT
TT..f....2....f.......cc......f......f......TT
TT..f..D......f.......cc......f.C....f......TT
TT..f.................cc....3....h,..f......TT
TT..f.....D...f.......cc......f....C.f......TT
TT..f.,......,f.......cc......f......f..oo..TT
TT..f.........f.......cc......ffffffff..oo..TT
TT..fffffffffff.......cc....................TT
TT.............,......cc............,.......TT
TT....................zc................F...TT
TT....................cc....................TT
TTTTTTTTTTTTTTTTTTTTTTvvTTTTTTTTTTTTTTTTTTTTTT
TTTTTTTTTTTTTTTTTTTTTTvvTTTTTTTTTTTTTTTTTTTTTT
`
});
