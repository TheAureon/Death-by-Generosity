// ===========================================================================
// MAP: Central City — medieval, full of true human warriors (Milestone 8).
//   Captain Valeria (1), Merchant Gus (2) by the fountain, Bard Fennick (3),
//   Sir Lancelittle (4). Gates: N to the Plains, < to the Lake,
//   > to Guard Town, v to the Knight Fortress.
// ===========================================================================
DBG.addMap("city", {
  "name": "Central City",

  "legend": {
    "N": {"name": "North gate", "art": "path", "exit": "plains", "arrive": "fromCity"},
    ">": {"name": "East gate", "art": "path", "exit": "guardtown", "arrive": "fromCity", "warning": "EAST GATE GUARD: Guard Town's that way. Tougher folks. Try not to die. ...Oh, right. Try TO die."},
    "<": {"name": "West gate", "art": "path", "exit": "lake", "arrive": "fromCity"},
    "v": {"name": "South gate", "art": "path", "exit": "fortress", "arrive": "fromCity", "warning": "SOUTH GATE GUARD: Knight Fortress ahead. Proper knights. Heavy armour. Deep moat."},
    "n": {"arrival": "fromPlains"},
    "e": {"arrival": "fromGuardtown"},
    "w": {"arrival": "fromLake"},
    "z": {"arrival": "fromFortress"},
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
<<cwccccccccccccccccccccccccccccccccccccccccccec>>
<<ccccccccccccccccccccccc2cccccccccccccccccccccc>>
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
##.......,.............czcc...................T.##
##.....................cccc.....................##
########################vv########################
########################vv########################
`
});
