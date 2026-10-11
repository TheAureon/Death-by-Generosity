// ---------------------------------------------------------------------------
// Generated pixel art for the wider world (Milestone 8): ground for the
// lava fields, mountain, fortress and the ancient realm, plus props.
//
// Texture keys: basalt_0..1, rockfloor_0..1, flagstone, marble, void,
//   void_edge_*, pillar, mushroom, crystal, waystone, waystone_lit (glowing)
// ---------------------------------------------------------------------------
(function () {
  const { PixelCanvas, seededRandom, addTexture } = DBG.Art;
  const P = DBG.Art.palette;
  const S = 16;

  function speckled(base, dark, light, seed, nd = 10, nl = 6) {
    const r = seededRandom(seed);
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, base);
    pc.speckle(r, nd, dark);
    pc.speckle(r, nl, light);
    return pc;
  }

  /** Dark volcanic rock with glowing cracks. */
  function basalt(seed) {
    const pc = speckled("#3a3034", "#2a2226", "#4a4044", seed, 14, 6);
    const r = seededRandom(seed + 5);
    const x = Math.floor(r() * 10) + 2, y = Math.floor(r() * 10) + 2;
    pc.px(x, y, P.ember); pc.px(x + 1, y + 1, P.ember); pc.px(x + 2, y + 1, P.lavaDark);
    return pc;
  }

  function flagstone() {
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, "#8d8a84");
    pc.rect(0, 7, S, 1, "#6c6964"); pc.rect(0, 15, S, 1, "#6c6964");
    pc.rect(7, 0, 1, 7, "#6c6964"); pc.rect(3, 8, 1, 7, "#6c6964"); pc.rect(12, 8, 1, 7, "#6c6964");
    pc.rect(0, 0, 7, 1, "#a8a59e"); pc.rect(4, 8, 8, 1, "#a8a59e");
    return pc;
  }

  function marble() {
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, "#ece6f2");
    pc.rect(0, 0, S, 1, "#d4cce0"); pc.rect(0, 0, 1, S, "#d4cce0");
    for (let i = 0; i < 9; i++) pc.px(3 + i, 4 + Math.round(Math.sin(i) * 2), "#cfc4dc"); // vein
    pc.px(12, 11, P.gold); pc.px(4, 13, "#cfc4dc");
    return pc;
  }

  /** The endless void: dark purple with twinkling specks. */
  function voidTile() {
    const r = seededRandom(13);
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, "#140a24");
    pc.speckle(r, 4, "#4a2a7a");
    pc.speckle(r, 2, "#c8b8ff");
    return pc;
  }

  // ---- Props ----

  function pillar() {
    const pc = new PixelCanvas(14, 36);
    pc.rect(1, 0, 12, 4, "#ece6f2"); pc.rect(0, 3, 14, 2, "#d4cce0");
    pc.rect(3, 5, 8, 27, "#f4f0f8");
    for (let x = 4; x < 11; x += 2) pc.rect(x, 5, 1, 27, "#d4cce0");
    pc.rect(1, 31, 12, 2, "#d4cce0"); pc.rect(0, 33, 14, 3, "#ece6f2");
    pc.px(5, 2, P.gold); pc.px(8, 2, P.gold);
    pc.outline(P.outline);
    return pc;
  }

  function mushroom() {
    const pc = new PixelCanvas(16, 18);
    pc.rect(6, 9, 4, 9, "#f4f1e8"); pc.rect(9, 9, 1, 9, "#d8d0b8");
    pc.circle(8, 7, 7.5, "#c8323c", 5);
    pc.circle(5, 5, 1.2, "#f4f1e8"); pc.circle(10, 4, 1.5, "#f4f1e8"); pc.px(12, 7, "#f4f1e8"); pc.px(3, 8, "#f4f1e8");
    pc.outline(P.outline);
    return pc;
  }

  function crystal() {
    const pc = new PixelCanvas(14, 20);
    const c = "#9b7bff", l = "#d8c8ff", d = "#5b3bb4";
    pc.rect(5, 2, 4, 16, c); pc.rect(5, 2, 1, 16, l); pc.rect(8, 4, 1, 14, d);
    pc.rect(1, 9, 3, 9, c); pc.px(1, 9, l); pc.rect(10, 7, 3, 11, c); pc.rect(12, 7, 1, 11, d);
    pc.px(6, 1, l); pc.px(7, 0, l);
    pc.outline(P.outline);
    return pc;
  }

  /** Waystone: a carved stone; frame 1 glows once you've touched it. */
  function waystone(lit) {
    const pc = new PixelCanvas(14, 22);
    pc.rect(3, 2, 8, 18, "#8e939b"); pc.rect(2, 4, 10, 16, "#8e939b"); pc.rect(4, 0, 6, 2, "#8e939b");
    pc.rect(2, 4, 1, 16, "#b9bec5"); pc.rect(11, 4, 1, 16, "#62666e");
    pc.rect(1, 19, 12, 3, "#62666e");
    const rune = lit ? "#7cf0ff" : "#4a4f58";
    pc.rect(6, 6, 2, 8, rune); pc.rect(4, 9, 6, 2, rune); pc.px(5, 6, rune); pc.px(8, 13, rune);
    pc.outline(P.outline);
    return pc;
  }

  DBG.Art.createRegionArt = function (scene) {
    [0, 1].forEach((i) => addTexture(scene, "basalt_" + i, basalt(80 + i * 7)));
    [0, 1].forEach((i) => addTexture(scene, "rockfloor_" + i, speckled("#8a7a68", "#6e604f", "#a8987f", 90 + i * 3)));
    addTexture(scene, "flagstone", flagstone());
    addTexture(scene, "marble", marble());
    addTexture(scene, "void", voidTile());
    const edges = DBG.Art.makeEdges("#4a2a7a", "#2a1648", 4);
    Object.entries(edges).forEach(([side, pc]) => addTexture(scene, "void_edge_" + side, pc));
    addTexture(scene, "pillar", pillar());
    addTexture(scene, "mushroom", mushroom());
    addTexture(scene, "crystal", crystal());
    addTexture(scene, "waystone", waystone(false));
    addTexture(scene, "waystone_lit", waystone(true));
  };
})();
