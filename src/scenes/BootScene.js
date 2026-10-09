// ---------------------------------------------------------------------------
// BootScene: runs once at startup. Generates all pixel art, sets up the
// game state (from the save if there is one), then starts the
// world and the on-screen UI (which sits on top of the world).
// ---------------------------------------------------------------------------
DBG.Scenes.BootScene = class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  create() {
    DBG.Art.createAll(this);

    // Continue the saved game if there is one, otherwise start fresh
    const saved = DBG.Save.load();
    if (saved) DBG.Save.apply(saved);
    else DBG.Save.fresh();
    DBG.state.continued = !!saved;

    // UI first so it is listening when the world announces the area name
    this.scene.launch("UI");
    this.scene.bringToTop("UI");
    this.scene.start("World", { mapId: DBG.state.mapId, pos: DBG.state.pos });
  }
};
