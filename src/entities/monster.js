// ---------------------------------------------------------------------------
// Monster: a wild creature you farm for loot (Milestone 6).
// Stats, loot and movement style come from data/creatures.js
// (any entry with "behavior": "monster").
//
// Styles:
//   hop    — bounces toward you in little hops (slimes)
//   walk   — waddles straight at you (geese)
//   charge — winds up, then dashes in a straight line (boars)
//
// Monsters hit the hero... and the hero's thorns hit back ten times harder,
// so usually you can farm them by just standing there.
// ---------------------------------------------------------------------------
DBG.Entities.Monster = class Monster extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, data, id) {
    super(scene, x, y, "mon_" + id, 0);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.def = data;
    this.kind = id;
    this.name = data.name;
    this.home = { x, y };
    this.alive = true;
    this.hp = data.maxHp;
    this.stats = { defense: 0, thorns: 0 };

    this.setOrigin(0.5, 1);
    this.body.setSize(10, 5).setOffset((this.width - 10) / 2, this.height - 5);
    this.shadow = scene.add.image(x, y, "shadow").setOrigin(0.5, 0.6).setScale(this.width / 16);

    this.state = "idle";
    this.timer = Phaser.Math.FloatBetween(0.5, 2);
    this.cooldown = 0;
    this.noticed = false;
    this.dir = { x: 0, y: 0 };

    // Pop into the world
    this.setScale(0);
    scene.tweens.add({ targets: this, scale: 1, duration: 250, ease: "Back.easeOut" });
  }

  set(state, seconds) {
    this.state = state;
    this.timer = seconds;
  }

  /** Called every frame by the scene. */
  update(dt, hero) {
    if (!this.alive) return;
    const d = this.def;
    this.timer -= dt;
    this.cooldown -= dt;
    const dist = Phaser.Math.Distance.Between(this.x, this.y, hero.x, hero.y);
    const toHero = { x: (hero.x - this.x) / (dist || 1), y: (hero.y - this.y) / (dist || 1) };
    let vx = 0, vy = 0;

    // Notice the hero
    if (dist < d.aggro && !this.noticed) {
      this.noticed = true;
      if (d.shout) DBG.UI.SpeechBubble.say(this.scene, this, d.shout, 800);
      this.set("chase", 0);
    } else if (dist > d.aggro * 2.5 && this.noticed) {
      this.noticed = false; // lost interest
      this.set("idle", 1);
    }

    switch (this.state) {
      case "idle": // wander about
        if (this.timer <= 0) {
          const ang = Math.random() * Math.PI * 2;
          this.dir = Math.random() < 0.4 ? { x: 0, y: 0 } : { x: Math.cos(ang), y: Math.sin(ang) };
          // Don't stray too far from home
          if (Phaser.Math.Distance.Between(this.x, this.y, this.home.x, this.home.y) > 48) {
            const a = Phaser.Math.Angle.Between(this.x, this.y, this.home.x, this.home.y);
            this.dir = { x: Math.cos(a), y: Math.sin(a) };
          }
          this.timer = Phaser.Math.FloatBetween(0.8, 2);
        }
        vx = this.dir.x * d.speed * 0.4; vy = this.dir.y * d.speed * 0.4;
        break;

      case "chase":
        if (d.style === "charge" && dist < 70 && this.cooldown <= 0) {
          // Wind up a charge
          this.chargeDir = toHero;
          DBG.Combat.popNumber(this.scene, this, "!", "#ffde59", -8);
          this.scene.tweens.add({ targets: this, x: this.x + 1, duration: 50, yoyo: true, repeat: 4 });
          this.set("windup", 0.6);
          break;
        }
        if (dist <= d.attackRange && this.cooldown <= 0) { this.attack(hero); break; }
        vx = toHero.x * d.speed; vy = toHero.y * d.speed;
        break;

      case "windup":
        if (this.timer <= 0) this.set("charge", 0.6);
        break;

      case "charge":
        vx = this.chargeDir.x * d.speed * 4; vy = this.chargeDir.y * d.speed * 4;
        if (dist <= d.attackRange) { this.attack(hero); break; }
        if (!this.body.blocked.none) {
          DBG.UI.SpeechBubble.say(this.scene, this, "*bonk*", 700);
          this.cooldown = d.attackCooldown;
          this.set("recover", 1.2);
        } else if (this.timer <= 0) { this.cooldown = d.attackCooldown; this.set("recover", 0.6); }
        break;

      case "recover":
        if (this.timer <= 0) this.set(this.noticed ? "chase" : "idle", 0);
        break;
    }

    if (!this.alive) return; // thorns got it mid-attack

    // Slimes only move during the "up" part of each hop
    let frame = 0;
    if (d.style === "hop") {
      const hopping = (this.scene.time.now / 600 + this.home.x) % 1 < 0.45;
      if (!hopping) { vx = 0; vy = 0; }
      frame = hopping ? 0 : 1;
    } else if (vx || vy) {
      frame = Math.floor(this.scene.time.now / 160) % 2;
    }
    this.setVelocity(vx, vy);
    this.setFrame(frame);
    if (vx) this.setFlipX(vx > 0);
    this.setDepth(this.y);
    this.shadow.setPosition(this.x, this.y).setDepth(this.y - 0.5);
  }

  /** Bite / peck / headbutt the hero. Thorns will probably end this. */
  attack(hero) {
    this.cooldown = this.def.attackCooldown;
    this.setFlipX(hero.x > this.x);
    this.scene.tweens.add({ targets: this, scaleX: 1.25, scaleY: 0.8, duration: 90, yoyo: true });
    DBG.Combat.hit(this.scene, this, hero, this.def.attack);
    if (this.alive) this.set("recover", 0.5);
  }

  takeDamage(amount) {
    if (!this.alive) return;
    this.hp -= amount;
    this.setTintFill(0xffffff);
    this.scene.time.delayedCall(70, () => this.active && this.clearTint());
    if (this.hp <= 0) this.die();
  }

  /** Poof! Drop loot, and schedule a new monster at the same spot. */
  die() {
    const s = this.scene;
    this.alive = false;
    this.body.enable = false;
    const puff = s.add.particles(this.x, this.y - 6, "spark", {
      speed: { min: 30, max: 80 }, lifespan: 500, alpha: { start: 1, end: 0 }, emitting: false,
      tint: [Phaser.Display.Color.HexStringToColor(this.def.color || "#ffffff").color, 0xffffff],
    }).setDepth(this.y + 1);
    puff.explode(18);
    s.time.delayedCall(700, () => puff.destroy());
    s.events.emit("monster-died", this);
    if (this.bubble) this.bubble.destroy();
    this.shadow.destroy();
    this.destroy();
  }

  /** Roll the loot table: [{ item, chance, min, max }] -> list of item ids. */
  static rollLoot(drops = []) {
    const out = [];
    drops.forEach((d) => {
      if (Math.random() > (d.chance ?? 1)) return;
      const n = Phaser.Math.Between(d.min || 1, d.max || d.min || 1);
      for (let i = 0; i < n; i++) out.push(d.item);
    });
    return out;
  }
};

DBG.Entities.behaviors.monster = DBG.Entities.Monster;
