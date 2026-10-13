// ---------------------------------------------------------------------------
// World map (press N): the whole open world, shrunk down to one tiny pixel
// per tile. Shows every area's name, the waystones you've lit, and a
// blinking dot where you are. N, Q or Backspace closes it.
// The picture is made from the map itself, so it updates when maps change.
// ---------------------------------------------------------------------------
DBG.UI.WorldMap = class WorldMap {
  constructor(scene) {
    this.scene = scene;
    this.root = null;
    const k = scene.input.keyboard;
    k.on("keydown-N", () => {
      if (this.root) return this.close();
      const busy = ["inventoryMenu", "choiceMenu", "craftMenu", "travelMenu", "journal"].some((m) => scene[m] && scene[m].isOpen);
      if (!busy) this.open();
    });
    ["Q", "BACKSPACE"].forEach((key) => k.on("keydown-" + key, () => this.close()));
  }

  get isOpen() {
    return !!this.root;
  }

  /** Colour of each kind of tile on the map (by its "art" name). */
  static colorFor(art) {
    const C = {
      grass: "#5fae3c", flowers: "#6cb848", path: "#c89a5a", planks: "#9a6a3a", sand: "#e6cf8a",
      wall: "#8a8a96", water: "#3f8fd6", lava: "#ff6a2a", pit: "#1a1418", cliff: "#6e5a4a",
      tree: "#2f6e2a", bush: "#3c8a32", rock: "#9a9aa2", fence: "#a07a4a", cobble: "#b0aaa0",
      crops: "#a8b040", roof_red: "#b8423a", roof_straw: "#d8b050", roof_slate: "#5a6070",
      house_wall: "#9a6a3a", house_window: "#9a6a3a", house_door: "#7a4a2a", coals: "#ff8a3a",
      well: "#4a6aa0", basalt: "#4a3e42", rockfloor: "#8a7a68", flagstone: "#a8a4a0",
      marble: "#ece8f0", void: "#14101e", pillar: "#d8d4e0", mushroom: "#c8504a", crystal: "#9ae0ff",
      waystone: "#7cf0ff", signpost: "#c89a5a",
    };
    return C[art] || "#8a8a8a";
  }

  /** Draw the whole map, one pixel per tile, into a texture (once). */
  makeTexture(map) {
    const key = "worldmap_" + map.id;
    const tex = this.scene.textures;
    if (tex.exists(key)) return key;
    const canvas = tex.createCanvas(key, map.width, map.height);
    const ctx = canvas.getContext();
    const img = ctx.createImageData(map.width, map.height);
    const rgb = {};
    const colorOf = (art) => {
      if (!rgb[art]) {
        const c = Phaser.Display.Color.HexStringToColor(WorldMap.colorFor(art));
        rgb[art] = [c.red, c.green, c.blue];
      }
      return rgb[art];
    };
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        // People/creature spots have no art of their own: use the tile to the left
        let t = map.tile(x, y);
        for (let dx = 1; t && !t.art && dx < 4; dx++) t = map.tile(x - dx, y);
        const [r, g, b] = colorOf(t && t.art ? t.art : "grass");
        const i = (y * map.width + x) * 4;
        img.data[i] = r; img.data[i + 1] = g; img.data[i + 2] = b; img.data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    canvas.refresh();
    return key;
  }

  open() {
    const world = this.scene.scene.get("World");
    if (!world || !world.map || world.dying) return;
    const s = this.scene, map = world.map, S = DBG.data.settings.tileSize;
    DBG.Sfx.play("click");
    s.scene.pause("World");

    // Fit the map on screen at a whole-number scale (keeps pixels crisp)
    const W = s.scale.width, H = s.scale.height;
    const scale = Math.max(1, Math.floor(Math.min((W - 80) / map.width, (H - 140) / map.height)));
    const mw = map.width * scale, mh = map.height * scale;
    const x0 = Math.round((W - mw) / 2), y0 = Math.round((H - mh) / 2) + 14;

    const root = s.add.container(0, 0).setDepth(880);
    root.add(s.add.rectangle(0, 0, W, H, 0x000000, 0.7).setOrigin(0));
    root.add(DBG.UI.panel(s, x0 - 16, y0 - 52, mw + 32, mh + 68));
    root.add(DBG.UI.text(s, W / 2, y0 - 42, DBG.data.jokes.worldMapTitle || "World Map", 22).setOrigin(0.5, 0));
    root.add(s.add.image(x0, y0, this.makeTexture(map)).setOrigin(0).setScale(scale));

    // Area names (one per area of the open world)
    if (map.origins) {
      Object.entries(map.origins).forEach(([id, o]) => {
        const name = DBG.data.maps[id].name;
        const cx = x0 + (o.x + map.cellWidth / 2) * scale, cy = y0 + (o.y + 3) * scale;
        root.add(DBG.UI.outlinedText(s, cx, cy, name, 13).setOrigin(0.5, 0));
      });
    }

    // Lit waystones
    (world.waystones || []).forEach((w) => {
      if (!DBG.state.waystones[w.regionId]) return;
      root.add(s.add.rectangle(x0 + (w.x / S) * scale, y0 + (w.y / S) * scale, 6, 6, 0x7cf0ff).setAngle(45).setStrokeStyle(1, 0x14101e));
    });

    // You are here
    const px = x0 + (world.player.x / S) * scale, py = y0 + (world.player.y / S) * scale;
    const dot = s.add.circle(px, py, 5, 0xff3040).setStrokeStyle(2, 0xffffff);
    root.add(dot);
    root.add(DBG.UI.outlinedText(s, px, py + 10, DBG.data.jokes.worldMapYou || "you", 12).setOrigin(0.5, 0));
    s.tweens.add({ targets: dot, alpha: 0.2, duration: 400, yoyo: true, repeat: -1 });
    this.root = root;
  }

  close() {
    if (!this.root) return;
    this.root.destroy();
    this.root = null;
    this.scene.scene.resume("World");
  }
};
