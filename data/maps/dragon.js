// ===========================================================================
// MAP: Dragon Mountain (Milestone 8). Switchback cliffs (%), lava pools (^).
//   Derek the Dragon Fan (1), Drakes (L), and Grumbold the Ancient Dragon (X)
//   in his lair at the top. v = down to the Lava Fields, N = the Ancient Realm.
// ===========================================================================
DBG.addMap("dragon", {
  "name": "Dragon Mountain",

  "legend": {
    "v": {"name": "Path down to the Lava Fields", "art": "rockfloor", "exit": "lava", "arrive": "fromDragon"},
    "N": {"name": "Door to the Ancient Realm", "art": "rockfloor", "exit": "ancient", "arrive": "fromDragon", "requires": 12, "gateText": "A GLOWING DOOR: The Ancient Realm opens only for those who have gifted {need} people to death. (You: {have}.)"},
    "z": {"arrival": "fromLava"},
    "n": {"arrival": "fromAncient"},
    "L": {"spawn": "drake"},
    "X": {"spawn": "dragon"},
    "1": {"npc": "derek"}
  },

  "grid": `
#####################NN#####################
#####################NN#####################
##kkkkkkkkkkkrkkkkkkkkkkkkkkkkkkkkkkkkkkkk##
##kkkkkkkkkkkkkkkkkkknkkkkkkkkkkkkkkkkkkkk##
##kkkkkkkkkk^^^kkkkkkkkkkkkkkkkkkkkkkkkkkk##
##kkkkkkkkk^^^^^kkkkkkkkkkkkkkkkkkkkkkkkkk##
##kkkkkkkkkk^^^kkkkkkkkkkkkkkkkkkkkkkkkkkk##
##kkkkkkkkkkkkkkkkkkkkXkkkkkkk^^^kkkkkkkkk##
##kkkkkkkkkkkkkkkkkkkkkkkkkkk^^^^^kkkkkkkk##
##kkkkkkkkkkrkkkrkkkkkkkkkkkkk^^^kkkkkkkkk##
##kkkkkkkkkkkkkkkkkkkkkkkkkkkkkrkkkkkkkkkk##
##kkkrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk##
##kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk##
##%%%%%%%%%%%%%%%%%%%%%%%%%%%kkkkkkkkkkkkk##
##%%%%%%%%%%%%%%%%%%%%%%%%%%%kkkkkkkkkkkkk##
##kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk##
##kkkkk^kkkkkkrkkkkkkkkkkkkkkkkkkkkkkkkkkk##
##kkk^^^^^kkkkkkkkkkkkkkkkkkkkkkkkLkkkkkkk##
##kk^^^^^^^kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk##
##kkk^^^^^Lkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk##
##kkkkk^kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk##
##kkkkkkkkrkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk##
##kkkkkkkkkkkk%%%%%%%%%%%%%%%%%%%%%%%%%%%%##
##rkkkkkkkkkkk%%%%%%%%%%%%%%%%%%%%%%%%%%%%##
##kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk##
##kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk##
##kkkkkkkkkkkkkkkkkk1kkkkkkkkkkkkkkkkkkkkk##
##kkkkkkLkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk##
##kkkkkkkkkkkkkkkkkkkkkkkkkkkkrkkkkLkkkkkk##
##kkkkkkkkkkkkkkkkkkkkrkkkkkkkkkkkkkkkkkkk##
##kkkkkkkkkkkkkkkrkkkkkkkkkkkkkkkkkkkkkkkk##
##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%kkkkkkkkkkk##
##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%kkkkk^kkkkk##
##kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk^^^^^kkk##
##kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk^^^^^^^kk##
##rkkkkkkkkkkkkkkrkkkkkkkkkkkkkrkk^^^^^kkk##
##kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk^kkkkk##
##kkkkkkkkkkkkkkkkkkkkkkk$kkkkkkkkkkkkkkkk##
##kkkkkkkkkkkkkkkkkkkzkkkkkkkkkkkkkkkkkkkk##
##kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk##
#####################vv#####################
#####################vv#####################
`
});
