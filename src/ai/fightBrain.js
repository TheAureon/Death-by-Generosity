// ---------------------------------------------------------------------------
// FightBrain: the (very bad) combat AI for an NPC who agreed to fight.
//
// Every so often the NPC picks an ACTION, weighted by its "quirks" in
// data/npcs.js:
//   attack   — walk up to the hero and swing (thorns usually ends it here)
//   wrongWay — "CHAAARGE!" ...in the opposite direction. Bonks into walls
//   chicken  — a chicken appears. The fight is forgotten. Chase the chicken
//   fleeBuff — panics at their own glowing buff and runs around screaming
//   trip     — starts an attack, trips over their own feet
//   selfHit  — shows off a move and hits themselves
// None of them look where they're going, so hazards get them too.
// ---------------------------------------------------------------------------
DBG.AI.FightBrain = class FightBrain {
  constructor(npc, hero) {
    this.npc = npc;
    this.hero = hero;
    this.scene = npc.scene;
    this.fx = []; // temporary effects (stars, aura) removed on state change
    this.set("intro", 0.9);
  }

  set(state, seconds = 0) {
    this.clearFx();
    this.state = state;
    this.timer = seconds;
  }

  clearFx() {
    this.fx.forEach((f) => f.destroy());
    this.fx = [];
  }

  /** Weighted random pick from the NPC's quirks. */
  pickAction() {
    const weights = this.npc.def.quirks || { attack: 1 };
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    let roll = Math.random() * total;
    for (const [name, w] of Object.entries(weights)) {
      if ((roll -= w) <= 0) return name;
    }
    return "attack";
  }

  decide() {
    const action = this.pickAction();
    const npc = this.npc;
    switch (action) {
      case "wrongWay": {
        // Aim AWAY from the hero (with a little wobble), then sprint
        const ang = Phaser.Math.Angle.Between(this.hero.x, this.hero.y, npc.x, npc.y) + Phaser.Math.FloatBetween(-0.5, 0.5);
        this.dir = { x: Math.cos(ang), y: Math.sin(ang) };
        npc.sayQuirk("wrongWay");
        this.set("wrongWay", 1.8);
        break;
      }
      case "chicken": {
        this.chicken = this.scene.spawnChicken(npc.x + Phaser.Math.Between(-40, 40), npc.y + Phaser.Math.Between(-30, 30), npc);
        npc.sayQuirk("chicken");
        this.set("chicken", 4.5);
        break;
      }
      case "fleeBuff": {
        npc.sayQuirk("fleeBuff");
        this.set("flee", 3);
        const aura = this.scene.add.particles(0, 0, "spark", {
          follow: npc, followOffset: { y: -12 }, speed: { min: 8, max: 25 }, lifespan: 500, frequency: 50,
          tint: [0xfff0a8, 0xf2c14e, 0x7cf0ff], alpha: { start: 1, end: 0 },
        }).setDepth(npc.depth + 1);
        this.fx.push(aura);
        this.dirTimer = 0;
        break;
      }
      case "selfHit":
        npc.sayQuirk("selfHit");
        this.windup("self");
        break;
      case "trip":
        this.tripIn = Phaser.Math.FloatBetween(0.3, 0.9);
        this.set("approach", 6);
        break;
      default:
        this.tripIn = null;
        this.set("approach", 6);
    }
  }

  /** Raise the weapon... (target: "hero" or "self") */
  windup(target) {
    this.strikeTarget = target;
    this.set("windup", 0.45);
    DBG.Combat.popNumber(this.scene, this.npc, "!", "#ffde59", 2);
    this.scene.tweens.add({ targets: this.npc, angle: { from: 0, to: -14 }, duration: 400 });
  }

  /** ...and swing. */
  strike() {
    const npc = this.npc;
    npc.setAngle(0);
    this.scene.tweens.add({ targets: npc, angle: { from: 14, to: 0 }, duration: 150 });
    if (this.strikeTarget === "self") {
      const dmg = Math.max(1, npc.stats.attack - npc.stats.defense);
      DBG.Combat.popNumber(this.scene, npc, "-" + DBG.Combat.fmt(dmg), "#ffffff");
      npc.takeDamage(dmg, npc, "selfHit");
      if (npc.alive) this.daze(1.2);
      return;
    }
    const dist = Phaser.Math.Distance.Between(npc.x, npc.y, this.hero.x, this.hero.y);
    if (dist <= 26) DBG.Combat.hit(this.scene, npc, this.hero, npc.stats.attack);
    else DBG.Combat.popNumber(this.scene, npc, "miss", "#d8d8e0");
    if (npc.alive) this.set("recoil", 0.35);
  }

  /** Stand there seeing stars. */
  daze(seconds) {
    this.set("dazed", seconds);
    for (let i = 0; i < 3; i++) this.fx.push(this.scene.add.image(0, 0, "star").setDepth(99970));
  }

  trip() {
    const npc = this.npc, s = this.scene;
    npc.sayQuirk("trip");
    npc.lock();
    const fwd = npc.flipX ? 1 : -1;
    s.tweens.add({ targets: npc, angle: 90 * -fwd, x: npc.x + fwd * 6, duration: 220, ease: "Quad.easeIn" });
    s.time.delayedCall(1300, () => {
      if (!npc.alive) return;
      npc.setAngle(0);
      npc.unlock();
      npc.takeDamage(Math.max(1, Math.ceil(npc.stats.maxHp * 0.05)), null, "trip");
      if (npc.alive) this.set("decide");
    });
  }

  update(dt) {
    const npc = this.npc, hero = this.hero;
    const speed = npc.stats.speed;
    this.timer -= dt;
    npc.setVelocity(0, 0);

    switch (this.state) {
      case "intro":
        npc.face(hero);
        if (this.timer <= 0) this.decide();
        break;

      case "decide":
        this.decide();
        break;

      case "approach": {
        const dx = hero.x - npc.x, dy = hero.y - npc.y, d = Math.hypot(dx, dy) || 1;
        npc.setVelocity((dx / d) * speed * 1.3, (dy / d) * speed * 1.3);
        if (this.tripIn != null && (this.tripIn -= dt) <= 0) { this.tripIn = null; this.trip(); break; }
        if (d < 20) this.windup("hero");
        else if (this.timer <= 0) this.decide();
        break;
      }

      case "windup":
        npc.face(hero);
        if (this.timer <= 0) this.strike();
        break;

      case "recoil": {
        const dx = npc.x - hero.x, dy = npc.y - hero.y, d = Math.hypot(dx, dy) || 1;
        npc.setVelocity((dx / d) * 60, (dy / d) * 60);
        if (this.timer <= 0) this.decide();
        break;
      }

      case "wrongWay":
        npc.setVelocity(this.dir.x * speed * 2, this.dir.y * speed * 2);
        if (!npc.body.blocked.none) {
          // Bonk.
          npc.sayQuirk("bonk");
          this.scene.cameras.main.shake(80, 0.004);
          npc.takeDamage(Math.max(1, Math.ceil(npc.stats.maxHp * 0.1)), null, "bonk");
          if (npc.alive) this.daze(1.5);
        } else if (this.timer <= 0) this.decide();
        break;

      case "chicken": {
        const c = this.chicken;
        if (!c || !c.active || this.timer <= 0) { this.decide(); break; }
        const dx = c.x - npc.x, dy = c.y - npc.y, d = Math.hypot(dx, dy) || 1;
        if (d > 6) npc.setVelocity((dx / d) * speed * 1.4, (dy / d) * speed * 1.4);
        break;
      }

      case "flee":
        if ((this.dirTimer -= dt) <= 0) {
          const ang = Math.random() * Math.PI * 2;
          this.dir = { x: Math.cos(ang), y: Math.sin(ang) };
          this.dirTimer = 0.5;
        }
        npc.setVelocity(this.dir.x * speed * 1.8, this.dir.y * speed * 1.8);
        if (this.timer <= 0) this.decide();
        break;

      case "dazed": {
        const t = this.scene.time.now / 300;
        this.fx.forEach((star, i) => {
          const a = t + (i * Math.PI * 2) / 3;
          star.setPosition(npc.x + Math.cos(a) * 7, npc.y - 26 + Math.sin(a) * 2);
        });
        if (this.timer <= 0) this.decide();
        break;
      }
    }
  }
};
