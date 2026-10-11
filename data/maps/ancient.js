// ===========================================================================
// MAP: The Ancient Realm — god-tier (Milestone 8). Marble platforms (m)
//   floating in the Void (V). Ancient Guardians (G), and Bartholomew, an Old
//   God (1), on the throne platform. v = back down to Dragon Mountain.
// ===========================================================================
DBG.addMap("ancient", {
  "name": "The Ancient Realm",

  "legend": {
    "v": {"name": "Stairs down to Dragon Mountain", "art": "marble", "exit": "dragon", "arrive": "fromAncient"},
    "z": {"arrival": "fromDragon"},
    "G": {"spawn": "golem"},
    "1": {"npc": "bartholomew"}
  },

  "grid": `
VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
VVVVVVVVVVVVVmmmmmmmmmmmmmmVVVVVVVVVVVVV
VVVVVVVVVVVVVmImmmmmmmmmmImVVVVVVVVVVVVV
VVVVVVVVVVVVVmmmmmm1mmmmmmmVVVVVVVVVVVVV
VVVVVVVVVVVVVmmmmmmmmmmmmmmVVVVVVVVVVVVV
VVVVVVVVVVVVVmmmmmmmmmmmmmmVVVVVVVVVVVVV
VVVVVVVVVVVVVmmmmmmmmmmmmmmVVVVVVVVVVVVV
VVmmmmmmmVVVVmmmmmmmmmmmmmmVVVVVVVVVVVVV
VVmZmmmmmVVVVVVVVVVmmVVVVVVVVVVVmmmmmmVV
VVmmmmmmmVVVVVVVVVVmmVVVVVVVVVVVmmmmZmVV
VVmmmGmmmVVVVVVVVVVmmVVVVVVVVVVVmmmmmmVV
VVmmmmmmmVVVVVVVVVVmmVVVVVVVVVVVmmmmmmVV
VVmmmmmmmVmmmmmmmmmmmmmmmmmmmmVVmmGmmmVV
VVmmmmmmmmmImmmmmmmmmmmmmmmmImVVmmmmmmVV
VVmmmmmmmmmmmmmmmmmmmmmmmmmmmmVVmmmmmmVV
VVmmmmmmmVmmmmmVVmmmmmmVVmmmmmmmmmmmmmVV
VVmmmmmZmVmmmmmVVmmmmmmVVmmmmmmmmmmmmmVV
VVmmmmmmmVmmmGmmmmmmmmmmmmGmmmVVmmmmmmVV
VVVVVVVVVVmImmmmmmmmmmmmmmmmImVVmmmmmmVV
VVVVVVVVVVmmmmmmmmmmmmmmmmmmmmVVmmmmmmVV
VVVVVVVVVVVVVVVVVVVmmVVVVVVVVVVVmZmmmmVV
VVVVVVVVVVVVVVVVVVVmmVVVVVVVVVVVmmmmmmVV
VVVVVVVVVVVVVVVVVVVmmVVVVVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVVVVVmmVVVVVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVVVVVmmVVVVVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVVVVVmmVVVVVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVVVVVmmVVVVVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVVVVVmmVVVVVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVmmmmmmmmmmVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVmImmmmmmImVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVmmmmmmmmmmVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVmmmmmmm$mmVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVmmmmmmmmmmVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVmmmmzmmmmmVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVmmmmmmmmmmVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVVVVVvvVVVVVVVVVVVVVVVVVVV
VVVVVVVVVVVVVVVVVVVvvVVVVVVVVVVVVVVVVVVV
`
});
