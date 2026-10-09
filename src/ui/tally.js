// ---------------------------------------------------------------------------
// Tally (under the health bar): people gifted to death, and wasted attempts
// (people you flattened yourself, which doesn't help you die at all).
// Also flashes "WASTED ATTEMPT" across the screen on game event "wasted".
// ---------------------------------------------------------------------------
DBG.UI.Tally = class Tally {
  constructor(scene) {
    this.scene = scene;
    this.root = DBG.UI.panel(scene, 12, 108, 330, 58);
    this.gifted = DBG.UI.text(scene, 20, 16, "", 15);
    this.wasted = DBG.UI.text(scene, 20, 34, "", 12, DBG.UI.colors.textMuted);
    this.root.add([this.gifted, this.wasted]);
    this.set(DBG.state.tally);

    const onChange = (t) => this.set(t, true);
    const onWasted = () => this.flashWasted();
    scene.game.events.on("tally-changed", onChange);
    scene.game.events.on("wasted", onWasted);
    scene.events.once("shutdown", () => {
      scene.game.events.off("tally-changed", onChange);
      scene.game.events.off("wasted", onWasted);
    });
  }

  set(t, animate = false) {
    this.gifted.setText(`Gifted to death: ${t.gifted}`);
    this.wasted.setText(`Wasted attempts (you hit them): ${t.wasted}`);
    if (animate) this.scene.tweens.add({ targets: this.root, scale: { from: 1.06, to: 1 }, duration: 250 });
  }

  /** Big grey "WASTED ATTEMPT" across the middle of the screen. */
  flashWasted() {
    const s = this.scene;
    const t = DBG.UI.outlinedText(s, s.scale.width / 2, s.scale.height / 2 - 60, DBG.data.jokes.wastedAttempt, 54)
      .setOrigin(0.5).setDepth(980).setColor("#d8d8e0").setScale(1.6).setAlpha(0);
    s.tweens.chain({
      targets: t,
      tweens: [
        { scale: 1, alpha: 1, duration: 200, ease: "Back.easeOut" },
        { alpha: 0, duration: 500, delay: 1100 },
      ],
      onComplete: () => t.destroy(),
    });
  }
};
