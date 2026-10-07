// ---------------------------------------------------------------------------
// Generated pixel art for characters.
//
// The hero is a 16x24 sprite sheet with 9 frames:
//   0-2 = walking down (stand, step A, step B)
//   3-5 = walking up
//   6-8 = walking sideways (faces left; flipped in code to face right)
// Look: open-faced golden helmet with a plume, golden plate armour, red cape.
// (It's the cursed armour that can't be taken off — Milestone 2.)
// ---------------------------------------------------------------------------
(function () {
  const { PixelCanvas, addSpriteSheet } = DBG.Art;
  const P = DBG.Art.palette;
  const W = 16, H = 24;

  /**
   * Draw one hero frame.
   *   dir  : "down" | "up" | "side"
   *   step : 0 = standing, 1 = left foot forward, 2 = right foot forward
   */
  function hero(dir, step) {
    const pc = new PixelCanvas(W, H);
    const bob = step === 0 ? 0 : 1; // body dips a pixel mid-stride
    const legA = step === 1 ? -1 : step === 2 ? 1 : 0; // leg offsets
    const legB = -legA;

    if (dir === "side") {
      // ---- facing left ----
      // Cape flowing behind (on the right)
      pc.rect(9, 10 + bob, 3, 8, P.cape); pc.rect(11, 12 + bob, 1, 6, P.capeDark);
      // Legs (back leg darker)
      pc.rect(8 + legB, 18, 2, 4, P.goldDark); pc.rect(8 + legB, 22, 2, 1, P.boot);
      pc.rect(6 + legA, 18, 2, 4, P.gold);     pc.rect(5 + legA, 22, 3, 1, P.boot);
      // Body
      pc.rect(5, 10 + bob, 5, 8, P.gold);
      pc.rect(5, 15 + bob, 5, 1, P.boot); // belt
      pc.rect(9, 10 + bob, 1, 5, P.goldDark);
      // Arm swings opposite to legs
      pc.rect(6 - legA, 11 + bob, 2, 4, P.goldDark); pc.rect(6 - legA, 15 + bob, 2, 1, P.skin);
      // Helmet + face (face on the left)
      pc.rect(4, 3 + bob, 7, 7, P.gold);
      pc.rect(4, 6 + bob, 3, 4, P.skin);
      pc.px(5, 7 + bob, P.eye);
      pc.rect(7, 3 + bob, 4, 1, P.goldLight);
      // Plume
      pc.rect(8, 1 + bob, 3, 2, P.cape); pc.px(11, 2 + bob, P.cape);
    } else if (dir === "down") {
      // Cape peeking out at the shoulders
      pc.rect(3, 10 + bob, 10, 2, P.capeDark);
      // Legs
      pc.rect(5, 18, 2, 4 + legA, P.goldDark); pc.rect(5, 22 + legA, 2, 1, P.boot);
      pc.rect(9, 18, 2, 4 + legB, P.goldDark); pc.rect(9, 22 + legB, 2, 1, P.boot);
      // Body / breastplate
      pc.rect(4, 10 + bob, 8, 8, P.gold);
      pc.rect(5, 11 + bob, 2, 3, P.goldLight);
      pc.rect(7, 10 + bob, 2, 5, P.goldDark); // centre ridge
      pc.rect(4, 15 + bob, 8, 1, P.boot);     // belt
      pc.px(8, 15 + bob, P.goldLight);        // buckle
      // Arms (swing with steps)
      pc.rect(2, 11 + bob + legB, 2, 4, P.goldDark); pc.rect(2, 15 + bob + legB, 2, 1, P.skin);
      pc.rect(12, 11 + bob + legA, 2, 4, P.goldDark); pc.rect(12, 15 + bob + legA, 2, 1, P.skin);
      // Helmet with face opening
      pc.rect(4, 3 + bob, 8, 7, P.gold);
      pc.rect(5, 3 + bob, 3, 1, P.goldLight);
      pc.rect(5, 6 + bob, 6, 4, P.skin);
      pc.rect(5, 6 + bob, 6, 1, P.goldDark); // visor brim shadow
      pc.px(6, 7 + bob, P.eye); pc.px(9, 7 + bob, P.eye);
      pc.px(7, 9 + bob, P.skinDark); pc.px(8, 9 + bob, P.skinDark); // smug little mouth
      // Plume
      pc.rect(7, 1 + bob, 2, 2, P.cape);
    } else {
      // ---- facing up (we see the back and the big cape) ----
      pc.rect(5, 18, 2, 4 + legA, P.goldDark); pc.rect(5, 22 + legA, 2, 1, P.boot);
      pc.rect(9, 18, 2, 4 + legB, P.goldDark); pc.rect(9, 22 + legB, 2, 1, P.boot);
      pc.rect(2, 11 + bob + legA, 2, 4, P.goldDark);
      pc.rect(12, 11 + bob + legB, 2, 4, P.goldDark);
      pc.rect(4, 10 + bob, 8, 9, P.cape);
      pc.rect(4, 17 + bob, 8, 2, P.capeDark);
      pc.rect(7, 11 + bob, 1, 7, P.capeDark); // cape fold
      pc.rect(4, 3 + bob, 8, 7, P.gold);
      pc.rect(5, 4 + bob, 2, 3, P.goldLight);
      pc.rect(7, 1 + bob, 2, 3, P.cape);
    }

    pc.outline(P.outline);
    return pc;
  }

  /** Creates the hero sprite sheet and its walk animations. */
  DBG.Art.createCharacterArt = function (scene) {
    const frames = [];
    ["down", "up", "side"].forEach((dir) => [0, 1, 2].forEach((s) => frames.push(hero(dir, s))));
    addSpriteSheet(scene, "hero", frames);

    // Walk cycles: stand -> A -> stand -> B
    const walk = (base) => [base, base + 1, base, base + 2].map((f) => ({ key: "hero", frame: f }));
    const anims = { "hero-walk-down": 0, "hero-walk-up": 3, "hero-walk-side": 6 };
    Object.entries(anims).forEach(([key, base]) => {
      if (!scene.anims.exists(key)) scene.anims.create({ key, frames: walk(base), frameRate: 8, repeat: -1 });
    });
  };
})();
