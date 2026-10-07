// ---------------------------------------------------------------------------
// Training Dummy: punches the hero whenever they stand close, and gets
// destroyed by the hero's thorns. Respawns after a few seconds.
// Exists to show off thorns and regen until real NPC combat (Milestone 4).
// Stats come from data/creatures.js -> "training_dummy".
// ---------------------------------------------------------------------------
(function () {
  class TrainingDummy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, data) {
      super(scene, x, y, "dummy", 0);
      scene.add.existing(this);
      this.setOrigin(0.5, 1).setDepth(y);
      this.shadow = scene.add.image(x, y, "shadow").setOrigin(0.5, 0.6).setDepth(y - 0.5);

      this.data_ = data;
      this.name = data.name;
      this.stats = { defense: 0, thorns: 0 };
      this.cooldown = data.attackCooldown;
      this.deaths = 0;
      this.revive();
    }

    revive() {
      this.alive = true;
      this.hp = this.data_.maxHp;
      this.setVisible(true).setAlpha(1).setScale(0.2).setAngle(0);
      this.scene.tweens.add({ targets: this, scale: 1, duration: 300, ease: "Back.easeOut" });
    }

    takeDamage(amount) {
      if (!this.alive) return;
      this.hp -= amount;
      // Wobble on its post
      this.scene.tweens.add({ targets: this, angle: { from: -18, to: 0 }, duration: 350, ease: "Elastic.easeOut" });
      this.setTintFill(0xffffff);
      this.scene.time.delayedCall(70, () => this.clearTint());
      if (this.hp <= 0) this.die();
    }

    die() {
      this.alive = false;
      this.setVisible(false);
      // Straw everywhere
      const burst = this.scene.add.particles(this.x, this.y - 12, "straw", {
        speed: { min: 40, max: 120 }, angle: { min: 0, max: 360 }, rotate: { min: 0, max: 360 },
        gravityY: 200, lifespan: 900, alpha: { start: 1, end: 0 }, emitting: false,
      }).setDepth(this.y + 1);
      burst.explode(30);
      this.scene.time.delayedCall(1200, () => burst.destroy());

      const lines = DBG.data.jokes.dummyDeath;
      this.scene.game.events.emit("toast", lines[this.deaths++ % lines.length]);
      this.scene.time.delayedCall(this.data_.respawnSeconds * 1000, () => this.revive());
    }

    /** Called every frame by the scene. */
    update(dt, hero) {
      if (!this.alive) return;
      this.cooldown -= dt;
      const dist = Phaser.Math.Distance.Between(this.x, this.y, hero.x, hero.y);
      if (dist <= this.data_.attackRange && this.cooldown <= 0) {
        this.cooldown = this.data_.attackCooldown;
        this.setFlipX(hero.x > this.x); // art punches left; flip to punch right
        this.setFrame(1);
        this.scene.time.delayedCall(220, () => this.setFrame(0));
        DBG.Combat.hit(this.scene, this, hero, this.data_.attack);
      }
    }
  }

  DBG.Entities.TrainingDummy = TrainingDummy;
  DBG.Entities.behaviors.dummy = TrainingDummy;
})();
