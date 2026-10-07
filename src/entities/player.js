// ---------------------------------------------------------------------------
// The player: the cursed, overpowered hero.
//   - Walking with WASD / arrow keys, 8 directions, walk animation, shadow
//   - Stats from data/hero.js: huge HP, constant regen, defense, thorns
//   - K = punch yourself (it never works, but it's a nice way to see regen)
// Tells the UI about health changes with game event "hero-hp".
// ---------------------------------------------------------------------------
(function () {
  // Standing frame for each facing (see src/art/characterArt.js)
  const IDLE_FRAME = { down: 0, up: 3, side: 6 };

  class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, "hero", 0);
      scene.add.existing(this);
      scene.physics.add.existing(this);

      // Position = the hero's feet, which makes depth-sorting natural.
      this.setOrigin(0.5, 1);
      // Only the feet collide (so the head can overlap a wall top, Stardew-style).
      this.body.setSize(10, 6).setOffset(3, 17);
      this.setCollideWorldBounds(true);

      this.shadow = scene.add.image(x, y, "shadow").setOrigin(0.5, 0.6);
      this.facing = "down";

      // --- Stats ---
      const h = DBG.data.hero;
      this.isHero = true;
      this.alive = true;
      this.name = h.name;
      this.stats = { maxHp: h.maxHp, regen: h.regenPerSecond, attack: h.attack, defense: h.defense, thorns: h.thorns };
      this.hp = h.maxHp;
      this.speed = h.moveSpeed || DBG.data.settings.playerSpeed;
      this.selfPunchCount = 0;

      const K = Phaser.Input.Keyboard.KeyCodes;
      this.keys = scene.input.keyboard.addKeys({
        up: K.W, down: K.S, left: K.A, right: K.D,
        up2: K.UP, down2: K.DOWN, left2: K.LEFT, right2: K.RIGHT,
      });
      scene.input.keyboard.on("keydown-K", this.punchSelf, this);

      this.emitHp();
    }

    /** Damage from any source. The hero can't die yet — that's the ending. */
    takeDamage(amount) {
      this.hp -= amount;
      if (this.hp < 1) {
        this.hp = 1;
        this.scene.game.events.emit("toast", DBG.data.jokes.deathDenied);
      }
      this.setTintFill(0xffffff);
      this.scene.time.delayedCall(80, () => this.clearTint());
      this.emitHp();
    }

    /** K: try (and fail) to end it all with a punch to the face. */
    punchSelf() {
      const lines = DBG.data.jokes.selfPunch;
      this.hp = 1; // the punch works... for one frame
      this.emitHp();
      this.scene.cameras.main.shake(150, 0.01);
      this.setTintFill(0xff4444);
      this.scene.time.delayedCall(120, () => this.clearTint());
      DBG.Combat.popNumber(this.scene, this, "-" + DBG.Combat.fmt(this.stats.maxHp - 1), DBG.Combat.COLORS.hero);
      this.scene.game.events.emit("toast", lines[this.selfPunchCount++ % lines.length]);
    }

    emitHp() {
      this.scene.game.events.emit("hero-hp", this.hp, this.stats.maxHp, this.stats.regen);
    }

    /** Called every frame by the scene. dt = seconds since last frame. */
    update(dt) {
      // --- Constant regen ---
      if (this.hp < this.stats.maxHp) {
        this.hp = Math.min(this.stats.maxHp, this.hp + this.stats.regen * dt);
        this.emitHp();
      }

      // --- Movement ---
      const k = this.keys;
      let dx = 0, dy = 0;
      if (k.left.isDown || k.left2.isDown) dx -= 1;
      if (k.right.isDown || k.right2.isDown) dx += 1;
      if (k.up.isDown || k.up2.isDown) dy -= 1;
      if (k.down.isDown || k.down2.isDown) dy += 1;

      // Same speed diagonally as straight
      const len = Math.hypot(dx, dy) || 1;
      this.setVelocity((dx / len) * this.speed, (dy / len) * this.speed);

      if (dx !== 0 || dy !== 0) {
        // Sideways wins over up/down when moving diagonally
        if (dx !== 0) this.facing = "side";
        else this.facing = dy < 0 ? "up" : "down";
        if (dx !== 0) this.setFlipX(dx > 0); // art faces left; flip to face right
        this.anims.play("hero-walk-" + this.facing, true);
      } else {
        this.anims.stop();
        this.setFrame(IDLE_FRAME[this.facing]);
      }

      this.setDepth(this.y);
      this.shadow.setPosition(this.x, this.y).setDepth(this.y - 0.5);
    }
  }

  DBG.Entities.Player = Player;
})();
