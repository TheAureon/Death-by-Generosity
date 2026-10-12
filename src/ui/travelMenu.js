// ---------------------------------------------------------------------------
// Fast travel: press E at any waystone. Lists every waystone you've touched
// (in world order, from data/regions.js) and whisks you there.
// Controls: W/S or arrows to choose, E/Enter to travel, Q to close; or mouse.
// ---------------------------------------------------------------------------
DBG.UI.TravelMenu = class TravelMenu {
  constructor(scene) {
    this.scene = scene;
    this.root = null;
    const k = scene.input.keyboard;
    const when = (fn) => () => { if (this.root && scene.time.now > this.openedAt + 150) fn(); };
    ["UP", "W"].forEach((key) => k.on("keydown-" + key, when(() => this.select(this.selected - 1))));
    ["DOWN", "S"].forEach((key) => k.on("keydown-" + key, when(() => this.select(this.selected + 1))));
    ["E", "ENTER", "SPACE"].forEach((key) => k.on("keydown-" + key, when(() => this.pick(this.selected))));
    ["Q", "BACKSPACE"].forEach((key) => k.on("keydown-" + key, when(() => this.close())));
    const onOpen = (here) => this.open(here);
    scene.game.events.on("open-travel", onOpen);
    scene.events.once("shutdown", () => scene.game.events.off("open-travel", onOpen));
  }

  get isOpen() {
    return !!this.root;
  }

  open(here) {
    if (this.root) return;
    const s = this.scene, C = DBG.UI.colors, J = DBG.data.jokes;
    DBG.Sfx.play("click");
    this.openedAt = s.time.now;
    s.scene.pause("World");
    // Every region with a map whose waystone you've touched, in world order
    this.places = DBG.data.regions
      .filter((r) => r.map && DBG.data.maps[r.map] && DBG.state.waystones[r.map])
      .map((r) => ({ id: r.map, label: DBG.data.maps[r.map].name + (r.map === here ? "  (you are here)" : "") }));
    this.places.push({ id: null, label: "Stay here" });

    const w = 420, h = 100 + this.places.length * 34;
    const root = DBG.UI.panel(s, Math.round((s.scale.width - w) / 2), Math.round((s.scale.height - h) / 2), w, h).setDepth(870);
    root.add(DBG.UI.text(s, w / 2, 18, J.travelTitle, 22).setOrigin(0.5, 0));
    root.add(DBG.UI.text(s, w / 2, 48, J.travelHint, 12, C.textMuted).setOrigin(0.5, 0));
    this.labels = this.places.map((p, i) => {
      const t = DBG.UI.text(s, 64, 76 + i * 34, p.label, 17).setInteractive({ useHandCursor: true });
      t.on("pointerover", () => this.select(i));
      t.on("pointerdown", () => this.pick(i));
      root.add(t);
      return t;
    });
    this.cursor = DBG.UI.text(s, 40, 76, "▶", 17, C.danger);
    root.add(this.cursor);
    this.root = root;
    this.select(0);
  }

  select(i) {
    if (!this.root) return;
    this.selected = Phaser.Math.Wrap(i, 0, this.places.length);
    this.labels.forEach((l, j) => l.setColor(j === this.selected ? DBG.UI.colors.danger : DBG.UI.colors.text));
    this.cursor.setY(this.labels[this.selected].y);
  }

  pick(i) {
    const place = this.places[i];
    this.close();
    if (place && place.id) this.scene.scene.get("World").travelTo(place.id);
  }

  close() {
    if (!this.root) return;
    this.root.destroy();
    this.root = null;
    this.scene.scene.resume("World");
  }
};
