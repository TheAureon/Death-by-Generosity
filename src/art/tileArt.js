// ---------------------------------------------------------------------------
// Generated pixel art for map tiles and map objects (trees, rocks, fences).
//
// Texture keys created here (swap any of them for real art later):
//   ground : grass_0..2, flowers_0..1, path_0..1, sand_0..1, planks, wall,
//            cliff, pit, water (animated sheet), lava (animated sheet)
//   edges  : <art>_edge_n / _s / _e / _w  (shorelines, lava crust, pit rims)
//   objects: tree, bush, rock, fence_h, fence_v, fence_post
// ---------------------------------------------------------------------------
(function () {
  const { PixelCanvas, seededRandom, addTexture, addSpriteSheet } = DBG.Art;
  const P = DBG.Art.palette;
  const S = 16; // tile size in pixels

  // ---- Ground tiles -------------------------------------------------------

  function grass(seed) {
    const r = seededRandom(seed);
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, P.grass);
    // Little blades: a dark pixel with a light tip above it
    for (let i = 0; i < 9; i++) {
      const x = Math.floor(r() * S), y = 1 + Math.floor(r() * (S - 1));
      pc.px(x, y, P.grassDark);
      pc.px(x, y - 1, r() < 0.5 ? P.grassLight : P.grassDark);
    }
    pc.speckle(r, 4, P.grassLight);
    return pc;
  }

  function flowers(seed) {
    const r = seededRandom(seed);
    const pc = grass(seed + 99);
    const colors = [P.flowerRed, P.flowerYellow, P.flowerWhite];
    for (let i = 0; i < 4; i++) {
      const x = 2 + Math.floor(r() * 12), y = 2 + Math.floor(r() * 12);
      const c = colors[Math.floor(r() * colors.length)];
      pc.px(x, y - 1, c); pc.px(x - 1, y, c); pc.px(x + 1, y, c); pc.px(x, y + 1, c);
      pc.px(x, y, P.flowerYellow);
    }
    return pc;
  }

  function path(seed) {
    const r = seededRandom(seed);
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, P.dirt);
    pc.speckle(r, 10, P.dirtDark);
    pc.speckle(r, 8, P.dirtLight);
    return pc;
  }

  function sand(seed) {
    const r = seededRandom(seed);
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, P.sand);
    pc.speckle(r, 8, P.sandDark);
    return pc;
  }

  function planks() {
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, P.plank);
    for (let y = 0; y < S; y += 4) {
      pc.rect(0, y, S, 1, P.plankLight);
      pc.rect(0, y + 3, S, 1, P.plankDark);
    }
    pc.px(3, 1, P.plankDark); pc.px(11, 5, P.plankDark); pc.px(6, 9, P.plankDark); pc.px(13, 13, P.plankDark);
    return pc;
  }

  function wall() {
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, P.stone);
    pc.rect(0, 0, S, 4, P.stoneTop); // top face, seen from above
    pc.rect(0, 4, S, 1, P.stoneDark);
    // Brick rows with offset seams
    for (let row = 0; row < 3; row++) {
      const y = 5 + row * 4;
      pc.rect(0, y, S, 1, P.stoneLight);
      pc.rect(0, y + 3, S, 1, P.stoneDark);
      const off = row % 2 ? 4 : 0;
      for (let x = off; x < S; x += 8) pc.rect(x, y, 1, 4, P.stoneDark);
    }
    return pc;
  }

  function cliff() {
    const r = seededRandom(7);
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, P.cliff);
    pc.rect(0, 0, S, 3, P.cliffTop); // grassy lip
    pc.rect(0, 3, S, 1, P.cliffDark);
    for (let x = 1; x < S; x += 5) pc.rect(x, 5 + (x % 3), 1, 8, P.cliffDark);
    pc.speckle(r, 6, P.cliffLight, 0, 4, S, 12);
    return pc;
  }

  function pit() {
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, P.pit);
    return pc;
  }

  /** Water: 3 frames where the light ripples drift. */
  function waterFrame(f) {
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, P.water);
    for (let i = 0; i < 3; i++) {
      const y = 2 + i * 5;
      const x = (i * 6 + f * 2) % S;
      pc.rect(x, y, 4, 1, P.waterLight);
      pc.rect((x + 9) % S, y + 2, 2, 1, P.waterDark);
    }
    return pc;
  }

  /** Lava: 3 frames with bubbling bright spots. */
  function lavaFrame(f) {
    const r = seededRandom(31 + f);
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, P.lava);
    pc.speckle(r, 10, P.lavaDark);
    pc.speckle(r, 6, P.lavaLight);
    const bx = [4, 10, 7][f], by = [5, 10, 3][f];
    pc.circle(bx, by, 1.5, P.lavaLight);
    return pc;
  }

  // ---- Edge overlays (drawn on top of a tile where it meets something else)

  function edges(colorA, colorB, depthN = 2) {
    // n = top edge, s = bottom, w = left, e = right
    const make = (side) => {
      const pc = new PixelCanvas(S, S);
      for (let i = 0; i < S; i++) {
        const wobble = (i * 7) % 3 === 0 ? 1 : 0;
        if (side === "n") { pc.rect(i, 0, 1, depthN + wobble, colorA); pc.px(i, depthN + wobble, colorB); }
        if (side === "s") { pc.px(i, S - 1, colorA); pc.px(i, S - 2, wobble ? colorA : colorB); }
        if (side === "w") { pc.px(0, i, colorA); pc.px(1, i, wobble ? colorA : colorB); }
        if (side === "e") { pc.px(S - 1, i, colorA); pc.px(S - 2, i, wobble ? colorA : colorB); }
      }
      return pc;
    };
    return { n: make("n"), s: make("s"), e: make("e"), w: make("w") };
  }

  // ---- Objects (taller than a tile; drawn standing up, y-sorted) ----------

  function tree() {
    const pc = new PixelCanvas(32, 40);
    // Trunk
    pc.rect(13, 26, 6, 13, P.trunk);
    pc.rect(13, 26, 2, 13, P.trunkDark);
    pc.rect(11, 37, 10, 2, P.trunk); // roots
    // Canopy: overlapping blobs, dark underneath, light on top
    pc.circle(16, 17, 13, P.treeLeafDark, 11);
    pc.circle(16, 15, 12, P.treeLeaf, 10);
    pc.circle(9, 17, 6, P.treeLeaf);
    pc.circle(23, 17, 6, P.treeLeaf);
    pc.circle(13, 10, 5, P.treeLeafLight, 4);
    pc.circle(20, 12, 3, P.treeLeafLight);
    const r = seededRandom(5);
    pc.speckle(r, 18, P.treeLeafDark, 5, 8, 22, 16);
    pc.outline(P.outline);
    return pc;
  }

  function bush() {
    const pc = new PixelCanvas(18, 16);
    pc.circle(9, 9, 8, P.treeLeafDark, 6);
    pc.circle(9, 8, 7, P.treeLeaf, 5);
    pc.circle(6, 6, 2, P.treeLeafLight);
    pc.px(12, 7, P.flowerRed); pc.px(5, 10, P.flowerRed); pc.px(10, 11, P.flowerRed);
    pc.outline(P.outline);
    return pc;
  }

  function rock() {
    const pc = new PixelCanvas(16, 14);
    pc.circle(8, 8, 6.5, P.rockDark, 5);
    pc.circle(7.5, 7, 6, P.rock, 4.5);
    pc.circle(6, 5, 2.5, P.rockLight, 1.5);
    pc.px(10, 9, P.rockDark); pc.px(11, 8, P.rockDark);
    pc.outline(P.outline);
    return pc;
  }

  function fence(kind) {
    const pc = new PixelCanvas(16, 20);
    const post = (x) => { pc.rect(x, 4, 3, 14, P.fence); pc.rect(x + 2, 4, 1, 14, P.fenceDark); pc.rect(x, 3, 3, 1, P.fenceDark); };
    if (kind === "h") {
      pc.rect(0, 7, 16, 2, P.fence); pc.rect(0, 9, 16, 1, P.fenceDark);
      pc.rect(0, 12, 16, 2, P.fence); pc.rect(0, 14, 16, 1, P.fenceDark);
      post(6);
    } else if (kind === "v") {
      pc.rect(7, 0, 2, 18, P.fence); pc.rect(8, 0, 1, 18, P.fenceDark);
      post(6);
    } else {
      post(6);
    }
    pc.outline(P.outline);
    return pc;
  }

  /** Soft oval shadow put under characters. */
  function shadow() {
    const pc = new PixelCanvas(14, 5);
    pc.circle(7, 2, 6, P.shadow, 2);
    return pc;
  }

  // ---- Public API ---------------------------------------------------------

  /** Creates every tile/object texture. Called once from BootScene. */
  DBG.Art.createTileArt = function (scene) {
    [0, 1, 2].forEach((i) => addTexture(scene, "grass_" + i, grass(11 + i * 17)));
    [0, 1].forEach((i) => addTexture(scene, "flowers_" + i, flowers(3 + i * 41)));
    [0, 1].forEach((i) => addTexture(scene, "path_" + i, path(21 + i * 13)));
    [0, 1].forEach((i) => addTexture(scene, "sand_" + i, sand(51 + i * 9)));
    addTexture(scene, "planks", planks());
    addTexture(scene, "wall", wall());
    addTexture(scene, "cliff", cliff());
    addTexture(scene, "pit", pit());
    addSpriteSheet(scene, "water", [0, 1, 2].map(waterFrame));
    addSpriteSheet(scene, "lava", [0, 1, 2].map(lavaFrame));

    const edgeSets = {
      water: edges(P.foam, P.waterLight, 1),
      lava: edges(P.lavaCrust, P.lavaDark, 1),
      pit: edges(P.pitWall, P.pitWall, 5),
    };
    Object.entries(edgeSets).forEach(([name, set]) => {
      Object.entries(set).forEach(([side, pc]) => addTexture(scene, `${name}_edge_${side}`, pc));
    });

    addTexture(scene, "tree", tree());
    addTexture(scene, "bush", bush());
    addTexture(scene, "rock", rock());
    addTexture(scene, "fence_h", fence("h"));
    addTexture(scene, "fence_v", fence("v"));
    addTexture(scene, "fence_post", fence("post"));
    addTexture(scene, "shadow", shadow());
  };

  // Shared with villageArt.js
  DBG.Art.makeEdges = edges;

  /** Which art names are animated (key -> frames per second). */
  DBG.Art.animatedTiles = { water: 3, lava: 4, coals: 5 };

  /** Which art names get edge overlays where they touch different tiles. */
  DBG.Art.edgedTiles = ["water", "lava", "pit", "coals", "well"];

  /**
   * Pick the exact texture for a tile, so neighbours can change the look
   * (random grass variety, fences that connect, roof ridges and eaves).
   *   art: the "art" name from data/tiles.js
   *   x, y: tile position; sameArt(dx, dy): is the neighbour the same art?
   */
  DBG.Art.textureFor = function (art, x, y, sameArt) {
    const hash = (x * 73856093) ^ (y * 19349663);
    const pick = (n) => Math.abs(hash) % n;
    switch (art) {
      case "grass": return "grass_" + pick(3);
      case "flowers": return "flowers_" + pick(2);
      case "path": return "path_" + pick(2);
      case "sand": return "sand_" + pick(2);
      case "fence":
        if (sameArt(-1, 0) || sameArt(1, 0)) return "fence_h";
        if (sameArt(0, -1) || sameArt(0, 1)) return "fence_v";
        return "fence_post";
      case "roof_red": case "roof_straw": case "roof_slate":
        // Ridge on the top row, eave on the bottom row, shingles in between
        if (!sameArt(0, -1)) return art + "_top";
        if (!sameArt(0, 1)) return art + "_bot";
        return art + "_mid";
      case "cobble": return "cobble_" + pick(2);
      default: return art;
    }
  };
})();
