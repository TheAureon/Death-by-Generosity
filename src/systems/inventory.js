// ---------------------------------------------------------------------------
// Inventory: the hero's bag. A fixed number of slots, each holding one item
// id (from data/items.js) or null. Shared by every scene via DBG.state.
// ---------------------------------------------------------------------------
DBG.Inventory = class Inventory {
  constructor(size, startingItems = []) {
    this.slots = new Array(size).fill(null);
    startingItems.forEach((id) => this.add(id));
  }

  /** Put an item in the first empty slot. Returns false if the bag is full. */
  add(itemId) {
    if (!DBG.data.items[itemId]) { console.warn(`Unknown item "${itemId}"`); return false; }
    const i = this.slots.indexOf(null);
    if (i < 0) return false;
    this.slots[i] = itemId;
    return true;
  }

  /** Take the item out of slot `index`. Returns its id (or null). */
  removeAt(index) {
    const id = this.slots[index];
    this.slots[index] = null;
    return id;
  }

  get(index) {
    return this.slots[index];
  }
};
