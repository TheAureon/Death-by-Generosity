// ===========================================================================
// GAME SETTINGS — safe to edit. Keep the quotes and commas as they are.
// ===========================================================================
DBG.data.settings = {
  // Size of one map square in pixels (art is drawn at this size).
  "tileSize": 16,

  // How zoomed-in the camera is. Stardew-style is around 3.
  // Set to 0 to pick automatically based on window size.
  "zoom": 0,

  // About how many tiles wide the view should be when zoom is automatic.
  "tilesAcrossScreen": 24,

  // Player walking speed in pixels per second.
  "playerSpeed": 90,

  // Seconds before someone who died comes back (as a "similar" person)
  "npcRespawnSeconds": 10,

  // true = every region gate is open (handy for testing). Normally gates
  // ask how many people you've gifted to death before letting you through.
  "openAllGates": false,

  // Which map to load when the game starts (file name in data/maps/).
  "startMap": "village"
};
