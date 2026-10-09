// ---------------------------------------------------------------------------
// Talk menu: opened by pressing E next to someone (game event "talk-to").
//   Give a gift      -> opens the gift menu
//   Please fight me  -> asks them to fight (game event "fight-request")
//   Never mind
// Controls: W/S or arrows to choose, E/Enter/Space to pick, Q to close.
// The world pauses while it's open.
// ---------------------------------------------------------------------------
DBG.UI.ChoiceMenu = class ChoiceMenu {
  constructor(scene, inventoryMenu) {
    this.scene = scene;
    this.inventoryMenu = inventoryMenu;
    this.root = null;

    const k = scene.input.keyboard;
    const when = (fn) => () => { if (this.root && scene.time.now > this.openedAt + 150) fn(); };
    ["UP", "W"].forEach((key) => k.on("keydown-" + key, when(() => this.select(this.selected - 1))));
    ["DOWN", "S"].forEach((key) => k.on("keydown-" + key, when(() => this.select(this.selected + 1))));
    ["E", "ENTER", "SPACE"].forEach((key) => k.on("keydown-" + key, when(() => this.pick(this.selected))));
    ["Q", "BACKSPACE"].forEach((key) => k.on("keydown-" + key, when(() => this.close())));

    const onTalk = (npc) => this.open(npc);
    scene.game.events.on("talk-to", onTalk);
    scene.events.once("shutdown", () => scene.game.events.off("talk-to", onTalk));
  }

  get isOpen() {
    return !!this.root;
  }

  open(npc) {
    if (this.root || this.inventoryMenu.isOpen) return;
    const s = this.scene;
    this.npc = npc;
    this.openedAt = s.time.now;
    s.scene.pause("World");

    const gifted = Object.keys(npc.gear).length > 0;
    this.options = [
      { label: "Give a gift", action: "gift" },
      { label: gifted ? "Please fight me" : "Please fight me (they have nothing)", action: "fight" },
      { label: "Never mind", action: "close" },
    ];
    const w = 420, h = 90 + this.options.length * 44;
    const root = DBG.UI.panel(s, Math.round((s.scale.width - w) / 2), s.scale.height - h - 60, w, h).setDepth(860);
    root.add(DBG.UI.text(s, w / 2, 20, npc.name, 20).setOrigin(0.5, 0));
    this.labels = this.options.map((o, i) => {
      const t = DBG.UI.text(s, 50, 62 + i * 44, o.label, 17).setInteractive({ useHandCursor: true });
      t.on("pointerover", () => this.select(i));
      t.on("pointerdown", () => this.pick(i));
      root.add(t);
      return t;
    });
    this.cursor = DBG.UI.text(s, 26, 62, "▶", 17, DBG.UI.colors.danger);
    root.add(this.cursor);
    this.root = root;
    this.select(0);
  }

  select(i) {
    if (!this.root) return;
    this.selected = Phaser.Math.Wrap(i, 0, this.options.length);
    this.labels.forEach((t, j) => t.setColor(j === this.selected ? DBG.UI.colors.danger : DBG.UI.colors.text));
    this.cursor.setY(this.labels[this.selected].y);
  }

  pick(i) {
    const choice = this.options[i];
    const npc = this.npc;
    this.close();
    if (choice.action === "gift") this.inventoryMenu.open("gift", npc);
    if (choice.action === "fight") this.scene.game.events.emit("fight-request", npc);
  }

  close() {
    if (!this.root) return;
    this.root.destroy();
    this.root = null;
    this.scene.scene.resume("World");
  }
};
