// ---------------------------------------------------------------------------
// ItemPickup: an item lying on the ground (usually dropped by someone who
// died). Bobs up and down; the hero picks it up by walking over it.
// ---------------------------------------------------------------------------
DBG.Entities.ItemPickup = class ItemPickup extends Phaser.GameObjects.Image {
  constructor(scene, x, y, itemId) {
    super(scene, x, y, "icon_" + itemId);
    scene.add.existing(this);
    this.itemId = itemId;
    this.setOrigin(0.5, 1).setDepth(y);
    this.shadow = scene.add.image(x, y, "shadow").setOrigin(0.5, 0.6).setScale(0.7).setDepth(y - 0.5);
    this.baseY = y;
    this.blockedUntil = 0; // after a "bag full" message, wait before trying again
    scene.tweens.add({ targets: this, y: y - 3, duration: 600, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
  }

  /** Try to put it in the hero's bag. Returns true if picked up. */
  collect() {
    const s = this.scene;
    if (s.time.now < this.blockedUntil) return false;
    const name = DBG.data.items[this.itemId].name;
    if (!DBG.state.inventory.add(this.itemId)) {
      s.game.events.emit("toast", DBG.data.jokes.bagFull.replace("{item}", name));
      this.blockedUntil = s.time.now + 4000;
      return false;
    }
    // Fresh loot gets a quick "+1 Slime Goo"; returned gear gets a message
    if (this.isLoot) DBG.Combat.popNumber(s, s.player, "+1 " + name, DBG.Combat.COLORS.heal, 4);
    else s.game.events.emit("toast", DBG.data.jokes.pickup.replace("{item}", name));
    this.shadow.destroy();
    this.destroy();
    return true;
  }

  /** Pop out of a body and land a little way off. */
  static drop(scene, x, y, itemId) {
    const p = new DBG.Entities.ItemPickup(scene, x, y, itemId);
    let tx = x + Phaser.Math.Between(-14, 14), ty = y + Phaser.Math.Between(-6, 10);
    // Don't land somewhere the hero can't reach (water, walls...)
    const S = DBG.data.settings.tileSize;
    const t = scene.map.tile(Math.floor(tx / S), Math.floor((ty - 2) / S));
    if (!t || t.solid) { tx = x; ty = y; }
    scene.tweens.killTweensOf(p);
    p.setPosition(x, y - 10);
    scene.tweens.add({
      targets: p, x: tx, y: ty, duration: 450, ease: "Bounce.easeOut",
      onComplete: () => {
        p.shadow.setPosition(tx, ty);
        p.setDepth(ty);
        scene.tweens.add({ targets: p, y: ty - 3, duration: 600, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
      },
    });
    return p;
  }
};
