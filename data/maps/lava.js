// ===========================================================================
// MAP: Lava Fields — lava monsters (Milestone 8). Basalt (d), a river of
//   lava (^) with rock bridges. Ignatius the Fire-Juggler (1) by a lava pool.
//   Magma Slimes (S), Fire Imps (J). < = to the Fortress, N = up Dragon Mountain.
// ===========================================================================
DBG.addMap("lava", {
  "name": "Lava Fields",

  "legend": {
    "<": {"name": "Road to the Knight Fortress", "art": "basalt", "exit": "fortress", "arrive": "fromLava"},
    "N": {"name": "Path up Dragon Mountain", "art": "basalt", "exit": "dragon", "arrive": "fromLava", "requires": 9, "gateText": "A DRAGON-SHAPED SIGN: Dragon Mountain. Gift {need} people to death first. (You: {have}.) Grumbold is very busy."},
    "w": {"arrival": "fromFortress"},
    "n": {"arrival": "fromDragon"},
    "S": {"spawn": "magma_slime"},
    "J": {"spawn": "fire_imp"},
    "1": {"npc": "ignatius"}
  },

  "grid": `
######################NN######################
######################NN######################
##dddddddddddddddddrddddddddddddddrddddddddd##
##ddddddddddddddddddddnddddddddddddddddddddd##
##dddddddddddddddddddddddddddddddddddddddddd##
##ddddddddddddddddddddddddddddddd^dddddddddd##
##ddddSdddddddddddJdddddddddddd^^^^^dddddddd##
##ddddddddddddddddddddddddrdd1^^^^^^^ddddddd##
##ddddddddddddddddddddddddddddd^^^^^dddddddd##
##ddddddddddddrdddddddddddddddddd^dddddddrdd##
##ddddddddddddddddddd^^^dd^ddddddddddddddSdd##
##dddddddrdddddddddd^^^^dd^^dddddddddddddddd##
##ddddddddddddddddr^^^^^dd^^^ddddddddddddddd##
##dddddddddddddddd^^^dddddd^^^dddddddddddddd##
##ddddddddddddddd^^^dddddddd^^^ddddddddddddd##
##dddddddddddddd^^^dddddddddd^^^dddddddddddd##
##ddddddddddddd^^^dddddddddddd^^^ddddddddddd##
##ddddddddddddd^^dddddddddddddd^^^dddddddddd##
<<dwdddddddddd^^dddddddddddddddd^^^ddddddddd##
<<dddddddddrd^^dddddddddddddddddr^^^dddddddd##
##ddddddddd^^^^ddddddddddddddddddd^^^dddddd^##
##d^^^^^^dd^^^ddddddddddddddddddddd^^^dJ^^^^##
##dd^^^^^dd^^ddddddddddddddddddddddd^^dd^^^^##
##dd$^^^^dddddddddddddddddddddddddddd^dd^^^d##
##ddddddddddddddddddddddddddddSddddddddddddd##
##dddddddd^ddddddddddddddddddddddddd^ddddddd##
##dddddd^^^^^dddSdddddddddddddddddd^^^dddddd##
##ddddd^^^^^^^dddddddddddddddddddd^^^^^ddddd##
##dddddd^^^^^drdddddddddddddddddddd^^^dddddd##
##dddddddd^ddddddddddddddddddddddddd^ddddddd##
##ddddddddddddddddddddddddJddddddddddddddddd##
##dddddddddddddddddddddddddddddddddddddddddd##
##############################################
##############################################
`
});
