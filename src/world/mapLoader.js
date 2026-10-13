// ---------------------------------------------------------------------------
// Turns a text-grid map (data/maps/*.js) into an easy-to-query object.
// Pure data work, no drawing — see worldBuilder.js for that.
//
// loadMap("world") stitches every area named in data/world.js into ONE big
// seamless map. Each area keeps its own legend; the stitched map just asks
// the right area for each tile.
// ---------------------------------------------------------------------------
(function () {
  const FALLBACK_CHAR = "."; // used for unknown characters and short rows

  /**
   * @param {string} mapId  key used in DBG.addMap(...)
   * @returns {{ id, name, width, height, rows, tile(x,y), playerStart }}
   */
  DBG.World.loadMap = function (mapId) {
    return mapId === "world" ? loadWorld() : loadSingle(mapId);
  };

  function loadSingle(mapId, partOfWorld) {
    const raw = DBG.data.maps[mapId];
    if (!raw) throw new Error(`Map "${mapId}" not found. Is its file listed in index.html?`);
    // A map can add its own characters (e.g. "1": { "npc": "bob" }) on top
    // of the shared legend in data/tiles.js.
    const legend = { ...DBG.data.tiles };
    Object.entries(raw.legend || {}).forEach(([ch, entry]) => {
      // People and creatures blend into the ground around them
      legend[ch] = entry.npc || entry.spawn || entry.arrival ? { copyNeighbor: true, ...entry } : entry;
    });

    // Drop blank lines at the top/bottom, keep everything else exactly.
    const lines = raw.grid.replace(/\r/g, "").split("\n");
    while (lines.length && lines[0].trim() === "") lines.shift();
    while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();

    const width = Math.max(...lines.map((l) => l.length));
    const height = lines.length;
    let playerStart = null;

    const rows = lines.map((line, y) => {
      const chars = line.padEnd(width, FALLBACK_CHAR).split("");
      return chars.map((ch, x) => {
        if (!legend[ch]) {
          console.warn(`Map "${mapId}": unknown tile "${ch}" at column ${x + 1}, row ${y + 1}. Using grass.`);
          ch = FALLBACK_CHAR;
        }
        if (legend[ch].playerStart) playerStart = { x, y };
        return ch;
      });
    });

    // Maps you only reach through exits don't need a "P" (they use arrivals)
    const hasArrivals = Object.values(raw.legend || {}).some((e) => e.arrival);
    if (!playerStart && !hasArrivals && !partOfWorld) {
      console.warn(`Map "${mapId}" has no "P" start tile. Starting in the middle.`);
      playerStart = { x: Math.floor(width / 2), y: Math.floor(height / 2) };
    }
    if (!playerStart) playerStart = { x: Math.floor(width / 2), y: Math.floor(height / 2) };

    return {
      id: mapId,
      name: raw.name || mapId,
      width,
      height,
      rows,
      playerStart,
      /** Character at (x, y), or null if outside the map. */
      charAt(x, y) {
        if (x < 0 || y < 0 || x >= width || y >= height) return null;
        return rows[y][x];
      },
      /** Legend entry (from data/tiles.js) at (x, y), or null if outside. */
      tile(x, y) {
        const ch = this.charAt(x, y);
        return ch === null ? null : legend[ch];
      },
      regionAt() {
        return { id: mapId, name: raw.name || mapId };
      },
    };
  }

  /** All areas from data/world.js, side by side, as one map. */
  function loadWorld() {
    const def = DBG.data.world;
    const CW = def.cellWidth, CH = def.cellHeight;
    const rows = def.layout.length, cols = Math.max(...def.layout.map((r) => r.length));
    const origins = {}; // area id -> top-left tile of that area
    const parts = def.layout.map((row, cy) => row.map((id, cx) => {
      if (!id || !DBG.data.maps[id]) {
        if (id) console.warn(`World layout: map "${id}" not found. Is it listed in index.html?`);
        return null;
      }
      const part = loadSingle(id, true);
      if (part.width !== CW || part.height !== CH) {
        console.warn(`World layout: "${id}" is ${part.width}x${part.height}, should be ${CW}x${CH}.`);
      }
      origins[id] = { x: cx * CW, y: cy * CH };
      return part;
    }));
    const grass = DBG.data.tiles["."];
    const partAt = (x, y) => {
      const row = parts[Math.floor(y / CH)];
      return row ? row[Math.floor(x / CW)] : null;
    };
    const startId = origins[def.start] ? def.start : Object.keys(origins)[0];
    const start = parts.flat().find((p) => p && p.id === startId).playerStart;

    return {
      id: "world",
      name: def.name || "The World",
      width: cols * CW,
      height: rows * CH,
      cellWidth: CW,
      cellHeight: CH,
      origins,
      playerStart: { x: origins[startId].x + start.x, y: origins[startId].y + start.y },
      charAt(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) return null;
        const p = partAt(x, y);
        return p ? p.charAt(x % CW, y % CH) : ".";
      },
      tile(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) return null;
        const p = partAt(x, y);
        return (p && p.tile(x % CW, y % CH)) || grass;
      },
      /** Which area a TILE position is in: { id, name }. */
      regionAt(x, y) {
        const p = partAt(Math.max(0, Math.min(this.width - 1, x)), Math.max(0, Math.min(this.height - 1, y)));
        return p ? { id: p.id, name: p.name } : { id: null, name: this.name };
      },
    };
  }
})();
