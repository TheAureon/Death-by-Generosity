// ---------------------------------------------------------------------------
// Inventory menu — two modes:
//   "view": press I to look through the bag
//   "gift": opened by pressing E next to an NPC; pick something to give
//
// Controls: arrows/WASD move, E/Enter/Space give, Q/I/Backspace close,
// or use the mouse. The world pauses while it's open (like Stardew).
// When a gift is picked it sends game event "gift-chosen" (npc, slotIndex).
// ---------------------------------------------------------------------------
DBG.UI.InventoryMenu = class InventoryMenu {
  constructor(scene) {
    this.scene = scene;
    this.root = null;
    this.cols = 8;
    this.cell = 56;

    const k = scene.input.keyboard;
    const when = (fn) => () => { if (this.root && scene.time.now > this.openedAt + 150) fn(); };
    k.on("keydown-LEFT", when(() => this.move(-1, 0))); k.on("keydown-A", when(() => this.move(-1, 0)));
    k.on("keydown-RIGHT", when(() => this.move(1, 0))); k.on("keydown-D", when(() => this.move(1, 0)));
    k.on("keydown-UP", when(() => this.move(0, -1))); k.on("keydown-W", when(() => this.move(0, -1)));
    k.on("keydown-DOWN", when(() => this.move(0, 1))); k.on("keydown-S", when(() => this.move(0, 1)));
    ["E", "ENTER", "SPACE"].forEach((key) => k.on("keydown-" + key, when(() => this.confirm())));
    ["Q", "BACKSPACE"].forEach((key) => k.on("keydown-" + key, when(() => this.close())));
    k.on("keydown-I", () => {
      if (this.root) { if (this.mode === "view") this.close(); }
      else if (!scene.choiceMenu || !scene.choiceMenu.isOpen) this.open("view");
    });

    const onOpenGift = (npc) => this.open("gift", npc);
    scene.game.events.on("open-gift", onOpenGift);
    scene.events.once("shutdown", () => scene.game.events.off("open-gift", onOpenGift));
  }

  get isOpen() {
    return !!this.root;
  }

  open(mode, npc = null) {
    if (this.root) this.close();
    const s = this.scene, C = DBG.UI.colors;
    this.mode = mode;
    this.npc = npc;
    this.openedAt = s.time.now;
    this.selected = 0;
    s.scene.pause("World");

    const inv = DBG.state.inventory;
    const rows = Math.ceil(inv.slots.length / this.cols);
    const gridW = this.cols * this.cell, gridH = rows * this.cell;
    const w = gridW + 60, top = mode === "gift" ? 92 : 64, h = top + gridH + 190;
    const root = DBG.UI.panel(s, Math.round((s.scale.width - w) / 2), Math.round((s.scale.height - h) / 2), w, h).setDepth(860);
    const add = (o) => { root.add(o); return o; };

    // Header
    const title = mode === "gift" ? `Give a gift to ${npc.name}` : "Inventory";
    add(DBG.UI.text(s, w / 2, 20, title, 22).setOrigin(0.5, 0));
    if (mode === "gift") add(DBG.UI.text(s, w / 2, 52, this.npcSummary(npc), 13, C.textMuted).setOrigin(0.5, 0).setWordWrapWidth(w - 50));

    // Grid of slots
    this.gridX = 30; this.gridY = top;
    this.cellGfx = add(s.add.graphics());
    this.icons = inv.slots.map((id, i) => {
      const { x, y } = this.cellPos(i);
      const zone = add(s.add.zone(x, y, this.cell - 4, this.cell - 4).setOrigin(0).setInteractive({ useHandCursor: true }));
      zone.on("pointerdown", () => { if (this.selected === i) this.confirm(); else this.select(i); });
      if (!id) return null;
      return add(s.add.image(x + this.cell / 2 - 2, y + this.cell / 2 - 2, "icon_" + id).setScale(3));
    });

    // Details of the selected item
    const dy = top + gridH + 12;
    this.nameText = add(DBG.UI.text(s, 30, dy, "", 18));
    this.statText = add(DBG.UI.text(s, 30, dy + 26, "", 14, C.regen));
    this.descText = add(DBG.UI.text(s, 30, dy + 48, "", 13).setWordWrapWidth(w - 60));

    // Buttons
    const by = h - 40;
    if (mode === "gift") {
      this.giveBtn = add(DBG.UI.button(s, w / 2 - 90, by, "Give", () => this.confirm(), 150, 40));
      add(DBG.UI.button(s, w / 2 + 90, by, "Never mind", () => this.close(), 150, 40));
    } else {
      add(DBG.UI.button(s, w / 2, by, "Close", () => this.close(), 150, 40));
    }
    add(DBG.UI.text(s, w / 2, by + 26, mode === "gift"
      ? "Arrows/WASD choose · E/Enter give · Q close" : "Arrows/WASD choose · I/Q close", 11, C.textMuted).setOrigin(0.5, 0));

    this.root = root;
    root.setScale(0.95).setAlpha(0);
    s.tweens.add({ targets: root, scale: 1, alpha: 1, duration: 120 });
    // Start on the first slot that has something in it
    const first = inv.slots.findIndex(Boolean);
    this.select(first < 0 ? 0 : first);
  }

  close() {
    if (!this.root) return;
    this.root.destroy();
    this.root = null;
    this.scene.scene.resume("World");
  }

  cellPos(i) {
    return { x: this.gridX + (i % this.cols) * this.cell, y: this.gridY + Math.floor(i / this.cols) * this.cell };
  }

  move(dx, dy) {
    const n = DBG.state.inventory.slots.length;
    let i = this.selected + dx + dy * this.cols;
    if (i < 0 || i >= n) return;
    this.select(i);
  }

  select(i) {
    this.selected = i;
    this.drawCells();
    const id = DBG.state.inventory.get(i);
    const item = id && DBG.data.items[id];
    if (!item) {
      this.nameText.setText("(empty)");
      this.statText.setText("");
      this.descText.setText(this.mode === "gift" ? "You can't give nothing. Well, you can. But it's rude." : "");
      return;
    }
    this.nameText.setText(item.name);
    this.statText.setText(this.statLine(item));
    this.descText.setText(item.description);
  }

  /** "+40 ATK  -5 SPD  (weapon) — replaces Rusty Sword" */
  statLine(item) {
    const labels = { attack: "ATK", defense: "DEF", maxHp: "HP", speed: "SPD" };
    const parts = Object.entries(item.stats || {}).map(([k, v]) => `${v > 0 ? "+" : ""}${v} ${labels[k] || k}`);
    let line = `${parts.join("  ") || "No stats"}   (${item.slot})`;
    if (this.mode === "gift") {
      const worn = this.npc.gear[item.slot];
      line += worn ? ` — replaces their ${DBG.data.items[worn].name}` : " — new slot!";
    }
    return line;
  }

  npcSummary(npc) {
    const st = npc.stats;
    const worn = Object.values(npc.gear).map((id) => DBG.data.items[id].name);
    return `ATK ${st.attack}  DEF ${st.defense}  HP ${st.maxHp}  SPD ${st.speed}` +
      `   ·   Wearing: ${worn.length ? worn.join(", ") : "nothing threatening"}`;
  }

  drawCells() {
    const g = this.cellGfx, C = DBG.UI.colors;
    g.clear();
    DBG.state.inventory.slots.forEach((id, i) => {
      const { x, y } = this.cellPos(i), sz = this.cell - 4;
      const sel = i === this.selected;
      g.fillStyle(sel ? 0xc8323c : C.outline, 1).fillRoundedRect(x - 2, y - 2, sz + 4, sz + 4, 5);
      g.fillStyle(id ? 0xe8c890 : 0xd9c398, 1).fillRoundedRect(x, y, sz, sz, 4);
    });
  }

  confirm() {
    if (this.mode !== "gift") return;
    const i = this.selected;
    if (!DBG.state.inventory.get(i)) return;
    const npc = this.npc;
    this.close();
    this.scene.game.events.emit("gift-chosen", npc, i);
  }
};
