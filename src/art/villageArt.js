// ---------------------------------------------------------------------------
// Generated pixel art for the village: roofs, house walls, windows, doors,
// cobblestones, crops, the forge's hot coals, the well, and props.
//
// Texture keys created here (swap any for real art later):
//   roof_red_/roof_straw_/roof_slate_ + top | mid | bot
//   house_wall, house_window, house_door, cobble_0..1, crops,
//   coals (animated), well, coals_edge_*, well_edge_*
//   objects: anvil, haystack, barrel, crate, signpost
// ---------------------------------------------------------------------------
(function () {
  const { PixelCanvas, seededRandom, addTexture, addSpriteSheet } = DBG.Art;
  const P = DBG.Art.palette;
  const S = 16;

  /** Roof tile. part: "top" (ridge), "mid" (shingles), "bot" (eave + shadow). */
  function roof(base, dark, light, part) {
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, base);
    // Shingle rows with staggered bumps
    for (let row = 0; row < 4; row++) {
      const y = row * 4 + 3;
      pc.rect(0, y, S, 1, dark);
      const off = row % 2 ? 2 : 0;
      for (let x = off; x < S; x += 4) pc.px(x, y - 1, dark);
      pc.rect(0, y - 3, S, 1, light);
    }
    if (part === "top") { pc.rect(0, 0, S, 3, dark); pc.rect(0, 1, S, 1, light); }
    if (part === "bot") { pc.rect(0, S - 3, S, 2, dark); pc.rect(0, S - 1, S, 1, P.outline); }
    return pc;
  }

  /** Wooden house wall; with an optional window or door. */
  function houseWall(kind) {
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, P.wood);
    for (let x = 3; x < S; x += 4) pc.rect(x, 0, 1, S, P.woodDark);
    pc.rect(0, 0, S, 2, P.woodDark); // shadow under the eave
    pc.rect(0, S - 1, S, 1, P.woodDark);
    if (kind === "window") {
      pc.rect(3, 4, 10, 8, P.woodDark);
      pc.rect(4, 5, 8, 6, P.glass);
      pc.rect(7, 5, 1, 6, P.woodDark); pc.rect(4, 7, 8, 1, P.woodDark);
      pc.px(5, 6, "#ffffff"); pc.px(9, 9, P.glassDark);
      pc.rect(3, 12, 10, 1, P.woodLight); // sill
    }
    if (kind === "door") {
      pc.rect(3, 3, 10, 13, P.outline);
      pc.rect(4, 4, 8, 12, P.trunk);
      pc.rect(7, 4, 1, 12, P.trunkDark); pc.rect(4, 8, 8, 1, P.trunkDark);
      pc.px(10, 10, P.gold);
    }
    return pc;
  }

  function cobble(seed) {
    const r = seededRandom(seed);
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, P.cobbleDark);
    for (let y = 0; y < S; y += 4) {
      const off = (y / 4) % 2 ? 2 : 0;
      for (let x = -off; x < S; x += 5) {
        const w = 4, h = 3;
        pc.rect(x, y, w, h, r() < 0.5 ? P.cobble : P.cobbleLight);
        pc.px(x, y, P.cobbleLight);
      }
    }
    return pc;
  }

  function crops() {
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, P.soil);
    for (let y = 2; y < S; y += 5) {
      pc.rect(0, y + 2, S, 1, P.soilDark);
      for (let x = 2; x < S; x += 5) {
        pc.px(x, y, P.sprout); pc.px(x - 1, y - 1, P.sprout); pc.px(x + 1, y - 1, P.treeLeafLight);
        pc.px(x, y + 1, P.treeLeaf);
      }
    }
    return pc;
  }

  /** Forge coals: dark with glowing embers, 3 frames. */
  function coalsFrame(f) {
    const r = seededRandom(70 + f);
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, P.coal);
    pc.speckle(r, 18, P.ember);
    pc.speckle(r, 8, P.emberHot);
    pc.speckle(r, 3, "#fff0a8");
    return pc;
  }

  /** Well water: deep and dark (the stone rim comes from the edge overlays). */
  function well() {
    const pc = new PixelCanvas(S, S);
    pc.rect(0, 0, S, S, P.wellWater);
    pc.rect(5, 7, 4, 1, P.waterLight); pc.rect(9, 10, 3, 1, P.waterDark);
    return pc;
  }

  // ---- Props (objects) ----------------------------------------------------

  function anvil() {
    const pc = new PixelCanvas(16, 12);
    pc.rect(5, 7, 6, 4, P.trunk);                 // wooden stump
    pc.rect(2, 2, 12, 3, P.stoneDark);           // top
    pc.rect(0, 2, 3, 2, P.stoneDark);            // horn
    pc.rect(5, 5, 6, 2, P.stoneDark);
    pc.rect(3, 2, 10, 1, P.stoneLight);
    pc.outline(P.outline);
    return pc;
  }

  function haystack() {
    const pc = new PixelCanvas(16, 15);
    pc.circle(8, 9, 7.5, P.hayDark, 5.5);
    pc.circle(8, 8, 7, P.hay, 5);
    const r = seededRandom(9);
    pc.speckle(r, 14, P.hayDark, 2, 4, 12, 8);
    pc.speckle(r, 8, "#fff0a8", 3, 3, 10, 5);
    pc.outline(P.outline);
    return pc;
  }

  function barrel() {
    const pc = new PixelCanvas(12, 14);
    pc.rect(1, 1, 10, 12, P.wood);
    pc.rect(1, 3, 10, 1, P.stoneDark); pc.rect(1, 9, 10, 1, P.stoneDark);
    pc.rect(3, 1, 1, 12, P.woodDark); pc.rect(8, 1, 1, 12, P.woodDark);
    pc.rect(1, 0, 10, 1, P.woodDark);
    pc.outline(P.outline);
    return pc;
  }

  function crate() {
    const pc = new PixelCanvas(14, 14);
    pc.rect(0, 0, 14, 14, P.wood);
    pc.rect(0, 0, 14, 2, P.woodLight);
    for (let i = 0; i < 14; i++) pc.px(i, i, P.woodDark);
    pc.rect(0, 0, 1, 14, P.woodDark); pc.rect(13, 0, 1, 14, P.woodDark); pc.rect(0, 13, 14, 1, P.woodDark);
    pc.outline(P.outline);
    return pc;
  }

  function signpost() {
    const pc = new PixelCanvas(14, 18);
    pc.rect(6, 8, 2, 10, P.trunk);
    pc.rect(0, 1, 14, 8, P.wood);
    pc.rect(0, 1, 14, 1, P.woodLight);
    pc.rect(2, 3, 9, 1, P.woodDark); pc.rect(2, 5, 7, 1, P.woodDark);
    pc.outline(P.outline);
    return pc;
  }

  DBG.Art.createVillageArt = function (scene) {
    const roofs = {
      roof_red: [P.roofRed, P.roofRedDark, P.roofRedLight],
      roof_straw: [P.roofStraw, P.roofStrawDark, P.roofStrawLight],
      roof_slate: [P.roofSlate, P.roofSlateDark, P.roofSlateLight],
    };
    Object.entries(roofs).forEach(([name, [b, d, l]]) => {
      ["top", "mid", "bot"].forEach((part) => addTexture(scene, `${name}_${part}`, roof(b, d, l, part)));
    });
    addTexture(scene, "house_wall", houseWall("plain"));
    addTexture(scene, "house_window", houseWall("window"));
    addTexture(scene, "house_door", houseWall("door"));
    [0, 1].forEach((i) => addTexture(scene, "cobble_" + i, cobble(5 + i * 31)));
    addTexture(scene, "crops", crops());
    addSpriteSheet(scene, "coals", [0, 1, 2].map(coalsFrame));
    addTexture(scene, "well", well());

    const edgeSets = {
      coals: DBG.Art.makeEdges(P.stoneDark, P.stone, 2),
      well: DBG.Art.makeEdges(P.stoneLight, P.stoneDark, 4),
    };
    Object.entries(edgeSets).forEach(([name, set]) => {
      Object.entries(set).forEach(([side, pc]) => addTexture(scene, `${name}_edge_${side}`, pc));
    });

    addTexture(scene, "anvil", anvil());
    addTexture(scene, "haystack", haystack());
    addTexture(scene, "barrel", barrel());
    addTexture(scene, "crate", crate());
    addTexture(scene, "signpost", signpost());
  };
})();
