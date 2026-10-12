// ---------------------------------------------------------------------------
// EndingScene: shown when the hero finally dies.
//   YOU DIED ... FINALLY.
//   Who did it (and with which of YOUR gifts), a joke about them,
//   your stats, then two buttons: Play again, and Exit (which, of course...).
// All text lives in data/jokes.js -> "ending".
// ---------------------------------------------------------------------------
DBG.Scenes.EndingScene = class EndingScene extends Phaser.Scene {
  constructor() {
    super("Ending");
  }

  create(info) {
    const E = DBG.data.jokes.ending, C = DBG.UI.colors;
    const W = this.scale.width, H = this.scale.height, cx = W / 2;
    this.info = info;
    const bg = this.add.rectangle(0, 0, W, H, 0x0b0608, 1).setOrigin(0).setAlpha(0);
    this.tweens.add({ targets: bg, alpha: 0.92, duration: 800 });

    const big = (y, text, size, color) => DBG.UI.outlinedText(this, cx, y, text, size).setOrigin(0.5).setColor(color).setAlpha(0);
    const show = (obj, delay, extra = {}) => this.tweens.add({ targets: obj, alpha: 1, duration: 600, delay, ...extra });

    const title = big(H * 0.2, E.title, 72, "#c8323c");
    const finally_ = big(H * 0.2 + 70, E.subtitle, 30, "#fff6d8");
    show(title, 600, { scale: { from: 1.4, to: 1 } });
    show(finally_, 2000);
    this.time.delayedCall(600, () => DBG.Sfx.play("trombone"));

    // Who did it
    let who = info.killerName ? E.killedBy.replace("{killer}", info.killerName) : E.killedByNobody;
    if (info.weapon) who += "\n" + E.wielding.replace("{item}", info.weapon);
    who += "\n" + E.where.replace("{place}", info.place);
    const whoText = big(H * 0.2 + 150, who, 20, "#fff6d8").setAlign("center");
    show(whoText, 3200);
    const joke = big(H * 0.2 + 235, DBG.Ending.epitaph(info), 18, "#ffde59").setAlign("center").setWordWrapWidth(Math.min(800, W - 60));
    show(joke, 4200);

    // Stats
    const s = info.stats;
    const statsText = [
      `${E.statGifted}: ${s.gifted}`,
      `${E.statWasted}: ${s.wasted}`,
      `${E.statGifts}: ${s.gifts}`,
      `${E.statTime}: ${s.minutes} min`,
      `${E.statKillers}: ${s.killers}`,
    ].join("\n");
    const stats = DBG.UI.text(this, cx, H * 0.2 + 300, statsText, 15, "#d8d8e0").setOrigin(0.5, 0).setAlign("center").setAlpha(0);
    show(stats, 5200);

    // Buttons
    this.time.delayedCall(6200, () => {
      const y = Math.min(H - 50, H * 0.2 + 440);
      this.again = DBG.UI.button(this, cx - 110, y, E.playAgain, () => this.playAgain(), 190, 46);
      this.exitBtn = DBG.UI.button(this, cx + 110, y, E.exit, () => this.fakeExit(), 190, 46);
      [this.again, this.exitBtn].forEach((b) => { b.setAlpha(0); show(b, 0); });
    });
    this.input.keyboard.on("keydown-ENTER", () => this.again && this.playAgain());
  }

  /** Start a brand new game. */
  playAgain() {
    if (this.busy) return;
    this.busy = true;
    DBG.Sfx.play("click");
    DBG.Save.fresh();
    DBG.state.introShown = true; // they know the drill by now
    const world = this.scene.get("World");
    world.skipRemember = true;
    this.scene.wake("UI");
    this.game.events.emit("tally-changed", DBG.state.tally);
    world.scene.restart({ mapId: DBG.state.mapId });
    this.scene.stop();
  }

  /** "Exit" — it doesn't. But it finally tells you the truth. */
  fakeExit() {
    if (this.busy) return;
    this.busy = true;
    const E = DBG.data.jokes.ending, W = this.scale.width, H = this.scale.height;
    DBG.Sfx.play("click");
    // Dim everything behind the popup so its text doesn't clash with the stats
    const dim = this.add.rectangle(0, 0, W, H, 0x000000, 0.75).setOrigin(0).setDepth(49);
    const box = DBG.UI.panel(this, W / 2 - 260, H / 2 - 90, 520, 180).setDepth(50);
    const label = DBG.UI.text(this, 260, 50, E.exiting, 20).setOrigin(0.5);
    const bar = this.add.graphics();
    box.add([label, bar]);
    const st = { p: 0 };
    this.tweens.add({
      targets: st, p: 1, duration: 2200,
      onUpdate: () => bar.clear().fillStyle(0x3b2414, 1).fillRect(40, 90, 440, 18).fillStyle(0x4caf50, 1).fillRect(42, 92, 436 * st.p, 14),
      onComplete: () => {
        label.setText(E.exitTruth).setFontSize(16).setWordWrapWidth(470).setAlign("center").setY(60);
        bar.clear();
        DBG.Sfx.play("fanfare");
        const ach = DBG.UI.text(this, W / 2, H / 2 + 45, E.achievement, 18, "#a02030").setOrigin(0.5).setDepth(51)
          .setAlign("center").setWordWrapWidth(470);
        this.tweens.add({ targets: ach, scale: { from: 0.6, to: 1 }, duration: 400, ease: "Back.easeOut" });
        this.time.delayedCall(5000, () => { box.destroy(); ach.destroy(); dim.destroy(); this.busy = false; });
      },
    });
  }
};
