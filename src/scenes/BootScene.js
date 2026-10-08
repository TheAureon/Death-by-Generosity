// ---------------------------------------------------------------------------
// BootScene: runs once at startup. Generates all pixel art, sets up the
// starting game state (inventory), then starts the
// world and the on-screen UI (which sits on top of the world).
// ---------------------------------------------------------------------------
DBG.Scenes.BootScene = class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  create() {
    DBG.Art.createAll(this);

    // Fresh game state
    const hero = DBG.data.hero;
    DBG.state.inventory = new DBG.Inventory(hero.inventorySize || 24, hero.startingInventory || []);

    // UI first so it is listening when the world announces the area name
    this.scene.launch("UI");
    this.scene.bringToTop("UI");
    this.scene.start("World", { mapId: DBG.data.settings.startMap });
  }
};
