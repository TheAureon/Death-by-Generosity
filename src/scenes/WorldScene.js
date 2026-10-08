// ---------------------------------------------------------------------------
// WorldScene: the map, the player, creatures, NPCs, and the camera.
// Also handles the interact key (E): walk up to an NPC and press E to open
// the gift menu (the menu itself lives in the UI scene).
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
    this.creatures = this.world.spawns.filter((s) => s.creature).map((s) => {
      const data = DBG.data.creatures[s.creature];
      const Behavior = data && DBG.Entities.behaviors[data.behavior];
      if (!Behavior) { console.warn(`Unknown creature "${s.creature}"`); return null; }
      return new Behavior(this, s.x, s.y, data);
    }).filter(Boolean);

    // NPCs placed on the map (data/npcs.js)
    this.npcs = this.world.spawns.filter((s) => s.npc).map((s) => {
      if (!DBG.data.npcs[s.npc]) { console.warn(`Unknown NPC "${s.npc}"`); return null; }
      return new DBG.Entities.NPC(this, s.x, s.y, s.npc);
    }).filter(Boolean);
    this.physics.add.collider(this.npcs, this.world.solids);
    this.physics.add.collider(this.player, this.npcs);

    // Interact: E (or Space) next to an NPC opens the gift menu
    this.interactRange = 26;
    this.prompt = this.add.text(0, 0, "E: Gift", {
      fontFamily: '"Courier New", monospace', fontStyle: "bold", fontSize: "7px",
      color: "#fff6d8", stroke: "#2b1d24", strokeThickness: 2,
    }).setOrigin(0.5, 1).setDepth(99998).setVisible(false);
    const interact = () => this.interact();
    this.input.keyboard.on("keydown-E", interact);
    this.input.keyboard.on("keydown-SPACE", interact);
    // The UI scene tells us which item was picked
    this.game.events.on("gift-chosen", this.onGiftChosen, this);
    this.events.once("shutdown", () => this.game.events.off("gift-chosen", this.onGiftChosen, this));

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
    if (this.prompt) this.prompt.setResolution(this.cameras.main.zoom * 2);
  }

  /** The closest living NPC within reach of the hero, or null. */
  nearestNPC(range = this.interactRange) {
    let best = null, bestDist = range;
    this.npcs.forEach((n) => {
      const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, n.x, n.y);
      if (n.alive && d <= bestDist) { best = n; bestDist = d; }
    });
    return best;
  }

  interact() {
    const npc = this.nearestNPC();
    if (!npc) return;
    npc.face(this.player);
    this.game.events.emit("open-gift", npc);
  }

  onGiftChosen(npc, inventoryIndex) {
    DBG.Gifting.give(this, npc, inventoryIndex);
  }

  update(time, deltaMs) {
    const dt = Math.min(deltaMs / 1000, 0.1); // seconds; capped after tab switches
    this.player.update(dt);
    this.creatures.forEach((c) => c.update(dt, this.player));
    const target = this.nearestNPC();
    this.npcs.forEach((n) => n.update(dt, this.player, n === target)); // in reach = stand still

    // Greet the hero the first time they come close
    const near = this.nearestNPC(40);
    if (near && !near.greeted) {
      near.greeted = true;
      DBG.UI.SpeechBubble.say(this, near, near.def.greeting, 3000);
    }

    // Floating "E: Gift" over whoever is in reach
    this.prompt.setVisible(!!target && !target.bubble);
    if (target) this.prompt.setPosition(Math.round(target.x), Math.round(target.y - 30));
  }
};
