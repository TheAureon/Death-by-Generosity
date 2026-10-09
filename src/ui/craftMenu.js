// ---------------------------------------------------------------------------
// Crafting menu: talk to a crafter (Brunhilde) and pick "Forge something".
// Lists every recipe in data/recipes.js with what you have / what it needs.
// Controls: W/S or arrows to choose, E/Enter to forge, Q to close; or mouse.
// The world pauses while it's open.
// ---------------------------------------------------------------------------
DBG.UI.CraftMenu = class CraftMenu {
  constructor(scene) {
    this.scene = scene;
    this.root = null;
    const k = scene.input.keyboard;
    const when = (fn) => () => { if (this.root && scene.time.now > this.openedAt + 150) fn(); };
    ["UP", "W"].forEach((key) => k.on("keydown-" + key, when(() => this.select(this.selected - 1))));
    ["DOWN", "S"].forEach((key) => k.on("keydown-" + key, when(() => this.select(this.selected + 1))));
    ["E", "ENTER", "SPACE"].forEach((key) => k.on("keydown-" + key, when(() => this.craft(this.selected))));
    ["Q", "BACKSPACE"].forEach((key) => k.on("keydown-" + key, when(() => this.close())));
  }

  get isOpen() {
    return !!this.root;
  }

  open(npc) {
    if (this.root) return;
    this.npc = npc;
    this.openedAt = this.scene.time.now;
    this.scene.scene.pause("World");
    this.selected = this.selected || 0;
    this.build();
  }

  /** (Re)draw the whole panel — called after each craft so counts update. */
  build() {
    const s = this.scene, C = DBG.UI.colors, inv = DBG.state.inventory;
    if (this.root) this.root.destroy();
    const recipes = DBG.data.recipes;
    const w = 560, rowH = 52, h = 110 + recipes.length * rowH;
    const root = DBG.UI.panel(s, Math.round((s.scale.width - w) / 2), Math.round((s.scale.height - h) / 2), w, h).setDepth(860);
    root.add(DBG.UI.text(s, w / 2, 18, `${this.npc.name}'s Forge`, 22).setOrigin(0.5, 0));
    root.add(DBG.UI.text(s, w / 2, 46, "Monster bits in, shiny gifts out.", 13, C.textMuted).setOrigin(0.5, 0));

    this.rows = recipes.map((r, i) => {
      const item = DBG.data.items[r.result];
      const y = 76 + i * rowH;
      const bg = s.add.graphics();
      root.add(bg);
      root.add(s.add.image(44, y + rowH / 2 - 4, "icon_" + r.result).setScale(2.5));
      root.add(DBG.UI.text(s, 76, y + 2, item.name, 16));
      // "Slime Goo 2/3   Boar Tusk 0/2"
      let x = 76;
      Object.entries(r.needs).forEach(([matId, n]) => {
        const have = inv.countOf(matId);
        const t = DBG.UI.text(s, x, y + 24, `${DBG.data.items[matId].name} ${have}/${n}`, 13, have >= n ? C.regen : C.danger);
        root.add(t);
        x += t.width + 18;
      });
      const zone = s.add.zone(16, y - 2, w - 32, rowH - 4).setOrigin(0).setInteractive({ useHandCursor: true });
      zone.on("pointerdown", () => { if (this.selected === i) this.craft(i); else this.select(i); });
      root.add(zone);
      return { bg, y };
    });
    root.add(DBG.UI.text(s, w / 2, h - 28, "W/S choose · E forge · Q close", 12, C.textMuted).setOrigin(0.5, 0));
    this.root = root;
    this.select(this.selected);
  }

  select(i) {
    if (!this.root) return;
    this.selected = Phaser.Math.Wrap(i, 0, this.rows.length);
    this.rows.forEach((r, j) => {
      r.bg.clear();
      if (j === this.selected) r.bg.fillStyle(0xe8c890, 1).fillRoundedRect(16, r.y - 2, 528, 48, 6);
    });
  }

  canCraft(recipe) {
    return Object.entries(recipe.needs).every(([id, n]) => DBG.state.inventory.countOf(id) >= n);
  }

  craft(i) {
    const recipe = DBG.data.recipes[i];
    const J = DBG.data.jokes, inv = DBG.state.inventory;
    const name = DBG.data.items[recipe.result].name;
    if (!this.canCraft(recipe)) return this.scene.toast.show(J.craftMissing.replace("{item}", name));
    if (!inv.add(recipe.result)) return this.scene.toast.show(J.bagFull.replace("{item}", name));
    Object.entries(recipe.needs).forEach(([id, n]) => inv.remove(id, n));
    this.scene.toast.show(J.crafted.replace("{item}", name).replace("{name}", this.npc.name));
    this.build();
  }

  close() {
    if (!this.root) return;
    this.root.destroy();
    this.root = null;
    this.scene.scene.resume("World");
  }
};
