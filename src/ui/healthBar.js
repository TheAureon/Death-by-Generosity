// ---------------------------------------------------------------------------
// Health bar HUD (top-left): hero portrait, name, HP bar, HP numbers and the
// regen rate. Listens for game event "hero-hp" (hp, maxHp, regenPerSecond).
// ---------------------------------------------------------------------------
DBG.UI.HealthBar = class HealthBar {
  constructor(scene) {
    const C = DBG.UI.colors;
    this.scene = scene;
    this.barW = 220;
    this.barH = 16;

    this.root = DBG.UI.panel(scene, 12, 12, 330, 92);
    // Portrait: the hero's standing frame, scaled up
    const portraitBg = scene.add.graphics().fillStyle(0xe8c890, 1).fillRoundedRect(16, 16, 60, 60, 4);
    const portrait = scene.add.image(46, 50, "hero", 0).setScale(2.6);
    this.name = DBG.UI.text(scene, 88, 14, DBG.data.hero.name, 16);
    this.bar = scene.add.graphics();
    this.hpText = DBG.UI.text(scene, 88, 58, "", 13);
    this.regenText = DBG.UI.text(scene, 316, 58, "", 13, C.regen).setOrigin(1, 0);
    this.root.add([portraitBg, portrait, this.name, this.bar, this.hpText, this.regenText]);

    this.shown = -1;
    scene.game.events.on("hero-hp", this.set, this);
    scene.events.once("shutdown", () => scene.game.events.off("hero-hp", this.set, this));
  }

  set(hp, maxHp, regen) {
    const C = DBG.UI.colors;
    const fmt = DBG.Combat.fmt;
    const pct = Phaser.Math.Clamp(hp / maxHp, 0, 1);
    const x = 88, y = 36, w = this.barW, h = this.barH;

    // Only redraw when the visible bar actually changes
    const px = Math.round(pct * (w - 4));
    if (px !== this.shown) {
      this.shown = px;
      this.bar.clear();
      this.bar.fillStyle(C.outline, 1).fillRect(x, y, w, h);
      this.bar.fillStyle(C.hpBack, 1).fillRect(x + 2, y + 2, w - 4, h - 4);
      this.bar.fillStyle(C.hp, 1).fillRect(x + 2, y + 2, px, h - 4);
      this.bar.fillStyle(C.hpDark, 1).fillRect(x + 2, y + h - 5, px, 3);
    }
    this.hpText.setText(`HP ${fmt(hp)} / ${fmt(maxHp)}`);
    this.regenText.setText(`+${fmt(regen)}/s`).setAlpha(hp < maxHp ? 1 : 0.45);
  }
};
