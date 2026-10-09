// ---------------------------------------------------------------------------
// Inventory: the hero's bag. A fixed number of slots; each holds one item id
// (from data/items.js) or null. Items marked "stack": true (monster bits)
// pile up in one slot, with a count. Shared by every scene via DBG.state.
// ---------------------------------------------------------------------------
DBG.Inventory = class Inventory {
  constructor(size, startingItems = []) {
    this.slots = new Array(size).fill(null);  // item id or null
    this.counts = new Array(size).fill(0);    // how many (1 for normal items)
    startingItems.forEach((id) => this.add(id));
  }

  /** Add `n` of an item. Returns false if there's no room. */
  add(itemId, n = 1) {
    const item = DBG.data.items[itemId];
    if (!item) { console.warn(`Unknown item "${itemId}"`); return false; }
    if (item.stack) {
      const i = this.slots.indexOf(itemId);
      if (i >= 0) { this.counts[i] += n; return true; }
    }
    const i = this.slots.indexOf(null);
    if (i < 0) return false;
    this.slots[i] = itemId;
    this.counts[i] = item.stack ? n : 1;
    return true;
  }

  /** Take ONE item out of slot `index`. Returns its id (or null). */
  removeAt(index) {
    const id = this.slots[index];
    if (!id) return null;
    if (--this.counts[index] <= 0) { this.slots[index] = null; this.counts[index] = 0; }
    return id;
  }

  /** Remove `n` of an item from anywhere in the bag (used by crafting). */
  remove(itemId, n = 1) {
    for (let i = 0; i < this.slots.length && n > 0; i++) {
      while (this.slots[i] === itemId && n > 0) { this.removeAt(i); n--; }
    }
  }

  /** How many of this item the bag holds in total. */
  countOf(itemId) {
    return this.slots.reduce((sum, id, i) => sum + (id === itemId ? this.counts[i] : 0), 0);
  }

  get(index) {
    return this.slots[index];
  }

  getCount(index) {
    return this.counts[index];
  }
};
