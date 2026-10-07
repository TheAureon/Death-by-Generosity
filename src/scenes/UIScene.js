// ---------------------------------------------------------------------------
// UIScene: on-screen text drawn above the world (not zoomed, not moving).
// Milestone 1: area name banner + controls hint. The HUD goes here later.
// ---------------------------------------------------------------------------
DBG.Scenes.UIScene = class UIScene extends Phaser.Scene {
  constructor() {
    super("UI");
  }

  create() {
    const style = {
      fontFamily: '"Courier New", monospace',
      fontStyle: "bold",
      color: "#fff6d8",
      stroke: "#2b1d24",
      strokeThickness: 6,
    };

    this.banner = this.add.text(0, 40, "", { ...style, fontSize: "32px" }).setOrigin(0.5, 0).setAlpha(0);
    this.hint = this.add.text(16, 0, "Move: WASD or Arrow keys", { ...style, fontSize: "16px", strokeThickness: 4 })
      .setOrigin(0, 1).setAlpha(0.85);

    this.layout();
    this.scale.on("resize", this.layout, this);

    // Show the area name when the world says we arrived somewhere
    this.game.events.on("area-entered", this.showBanner, this);
    this.events.once("shutdown", () => {
      this.scale.off("resize", this.layout, this);
      this.game.events.off("area-entered", this.showBanner, this);
    });
  }

  layout() {
    this.banner.setX(this.scale.width / 2);
    this.hint.setY(this.scale.height - 12);
  }

  showBanner(name) {
    this.banner.setText(name).setAlpha(0);
    this.tweens.killTweensOf(this.banner);
    this.tweens.add({ targets: this.banner, alpha: 1, duration: 500, yoyo: true, hold: 2000 });
  }
};
