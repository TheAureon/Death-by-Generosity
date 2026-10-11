// ===========================================================================
// MAP: Central City — medieval, full of true human warriors (Milestone 8).
//   Captain Valeria (1), Merchant Gus (2) by the fountain, Bard Fennick (3),
//   Sir Lancelittle (4). N = road north to the Plains, > = gate to Guard Town.
// ===========================================================================
DBG.addMap("city", {
  "name": "Central City",

  "legend": {
    "N": {"name": "North gate", "art": "path", "exit": "plains", "arrive": "fromCity"},
    ">": {"name": "East gate", "art": "path", "exit": "guardtown", "arrive": "fromCity", "requires": 3, "gateText": "EAST GATE GUARD: Guard Town admits only proven heroes. Gift {need} people to death first. (You: {have}.) It's bureaucracy."},
    "n": {"arrival": "fromPlains"},
    "e": {"arrival": "fromGuardtown"},
    "1": {"npc": "valeria"},
    "2": {"npc": "gus"},
    "3": {"npc": "fennick"},
    "4": {"npc": "lancelittle"}
  },

  "grid": `
########################NN########################
########################NN########################
##.....................cccc.....................##
##.....................cncc.....................##
##..RRRRRRR..KKKKKK....cccc....KKKKKK..RRRRRRR.,##
##..RRRRRRR..KKKKKK....cccc....KKKKKK..RRRRRRR..##
##..RRRRRRR..KKKKKK....cccc....KKKKKK..RRRRRRR..##
##..HWH+WHH..HWH+WH....cccc....HWH+WH..HWH+WHH..##
##....,................cccc.....................##
##....TT....T..........cccc.....................##
##..T....T.............cccc.....................##
##.....................cccc...........KKKKKKKK..##
##..............cccccccccccccccccc....KKKKKKKK..##
##.......T......ccccccccc1cccccccc....KKKKKKKK..##
##......O..T..,.cc3ccccccccccccccc....###+####..##
##..............cccccc~~~~~~cccccc..............##
##..............cccccc~~~~~~cccccc.......D.D....##
##cccccccccccccccccccccccccccccccccccccccccccccc##
##ccccccccccccccccccccccccccccccccccccccccccccec>>
##ccccccccccccccccccccccc2cccccccccccccccccccccc>>
##cccccccccccccccccccccccccccccc4ccccccccccccccc##
##..............cccccccccccccccccc..............##
##..............ccc$cccccccccccccc..............##
##..............cccccccccccccccccc.............,##
##..,...........cccccccccccccccccc..............##
##..KKKKKKK.....cccccccccccccccccc.....KKKKKKK..##
##..KKKKKKK............cccc............KKKKKKK..##
##..KKKKKKK..RRRRRR....cccc....RRRRRR..KKKKKKK..##
##..HWH+WHH..RRRRRR....cccc....RRRRRR..HWH+WHH..##
##..,........RRRRRR....cccc....RRRRRR...........##
##...........HWH+WH....cccc....HWH+WH..T........##
##.....................cccc...............,.....##
##..............,......cccc.....,............TT.##
##.....................cccc................T.T..##
##.......,.............cccc...................T.##
##.....................cccc.....................##
##################################################
##################################################
`
});
