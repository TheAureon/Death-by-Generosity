// ---------------------------------------------------------------------------
// The "Save & Exit" button (top-right). It never works, and fails in a
// different way each time. The order is shuffled, and every failure plays
// once before any repeats. Text lives in data/jokes.js -> "saveExitFailures".
//
// Each failure has an "effect" that picks one of the animations below.
// To add a new kind of failure: write a method here and name it in the data.
// ---------------------------------------------------------------------------
DBG.UI.SaveExitGag = class SaveExitGag {
  constructor(scene, toast) {
    this.scene = scene;
    this.toast = toast;
    this.busy = false;
    this.bag = [];
    this.button = DBG.UI.button(scene, 0, 0, "Save & Exit", () => this.click()).setDepth(800);
    this.place();
    scene.scale.on("resize", this.place, this);
    scene.events.once("shutdown", () => scene.scale.off("resize", this.place, this));
  }

  /** Home position: top-right corner. */
  home() {
    return { x: this.scene.scale.width - 90, y: 34 };
  }

  place() {
    if (!this.busy) this.button.setPosition(this.home().x, this.home().y);
  }

  click() {
    if (this.busy) return;
    if (this.bag.length === 0) this.bag = Phaser.Utils.Array.Shuffle(DBG.data.jokes.saveExitFailures.slice());
    const failure = this.bag.pop();
    // The "Save" half genuinely works now. It's only the "Exit" half that doesn't.
    DBG.Save.save();
    const fn = this[failure.effect] || this.message;
    this.busy = true;
    fn.call(this, failure.lines, () => {
      this.busy = false;
      this.reset();
    });
  }

  /** Put the button back exactly how it was. */
  reset() {
    const b = this.button;
    this.scene.tweens.killTweensOf(b);
    b.setPosition(this.home().x, this.home().y).setScale(1).setAngle(0).setAlpha(1);
    b.label.setText("Save & Exit");
  }

  // ---- Failure effects. Each gets (lines, done) and must call done(). ----

  /** Just text, one line after another. */
  message(lines, done) {
    this.toast.show(lines);
    this.scene.time.delayedCall(1200, done);
  }

  /** Fake saving bar that sticks at 99% and turns red. */
  progress(lines, done) {
    const s = this.scene;
    const W = s.scale.width, H = s.scale.height;
    const box = DBG.UI.panel(s, W / 2 - 180, H / 2 - 50, 360, 100).setDepth(950);
    const label = DBG.UI.text(s, 180, 28, lines[0], 18).setOrigin(0.5);
    const bar = s.add.graphics();
    box.add([label, bar]);
    const state = { p: 0 };
    const draw = (color) => {
      bar.clear().fillStyle(DBG.UI.colors.outline, 1).fillRect(30, 52, 300, 20);
      bar.fillStyle(color, 1).fillRect(32, 54, 296 * state.p, 16);
    };
    s.tweens.add({
      targets: state, p: 0.99, duration: 1800, ease: "Sine.easeOut",
      onUpdate: () => { draw(0x4caf50); label.setText(`${lines[0]} ${Math.floor(state.p * 100)}%`); },
      onComplete: () => {
        s.time.delayedCall(900, () => {
          draw(0xc8323c);
          label.setText("99%... 99%... 99%...");
          s.cameras.main.shake(200, 0.01);
          s.time.delayedCall(900, () => {
            box.destroy();
            this.toast.show(lines.slice(1));
            done();
          });
        });
      },
    });
  }

  /** The button runs away from the mouse a few times. */
  dodge(lines, done) {
    const s = this.scene;
    const hops = [];
    for (let i = 0; i < 5; i++) {
      hops.push({
        x: Phaser.Math.Between(100, s.scale.width - 100),
        y: Phaser.Math.Between(80, s.scale.height - 120),
        angle: Phaser.Math.Between(-20, 20),
        duration: 160, delay: i === 0 ? 0 : 220, ease: "Quad.easeOut",
      });
    }
    hops.push({ x: this.home().x, y: this.home().y, angle: 0, duration: 300 });
    s.tweens.chain({ targets: this.button, tweens: hops, onComplete: done });
    this.toast.show(lines);
  }

  /** "Are you sure?" — where every answer is no. */
  confirm(lines, done) {
    const s = this.scene;
    const J = DBG.data.jokes;
    const W = s.scale.width, H = s.scale.height;
    const dim = s.add.rectangle(0, 0, W, H, 0x000000, 0.35).setOrigin(0).setDepth(940).setInteractive();
    const box = DBG.UI.panel(s, W / 2 - 200, H / 2 - 80, 400, 160).setDepth(950);
    box.add(DBG.UI.text(s, 200, 45, lines[0], 18).setOrigin(0.5).setWordWrapWidth(360));
    const close = () => {
      box.destroy(); dim.destroy();
      this.toast.show(J.confirmReply);
      done();
    };
    J.confirmButtons.forEach((label, i) => {
      const b = DBG.UI.button(s, 120 + i * 160, 110, label, close, 130, 40);
      box.add(b);
    });
  }

  /** The button falls off the screen, then slowly climbs back up. */
  fall(lines, done) {
    const s = this.scene;
    this.toast.show(lines[0]);
    s.tweens.chain({
      targets: this.button,
      tweens: [
        { angle: 25, duration: 200, ease: "Sine.easeInOut", yoyo: true, repeat: 1 },
        { y: s.scale.height + 80, angle: 160, duration: 700, ease: "Quad.easeIn" },
        { y: this.home().y, angle: 0, duration: 2200, delay: 900, ease: "Sine.easeOut",
          onStart: () => this.toast.show(lines.slice(1)) },
      ],
      onComplete: done,
    });
  }

  /** The button flips upside down and scrambles its own label. */
  flip(lines, done) {
    const s = this.scene;
    const b = this.button;
    this.toast.show(lines);
    s.tweens.add({
      targets: b, scaleY: -1, duration: 300, ease: "Back.easeInOut",
      onComplete: () => {
        b.label.setText("Exit & Save");
        s.time.delayedCall(700, () => b.label.setText("Tixe & Evas"));
        s.time.delayedCall(1600, () => s.tweens.add({ targets: b, scaleY: 1, duration: 300, onComplete: done }));
      },
    });
  }

  /** The button shrinks and trembles in fear. */
  shrink(lines, done) {
    const s = this.scene;
    const b = this.button;
    this.toast.show(lines);
    s.tweens.add({
      targets: b, scale: 0.25, duration: 300, ease: "Quad.easeIn",
      onComplete: () => {
        s.tweens.add({ targets: b, angle: { from: -8, to: 8 }, duration: 50, yoyo: true, repeat: 16,
          onComplete: () => s.tweens.add({ targets: b, scale: 1, angle: 0, duration: 400, ease: "Back.easeOut", onComplete: done }) });
      },
    });
  }
};
