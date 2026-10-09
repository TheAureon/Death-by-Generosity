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
// ---------------------------------------------------------------------------
(function () {
  // Draw order (lower = further back). Characters/objects use their y position.
  const DEPTH = { ground: -30, animated: -20, edges: -10 };

  DBG.World.build = function (scene, map) {
    const S = DBG.data.settings.tileSize;
    const pxW = map.width * S, pxH = map.height * S;

    const groundRT = scene.add.renderTexture(0, 0, pxW, pxH).setOrigin(0).setDepth(DEPTH.ground);
    const edgeRT = scene.add.renderTexture(0, 0, pxW, pxH).setOrigin(0).setDepth(DEPTH.edges);
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

        // 1 + 2: ground (static or animated)
        if (DBG.Art.animatedTiles[art]) {
          scene.add.sprite(x * S, y * S, art).setOrigin(0).setDepth(DEPTH.animated).play(art + "-anim");
        } else {
          groundRT.draw(DBG.Art.textureFor(art, x, y, same), x * S, y * S);
        }

        // 3: edges where this tile meets a different kind of ground
        if (DBG.Art.edgedTiles.includes(art)) {
          const sides = { n: [0, -1], s: [0, 1], w: [-1, 0], e: [1, 0] };
          Object.entries(sides).forEach(([side, [dx, dy]]) => {
            const n = groundArt(x + dx, y + dy);
            if (n !== null && n !== art) edgeRT.draw(`${art}_edge_${side}`, x * S, y * S);
          });
        }

        if (tile.spawn) spawns.push({ creature: tile.spawn, x: x * S + S / 2, y: (y + 1) * S - 1 });
        if (tile.npc) spawns.push({ npc: tile.npc, x: x * S + S / 2, y: (y + 1) * S - 2 });
        if (tile.arrival) spawns.push({ arrival: tile.arrival, x: x * S + S / 2, y: (y + 1) * S - 2 });

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

    return { map, pixelWidth: pxW, pixelHeight: pxH, walls, hazards, objects, spawns };
  };
})();
