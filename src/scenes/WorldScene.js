// ---------------------------------------------------------------------------
// WorldScene: the map, the hero, creatures, NPCs, chickens, dropped items,
// and the camera.
//
// Talking: walk up to an NPC and press E. The UI scene shows the choices
// (give a gift / please fight me) and tells us what was picked.
// Deaths: NPCs announce "npc-died"; we count it, drop their gear, and bring
// a "suspiciously similar" replacement back later.
// Monsters drop loot and respawn. Exit tiles lead to other maps; the scene
// restarts with { mapId, arrival } and the hero appears at that arrival spot.
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

    // Spawn the hero at the arrival spot (coming from another map) or on "P"
    const arrival = data.arrival && this.world.spawns.find((s) => s.arrival === data.arrival);
    const start = this.map.playerStart;
    if (arrival) this.player = new DBG.Entities.Player(this, arrival.x, arrival.y);
    else this.player = new DBG.Entities.Player(this, start.x * S + S / 2, start.y * S + S - 2);
    this.leaving = false;
    this.physics.add.collider(this.player, [this.world.walls, this.world.hazards]);

    // Creatures placed on the map (data/creatures.js)
    this.creatures = this.world.spawns.filter((s) => s.creature).map((s) => {
      const data = DBG.data.creatures[s.creature];
      const Behavior = data && DBG.Entities.behaviors[data.behavior];
      if (!Behavior) { console.warn(`Unknown creature "${s.creature}"`); return null; }
      return new Behavior(this, s.x, s.y, data, s.creature);
    }).filter(Boolean);

    // Monsters move and fight, so they get their own list and colliders
    this.monsters = this.creatures.filter((c) => c instanceof DBG.Entities.Monster);
    this.creatures = this.creatures.filter((c) => !(c instanceof DBG.Entities.Monster));
    this.physics.add.collider(this.monsters, [this.world.walls, this.world.hazards]);

    // NPCs placed on the map (data/npcs.js). This array is changed in place
    // when people die and respawn, so the colliders below keep working.
    this.npcs = [];
    this.world.spawns.filter((s) => s.npc).forEach((s) => {
      if (!DBG.data.npcs[s.npc]) return console.warn(`Unknown NPC "${s.npc}"`);
      this.npcs.push(new DBG.Entities.NPC(this, s.x, s.y, s.npc));
    });
    this.physics.add.collider(this.npcs, this.world.walls);
    // Hazards only stop calm people. Angry people walk right in.
    this.physics.add.collider(this.npcs, this.world.hazards, null, (npc) => npc.mode === "calm");
    this.physics.add.collider(this.player, this.npcs, null, (p, npc) => npc.alive);

    // Chickens placed on the map live with the other chickens (they move)
    this.chickens = this.creatures.filter((c) => c instanceof DBG.Entities.Chicken);
    this.creatures = this.creatures.filter((c) => !(c instanceof DBG.Entities.Chicken));
    this.pickups = [];
    this.physics.add.collider(this.chickens, [this.world.walls, this.world.hazards]);

    // Interact: E (or Space) next to a calm NPC
    this.interactRange = 26;
    this.prompt = this.add.text(0, 0, "E: Talk", {
      fontFamily: '"Courier New", monospace', fontStyle: "bold", fontSize: "7px",
      color: "#fff6d8", stroke: "#2b1d24", strokeThickness: 2,
    }).setOrigin(0.5, 1).setDepth(99998).setVisible(false);
    const interact = () => this.interact();
    this.input.keyboard.on("keydown-E", interact);
    this.input.keyboard.on("keydown-SPACE", interact);

    // Messages from the UI scene and from our own NPCs
    const listen = (name, fn) => {
      this.game.events.on(name, fn, this);
      this.events.once("shutdown", () => this.game.events.off(name, fn, this));
    };
    listen("gift-chosen", this.onGiftChosen);
    listen("fight-request", this.onFightRequest);
    // Our own scene events (removed on shutdown, so map changes don't double them)
    this.events.on("npc-died", this.onNpcDied, this);
    this.events.on("hero-strike", this.onHeroStrike, this);
    this.events.on("monster-died", this.onMonsterDied, this);
    this.events.once("shutdown", () => {
      this.events.off("npc-died", this.onNpcDied, this);
      this.events.off("hero-strike", this.onHeroStrike, this);
      this.events.off("monster-died", this.onMonsterDied, this);
    });

    // Camera: follow smoothly, never show past the map edges, crisp zoom
    const cam = this.cameras.main;
    cam.setBounds(0, 0, this.world.pixelWidth, this.world.pixelHeight);
    cam.startFollow(this.player, true, 0.15, 0.15);
    cam.setRoundPixels(true);
    cam.fadeIn(300);
    this.applyZoom();
    this.scale.on("resize", this.applyZoom, this);
    this.events.once("shutdown", () => this.scale.off("resize", this.applyZoom, this));

    // Tell the UI which area we're in, and explain the game the first time
    this.game.events.emit("area-entered", this.map.name);
    if (!DBG.state.introShown) {
      DBG.state.introShown = true;
      this.time.delayedCall(2500, () => this.game.events.emit("toast", DBG.data.jokes.intro));
    }
  }

  /** Pick a whole-number zoom so pixels stay sharp (or use settings.zoom). */
  applyZoom() {
    const { zoom, tilesAcrossScreen, tileSize } = DBG.data.settings;
    const auto = Math.floor(this.scale.width / (tilesAcrossScreen * tileSize));
    this.cameras.main.setZoom(zoom > 0 ? zoom : Math.max(1, auto));
    if (this.prompt) this.prompt.setResolution(this.cameras.main.zoom * 2);
  }

  // ---- Talking, gifting, fighting -----------------------------------------

  /** The closest calm, living NPC within reach of the hero, or null. */
  nearestNPC(range = this.interactRange) {
    let best = null, bestDist = range;
    this.npcs.forEach((n) => {
      const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, n.x, n.y);
      if (n.alive && n.mode === "calm" && d <= bestDist) { best = n; bestDist = d; }
    });
    return best;
  }

  interact() {
    const npc = this.nearestNPC();
    if (!npc) return this.readSign();
    npc.face(this.player);
    this.game.events.emit("talk-to", npc);
  }

  /** E next to a signpost (a tile with "sign" text) reads it. */
  readSign() {
    const S = DBG.data.settings.tileSize;
    const px = Math.floor(this.player.x / S), py = Math.floor((this.player.y - 2) / S);
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const t = this.map.tile(px + dx, py + dy);
        if (t && t.sign) return this.game.events.emit("toast", t.sign);
      }
    }
  }

  onGiftChosen(npc, inventoryIndex) {
    if (npc.alive) DBG.Gifting.give(this, npc, inventoryIndex);
  }

  onFightRequest(npc) {
    if (!npc.alive || npc.mode !== "calm") return;
    if (Object.keys(npc.gear).length === 0) {
      npc.say(npc.def.refuseFight, 3000);
      return;
    }
    npc.startFight(this.player);
  }

  /** The hero swung at something (F). Everything in range gets flattened. */
  onHeroStrike(hit) {
    const inRange = (o) => o.alive && Phaser.Math.Distance.Between(o.x, o.y - 8, hit.x, hit.y) <= hit.radius + 6;
    let flattenedSomeone = false;
    this.npcs.filter(inRange).forEach((n) => {
      n.takeDamage(hit.damage, this.player, "hero");
      flattenedSomeone = true;
    });
    this.creatures.filter(inRange).forEach((c) => c.takeDamage(hit.damage, this.player, "hero"));
    this.chickens.filter(inRange).forEach((c) => c.takeDamage());
    this.monsters.filter(inRange).forEach((m) => m.takeDamage(hit.damage, this.player, "hero"));
    if (flattenedSomeone) this.game.events.emit("wasted");
  }

  /** Someone died: count it, tell the player why, drop gear, respawn later. */
  onNpcDied(npc, cause) {
    const tally = DBG.state.tally;
    if (cause === "hero") tally.wasted++;
    else tally.gifted++;
    this.game.events.emit("tally-changed", tally);

    const deaths = DBG.data.jokes.deaths;
    const lines = deaths[cause] || deaths.thorns;
    this.game.events.emit("toast", Phaser.Utils.Array.GetRandom(lines).split("{name}").join(npc.name));

    // Their gear pops out where they last stood safely
    Object.values(npc.gear).forEach((itemId) => {
      this.pickups.push(DBG.Entities.ItemPickup.drop(this, npc.lastSafe.x, npc.lastSafe.y, itemId));
    });

    // A replacement moves in after a while
    const idx = this.npcs.indexOf(npc);
    if (idx >= 0) this.npcs.splice(idx, 1);
    this.time.delayedCall(DBG.data.settings.npcRespawnSeconds * 1000, () => {
      const fresh = new DBG.Entities.NPC(this, npc.home.x, npc.home.y, npc.id);
      this.npcs.push(fresh);
      fresh.setAlpha(0);
      this.tweens.add({ targets: fresh, alpha: 1, duration: 500 });
      const lines = DBG.data.jokes.respawn;
      this.game.events.emit("toast", Phaser.Utils.Array.GetRandom(lines).split("{name}").join(npc.name));
    });
  }

  /** A monster died: scatter its loot and bring a new one back later. */
  onMonsterDied(mon) {
    DBG.Entities.Monster.rollLoot(mon.def.drops).forEach((itemId) => {
      const p = DBG.Entities.ItemPickup.drop(this, mon.x, mon.y, itemId);
      p.isLoot = true;
      this.pickups.push(p);
    });
    const idx = this.monsters.indexOf(mon);
    if (idx >= 0) this.monsters.splice(idx, 1);
    this.time.delayedCall((mon.def.respawnSeconds || 10) * 1000, () => {
      this.monsters.push(new DBG.Entities.Monster(this, mon.home.x, mon.home.y, mon.def, mon.kind));
    });
  }

  /** Walk onto an exit tile: fade out and load the map it leads to. */
  checkExit() {
    if (this.leaving) return;
    const S = DBG.data.settings.tileSize;
    const t = this.map.tile(Math.floor(this.player.x / S), Math.floor((this.player.y - 2) / S));
    if (!t || !t.exit) return;
    if (!DBG.data.maps[t.exit]) return console.warn(`Exit leads to unknown map "${t.exit}"`);
    this.leaving = true;
    this.player.setVelocity(0, 0);
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.restart({ mapId: t.exit, arrival: t.arrive });
    });
  }

  /** Called by a FightBrain: a chicken appears and runs from `chaser`. */
  spawnChicken(x, y, chaser) {
    // Put it on walkable ground so it doesn't start inside a wall
    const S = DBG.data.settings.tileSize;
    const t = this.map.tile(Math.floor(x / S), Math.floor((y - 2) / S));
    if (!t || t.solid) { x = chaser.x; y = chaser.y + 12; }
    const c = new DBG.Entities.Chicken(this, x, y, chaser);
    this.chickens.push(c);
    return c;
  }

  // ---- Every frame -----------------------------------------------------------

  update(time, deltaMs) {
    const dt = Math.min(deltaMs / 1000, 0.1); // seconds; capped after tab switches
    if (this.leaving) return;
    this.player.update(dt);
    this.checkExit();
    this.monsters.slice().forEach((m) => m.update(dt, this.player));
    this.creatures.forEach((c) => c.update(dt, this.player));
    const target = this.nearestNPC();
    this.npcs.slice().forEach((n) => n.update(dt, this.player, n === target)); // in reach = stand still

    // Chickens (remove the ones that left)
    for (let i = this.chickens.length - 1; i >= 0; i--) {
      if (!this.chickens[i].active) this.chickens.splice(i, 1);
      else this.chickens[i].update(dt);
    }

    // Walk over dropped items to pick them up
    for (let i = this.pickups.length - 1; i >= 0; i--) {
      const p = this.pickups[i];
      if (!p.active) { this.pickups.splice(i, 1); continue; }
      if (Phaser.Math.Distance.Between(p.x, p.shadow.y, this.player.x, this.player.y) < 12 && p.collect()) this.pickups.splice(i, 1);
    }

    // Greet the hero the first time they come close
    const near = this.nearestNPC(40);
    if (near && !near.greeted) {
      near.greeted = true;
      near.say(near.def.greeting, 3000);
    }

    // Floating "E: Talk" over whoever is in reach
    this.prompt.setVisible(!!target && !target.bubble);
    if (target) this.prompt.setPosition(Math.round(target.x), Math.round(target.y - 30));
  }
};
