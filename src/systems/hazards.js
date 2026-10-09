// ---------------------------------------------------------------------------
// Hazards: what happens when an NPC stumbles into water, lava, a pit or off
// a cliff. Which tiles are hazards is set in data/tiles.js ("hazard").
//
//   lava  — always fatal (they become a little ash pile)
//   pit   — always fatal (they fall forever)
//   water — heavy gear (lots of defense) = they sink. Otherwise they crawl
//           out soggy, a bit hurt and slow for a while
//   cliff — they tumble down to the ground below and get hurt (maybe fatally)
// ---------------------------------------------------------------------------
(function () {
  const KINDS = ["water", "lava", "pit", "cliff"];
  const SINK_DEFENSE = 50; // gear defense at which you stop floating

  /** Hazard name under someone's feet at pixel (x, y), or null. */
  function at(scene, x, y) {
    const S = DBG.data.settings.tileSize;
    const t = scene.map.tile(Math.floor(x / S), Math.floor((y - 2) / S));
    return t && t.hazard ? t.hazard : null;
  }

  function isHazard(name) {
    return KINDS.includes(name);
  }

  /** An NPC (alive, fighting) just walked onto a hazard tile. */
  function stumbleInto(npc, hazard) {
    if (hazard === "water" && npc.gearDefense() < SINK_DEFENSE) return swimOut(npc);
    if (hazard === "cliff") return tumble(npc);
    npc.die(hazard);
  }

  /** Not heavy enough to sink: splash, crawl back out, soggy. */
  function swimOut(npc) {
    const s = npc.scene;
    npc.lock();
    splash(npc);
    s.tweens.chain({
      targets: npc,
      tweens: [
        { scaleY: 0.45, duration: 250, ease: "Quad.easeOut" },
        { x: npc.lastSafe.x, y: npc.lastSafe.y, scaleY: 1, duration: 700, delay: 500, ease: "Sine.easeInOut" },
      ],
      onComplete: () => {
        npc.sayQuirk("soggy");
        npc.slowTimer = 4;
        npc.burst("spark", [0x7cc0f0, 0xe6f4ff], 8, 8, { gravityY: 150 });
        npc.unlock();
        npc.takeDamage(Math.ceil(npc.stats.maxHp * 0.3), null, "soggy");
      },
    });
  }

  /** Off the cliff: tumble down to the first walkable spot below. */
  function tumble(npc) {
    const s = npc.scene, S = DBG.data.settings.tileSize;
    const tx = Math.floor(npc.x / S);
    let ty = Math.floor((npc.y - 2) / S), land = null;
    for (let i = 1; i <= 5; i++) {
      const t = s.map.tile(tx, ty + i);
      if (t && !t.solid) { land = { x: npc.x, y: (ty + i) * S + S - 2 }; break; }
    }
    if (!land) return npc.die("cliff");
    npc.lock();
    npc.sayQuirk("cliff");
    s.tweens.add({ targets: npc, angle: 360, duration: 600 });
    s.tweens.add({
      targets: npc, x: land.x, y: land.y, duration: 600, ease: "Bounce.easeOut",
      onComplete: () => {
        npc.setAngle(0);
        npc.lastSafe = { x: npc.x, y: npc.y };
        s.cameras.main.shake(100, 0.005);
        npc.takeDamage(Math.ceil(npc.stats.maxHp * 0.5), null, "cliff");
        if (npc.alive) { npc.brain.daze(1.5); npc.unlock(); }
      },
    });
  }

  /** Death animations for each hazard. Always ends with npc.finishDeath(). */
  function deathAnimation(npc, hazard) {
    const s = npc.scene;
    npc.deathCause = hazard;
    npc.setAngle(0);
    if (hazard === "lava") {
      // Hop up in surprise, flash, then crumble into ash
      npc.say("HOT HOT HOT", 900);
      s.tweens.add({
        targets: npc, y: npc.y - 8, duration: 180, yoyo: true, repeat: 1,
        onStart: () => npc.setTint(0xff6a2a),
        onComplete: () => {
          npc.burst("spark", [0x3c3438, 0x6c6066, 0xffb23a], 20, 10, { gravityY: -60, lifespan: 900 });
          const pile = s.add.image(npc.x, npc.y + 1, "ash").setOrigin(0.5, 1).setDepth(npc.y - 1);
          (npc.extras = npc.extras || []).push(pile);
          npc.setVisible(false);
          npc.finishDeath(600);
        },
      });
    } else if (hazard === "water") {
      // Sinks straight down, bubbles
      splash(npc);
      s.tweens.add({ targets: npc, scaleY: 0, duration: 1400, ease: "Quad.easeIn", onComplete: () => npc.finishDeath(300) });
      s.time.addEvent({ delay: 250, repeat: 6, callback: () => npc.burst("spark", [0xe6f4ff], 3, 0, { gravityY: -80, speed: { min: 5, max: 20 } }) });
    } else if (hazard === "pit") {
      // Spins away into the dark, with a fading scream
      const scream = s.add.text(npc.x, npc.y - 24, "aaaAAAaaa...", {
        fontFamily: '"Courier New", monospace', fontStyle: "bold", fontSize: "7px", color: "#fff6d8",
        stroke: "#2b1d24", strokeThickness: 2,
      }).setOrigin(0.5, 1).setDepth(99990).setResolution(s.cameras.main.zoom * 2);
      s.tweens.add({ targets: scream, alpha: 0, scale: 0.4, y: scream.y + 8, duration: 1500, onComplete: () => scream.destroy() });
      s.tweens.add({ targets: npc, scaleX: 0, scaleY: 0, angle: 540, duration: 900, ease: "Quad.easeIn", onComplete: () => npc.finishDeath(300) });
    } else {
      // Cliff (no ground below) — just falls over
      s.tweens.add({ targets: npc, angle: 90, duration: 300, ease: "Bounce.easeOut", onComplete: () => npc.finishDeath(800) });
    }
  }

  function splash(npc) {
    npc.burst("spark", [0x7cc0f0, 0xe6f4ff, 0x3f8fd6], 18, 2, { gravityY: 220, speed: { min: 40, max: 90 } });
  }

  DBG.Hazards = { at, isHazard, stumbleInto, deathAnimation };
})();
