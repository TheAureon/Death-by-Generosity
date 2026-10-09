// ---------------------------------------------------------------------------
// Generated pixel art for NPCs and the gear they wear.
//
// NPCs are built in LAYERS so gifts visibly change them:
//   npc_<id>   : the person (body, clothes, hair)       — 32x32 frames
//   gear_<item>: one piece of gear drawn in the same    — 32x32 frames
//                poses, stacked on top of (or behind) the person
//   icon_<item>: 16x16 picture of the item for menus
//
// Frame layout (9 frames, same as the hero):
//   0-2 walk down, 3-5 walk up, 6-8 walk sideways (faces left; flipped for right)
// The person is drawn in a 16x24 box placed at (8, 8) inside each 32x32
// frame, leaving room for big weapons and hats to stick out.
// ---------------------------------------------------------------------------
(function () {
  const { PixelCanvas, addSpriteSheet, addTexture } = DBG.Art;
  const P = DBG.Art.palette;
  const FRAME = 32, OX = 8, OY = 8; // frame size and where the 16x24 body box sits
  const DIRS = ["down", "up", "side"];

  /** Where body parts are for a given facing + walk step (16x24 box coords). */
  function pose(dir, step) {
    const bob = step === 0 ? 0 : 1;
    const legA = step === 1 ? -1 : step === 2 ? 1 : 0;
    const legB = -legA;
    if (dir === "side") {
      return {
        dir, bob, legA, legB,
        head: { x: 4, y: 3 + bob, w: 7, h: 7 },
        body: { x: 5, y: 10 + bob, w: 5, h: 8 },
        arms: [{ x: 6 - legA, y: 11 + bob }],
        hand: { x: 6 - legA, y: 15 + bob }, // weapon hand
        offHand: { x: 6 - legA, y: 15 + bob },
        legs: [{ x: 8 + legB, front: false }, { x: 6 + legA, front: true }],
      };
    }
    // down and up share positions; from behind, the right hand is on the left
    const armL = { x: 2, y: 11 + bob + (dir === "down" ? legB : legA) };
    const armR = { x: 12, y: 11 + bob + (dir === "down" ? legA : legB) };
    return {
      dir, bob, legA, legB,
      head: { x: 4, y: 3 + bob, w: 8, h: 7 },
      body: { x: 4, y: 10 + bob, w: 8, h: 8 },
      arms: [armL, armR],
      hand: dir === "down" ? { x: armR.x, y: armR.y + 4 } : { x: armL.x, y: armL.y + 4 },
      offHand: dir === "down" ? { x: armL.x, y: armL.y + 4 } : { x: armR.x, y: armR.y + 4 },
      legs: [{ x: 5, len: 4 + legA }, { x: 9, len: 4 + legB }],
    };
  }

  // ---- The person ---------------------------------------------------------

  function person(look, dir, step) {
    const b = new PixelCanvas(16, 24);
    const p = pose(dir, step);
    const L = look;

    // Legs + shoes
    if (dir === "side") {
      p.legs.forEach((leg) => {
        b.rect(leg.x, 18, 2, 4, leg.front ? L.pants : shade(L.pants));
        b.rect(leg.x - (leg.front ? 1 : 0), 22, leg.front ? 3 : 2, 1, L.shoes);
      });
    } else {
      p.legs.forEach((leg) => { b.rect(leg.x, 18, 2, leg.len, L.pants); b.rect(leg.x, 18 + leg.len, 2, 1, L.shoes); });
    }
    // Body + arms
    b.rect(p.body.x, p.body.y, p.body.w, p.body.h, L.shirt);
    b.rect(p.body.x, p.body.y + p.body.h - 2, p.body.w, 2, L.pants); // waist
    p.arms.forEach((a) => { b.rect(a.x, a.y, 2, 4, shade(L.shirt)); b.rect(a.x, a.y + 4, 2, 1, L.skin); });
    // Head
    const h = p.head;
    b.rect(h.x, h.y, h.w, h.h, L.skin);
    drawHair(b, L, dir, h);
    if (dir === "down") {
      b.px(h.x + 2, h.y + 4, P.eye); b.px(h.x + 5, h.y + 4, P.eye);
      b.px(h.x + 3, h.y + 6, shade(L.skin)); b.px(h.x + 4, h.y + 6, shade(L.skin));
    } else if (dir === "side") {
      b.px(h.x + 1, h.y + 4, P.eye);
      b.px(h.x, h.y + 6, shade(L.skin));
    }
    b.outline(P.outline);
    return b;
  }

  function drawHair(b, L, dir, h) {
    const c = L.hair, style = L.hairStyle || "short";
    if (style === "bald") { b.px(h.x + 2, h.y + 1, "#fff6d8"); return; }
    if (dir === "up") {
      b.rect(h.x, h.y, h.w, h.h - 1, c);
      if (style === "long") b.rect(h.x, h.y + h.h - 1, h.w, 4, c);
    } else if (dir === "down") {
      b.rect(h.x, h.y, h.w, 2, c);
      b.px(h.x, h.y + 2, c); b.px(h.x + h.w - 1, h.y + 2, c);
      if (style === "long") { b.rect(h.x - 1, h.y + 1, 1, 9, c); b.rect(h.x + h.w, h.y + 1, 1, 9, c); }
    } else {
      b.rect(h.x, h.y, h.w, 2, c);
      b.rect(h.x + 3, h.y + 2, h.w - 3, 3, c); // back of the head
      if (style === "long") b.rect(h.x + h.w - 2, h.y + 2, 2, 8, c);
    }
    if (style === "bun") b.circle(h.x + h.w / 2 - 0.5, h.y - 1.5, 2, c);
    if (style === "spiky") for (let i = 0; i < h.w; i += 2) b.px(h.x + i, h.y - 1, c);
  }

  /** Darker (amt < 1) or lighter (amt > 1) version of a #rrggbb colour. */
  function shade(hex, amt = 0.75) {
    const n = parseInt(hex.slice(1), 16);
    const ch = (v) => Math.min(255, Math.round(v * amt));
    const r = ch((n >> 16) & 255), g = ch((n >> 8) & 255), bl = ch(n & 255);
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | bl).toString(16).slice(1);
  }

  // ---- Gear pieces --------------------------------------------------------

  /** Weapons drawn pointing up in a 7x16 box; the grip is at (3, 13). */
  function weaponShape(art) {
    const w = new PixelCanvas(7, 16);
    const c = art.color, t = art.trim;
    switch (art.type) {
      case "sword":
        w.rect(3, 0, 1, 10, c); w.rect(2, 1, 1, 9, shade(c)); w.rect(4, 1, 1, 9, "#ffffff");
        w.rect(1, 10, 5, 1, t); w.rect(3, 11, 1, 3, shade(t)); w.px(3, 14, t);
        break;
      case "axe":
        w.rect(3, 1, 1, 14, t);
        w.rect(4, 1, 3, 5, c); w.rect(6, 0, 1, 7, shade(c)); w.rect(0, 2, 3, 3, c);
        break;
      case "club":
        w.rect(3, 6, 1, 9, t); w.circle(3, 3, 3, c, 4); w.px(2, 2, shade(c)); w.px(4, 5, shade(c));
        break;
      case "spear":
        w.rect(3, 4, 1, 12, t); w.rect(2, 2, 3, 2, c); w.rect(3, 0, 1, 2, c);
        break;
      case "staff":
        w.rect(3, 3, 1, 13, c); w.circle(3, 2, 2, t); w.px(2, 1, "#ffffff");
        break;
      case "pan":
        w.rect(3, 7, 1, 8, t); w.circle(3, 3.5, 3, c, 3.5); w.circle(3, 3.5, 2, shade(c, 1.3), 2.5);
        break;
      case "fish":
        w.circle(3, 6, 2.5, c, 5.5); w.px(2, 2, P.eye); w.rect(2, 12, 3, 1, t); w.rect(1, 13, 5, 2, t);
        w.rect(4, 4, 1, 5, shade(c, 1.2));
        break;
    }
    return w;
  }

  /** Shields in a box up to 9x12. */
  function shieldShape(art) {
    const c = art.color, t = art.trim;
    if (art.type === "door") {
      const s = new PixelCanvas(9, 12);
      s.rect(0, 0, 9, 12, c);
      for (let x = 2; x < 9; x += 3) s.rect(x, 0, 1, 12, shade(c));
      s.rect(0, 0, 9, 1, t); s.rect(0, 11, 9, 1, t);
      for (let i = 0; i < 9; i++) s.px(i, Math.round(1 + i * 1.2), t); // the barn-door Z
      return s;
    }
    const s = new PixelCanvas(7, 8);
    if (art.type === "kite") {
      for (let y = 0; y < 8; y++) { const half = y < 4 ? 3 : 3 - (y - 3); s.rect(3 - half, y, half * 2 + 1, 1, c); }
      s.rect(3, 0, 1, 7, t); s.rect(1, 2, 5, 1, t);
    } else {
      s.circle(3, 3.5, 3.4, t, 3.9); s.circle(3, 3.5, 2.4, c, 2.9); s.px(3, 3, t); s.px(3, 4, t);
    }
    return s;
  }

  /** One frame of one gear item on a 16x24 canvas (body-box coordinates). */
  function gearFrame(item, dir, step) {
    const g = new PixelCanvas(16, 24);
    const p = pose(dir, step);
    const a = item.art, c = a.color, t = a.trim;
    const B = p.body, H = p.head;

    switch (item.slot) {
      case "weapon": {
        const w = weaponShape(a);
        // Sideways, hold it out in front so it doesn't cover the face
        if (dir === "side") g.stamp(w, p.hand.x - 7, p.hand.y - 12);
        else g.stamp(w, p.hand.x - 2, p.hand.y - 13);
        break;
      }
      case "shield": {
        const s = shieldShape(a);
        if (dir === "down") g.stamp(s, p.offHand.x - Math.floor(s.width / 2), p.offHand.y - s.height + 3);
        else if (dir === "up") g.stamp(s, p.offHand.x - Math.floor(s.width / 2) + 1, p.offHand.y - s.height + 3);
        else g.stamp(s, B.x + B.w - 3, B.y); // on the back arm (drawn behind the body)
        break;
      }
      case "armor": {
        if (a.type === "robe") {
          g.rect(B.x, B.y, B.w, 22 - B.y, c);
          g.rect(B.x, B.y + 5, B.w, 1, t); // belt
          if (dir !== "up") { g.px(B.x + 1, B.y + 8, t); g.px(B.x + B.w - 2, B.y + 10, t); }
          p.arms.forEach((ar) => g.rect(ar.x, ar.y, 2, 4, shade(c)));
        } else if (a.type === "plate") {
          g.rect(B.x, B.y, B.w, B.h - 1, c);
          g.rect(B.x, B.y + B.h - 3, B.w, 1, t);
          if (dir === "down") { g.rect(B.x + B.w / 2 - 1, B.y, 2, 5, t); g.rect(B.x + 1, B.y + 1, 2, 2, "#ffffff"); }
          p.arms.forEach((ar) => { g.rect(ar.x, ar.y, 2, 4, shade(c)); g.rect(ar.x, ar.y - 1, 2, 2, c); });
        } else { // leather vest: torso only, arms stay bare-sleeved
          g.rect(B.x, B.y, B.w, B.h - 2, c);
          if (dir === "down") { g.rect(B.x + B.w / 2 - 1, B.y, 2, B.h - 2, shade(c)); g.px(B.x + B.w / 2 - 1, B.y + 2, t); g.px(B.x + B.w / 2, B.y + 4, t); }
          g.rect(B.x, B.y + B.h - 3, B.w, 1, t);
        }
        break;
      }
      case "helmet": {
        const x = H.x, y = H.y, w = H.w;
        if (a.type === "helm") {
          if (dir === "up") g.rect(x, y - 1, w, H.h - 1, c);
          else if (dir === "down") { g.rect(x, y - 1, w, 4, c); g.rect(x, y + 3, 1, 5, c); g.rect(x + w - 1, y + 3, 1, 5, c); g.rect(x, y + 2, w, 1, t); }
          else { g.rect(x, y - 1, w, 4, c); g.rect(x + 3, y + 3, w - 3, 4, c); g.rect(x, y + 2, w, 1, t); }
          g.px(x + 2, y - 1, "#ffffff");
        } else if (a.type === "hat") {
          g.rect(x - 2, y + 1, w + 4, 1, c); g.rect(x + 1, y - 3, w - 2, 4, c); g.rect(x + 1, y, w - 2, 1, t);
        } else if (a.type === "crown") {
          g.rect(x + 1, y - 2, w - 2, 2, c);
          for (let i = 1; i < w - 1; i += 2) g.px(x + i, y - 3, c);
          g.px(x + Math.floor(w / 2), y - 1, t);
        } else if (a.type === "tophat") {
          g.rect(x - 1, y + 1, w + 2, 1, c);              // brim
          g.rect(x + 1, y - 6, w - 2, 7, c);              // tall crown
          g.rect(x + 1, y - 1, w - 2, 1, t);              // band
          g.px(x + 2, y - 5, "#55555f");                  // shine
        } else if (a.type === "pot") {
          g.rect(x - 1, y - 3, w + 2, 6, c); g.rect(x - 1, y + 2, w + 2, 1, t);
          g.rect(x + w + 1, y - 1, 2, 1, t); // handle
          g.rect(x + 1, y - 4, w - 2, 1, t);
        }
        break;
      }
      case "cape": {
        if (dir === "up") { g.rect(B.x, B.y, B.w, 10, c); g.rect(B.x, B.y + 8, B.w, 2, t); g.rect(B.x + 3, B.y + 1, 1, 7, t); }
        else if (dir === "down") { g.rect(B.x - 1, B.y, B.w + 2, 10, c); g.rect(B.x - 1, B.y, B.w + 2, 1, t); }
        else { g.rect(B.x + 3, B.y, 4, 9, c); g.rect(B.x + 6, B.y + 2, 1, 7, t); }
        break;
      }
    }
    g.outline(P.outline);
    return g;
  }

  /** Should this gear be drawn BEHIND the person for this facing? */
  DBG.Art.gearBehind = function (slot, dir) {
    if (slot === "cape") return dir !== "up";
    if (slot === "weapon") return dir === "up";
    if (slot === "shield") return dir === "side";
    return false;
  };

  /** Draw order between gear pieces drawn on the same side of the body. */
  DBG.Art.gearOrder = { cape: 1, armor: 2, helmet: 3, shield: 4, weapon: 5 };

  /** Place a 16x24 body-box canvas inside a 32x32 frame. */
  function toFrame(pc) {
    const f = new PixelCanvas(FRAME, FRAME);
    f.stamp(pc, OX, OY);
    return f;
  }

  function allFrames(drawFn) {
    const frames = [];
    DIRS.forEach((dir) => [0, 1, 2].forEach((s) => frames.push(toFrame(drawFn(dir, s)))));
    return frames;
  }

  /** Item icon: the standing gear picture cropped to 16x16. */
  function icon(item) {
    const g = gearFrame(item, "down", 0);
    let minX = 99, minY = 99, maxX = -1, maxY = -1;
    for (let y = 0; y < g.height; y++) for (let x = 0; x < g.width; x++) {
      if (!g.get(x, y)) continue;
      minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
    const out = new PixelCanvas(16, 16);
    const w = maxX - minX + 1, h = maxY - minY + 1;
    const crop = new PixelCanvas(w, h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) crop.px(x, y, g.get(minX + x, minY + y));
    out.stamp(crop, Math.floor((16 - w) / 2), Math.floor((16 - h) / 2));
    return out;
  }

  // ---- Public API ---------------------------------------------------------

  DBG.Art.FRAME_SIZE = FRAME;

  /** Makes textures for every NPC look and every item. Called at boot. */
  DBG.Art.createPeopleArt = function (scene) {
    Object.entries(DBG.data.npcs || {}).forEach(([id, npc]) => {
      addSpriteSheet(scene, "npc_" + id, allFrames((dir, s) => person(npc.look, dir, s)));
    });
    Object.entries(DBG.data.items || {}).forEach(([id, item]) => {
      addSpriteSheet(scene, "gear_" + id, allFrames((dir, s) => gearFrame(item, dir, s)));
      addTexture(scene, "icon_" + id, icon(item));
    });
  };
})();
