// ---------------------------------------------------------------------------
// NPC: a person the hero can give gear to.
//
// Drawn in layers: the person sprite plus one sprite per worn item, all kept
// on the same animation frame. Gifts swap layers, so you SEE the new gear.
// Milestone 3 behaviour: wander near home, greet the hero, accept gifts.
// (Fighting the hero comes in Milestone 4.)
// Data comes from data/npcs.js.
// ---------------------------------------------------------------------------
(function () {
  const FRAME_BASE = { down: 0, up: 3, side: 6 };
  const WALK_CYCLE = [0, 1, 0, 2]; // stand, step A, stand, step B
  const SLOTS = ["weapon", "armor", "helmet", "shield", "cape"];

  class NPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, id) {
      super(scene, x, y, "npc_" + id, 0);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.def = DBG.data.npcs[id];
      this.id = id;
      this.name = this.def.name;
      this.alive = true;

      this.setOrigin(0.5, 1);
      this.body.setSize(10, 6).setOffset(11, 25); // feet only (32x32 frame)
      this.body.setImmovable(true);               // the hero can't shove them
      this.shadow = scene.add.image(x, y, "shadow").setOrigin(0.5, 0.6);

      this.home = { x, y };
      this.facing = "down";
      this.walkTime = 0;
      this.thinkTimer = Phaser.Math.FloatBetween(0.5, 2);
      this.target = null;

      this.gear = {};   // slot -> item id
      this.layers = {}; // slot -> sprite
      this.recalcStats();
      this.hp = this.stats.maxHp;
    }

    /** Base stats plus everything they're wearing. */
    recalcStats() {
      const s = { ...this.def.stats };
      Object.values(this.gear).forEach((itemId) => {
        Object.entries(DBG.data.items[itemId].stats || {}).forEach(([k, v]) => { s[k] = (s[k] || 0) + v; });
      });
      s.speed = Math.max(5, s.speed || 0);
      this.stats = s;
    }

    /** Put on an item. Returns the item id they were wearing there before (or null). */
    equip(itemId) {
      const item = DBG.data.items[itemId];
      const old = this.gear[item.slot] || null;
      this.gear[item.slot] = itemId;
      if (this.layers[item.slot]) this.layers[item.slot].destroy();
      this.layers[item.slot] = this.scene.add.sprite(this.x, this.y, "gear_" + itemId, this.frame.name).setOrigin(0.5, 1);
      const hpBefore = this.stats.maxHp;
      this.recalcStats();
      this.hp += this.stats.maxHp - hpBefore;
      this.syncLayers();
      return old;
    }

    /** Make every gear layer match the body's frame, position and depth. */
    syncLayers() {
      const frame = this.frame.name;
      SLOTS.forEach((slot) => {
        const layer = this.layers[slot];
        if (!layer) return;
        const behind = DBG.Art.gearBehind(slot, this.facing);
        // Seen from behind, the cape covers everything else
        const order = (slot === "cape" && this.facing === "up" ? 9 : DBG.Art.gearOrder[slot]) * 0.01;
        layer.setPosition(this.x, this.y).setFrame(frame).setFlipX(this.flipX)
          .setDepth(this.depth + (behind ? -0.1 + order : order));
      });
    }

    /** A happy little hop + sparkles (after a gift). */
    celebrate() {
      this.scene.tweens.add({ targets: this, scaleY: 1.25, scaleX: 0.85, duration: 120, yoyo: true, ease: "Quad.easeOut" });
      const sparkle = this.scene.add.particles(this.x, this.y - 16, "spark", {
        speed: { min: 20, max: 60 }, angle: { min: 200, max: 340 }, lifespan: 600,
        tint: [0xfff0a8, 0xf2c14e, 0xffffff], alpha: { start: 1, end: 0 }, emitting: false,
      }).setDepth(this.depth + 1);
      sparkle.explode(16);
      this.scene.time.delayedCall(800, () => sparkle.destroy());
    }

    /** Pick a new place to stroll to, near home. */
    think() {
      this.thinkTimer = Phaser.Math.FloatBetween(1.5, 4);
      if (Math.random() < 0.4) { this.target = null; return; } // just stand around
      const r = (this.def.wander || 2) * DBG.data.settings.tileSize;
      this.target = { x: this.home.x + Phaser.Math.Between(-r, r), y: this.home.y + Phaser.Math.Between(-r, r) };
    }

    /** Called every frame by the scene. */
    update(dt, hero, frozen) {
      this.thinkTimer -= dt;
      if (this.thinkTimer <= 0) this.think();

      let vx = 0, vy = 0;
      if (this.target && !frozen) {
        const dx = this.target.x - this.x, dy = this.target.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 3) this.target = null;
        else { vx = (dx / dist) * this.stats.speed; vy = (dy / dist) * this.stats.speed; }
      }
      this.setVelocity(vx, vy);
      // Gave up on a spot they can't reach (bumped into something)
      if (this.target && this.body.blocked.none === false) this.target = null;

      const moving = vx !== 0 || vy !== 0;
      if (moving) {
        if (Math.abs(vx) > Math.abs(vy)) { this.facing = "side"; this.setFlipX(vx > 0); }
        else this.facing = vy < 0 ? "up" : "down";
        this.walkTime += dt;
      } else {
        this.walkTime = 0;
        // Look at the hero when they're close
        if (hero && Phaser.Math.Distance.Between(this.x, this.y, hero.x, hero.y) < 48) this.face(hero);
      }
      const step = moving ? WALK_CYCLE[Math.floor(this.walkTime * 7) % 4] : 0;
      this.setFrame(FRAME_BASE[this.facing] + step);

      this.setDepth(this.y);
      this.shadow.setPosition(this.x, this.y).setDepth(this.y - 0.5);
      this.syncLayers();
    }

    /** Turn to look at something. */
    face(other) {
      const dx = other.x - this.x, dy = other.y - this.y;
      if (Math.abs(dx) > Math.abs(dy)) { this.facing = "side"; this.setFlipX(dx > 0); }
      else this.facing = dy < 0 ? "up" : "down";
    }
  }

  DBG.Entities.NPC = NPC;
})();
