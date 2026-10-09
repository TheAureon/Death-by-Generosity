// ---------------------------------------------------------------------------
// The Journal (press J): the game's REAL menu, the one that actually works.
//   - Your tally, and everyone you've met (titles, gear, how many died)
//   - Save game / Load game / New game (asks twice) / Exit (doesn't, obviously)
// Controls: W/S or arrows to choose, E/Enter to pick, J/Q to close; or mouse.
// ---------------------------------------------------------------------------
DBG.UI.JournalMenu = class JournalMenu {
  constructor(scene) {
    this.scene = scene;
    this.root = null;
    const k = scene.input.keyboard;
    const when = (fn) => () => { if (this.root && scene.time.now > this.openedAt + 150) fn(); };
    ["UP", "W"].forEach((key) => k.on("keydown-" + key, when(() => this.select(this.selected - 1))));
    ["DOWN", "S"].forEach((key) => k.on("keydown-" + key, when(() => this.select(this.selected + 1))));
    ["E", "ENTER", "SPACE"].forEach((key) => k.on("keydown-" + key, when(() => this.pick(this.selected))));
    ["Q", "BACKSPACE"].forEach((key) => k.on("keydown-" + key, when(() => this.close())));
    k.on("keydown-J", () => {
      if (this.root) return this.close();
      const busy = ["inventoryMenu", "choiceMenu", "craftMenu"].some((m) => scene[m] && scene[m].isOpen);
      if (!busy) this.open();
    });
  }

  get isOpen() {
    return !!this.root;
  }

  open() {
    const s = this.scene, C = DBG.UI.colors, J = DBG.data.jokes.journal;
    this.openedAt = s.time.now;
    this.confirmNew = false;
    s.scene.pause("World");

    // Everyone the world remembers
    const people = Object.entries(DBG.state.world.npcs).map(([id, rec]) => {
      const def = DBG.data.npcs[id];
      if (!def) return null;
      const gear = rec.gear.map((g) => DBG.data.items[g].name);
      const deaths = rec.generation - 1;
      // Work out their rank the same way the game does
      const stats = { ...def.stats };
      rec.gear.forEach((g) => Object.entries(DBG.data.items[g].stats || {}).forEach(([k, v]) => { stats[k] = (stats[k] || 0) + v; }));
      const rank = DBG.Memory.rankFor({ stats, def });
      const name = rank ? rank.title : def.name + DBG.Memory.suffix(rec.generation);
      return `${name}${deaths ? ` (died ${deaths}x)` : ""} — ${gear.length ? gear.join(", ") : "nothing threatening"}`;
    }).filter(Boolean);

    const w = 640, lineH = 20;
    this.options = [
      { label: J.save, action: "save" },
      { label: J.load, action: "load" },
      { label: J.newGame, action: "new" },
      { label: J.exit, action: "exit" },
      { label: J.close, action: "close" },
    ];
    const h = 150 + Math.max(1, people.length) * lineH + this.options.length * 34;
    const root = DBG.UI.panel(s, Math.round((s.scale.width - w) / 2), Math.max(10, Math.round((s.scale.height - h) / 2)), w, h).setDepth(870);
    const add = (o) => { root.add(o); return o; };
    add(DBG.UI.text(s, w / 2, 18, J.title, 24).setOrigin(0.5, 0));
    const t = DBG.state.tally;
    add(DBG.UI.text(s, w / 2, 52, `Gifted to death: ${t.gifted}   ·   Wasted attempts: ${t.wasted}`, 15, C.danger).setOrigin(0.5, 0));
    add(DBG.UI.text(s, 30, 82, J.people, 15, C.textMuted));
    (people.length ? people : [J.nobody]).forEach((line, i) => {
      add(DBG.UI.text(s, 40, 104 + i * lineH, line, 13).setWordWrapWidth(w - 70));
    });
    const oy = 120 + Math.max(1, people.length) * lineH;
    this.labels = this.options.map((o, i) => {
      const lbl = add(DBG.UI.text(s, 70, oy + i * 34, o.label, 17).setInteractive({ useHandCursor: true }));
      lbl.on("pointerover", () => this.select(i));
      lbl.on("pointerdown", () => this.pick(i));
      return lbl;
    });
    this.cursor = add(DBG.UI.text(s, 46, oy, "▶", 17, C.danger));
    this.root = root;
    this.select(0);
  }

  select(i) {
    if (!this.root) return;
    this.selected = Phaser.Math.Wrap(i, 0, this.options.length);
    this.labels.forEach((l, j) => l.setColor(j === this.selected ? DBG.UI.colors.danger : DBG.UI.colors.text));
    this.cursor.setY(this.labels[this.selected].y);
  }

  pick(i) {
    const J = DBG.data.jokes.journal, toast = this.scene.toast;
    const action = this.options[i].action;
    if (action === "save") {
      this.close();
      toast.show(DBG.Save.save() ? J.savedOk : J.saveFailed);
    } else if (action === "load") {
      const data = DBG.Save.load();
      if (!data) return toast.show(J.noSave);
      this.close();
      DBG.Save.apply(data);
      this.restartWorld();
      toast.show(J.loadedOk);
    } else if (action === "new") {
      if (!this.confirmNew) {
        this.confirmNew = true;
        this.labels[i].setText(J.newGameConfirm);
        return;
      }
      this.close();
      DBG.Save.wipe();
      DBG.Save.fresh();
      this.restartWorld();
    } else if (action === "exit") {
      toast.show(J.exitFails);
    } else {
      this.close();
    }
  }

  /** Reload the world from DBG.state (after load / new game). */
  restartWorld() {
    const world = this.scene.scene.get("World");
    this.scene.game.events.emit("tally-changed", DBG.state.tally);
    world.skipRemember = true; // don't overwrite the loaded items with the old map's
    world.scene.restart({ mapId: DBG.state.mapId, pos: DBG.state.pos });
  }

  close() {
    if (!this.root) return;
    this.root.destroy();
    this.root = null;
    this.scene.scene.resume("World");
  }
};
