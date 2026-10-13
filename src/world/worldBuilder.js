// ---------------------------------------------------------------------------
// Builds a playable world from a loaded map:
//   1. Ground   — all flat tiles baked into one big image (fast)
//   2. Animated — water/lava tiles as looping sprites
//   3. Edges    — shorelines / lava crust / pit rims, baked into an overlay
//   4. Objects  — trees, rocks, fences: standing sprites sorted by height,
//                 so characters can walk behind them
//   5. Blocks   — invisible physics blocks: walls, and hazards (separate,
//                 so fighting NPCs can fall into hazards)
//   Also lists spawn points for creatures ("spawn"), NPCs ("npc") and
//   arrival spots where the hero appears when coming from another map.
//
// The open world is big, so the drawing is split into chunks (one per area).
// Chunks far off-screen are hidden each frame (world.cull) to keep it fast.
// ---------------------------------------------------------------------------
(function () {
  // Draw order (lower = further back). Characters/objects use their y position.
  const DEPTH = { ground: -30, animated: -20, edges: -10 };

  DBG.World.build = function (scene, map) {
    const S = DBG.data.settings.tileSize;
    const pxW = map.width * S, pxH = map.height * S;

    // Chunks: each has its own ground + edge images and a list of sprites
    const CW = map.cellWidth || map.width, CH = map.cellHeight || map.height;
    const chunks = [];
    for (let cy = 0; cy * CH < map.height; cy++) {
      for (let cx = 0; cx * CW < map.width; cx++) {
        const w = Math.min(CW, map.width - cx * CW) * S, h = Math.min(CH, map.height - cy * CH) * S;
        chunks.push({
          x: cx * CW * S, y: cy * CH * S, w, h, members: [], shown: true,
          ground: scene.add.renderTexture(cx * CW * S, cy * CH * S, w, h).setOrigin(0).setDepth(DEPTH.ground),
          edges: null, // made when first needed
          groundList: [], edgeList: [], // what to draw, drawn in one batch at the end
        });
      }
    }
    const perRow = Math.ceil(map.width / CW);
    const chunkAt = (x, y) => chunks[Math.floor(y / CH) * perRow + Math.floor(x / CW)];
    const walls = scene.physics.add.staticGroup();   // block everyone
    const hazards = scene.physics.add.staticGroup(); // block the hero + calm NPCs
    const objects = [];
    const spawns = []; // { creature | npc | arrival, x, y } in pixels (bottom-centre of tile)

    // Art name of the GROUND at (x, y) — objects stand on their "ground" tile.
    // Tiles marked "copyNeighbor" (player start, creatures) look like the
    // most common ground among their four neighbours.
    const plainArt = (t) => (t.object ? DBG.data.tiles[t.ground || "."].art : t.art);
    const groundArt = (x, y) => {
      const t = map.tile(x, y);
      if (!t) return null;
      if (!t.copyNeighbor) return plainArt(t);
      const votes = {};
      [[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(([dx, dy]) => {
        const n = map.tile(x + dx, y + dy);
        if (n && !n.copyNeighbor) votes[plainArt(n)] = (votes[plainArt(n)] || 0) + 1;
      });
      const best = Object.keys(votes).sort((a, b) => votes[b] - votes[a])[0];
      return best || "grass";
    };

    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const tile = map.tile(x, y);
        const art = groundArt(x, y);
        const same = (dx, dy) => groundArt(x + dx, y + dy) === art;
        const chunk = chunkAt(x, y);
        const lx = x * S - chunk.x, ly = y * S - chunk.y; // position inside the chunk

        // 1 + 2: ground (static or animated)
        if (DBG.Art.animatedTiles[art]) {
          chunk.members.push(scene.add.sprite(x * S, y * S, art).setOrigin(0).setDepth(DEPTH.animated).play(art + "-anim"));
        } else {
          chunk.groundList.push([DBG.Art.textureFor(art, x, y, same), lx, ly]);
        }

        // 3: edges where this tile meets a different kind of ground
        if (DBG.Art.edgedTiles.includes(art)) {
          const sides = { n: [0, -1], s: [0, 1], w: [-1, 0], e: [1, 0] };
          Object.entries(sides).forEach(([side, [dx, dy]]) => {
            const n = groundArt(x + dx, y + dy);
            if (n !== null && n !== art) chunk.edgeList.push([`${art}_edge_${side}`, lx, ly]);
          });
        }

        if (tile.spawn) spawns.push({ creature: tile.spawn, x: x * S + S / 2, y: (y + 1) * S - 1 });
        if (tile.npc) spawns.push({ npc: tile.npc, x: x * S + S / 2, y: (y + 1) * S - 2 });
        if (tile.arrival) spawns.push({ arrival: tile.arrival, x: x * S + S / 2, y: (y + 1) * S - 2 });
        if (tile.waystone) spawns.push({ arrival: "waystone", x: x * S + S / 2, y: (y + 2) * S - 2 }); // stand just below it

        // 4: standing objects, anchored at the bottom-centre of their tile
        if (tile.object) {
          const objSame = (dx, dy) => {
            const n = map.tile(x + dx, y + dy);
            return !!n && n.art === tile.art;
          };
          const key = DBG.Art.textureFor(tile.art, x, y, objSame);
          const obj = scene.add.image(x * S + S / 2, (y + 1) * S, key).setOrigin(0.5, 1);
          obj.setDepth(obj.y);
          objects.push(obj);
          chunk.members.push(obj);
        }
      }

      // 5: solid blocks — merge runs of the same kind in a row into one body.
      // Walls block everyone. Hazards (water, lava, pits, cliffs) block the
      // hero and calm NPCs, but angry NPCs can stumble right into them.
      const kindAt = (x) => {
        const t = x < map.width ? map.tile(x, y) : null;
        if (!t || !t.solid) return null;
        return t.hazard ? "hazard" : "wall";
      };
      let runStart = 0, runKind = null;
      for (let x = 0; x <= map.width; x++) {
        const kind = kindAt(x);
        if (kind === runKind) continue;
        if (runKind) {
          const w = (x - runStart) * S;
          const block = scene.add.zone(runStart * S + w / 2, y * S + S / 2, w, S);
          (runKind === "hazard" ? hazards : walls).add(block);
        }
        runStart = x; runKind = kind;
      }
    }

    // Draw each chunk's ground and edges in one batch (much faster than
    // drawing tile by tile)
    const bake = (rt, list) => {
      rt.beginDraw();
      list.forEach(([key, x, y]) => rt.batchDrawFrame(key, undefined, x, y));
      rt.endDraw();
    };
    chunks.forEach((c) => {
      bake(c.ground, c.groundList);
      if (c.edgeList.length) {
        c.edges = scene.add.renderTexture(c.x, c.y, c.w, c.h).setOrigin(0).setDepth(DEPTH.edges);
        bake(c.edges, c.edgeList);
      }
      c.groundList = c.edgeList = null;
    });

    /** Hide chunks well outside the camera view (call every frame). */
    const cull = (cam) => {
      if (chunks.length === 1) return;
      const v = cam.worldView, m = 8 * S;
      chunks.forEach((c) => {
        const show = c.x < v.right + m && c.x + c.w > v.x - m && c.y < v.bottom + m && c.y + c.h > v.y - m;
        if (show === c.shown) return;
        c.shown = show;
        c.ground.setVisible(show);
        if (c.edges) c.edges.setVisible(show);
        c.members.forEach((o) => { o.setVisible(show); o.setActive(show); });
      });
    };

    return { map, pixelWidth: pxW, pixelHeight: pxH, walls, hazards, objects, spawns, chunks, cull };
  };
})();
