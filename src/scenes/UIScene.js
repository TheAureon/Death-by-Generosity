// ---------------------------------------------------------------------------
// UIScene: everything drawn on top of the world (not zoomed, not moving):
// health bar, area banner, controls hint, message box, character sheet,
// inventory / gift menu, talk menu, gifted-to-death tally, journal (save/load),
// and the two gags (broken Esc, Save & Exit that never works).
// The pieces live in src/ui/.
// ---------------------------------------------------------------------------
DBG.Scenes.UIScene = class UIScene extends Phaser.Scene {
  constructor() {
    super("UI");
  }

  create() {
    this.toast = new DBG.UI.Toast(this);
    this.healthBar = new DBG.UI.HealthBar(this);
    this.statsPanel = new DBG.UI.StatsPanel(this);
    this.inventoryMenu = new DBG.UI.InventoryMenu(this);
    this.craftMenu = new DBG.UI.CraftMenu(this);
    this.choiceMenu = new DBG.UI.ChoiceMenu(this, this.inventoryMenu);
    this.tally = new DBG.UI.Tally(this);
    this.journal = new DBG.UI.JournalMenu(this);

    // Little "Saved" note in the corner whenever the game saves
    this.savedNote = DBG.UI.outlinedText(this, 0, 0, "✓ Saved", 14).setOrigin(1, 1).setAlpha(0).setDepth(990);
    const onSaved = () => {
      this.tweens.killTweensOf(this.savedNote);
      this.savedNote.setAlpha(1);
      this.tweens.add({ targets: this.savedNote, alpha: 0, delay: 900, duration: 500 });
    };
    this.game.events.on("saved", onSaved);
    this.events.once("shutdown", () => this.game.events.off("saved", onSaved));
    this.escGag = new DBG.UI.EscGag(this, this.toast);
    this.saveExit = new DBG.UI.SaveExitGag(this, this.toast);

    this.banner = DBG.UI.outlinedText(this, 0, 120, "", 32).setOrigin(0.5, 0).setAlpha(0);
    this.hint = DBG.UI.outlinedText(this, 16, 0,
      "WASD: Move   E: Talk   F: Attack (don't)   I: Bag   J: Journal (save/load)   C: Character   K: Punch self   Esc: Pause (allegedly)", 14)
      .setOrigin(0, 1).setAlpha(0.85);

    this.layout();
    this.scale.on("resize", this.layout, this);

    // Anything in the game can show a message with game.events.emit("toast", text)
    const onToast = (text) => this.toast.show(text);
    this.game.events.on("toast", onToast);
    this.game.events.on("area-entered", this.showBanner, this);
    this.events.once("shutdown", () => {
      this.scale.off("resize", this.layout, this);
      this.game.events.off("toast", onToast);
      this.game.events.off("area-entered", this.showBanner, this);
    });
  }

  layout() {
    this.banner.setX(this.scale.width / 2);
    this.hint.setY(this.scale.height - 12);
    if (this.savedNote) this.savedNote.setPosition(this.scale.width - 16, this.scale.height - 12);
  }

  showBanner(name) {
    this.banner.setText(name).setAlpha(0);
    this.tweens.killTweensOf(this.banner);
    this.tweens.add({ targets: this.banner, alpha: 1, duration: 500, yoyo: true, hold: 2000 });
  }
};
