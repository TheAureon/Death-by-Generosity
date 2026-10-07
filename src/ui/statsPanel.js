// ---------------------------------------------------------------------------
// Character sheet (press C): the hero's ridiculous stats and the cursed
// armour. Numbers come from data/hero.js. Live HP via "hero-hp" events.
// ---------------------------------------------------------------------------
DBG.UI.StatsPanel = class StatsPanel {
  constructor(scene) {
    this.scene = scene;
    this.hp = DBG.data.hero.maxHp;
    this.root = null;
    scene.input.keyboard.on("keydown-C", () => this.toggle());
    scene.game.events.on("hero-hp", this.onHp, this);
    scene.events.once("shutdown", () => scene.game.events.off("hero-hp", this.onHp, this));
  }

  onHp(hp) {
    this.hp = hp;
    if (this.hpLine) this.hpLine.setText(this.hpString());
  }

  hpString() {
    const h = DBG.data.hero, fmt = DBG.Combat.fmt;
    return `HP ${fmt(this.hp)} / ${fmt(h.maxHp)}  (+${fmt(h.regenPerSecond)}/s)`;
  }

  toggle() {
    if (this.root) { this.root.destroy(); this.root = null; this.hpLine = null; return; }
    const s = this.scene, h = DBG.data.hero, fmt = DBG.Combat.fmt, C = DBG.UI.colors;
    const w = 440, rows = [
      ["Attack", fmt(h.attack)],
      ["Defense", fmt(h.defense)],
      ["Thorns", `x${h.thorns} (hits bounce back)`],
      ...h.sheetStats,
    ];
    const hgt = 200 + rows.length * 24;
    const root = DBG.UI.panel(s, (s.scale.width - w) / 2, (s.scale.height - hgt) / 2, w, hgt).setDepth(850);
    const add = (o) => { root.add(o); return o; };

    add(DBG.UI.text(s, w / 2, 22, h.name, 24).setOrigin(0.5, 0));
    this.hpLine = add(DBG.UI.text(s, w / 2, 56, this.hpString(), 14, C.regen).setOrigin(0.5, 0));
    rows.forEach(([label, value], i) => {
      add(DBG.UI.text(s, 30, 86 + i * 24, label, 15, C.textMuted));
      add(DBG.UI.text(s, 170, 86 + i * 24, value, 15).setWordWrapWidth(w - 200));
    });
    const y = 96 + rows.length * 24;
    add(DBG.UI.text(s, 30, y, h.armor.name, 15, C.danger));
    add(DBG.UI.text(s, 30, y + 22, h.armor.description, 13).setWordWrapWidth(w - 60));
    add(DBG.UI.text(s, w / 2, hgt - 30, "C to close", 12, C.textMuted).setOrigin(0.5, 0));
    this.root = root;
  }
};
