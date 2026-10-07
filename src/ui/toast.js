// ---------------------------------------------------------------------------
// Toast: a message box near the bottom of the screen. Messages queue up and
// show one after another. Anything can send one with:
//   game.events.emit("toast", "Some text")
// ---------------------------------------------------------------------------
DBG.UI.Toast = class Toast {
  constructor(scene) {
    this.scene = scene;
    this.queue = [];
    this.busy = false;
    this.box = scene.add.container(0, 0).setDepth(1000).setVisible(false);
    this.bg = scene.add.graphics();
    this.label = DBG.UI.text(scene, 0, 0, "", 18).setOrigin(0.5);
    this.box.add([this.bg, this.label]);
  }

  /** Show one line, or an array of lines (shown in order). */
  show(lines) {
    [].concat(lines).forEach((l) => this.queue.push(l));
    if (!this.busy) this.next();
  }

  next() {
    const line = this.queue.shift();
    if (line === undefined) { this.busy = false; this.box.setVisible(false); return; }
    this.busy = true;
    const maxW = Math.min(700, this.scene.scale.width - 40);
    this.label.setText(line).setWordWrapWidth(maxW - 40);
    const w = Math.min(maxW, this.label.width + 48), h = this.label.height + 32;
    DBG.UI.drawPanel(this.bg, w, h).setPosition(-w / 2, -h / 2);
    this.box.setPosition(this.scene.scale.width / 2, this.scene.scale.height - 70 - h / 2);
    this.box.setVisible(true).setAlpha(0).setScale(0.9);
    this.scene.tweens.add({ targets: this.box, alpha: 1, scale: 1, duration: 150 });
    // Longer lines stay up a little longer
    const holdMs = 1600 + line.length * 35;
    this.scene.time.delayedCall(holdMs, () => {
      this.scene.tweens.add({ targets: this.box, alpha: 0, duration: 150, onComplete: () => this.next() });
    });
  }
};
