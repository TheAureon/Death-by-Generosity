// ---------------------------------------------------------------------------
// Small toolkit for drawing pixel art in code.
//
// PixelCanvas is a grid of colours we "paint" pixel by pixel, then copy into
// a Phaser texture. Everything in src/art/ uses it, so real image files can
// later replace any texture key without touching game code.
// ---------------------------------------------------------------------------
(function () {
  /** Deterministic random numbers, so generated art looks the same each load. */
  function seededRandom(seed) {
    let s = seed >>> 0 || 1;
    return function () {
      s ^= s << 13; s >>>= 0;
      s ^= s >> 17;
      s ^= s << 5; s >>>= 0;
      return s / 4294967296;
    };
  }

  class PixelCanvas {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.pixels = new Array(width * height).fill(null); // null = transparent
    }

    px(x, y, color) {
      x = Math.round(x); y = Math.round(y);
      if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
      this.pixels[y * this.width + x] = color;
    }

    get(x, y) {
      if (x < 0 || y < 0 || x >= this.width || y >= this.height) return null;
      return this.pixels[y * this.width + x];
    }

    rect(x, y, w, h, color) {
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.px(x + i, y + j, color);
    }

    /** Filled circle (or ellipse when ry is given). */
    circle(cx, cy, r, color, ry = r) {
      for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
        for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
          const dx = (x - cx) / r, dy = (y - cy) / ry;
          if (dx * dx + dy * dy <= 1) this.px(x, y, color);
        }
      }
    }

    /** Sprinkle `count` random pixels of `color` inside a rectangle. */
    speckle(rand, count, color, x = 0, y = 0, w = this.width, h = this.height) {
      for (let i = 0; i < count; i++) {
        this.px(x + Math.floor(rand() * w), y + Math.floor(rand() * h), color);
      }
    }

    /** Draw a 1px outline around every non-transparent shape (Stardew look). */
    outline(color) {
      const add = [];
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          if (this.get(x, y)) continue;
          if (this.get(x - 1, y) || this.get(x + 1, y) || this.get(x, y - 1) || this.get(x, y + 1)) {
            add.push([x, y]);
          }
        }
      }
      add.forEach(([x, y]) => this.px(x, y, color));
    }

    /** Paste another PixelCanvas on top (transparent pixels are skipped). */
    stamp(other, ox = 0, oy = 0, flipX = false) {
      for (let y = 0; y < other.height; y++) {
        for (let x = 0; x < other.width; x++) {
          const c = other.get(flipX ? other.width - 1 - x : x, y);
          if (c) this.px(ox + x, oy + y, c);
        }
      }
    }

    /** Copy pixels onto a real 2D canvas context at (ox, oy). */
    drawTo(ctx, ox = 0, oy = 0) {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const c = this.pixels[y * this.width + x];
          if (!c) continue;
          ctx.fillStyle = c;
          ctx.fillRect(ox + x, oy + y, 1, 1);
        }
      }
    }
  }

  /** Turn one PixelCanvas into a Phaser texture called `key`. */
  function addTexture(scene, key, pc) {
    if (scene.textures.exists(key)) scene.textures.remove(key);
    const tex = scene.textures.createCanvas(key, pc.width, pc.height);
    pc.drawTo(tex.getContext());
    tex.refresh();
    return tex;
  }

  /**
   * Turn a list of equally sized PixelCanvas frames into one texture with
   * numbered frames (0, 1, 2...), ready for animations.
   */
  function addSpriteSheet(scene, key, frames) {
    const w = frames[0].width, h = frames[0].height;
    if (scene.textures.exists(key)) scene.textures.remove(key);
    const tex = scene.textures.createCanvas(key, w * frames.length, h);
    const ctx = tex.getContext();
    frames.forEach((pc, i) => {
      pc.drawTo(ctx, i * w, 0);
      tex.add(i, 0, i * w, 0, w, h);
    });
    tex.refresh();
    return tex;
  }

  DBG.Art.PixelCanvas = PixelCanvas;
  DBG.Art.seededRandom = seededRandom;
  DBG.Art.addTexture = addTexture;
  DBG.Art.addSpriteSheet = addSpriteSheet;
})();
