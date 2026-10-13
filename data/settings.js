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

  // Sound volume, from 0 (silent) to 1 (loud). Press M in the game to mute.
  "soundVolume": 0.5,

  // Which map to load when the game starts. "world" is the whole open world
  // (see data/world.js). You can also name a single map from data/maps/,
  // e.g. "test_meadow".
  "startMap": "world"
};
