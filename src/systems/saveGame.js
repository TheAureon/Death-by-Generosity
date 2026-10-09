// ---------------------------------------------------------------------------
// Saving and loading. One save slot, stored in the browser (localStorage),
// so it survives closing the tab. Nothing is sent anywhere.
//
//   DBG.Save.fresh()     — a brand new game state
//   DBG.Save.save()      — write the current game to the save slot
//   DBG.Save.load()      — read the save slot (or null)
//   DBG.Save.apply(data) — make a loaded save the current game
//   DBG.Save.autosave()  — save soon (called after gifts, deaths, map changes)
// ---------------------------------------------------------------------------
DBG.Save = {
  KEY: "death-by-generosity-save-v1",

  /** A brand new game: starting bag, empty tally, fresh world memory. */
  fresh() {
    const hero = DBG.data.hero;
    DBG.state.inventory = new DBG.Inventory(hero.inventorySize || 32, hero.startingInventory || []);
    DBG.state.tally = { gifted: 0, wasted: 0 };
    DBG.state.world = { npcs: {}, pickups: {} };
    DBG.state.introShown = false;
    DBG.state.mapId = DBG.data.settings.startMap;
    DBG.state.pos = null;
  },

  /** Everything worth keeping, as plain data. */
  snapshot() {
    const world = DBG.game && DBG.game.scene.getScene("World");
    if (world && world.sys.isActive() && world.player) {
      world.rememberPickups(); // items on the ground right now
      DBG.state.mapId = world.map.id;
      DBG.state.pos = { x: Math.round(world.player.x), y: Math.round(world.player.y) };
    }
    const inv = DBG.state.inventory;
    return {
      version: 1,
      savedAt: new Date().toISOString(),
      mapId: DBG.state.mapId,
      pos: DBG.state.pos,
      inventory: { slots: inv.slots.slice(), counts: inv.counts.slice() },
      tally: { ...DBG.state.tally },
      introShown: DBG.state.introShown,
      world: JSON.parse(JSON.stringify(DBG.state.world)),
    };
  },

  save() {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(this.snapshot()));
      if (DBG.game) DBG.game.events.emit("saved");
      return true;
    } catch (e) {
      console.warn("Could not save:", e);
      return false;
    }
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn("Could not read the save:", e);
      return null;
    }
  },

  exists() {
    return !!this.load();
  },

  wipe() {
    try { localStorage.removeItem(this.KEY); } catch (e) { /* nothing to wipe */ }
  },

  /** Make a loaded save the current game. Unknown items/maps are skipped. */
  apply(data) {
    this.fresh();
    const inv = DBG.state.inventory;
    (data.inventory.slots || []).forEach((id, i) => {
      if (id && DBG.data.items[id] && i < inv.slots.length) { inv.slots[i] = id; inv.counts[i] = data.inventory.counts[i] || 1; }
    });
    DBG.state.tally = { gifted: 0, wasted: 0, ...data.tally };
    DBG.state.introShown = !!data.introShown;
    DBG.state.world = { npcs: {}, pickups: {}, ...data.world };
    // Drop gear that no longer exists in data/items.js (e.g. after editing)
    Object.values(DBG.state.world.npcs).forEach((rec) => {
      rec.gear = (rec.gear || []).filter((id) => DBG.data.items[id]);
      rec.hoard = (rec.hoard || []).filter((id) => DBG.data.items[id]);
    });
    DBG.state.mapId = DBG.data.maps[data.mapId] ? data.mapId : DBG.data.settings.startMap;
    DBG.state.pos = DBG.state.mapId === data.mapId ? data.pos : null;
  },

  /** Save a moment from now (several events in a row = one save). */
  autosave() {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => this.save(), 800);
  },
};
