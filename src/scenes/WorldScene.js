// ---------------------------------------------------------------------------
// WorldScene: the map, the player, and the camera that follows them.
// ---------------------------------------------------------------------------
DBG.Scenes.WorldScene = class WorldScene extends Phaser.Scene {
  constructor() {
    super("World");
  }

  create(data) {
    const S = DBG.data.settings.tileSize;
    this.map = DBG.World.loadMap(data.mapId);
    this.world = DBG.World.build(this, this.map);

    // Keep everything inside the map
    this.physics.world.setBounds(0, 0, this.world.pixelWidth, this.world.pixelHeight);

    // Spawn the hero standing on the "P" tile
    const start = this.map.playerStart;
    this.player = new DBG.Entities.Player(this, start.x * S + S / 2, start.y * S + S - 2);
    this.physics.add.collider(this.player, this.world.solids);

    // Creatures placed on the map (data/creatures.js)
    this.creatures = this.world.spawns.map((s) => {
      const data = DBG.data.creatures[s.creature];
      const Behavior = data && DBG.Entities.behaviors[data.behavior];
      if (!Behavior) { console.warn(`Unknown creature "${s.creature}"`); return null; }
      return new Behavior(this, s.x, s.y, data);
    }).filter(Boolean);

    // Camera: follow smoothly, never show past the map edges, crisp zoom
    const cam = this.cameras.main;
    cam.setBounds(0, 0, this.world.pixelWidth, this.world.pixelHeight);
    cam.startFollow(this.player, true, 0.15, 0.15);
    cam.setRoundPixels(true);
    this.applyZoom();
    this.scale.on("resize", this.applyZoom, this);
    this.events.once("shutdown", () => this.scale.off("resize", this.applyZoom, this));

    // Tell the UI which area we're in
    this.game.events.emit("area-entered", this.map.name);
  }

  /** Pick a whole-number zoom so pixels stay sharp (or use settings.zoom). */
  applyZoom() {
    const { zoom, tilesAcrossScreen, tileSize } = DBG.data.settings;
    const auto = Math.floor(this.scale.width / (tilesAcrossScreen * tileSize));
    this.cameras.main.setZoom(zoom > 0 ? zoom : Math.max(1, auto));
  }

  update(time, deltaMs) {
    const dt = Math.min(deltaMs / 1000, 0.1); // seconds; capped after tab switches
    this.player.update(dt);
    this.creatures.forEach((c) => c.update(dt, this.player));
  }
};
