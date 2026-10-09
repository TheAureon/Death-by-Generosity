// ---------------------------------------------------------------------------
// Gifting: hand an item from the hero's bag to an NPC.
// The NPC puts it on (sprite changes), says a line, and hands back whatever
// they were wearing in that slot before. Gifts can earn them a new rank.
// ---------------------------------------------------------------------------
DBG.Gifting = {
  /** Give the item in inventory slot `index` to `npc`. */
  give(scene, npc, index) {
    const inv = DBG.state.inventory;
    const itemId = inv.removeAt(index);
    if (!itemId) return;
    const item = DBG.data.items[itemId];
    const statsBefore = { ...npc.stats };

    const rankBefore = npc.rank;
    const oldId = npc.equip(itemId);
    npc.celebrate();
    npc.giftsReceived = (npc.giftsReceived || 0) + 1;

    // Floating "+40 ATK" style numbers
    const labels = { attack: "ATK", defense: "DEF", maxHp: "HP", speed: "SPD" };
    const changes = Object.keys(labels)
      .map((k) => [k, (npc.stats[k] || 0) - (statsBefore[k] || 0)])
      .filter(([, d]) => d !== 0)
      .map(([k, d]) => `${d > 0 ? "+" : ""}${d} ${labels[k]}`);
    if (changes.length) DBG.Combat.popNumber(scene, npc, changes.join("  "), DBG.Combat.COLORS.heal, 8);

    // What they say
    const lines = npc.def.giftLines;
    let say = lines[(npc.giftsReceived - 1) % lines.length].replace("{item}", item.name);
    if (oldId) {
      const returned = inv.add(oldId);
      const oldName = DBG.data.items[oldId].name;
      say += "\n" + (returned ? npc.def.swapLine.replace("{item}", oldName) : `(Your bag is full. The ${oldName} is lost forever.)`);
    }
    DBG.UI.SpeechBubble.say(scene, npc, say, 3500);

    // Strong enough for a new rank? Make a fuss about it.
    if (npc.rank && npc.rank !== rankBefore) {
      scene.time.delayedCall(3600, () => {
        if (!npc.active) return;
        npc.celebrate();
        if (npc.rank.promotion) npc.say(npc.rank.promotion, 3000);
      });
      scene.game.events.emit("toast", DBG.data.jokes.rankUp.replace("{old}", npc.baseName).replace("{title}", npc.rank.title));
    }
    DBG.Save.autosave();
  },
};
