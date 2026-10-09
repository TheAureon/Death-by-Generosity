// ---------------------------------------------------------------------------
// The broken Esc key. Pressing Esc opens a pause menu that flickers, loses
// its buttons one by one, collapses like an old TV, and dies. Then a joke
// from data/jokes.js -> "escMessages" appears.
// ---------------------------------------------------------------------------
DBG.UI.EscGag = class EscGag {
  constructor(scene, toast) {
    this.scene = scene;
    this.toast = toast;
    this.busy = false;
    this.count = 0;
    scene.input.keyboard.on("keydown-ESC", () => this.trigger());
  }

  trigger() {
    if (this.busy) return;
    this.busy = true;
    const s = this.scene;
    // Esc can't close menus properly... but it can kill them. Same result.
    if (s.inventoryMenu) s.inventoryMenu.close();
    if (s.choiceMenu) s.choiceMenu.close();
    if (s.craftMenu) s.craftMenu.close();
    const W = s.scale.width, H = s.scale.height;
    s.scene.pause("World");

    // Dark overlay + menu panel
    const dim = s.add.rectangle(0, 0, W, H, 0x000000, 0.45).setOrigin(0).setDepth(900);
    const pw = 280, ph = 300;
    const menu = DBG.UI.panel(s, W / 2, H / 2, pw, ph).setDepth(901);
    menu.list[0].setPosition(-pw / 2, -ph / 2); // centre the panel graphic
    const title = DBG.UI.text(s, 0, -ph / 2 + 30, "PAUSED", 26).setOrigin(0.5);
    menu.add(title);
    const items = ["Resume", "Options", "Save & Exit", "Quit"].map((label, i) => {
      const t = DBG.UI.text(s, 0, -50 + i * 46, label, 20).setOrigin(0.5);
      menu.add(t);
      return t;
    });
    menu.setScale(0.6).setAlpha(0);

    s.tweens.chain({
      tweens: [
        // 1. Opens normally... looks totally fine...
        { targets: menu, scale: 1, alpha: 1, duration: 180, ease: "Back.easeOut" },
        // 2. ...starts flickering
        { targets: menu, alpha: 0.2, duration: 60, yoyo: true, repeat: 5, delay: 350 },
      ],
      onComplete: () => this.crumble(menu, items, title, dim),
    });
  }

  /** Buttons fall off, then the menu shrinks to a line and blinks out. */
  crumble(menu, items, title, dim) {
    const s = this.scene;
    items.concat([title]).forEach((t, i) => {
      s.tweens.add({
        targets: t, y: t.y + 400, angle: Phaser.Math.Between(-90, 90), alpha: 0,
        delay: i * 110, duration: 600, ease: "Quad.easeIn",
      });
    });
    s.tweens.chain({
      targets: menu,
      tweens: [
        { scaleY: 0.03, duration: 160, delay: 700, ease: "Quad.easeIn" },
        { scaleX: 0, duration: 140, ease: "Quad.easeIn" },
      ],
      onComplete: () => {
        menu.destroy();
        s.tweens.add({ targets: dim, alpha: 0, duration: 200, onComplete: () => dim.destroy() });
        s.scene.resume("World");
        const lines = DBG.data.jokes.escMessages;
        this.toast.show(lines[this.count++ % lines.length]);
        this.busy = false;
      },
    });
  }
};
