// ---------------------------------------------------------------------------
// Combat rules, shared by everything that can hit or be hit.
//
// A "fighter" is any object with:
//   x, y, stats { defense, thorns }, takeDamage(amount, source, cause), alive
//
// The hero's thorns: whoever hits the hero takes (their raw hit x thorns)
// straight back. Thorns damage never bounces again (no infinite ping-pong).
// ---------------------------------------------------------------------------
(function () {
  const COLORS = { normal: "#ffffff", hero: "#ff6b6b", thorns: "#d58cff", heal: "#7dff8a" };

  /**
   * attacker hits target with a raw hit of `raw` damage.
   * Returns { dealt, reflected }.
   */
  function hit(scene, attacker, target, raw) {
    if (!target || !target.alive) return { dealt: 0, reflected: 0 };

    const defense = (target.stats && target.stats.defense) || 0;
    const dealt = Math.max(1, Math.round(raw - defense));
    target.takeDamage(dealt, attacker, "hit");
    popNumber(scene, target, "-" + fmt(dealt), target.isHero ? COLORS.hero : COLORS.normal);

    // Thorns: punish the attacker with their own hit, multiplied
    let reflected = 0;
    const thorns = (target.stats && target.stats.thorns) || 0;
    if (thorns > 0 && attacker && attacker.alive) {
      reflected = Math.round(raw * thorns);
      attacker.takeDamage(reflected, target, "thorns");
      popNumber(scene, attacker, "THORNS -" + fmt(reflected), COLORS.thorns, 6);
    }
    return { dealt, reflected };
  }

  /** Floating number that rises and fades above a fighter. */
  function popNumber(scene, who, text, color, extraLift = 0) {
    const zoom = scene.cameras.main.zoom;
    const t = scene.add.text(who.x, who.y - 26 - extraLift, text, {
      fontFamily: '"Courier New", monospace', fontStyle: "bold", fontSize: "8px",
      color, stroke: "#2b1d24", strokeThickness: 2,
    }).setOrigin(0.5, 1).setDepth(100000).setResolution(zoom);
    scene.tweens.add({
      targets: t, y: t.y - 14, alpha: 0, duration: 900, ease: "Cubic.easeOut",
      onComplete: () => t.destroy(),
    });
  }

  /** 12345 -> "12,345" */
  function fmt(n) {
    return Math.round(n).toLocaleString("en-US");
  }

  DBG.Combat = { hit, popNumber, fmt, COLORS };
})();
