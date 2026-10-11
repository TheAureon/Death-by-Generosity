// ---------------------------------------------------------------------------
// Generated pixel art for monsters. Each is a 2-frame sheet "mon_<kind>"
// (frame 0 = rest, frame 1 = move/squash). All face LEFT; flipped in code.
// Shapes: slime, goose, boar, wolf, shroom, crab, serpent, imp, drake,
// golem, dragon.
// Colours come from data/creatures.js ("color"), so one shape can make
// several monsters (green slime, blue slime...).
// ---------------------------------------------------------------------------
(function () {
  const { PixelCanvas, addSpriteSheet } = DBG.Art;
  const P = DBG.Art.palette;

  /** #rrggbb times amt (darker < 1 < lighter). */
  function tone(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const ch = (v) => Math.min(255, Math.round(v * amt));
    return "#" + ((1 << 24) | (ch((n >> 16) & 255) << 16) | (ch((n >> 8) & 255) << 8) | ch(n & 255)).toString(16).slice(1);
  }

  function slime(color, squash) {
    const pc = new PixelCanvas(16, 14);
    const ry = squash ? 4 : 5.5, rx = squash ? 7 : 6, cy = 13 - ry;
    pc.circle(8, cy, rx, tone(color, 0.7), ry);
    pc.circle(8, cy - 0.5, rx - 0.5, color, ry - 0.5);
    pc.circle(6, cy - ry / 2, 1.5, tone(color, 1.4), 1);
    pc.px(5, cy, P.eye); pc.px(9, cy, P.eye); pc.px(5, cy - 1, P.eye); pc.px(9, cy - 1, P.eye);
    pc.outline(P.outline);
    return pc;
  }

  function goose(color, step) {
    const pc = new PixelCanvas(16, 18);
    const lift = step ? 1 : 0;
    pc.circle(9, 12 - lift, 5, color, 4);             // body
    pc.rect(12, 9 - lift, 3, 3, tone(color, 0.85));   // tail
    pc.rect(5, 3 - lift, 2, 8, color);                // long neck
    pc.circle(5, 3 - lift, 2.2, color);               // head
    pc.rect(1, 3 - lift, 3, 2, P.flowerYellow);       // beak
    pc.px(1, 4 - lift, "#e8842c");
    pc.px(5, 2 - lift, P.eye); pc.px(4, 1 - lift, P.eye); // angry eye + brow
    pc.px(8, 17, "#e8842c"); pc.px(10, step ? 16 : 17, "#e8842c"); pc.rect(7, 17, 2, 1, "#e8842c");
    pc.outline(P.outline);
    return pc;
  }

  function boar(color, step) {
    const pc = new PixelCanvas(22, 15);
    const b = step ? 1 : 0;
    pc.circle(12, 8, 8, color, 5);                            // body
    pc.rect(6, 3, 12, 2, tone(color, 0.7));                   // bristly back
    for (let x = 7; x < 18; x += 2) pc.px(x, 2, tone(color, 0.6));
    pc.circle(4, 9, 4, tone(color, 1.1), 3.5);                // head
    pc.rect(0, 9, 2, 3, "#d89b72");                           // snout
    pc.px(0, 10, P.eye);
    pc.rect(2, 11, 1, 2, "#f4f1e8"); pc.px(1, 12, "#f4f1e8"); // tusk
    pc.px(4, 7, P.eye); pc.px(3, 6, P.eye);                   // angry eye
    pc.rect(7, 12, 2, 3 - b, tone(color, 0.6)); pc.rect(16, 12, 2, 2 + b, tone(color, 0.6)); // legs
    pc.outline(P.outline);
    return pc;
  }

  function wolf(color, step) {
    const pc = new PixelCanvas(22, 15);
    const s = step ? 1 : 0;
    pc.circle(12, 8, 7, color, 4);                             // body
    pc.circle(4, 6, 3.5, color, 3);                            // head
    pc.rect(0, 6, 3, 2, tone(color, 0.85)); pc.px(0, 6, P.eye); // snout + nose
    pc.rect(3, 1, 2, 3, color); pc.rect(6, 1, 2, 3, color);    // ears
    pc.px(4, 5, "#ffde59");                                    // eye
    pc.rect(18, 4, 4, 2, tone(color, 1.2)); pc.px(21, 3, tone(color, 1.2)); // tail
    pc.rect(7, 11, 2, 4 - s, tone(color, 0.7)); pc.rect(15, 11, 2, 3 + s, tone(color, 0.7));
    pc.rect(9, 9, 6, 2, tone(color, 1.2));                     // belly
    pc.outline(P.outline);
    return pc;
  }

  function shroom(color, step) {
    const pc = new PixelCanvas(14, 16);
    const b = step ? 1 : 0;
    pc.rect(4, 8, 6, 6 - b, "#f4f1e8");
    pc.px(5, 10, P.eye); pc.px(8, 10, P.eye);                  // grumpy face
    pc.rect(5, 12, 3, 1, tone("#f4f1e8", 0.7));
    pc.circle(7, 6 - b, 6.5, color, 4);
    pc.circle(4, 4 - b, 1.2, "#f4f1e8"); pc.circle(9, 3 - b, 1.2, "#f4f1e8");
    pc.rect(3, 14, 2, 2, tone("#f4f1e8", 0.7)); pc.rect(9, 14 - b, 2, 2, tone("#f4f1e8", 0.7));
    pc.outline(P.outline);
    return pc;
  }

  function crab(color, step) {
    const pc = new PixelCanvas(20, 12);
    const s = step ? 1 : 0;
    pc.circle(10, 7, 6, color, 3.5);
    pc.circle(2.5, 4 - s, 2.5, tone(color, 1.15)); pc.circle(17.5, 4 + s, 2.5, tone(color, 1.15)); // claws
    pc.rect(7, 1, 1, 3, color); pc.rect(12, 1, 1, 3, color); pc.px(7, 1, P.eye); pc.px(12, 1, P.eye);
    for (let i = 0; i < 3; i++) { pc.px(4 + i * 2, 11 - (i + s) % 2, tone(color, 0.7)); pc.px(12 + i * 2, 11 - (i + s + 1) % 2, tone(color, 0.7)); }
    pc.outline(P.outline);
    return pc;
  }

  function serpent(color, step) {
    const pc = new PixelCanvas(20, 20);
    const s = step ? 1 : 0;
    for (let i = 0; i < 6; i++) pc.circle(14 - i * 1.5 + (i % 2 ? s : -s), 17 - i * 2.4, 3, i % 2 ? color : tone(color, 0.85));
    pc.circle(5, 4, 3.5, color, 3);                            // head
    pc.rect(1, 4, 3, 2, tone(color, 1.2));
    pc.px(4, 2, "#ffde59"); pc.px(1, 6, "#e8505b");            // eye + tongue
    pc.rect(6, 0, 1, 2, tone(color, 0.7)); pc.rect(8, 1, 1, 2, tone(color, 0.7)); // fins
    pc.outline(P.outline);
    return pc;
  }

  function imp(color, step) {
    const pc = new PixelCanvas(14, 16);
    const b = step ? 1 : 0;
    pc.circle(7, 9 - b, 4.5, color, 4.5);
    pc.rect(3, 2 - b, 1, 3, tone(color, 0.6)); pc.rect(10, 2 - b, 1, 3, tone(color, 0.6)); // horns
    pc.px(5, 8 - b, "#ffde59"); pc.px(8, 8 - b, "#ffde59");     // eyes
    pc.rect(5, 11 - b, 4, 1, tone(color, 0.5));                // grin
    pc.rect(0, 7 - b, 2, 2, "#ffb23a"); pc.px(0, 6 - b, "#fff0a8"); // fireball in hand
    pc.rect(11, 12, 2, 1, tone(color, 0.6)); pc.px(13, 11, tone(color, 0.6)); // tail
    pc.rect(5, 14, 1, 2, tone(color, 0.6)); pc.rect(8, 14, 1, 2, tone(color, 0.6));
    pc.outline(P.outline);
    return pc;
  }

  function drake(color, step) {
    const pc = new PixelCanvas(24, 18);
    const w = step ? 2 : 0;
    pc.circle(13, 11, 7, color, 4.5);                          // body
    pc.circle(4, 7, 3.5, color, 3);                            // head
    pc.rect(0, 7, 2, 2, tone(color, 1.2)); pc.px(3, 6, "#ffde59");
    pc.rect(5, 2, 1, 3, tone(color, 0.6));                     // horn
    pc.rect(10, 1 + w, 8, 5 - w, tone(color, 0.75)); pc.rect(12, 0 + w, 4, 1, tone(color, 0.75)); // wing
    pc.rect(19, 12, 5, 2, color); pc.px(23, 11, color);        // tail
    pc.rect(9, 15, 2, 3, tone(color, 0.7)); pc.rect(16, 15, 2, 3, tone(color, 0.7));
    pc.outline(P.outline);
    return pc;
  }

  function golem(color, step) {
    const pc = new PixelCanvas(20, 24);
    const s = step ? 1 : 0;
    pc.rect(5, 6, 10, 11, color); pc.rect(5, 6, 10, 2, tone(color, 1.15));
    pc.rect(7, 0, 6, 6, color); pc.px(8, 3, "#7cf0ff"); pc.px(11, 3, "#7cf0ff"); // head + glowing eyes
    pc.rect(1, 7 + s, 4, 10, tone(color, 0.85)); pc.rect(15, 7 - s, 4, 10, tone(color, 0.85)); // arms
    pc.rect(6, 17, 3, 7 - s, tone(color, 0.7)); pc.rect(11, 17, 3, 6 + s, tone(color, 0.7)); // legs
    pc.rect(9, 9, 2, 5, "#7cf0ff"); pc.px(8, 11, "#7cf0ff"); pc.px(11, 11, "#7cf0ff"); // rune
    pc.outline(P.outline);
    return pc;
  }

  /** The dragon: drawn at 40x30 (and scaled up more in data). */
  function dragon(color, step) {
    const pc = new PixelCanvas(40, 30);
    const w = step ? 3 : 0;
    pc.circle(22, 19, 11, color, 7);                           // body
    pc.circle(22, 21, 7, tone(color, 1.3), 4);                 // belly
    pc.rect(5, 8, 6, 12, color);                               // neck
    pc.circle(7, 7, 5, color, 4);                              // head
    pc.rect(0, 7, 4, 3, tone(color, 1.15)); pc.px(0, 8, P.eye); // snout
    pc.px(7, 5, "#ffde59"); pc.px(8, 5, "#ffde59");            // eye
    pc.rect(7, 0, 1, 3, tone(color, 0.6)); pc.rect(10, 1, 1, 3, tone(color, 0.6)); // horns
    pc.rect(17, 2 + w, 14, 8 - w, tone(color, 0.7));           // wing
    for (let x = 17; x < 31; x += 4) pc.rect(x, 2 + w, 1, 9 - w, tone(color, 0.5));
    pc.rect(32, 20, 7, 3, color); pc.rect(37, 18, 3, 2, tone(color, 0.6)); // tail
    pc.rect(14, 26, 4, 4, tone(color, 0.7)); pc.rect(27, 26, 4, 4, tone(color, 0.7)); // legs
    pc.outline(P.outline);
    return pc;
  }

  const SHAPES = {
    wolf: (c) => [wolf(c, 0), wolf(c, 1)],
    shroom: (c) => [shroom(c, 0), shroom(c, 1)],
    crab: (c) => [crab(c, 0), crab(c, 1)],
    serpent: (c) => [serpent(c, 0), serpent(c, 1)],
    imp: (c) => [imp(c, 0), imp(c, 1)],
    drake: (c) => [drake(c, 0), drake(c, 1)],
    golem: (c) => [golem(c, 0), golem(c, 1)],
    dragon: (c) => [dragon(c, 0), dragon(c, 1)],
    slime: (c) => [slime(c, false), slime(c, true)],
    goose: (c) => [goose(c, 0), goose(c, 1)],
    boar: (c) => [boar(c, 0), boar(c, 1)],
  };

  DBG.Art.monsterShapes = Object.keys(SHAPES);

  /** Makes "mon_<creature id>" for every monster in data/creatures.js. */
  DBG.Art.createMonsterArt = function (scene) {
    Object.entries(DBG.data.creatures || {}).forEach(([id, c]) => {
      if (c.behavior !== "monster" || !SHAPES[c.art]) return;
      addSpriteSheet(scene, "mon_" + id, SHAPES[c.art](c.color || "#6dd36d"));
    });
  };
})();
