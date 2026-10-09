// ---------------------------------------------------------------------------
// NPC: a person the hero can give gear to, and then beg to fight.
//
// Drawn in layers: the person sprite plus one sprite per worn item, all kept
// on the same animation frame. Gifts swap layers, so you SEE the new gear.
//
// Modes:
//   "calm"  — wanders near home, greets the hero, accepts gifts
//   "fight" — a FightBrain (src/ai/fightBrain.js) drives them; they ignore
//             hazards, so they can stumble into water, lava, pits, cliffs
//   "dead"  — playing a death animation, then removed
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
      this.mode = "calm";
      this.locked = false; // true while a scripted animation (fall, trip...) plays

      this.setOrigin(0.5, 1);
      this.body.setSize(10, 6).setOffset(11, 25); // feet only (32x32 frame)
      this.body.setImmovable(true);               // the hero can't shove them
      this.shadow = scene.add.image(x, y, "shadow").setOrigin(0.5, 0.6);
      this.hpBar = scene.add.graphics().setVisible(false);

      this.home = { x, y };
      this.lastSafe = { x, y }; // last spot that wasn't a hazard (gear drops here)
      this.facing = "down";
      this.walkTime = 0;
      this.thinkTimer = Phaser.Math.FloatBetween(0.5, 2);
      this.target = null;
      this.slowTimer = 0;

      this.gear = {};   // slot -> item id
      this.layers = {}; // slot -> sprite
      this.recalcStats();
      this.hp = this.stats.maxHp;
    }

    // ---- Gear ---------------------------------------------------------------

    /** Base stats plus everything they're wearing. */
    recalcStats() {
      const s = { ...this.def.stats };
      Object.values(this.gear).forEach((itemId) => {
        Object.entries(DBG.data.items[itemId].stats || {}).forEach(([k, v]) => { s[k] = (s[k] || 0) + v; });
      });
      s.speed = Math.max(5, s.speed || 0);
      s.thorns = 0;
      this.stats = s;
    }

    /** Defense from gear only (heavy gear makes you sink in water). */
    gearDefense() {
      return this.stats.defense - (this.def.stats.defense || 0);
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

    /** Make every gear layer match the body's frame, position, size, tint and depth. */
    syncLayers() {
      const frame = this.frame.name;
      SLOTS.forEach((slot) => {
        const layer = this.layers[slot];
        if (!layer) return;
        const behind = DBG.Art.gearBehind(slot, this.facing);
        // Seen from behind, the cape covers everything else
        const order = (slot === "cape" && this.facing === "up" ? 9 : DBG.Art.gearOrder[slot]) * 0.01;
        layer.setPosition(this.x, this.y).setFrame(frame).setFlipX(this.flipX)
          .setScale(this.scaleX, this.scaleY).setAngle(this.angle).setAlpha(this.alpha).setVisible(this.visible)
          .setDepth(this.depth + (behind ? -0.1 + order : order));
        if (this.isTinted) { layer.setTint(this.tintTopLeft); layer.tintFill = this.tintFill; }
        else layer.clearTint();
      });
    }

    // ---- Little animations --------------------------------------------------

    /** A happy little hop + sparkles (after a gift). */
    celebrate() {
      this.scene.tweens.add({ targets: this, scaleY: 1.25, scaleX: 0.85, duration: 120, yoyo: true, ease: "Quad.easeOut" });
      this.burst("spark", [0xfff0a8, 0xf2c14e, 0xffffff], 16, 16);
    }

    /** Throw some particles out of this NPC. */
    burst(texture, tint, count, lift = 12, extra = {}) {
      const p = this.scene.add.particles(this.x, this.y - lift, texture, {
        speed: { min: 20, max: 70 }, angle: { min: 200, max: 340 }, lifespan: 600,
        tint, alpha: { start: 1, end: 0 }, emitting: false, ...extra,
      }).setDepth(this.depth + 1);
      p.explode(count);
      this.scene.time.delayedCall(1200, () => p.destroy());
    }

    /** Say something in a speech bubble. */
    say(text, ms = 1800) {
      DBG.UI.SpeechBubble.say(this.scene, this, text, ms);
    }

    /** Say a random line from data/jokes.js -> quirkLines[key]. */
    sayQuirk(key) {
      const lines = DBG.data.jokes.quirkLines[key];
      if (lines) this.say(Phaser.Utils.Array.GetRandom(lines));
    }

    /** Turn to look at something. */
    face(other) {
      const dx = other.x - this.x, dy = other.y - this.y;
      if (Math.abs(dx) > Math.abs(dy)) { this.facing = "side"; this.setFlipX(dx > 0); }
      else this.facing = dy < 0 ? "up" : "down";
    }

    // ---- Fighting -----------------------------------------------------------

    /** The hero asked nicely. Let's go. */
    startFight(hero) {
      this.mode = "fight";
      this.target = null;
      this.brain = new DBG.AI.FightBrain(this, hero);
      this.say(this.def.fightStart, 1600);
      this.hpBar.setVisible(true);
    }

    /** Lose HP. cause: "hit", "thorns", "hero", "selfHit", "bonk", "trip"... */
    takeDamage(amount, source, cause = "hit") {
      if (!this.alive) return;
      this.hp -= amount;
      this.setTintFill(0xffffff);
      // Clear the flash (unless lava has already set a "burning" tint)
      this.scene.time.delayedCall(70, () => this.active && this.deathCause !== "lava" && this.clearTint());
      if (this.hp <= 0) this.die(cause === "hit" ? "thorns" : cause, source);
    }

    /** Freeze the AI while a scripted animation plays. */
    lock() { this.locked = true; this.setVelocity(0, 0); }
    unlock() { if (this.alive) this.locked = false; }

    /**
     * Die, with an animation that depends on the cause:
     *   thorns: launched away spinning   hero: flattened into a pancake
     *   lava/water/pit/cliff: see src/systems/hazards.js (they call finish)
     */
    die(cause, source) {
      if (!this.alive) return;
      this.alive = false;
      this.mode = "dead";
      if (this.brain) this.brain.clearFx();
      this.lock();
      this.body.enable = false;
      this.hpBar.setVisible(false);
      if (this.bubble) this.bubble.destroy();
      this.deathCause = cause;
      const s = this.scene;

      if (cause === "hero") {
        // Pancake.
        this.setAngle(0).setScale(1.6, 0.18);
        this.burst("spark", [0xd9c398, 0xc9a26b], 14, 2, { angle: { min: 180, max: 360 } });
        s.cameras.main.shake(120, 0.008);
        this.finishDeath(1200);
      } else if (cause === "thorns" && source) {
        // Yeeted away from whoever reflected it, spinning.
        const ang = Phaser.Math.Angle.Between(source.x, source.y, this.x, this.y);
        const dist = 48;
        s.tweens.add({ targets: this, angle: 720, duration: 650, ease: "Quad.easeOut" });
        s.tweens.add({
          targets: this, x: this.x + Math.cos(ang) * dist, y: this.y + Math.sin(ang) * dist, duration: 650, ease: "Quad.easeOut",
          onComplete: () => {
            // Did they land in something nasty?
            const hazard = DBG.Hazards.at(s, this.x, this.y);
            if (hazard) DBG.Hazards.deathAnimation(this, hazard);
            else { this.setAngle(90); this.finishDeath(1000); }
          },
        });
      } else if (DBG.Hazards.isHazard(cause) && DBG.Hazards.at(s, this.x, this.y)) {
        DBG.Hazards.deathAnimation(this, cause);
      } else {
        // Just falls over.
        s.tweens.add({ targets: this, angle: 90, duration: 250, ease: "Bounce.easeOut", onComplete: () => this.finishDeath(1000) });
      }
    }

    /** After the death animation: ghost, tally, drop gear, then clean up. */
    finishDeath(delay = 800) {
      const s = this.scene;
      if (this._finishing) return;
      this._finishing = true;
      s.events.emit("npc-died", this, this.deathCause); // WorldScene: tally, drop gear, respawn
      s.time.delayedCall(delay, () => {
        // A little ghost floats up
        if (this.deathCause !== "lava") {
          const ghost = s.add.image(this.x, this.y - 4, "npc_" + this.id, 0).setOrigin(0.5, 1)
            .setTintFill(0xffffff).setAlpha(0.6).setDepth(99990);
          s.tweens.add({ targets: ghost, y: ghost.y - 30, alpha: 0, duration: 1600, onComplete: () => ghost.destroy() });
        }
        s.tweens.add({ targets: this, alpha: 0, duration: 800, delay: 600, onComplete: () => this.cleanUp() });
      });
    }

    cleanUp() {
      Object.values(this.layers).forEach((l) => l.destroy());
      this.shadow.destroy();
      this.hpBar.destroy();
      if (this.extras) this.extras.forEach((e) => e.destroy());
      this.destroy();
    }

    // ---- Every frame --------------------------------------------------------

    /** Pick a new place to stroll to, near home (calm mode). */
    think() {
      this.thinkTimer = Phaser.Math.FloatBetween(1.5, 4);
      if (Math.random() < 0.4) { this.target = null; return; } // just stand around
      const r = (this.def.wander || 2) * DBG.data.settings.tileSize;
      this.target = { x: this.home.x + Phaser.Math.Between(-r, r), y: this.home.y + Phaser.Math.Between(-r, r) };
    }

    /** Calm mode: stroll about. Returns the velocity chosen. */
    wander(dt, hero, frozen) {
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
      if (vx === 0 && vy === 0 && hero && Phaser.Math.Distance.Between(this.x, this.y, hero.x, hero.y) < 48) this.face(hero);
    }

    /** Called every frame by the scene. */
    update(dt, hero, frozen) {
      if (!this.active) return;
      if (this.alive && !this.locked) {
        if (this.mode === "fight") this.brain.update(dt);
        else this.wander(dt, hero, frozen);
        // Angry people don't look where they're going
        const hazard = DBG.Hazards.at(this.scene, this.x, this.y);
        if (hazard && this.mode === "fight") DBG.Hazards.stumbleInto(this, hazard);
        else this.lastSafe = { x: this.x, y: this.y };
        // Soggy people walk slower
        if (this.slowTimer > 0) {
          this.slowTimer -= dt;
          this.body.velocity.scale(0.5);
        }
      }

      // Animation: walk cycle while moving, otherwise standing frame
      const vx = this.body.velocity.x, vy = this.body.velocity.y;
      const moving = this.body.enable && (Math.abs(vx) > 1 || Math.abs(vy) > 1);
      if (moving && !this.locked) {
        if (Math.abs(vx) > Math.abs(vy)) { this.facing = "side"; this.setFlipX(vx > 0); }
        else this.facing = vy < 0 ? "up" : "down";
        this.walkTime += dt;
      } else {
        this.walkTime = 0;
      }
      const step = moving ? WALK_CYCLE[Math.floor(this.walkTime * 7) % 4] : 0;
      this.setFrame(FRAME_BASE[this.facing] + step);

      this.setDepth(this.y);
      this.shadow.setPosition(this.x, this.y).setDepth(this.y - 0.5).setVisible(this.alive);
      this.syncLayers();
      if (this.alive && this.mode === "fight") this.drawHpBar();
    }

    drawHpBar() {
      const w = 16, pct = Phaser.Math.Clamp(this.hp / this.stats.maxHp, 0, 1);
      const x = Math.round(this.x - w / 2), y = Math.round(this.y - 30);
      this.hpBar.clear().setDepth(99980);
      this.hpBar.fillStyle(0x2b1d24, 1).fillRect(x - 1, y - 1, w + 2, 4);
      this.hpBar.fillStyle(0x4a2a22, 1).fillRect(x, y, w, 2);
      this.hpBar.fillStyle(0xe0453a, 1).fillRect(x, y, Math.ceil(w * pct), 2);
    }
  }

  DBG.Entities.NPC = NPC;
})();
