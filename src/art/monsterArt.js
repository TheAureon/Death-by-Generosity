// ---------------------------------------------------------------------------
// Generated pixel art for monsters. Each is a 2-frame sheet "mon_<kind>"
// (frame 0 = rest, frame 1 = move/squash). All face LEFT; flipped in code.
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

  const SHAPES = {
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
