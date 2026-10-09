// ---------------------------------------------------------------------------
// World memory: what the world remembers between maps (and in save files).
//
//   DBG.state.world.npcs[id]     = { gear: [...], generation: 1, hoard: [...] }
//     gear       — what they're wearing (a gifted shopkeeper STAYS gifted)
//     generation — goes up each time they die; their replacement is "Bob II"
//     hoard      — things a toll-taking NPC has collected from you
//   DBG.state.world.pickups[map] = [{ item, x, y, loot }] — items on the ground
//
// Ranks: when an NPC gets powerful enough (data/npcs.js "ranks"), they get a
// new title, a new greeting, and a new everyday behaviour.
// ---------------------------------------------------------------------------
DBG.Memory = {
  /** The memory record for an NPC (made fresh from data the first time). */
  npc(id) {
    const w = DBG.state.world;
    if (!w.npcs[id]) {
      const def = DBG.data.npcs[id];
      w.npcs[id] = { gear: (def.startingGear || []).slice(), generation: 1, hoard: [] };
    }
    return w.npcs[id];
  },

  /** Someone died: their replacement starts over (but keeps the family name). */
  npcDied(id) {
    const rec = this.npc(id);
    rec.generation += 1;
    rec.gear = (DBG.data.npcs[id].startingGear || []).slice();
    rec.hoard = [];
  },

  /** How strong someone is, for ranks: attack + defense + a tenth of HP. */
  power(stats) {
    return (stats.attack || 0) + (stats.defense || 0) + Math.floor((stats.maxHp || 0) / 10);
  },

  /** The best rank (from data/npcs.js "ranks") this NPC has earned, or null. */
  rankFor(npc) {
    const p = this.power(npc.stats);
    let best = null;
    (npc.def.ranks || []).forEach((r) => { if (p >= r.power && (!best || r.power > best.power)) best = r; });
    return best;
  },

  /** 1 -> "", 2 -> " II", 3 -> " III"... (for "Farmer Bob II") */
  suffix(generation) {
    if (generation <= 1) return "";
    const romans = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    let n = generation, out = "";
    romans.forEach(([v, s]) => { while (n >= v) { out += s; n -= v; } });
    return " " + out;
  },

  /** Items lying on the ground on a map (taken out of memory once placed). */
  takePickups(mapId) {
    const list = DBG.state.world.pickups[mapId] || [];
    DBG.state.world.pickups[mapId] = [];
    return list;
  },

  rememberPickups(mapId, list) {
    DBG.state.world.pickups[mapId] = list;
  },
};
