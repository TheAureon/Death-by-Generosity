// ===========================================================================
// MAP: Guard Town (Milestone 8). Sergeant Brick (1), Guard Pete (2) in the
//   training yard, Guard Repeat (3) by the chicken coop. Wolves (F) prowl.
//   < = road back to the City, v = road south to the Knight Fortress.
// ===========================================================================
DBG.addMap("guardtown", {
  "name": "Guard Town",

  "legend": {
    "<": {"name": "Road to Central City", "art": "path", "exit": "city", "arrive": "fromGuardtown"},
    "v": {"name": "Road to the Knight Fortress", "art": "path", "exit": "fortress", "arrive": "fromGuardtown", "requires": 5, "gateText": "SIGN: Knight Fortress. Only heroes who've gifted {need} people to death may approach. (You: {have}.)"},
    "w": {"arrival": "fromCity"},
    "z": {"arrival": "fromFortress"},
    "F": {"spawn": "wolf"},
    "C": {"spawn": "pen_chicken"},
    "1": {"npc": "brick"},
    "2": {"npc": "pete"},
    "3": {"npc": "repeat"}
  },

  "grid": `
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
TT.........................,................TT
TT............,.###.......###...............TT
TT..KKKKKKKKKK..###.......###.KKKKKKKKKKKK..TT
TT..KKKKKKKKKK..###,......###.KKKKKKKKKKKK..TT
TT..KKKKKKKKKK..###.......###.KKKKKKKKKKKK..TT
TT..####+#####................#####+######..TT
TT..........................................TT
TT..........................................TT
TT...........T................T......T......TT
TT...,.TF.......T.....................F.....TT
TT...,..T..............,....T...............TT
TT.................$...................T....TT
TT,.......T.,........T..,...................TT
TT..........................................TT
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
