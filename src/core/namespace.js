// ---------------------------------------------------------------------------
// Global namespace for the whole game.
//
// Why a global instead of ES modules/imports? Browsers block modules and file
// reads when index.html is opened by double-click (file://). Plain <script>
// tags that share one `DBG` object work everywhere, with or without a server.
// Load order is controlled by the <script> list in index.html.
// ---------------------------------------------------------------------------
window.DBG = {
  data: {
    settings: {}, // data/settings.js
    tiles: {},    // data/tiles.js   (what each map character means)
    maps: {},     // data/maps/*.js  (handmade text-grid maps)
    regions: [],  // data/regions.js (planned world regions)
    hero: {},     // data/hero.js    (the player's stats)
    creatures: {},// data/creatures.js
    jokes: {},    // data/jokes.js   (all the funny text)
  },
  Art: {},        // src/art/*       (all generated pixel art lives here)
  World: {},      // src/world/*     (map parsing + building)
  Entities: {     // src/entities/*  (player, creatures, later NPCs)
    behaviors: {}, // creature "behavior" name -> class that runs it
  },
  Scenes: {},     // src/scenes/*    (Phaser scenes)
  UI: {},         // src/ui/*        (HUD, menus, gags)

  /** Called by each file in data/maps/ to register a map. */
  addMap(id, map) {
    DBG.data.maps[id] = map;
  },
};
