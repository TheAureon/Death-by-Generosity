// ---------------------------------------------------------------------------
// Chicken: appears out of nowhere to distract fighting NPCs. Pecks around,
// runs from whoever is chasing it, and wanders off after a while.
// The chicken is smarter than everyone: it never walks into hazards.
// ---------------------------------------------------------------------------
DBG.Entities.Chicken = class Chicken extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, chaser) {
    super(scene, x, y, "chicken", 0);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setOrigin(0.5, 1);
    this.body.setSize(8, 4).setOffset(2, 8);
    this.chaser = chaser;
    this.alive = true;
    this.life = 9;
    this.dir = { x: 0, y: 0 };
    this.dirTimer = 0;
    this.shadow = scene.add.image(x, y, "shadow").setOrigin(0.5, 0.6).setScale(0.6);
    this.setScale(0).setDepth(y);
    scene.tweens.add({ targets: this, scale: 1, duration: 200, ease: "Back.easeOut" });
  }

  update(dt) {
    if (!this.alive) return;
    this.life -= dt;
    if (this.life <= 0) return this.leave();

    const c = this.chaser;
    let speed = 25;
    if (c && c.alive && Phaser.Math.Distance.Between(c.x, c.y, this.x, this.y) < 50) {
      // Run away from the chaser
      const ang = Phaser.Math.Angle.Between(c.x, c.y, this.x, this.y) + Phaser.Math.FloatBetween(-0.4, 0.4);
      this.dir = { x: Math.cos(ang), y: Math.sin(ang) };
      speed = 55;
    } else if ((this.dirTimer -= dt) <= 0) {
      // Peck around randomly
      this.dirTimer = Phaser.Math.FloatBetween(0.4, 1.2);
      const ang = Math.random() * Math.PI * 2;
      this.dir = Math.random() < 0.4 ? { x: 0, y: 0 } : { x: Math.cos(ang), y: Math.sin(ang) };
    }
    this.setVelocity(this.dir.x * speed, this.dir.y * speed);
    if (this.dir.x) this.setFlipX(this.dir.x > 0);
    this.setFrame(Math.floor(this.scene.time.now / 150) % 2);
    this.setDepth(this.y);
    this.shadow.setPosition(this.x, this.y).setDepth(this.y - 0.5);
  }

  /** Wander off (poof). */
  leave() {
    this.alive = false;
    this.body.enable = false;
    this.scene.tweens.add({ targets: [this, this.shadow], alpha: 0, duration: 400, onComplete: () => { this.shadow.destroy(); this.destroy(); } });
  }

  /** Hit by the hero. Feathers everywhere. */
  takeDamage() {
    if (!this.alive) return;
    const p = this.scene.add.particles(this.x, this.y - 6, "spark", {
      speed: { min: 20, max: 60 }, lifespan: 900, gravityY: 40, tint: 0xffffff, alpha: { start: 1, end: 0 }, emitting: false,
    }).setDepth(this.y + 1);
    p.explode(20);
    this.scene.time.delayedCall(1000, () => p.destroy());
    this.scene.game.events.emit("toast", "The chicken did nothing wrong.");
    this.alive = false;
    this.shadow.destroy();
    this.destroy();
  }
};

// Placed on a map ("spawn": "pen_chicken"): a chicken that never leaves.
DBG.Entities.behaviors.chicken = class PenChicken extends DBG.Entities.Chicken {
  constructor(scene, x, y) {
    super(scene, x, y, null);
    this.life = Infinity;
  }
};
