// ---------------------------------------------------------------------------
// The ending: what happens when the hero FINALLY dies.
// There's no set way to do it — whoever manages to kill you, wherever,
// triggers it. Every different killer is remembered (in the browser) so you
// can collect them all.
// ---------------------------------------------------------------------------
DBG.Ending = {
  KEY: "death-by-generosity-deaths",

  /** All the different ways you've died so far: [{ killerId, killerName, at }] */
  history() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || "[]"); } catch (e) { return []; }
  },

  /** Remember this death, and clear the save (you're dead; the run is over). */
  record(info) {
    const list = this.history();
    if (!list.some((d) => d.killerId === info.killerId)) {
      list.push({ killerId: info.killerId, killerName: info.killerName, at: new Date().toISOString() });
    }
    try { localStorage.setItem(this.KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
    info.stats = {
      gifted: DBG.state.tally.gifted,
      wasted: DBG.state.tally.wasted,
      gifts: DBG.state.giftsGiven || 0,
      minutes: Math.max(1, Math.round((DBG.state.playSeconds || 0) / 60)),
      killers: list.length,
    };
    DBG.state.dead = true;          // stops any more saving this run
    clearTimeout(DBG.Save._timer);
    DBG.Save.wipe();
  },

  /** The joke line for this killer (data/jokes.js -> ending.byKiller). */
  epitaph(info) {
    const E = DBG.data.jokes.ending;
    const own = E.byKiller[info.killerId];
    return own || Phaser.Utils.Array.GetRandom(E.generic);
  },
};
