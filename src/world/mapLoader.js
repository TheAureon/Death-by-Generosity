// ---------------------------------------------------------------------------
// Turns a text-grid map (data/maps/*.js) into an easy-to-query object.
// Pure data work, no drawing — see worldBuilder.js for that.
// ---------------------------------------------------------------------------
(function () {
  const FALLBACK_CHAR = "."; // used for unknown characters and short rows

  /**
   * @param {string} mapId  key used in DBG.addMap(...)
   * @returns {{ id, name, width, height, rows, tile(x,y), playerStart }}
   */
  DBG.World.loadMap = function (mapId) {
    const raw = DBG.data.maps[mapId];
    if (!raw) throw new Error(`Map "${mapId}" not found. Is its file listed in index.html?`);
    const legend = DBG.data.tiles;

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

    if (!playerStart) {
      console.warn(`Map "${mapId}" has no "P" start tile. Starting in the middle.`);
      playerStart = { x: Math.floor(width / 2), y: Math.floor(height / 2) };
    }

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
    };
  };
})();
