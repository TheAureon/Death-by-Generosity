// ---------------------------------------------------------------------------
// The player: the cursed, overpowered hero.
// Milestone 1: walking with WASD / arrow keys, 8 directions, walk animation,
// a shadow, and correct "in front of / behind" sorting with objects.
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
      this.speed = DBG.data.settings.playerSpeed;

      const K = Phaser.Input.Keyboard.KeyCodes;
      this.keys = scene.input.keyboard.addKeys({
        up: K.W, down: K.S, left: K.A, right: K.D,
        up2: K.UP, down2: K.DOWN, left2: K.LEFT, right2: K.RIGHT,
      });
    }

    /** Called every frame by the scene. */
    update() {
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
