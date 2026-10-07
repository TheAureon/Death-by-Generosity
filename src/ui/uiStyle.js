// ---------------------------------------------------------------------------
// Shared look for all UI: Stardew-style wooden panels and chunky text.
// Change colours here to restyle every menu at once.
// ---------------------------------------------------------------------------
(function () {
  const C = {
    outline: 0x3b2414, frame: 0xb5713a, frameLight: 0xe8a85c, paper: 0xf6e2b3,
    text: "#3b2414", textLight: "#fff6d8", textMuted: "#8a5a2b",
    hp: 0xe0453a, hpDark: 0x8e1f2a, hpBack: 0x4a2a22, regen: "#2f9e44", danger: "#c8323c",
  };

  const FONT = '"Courier New", monospace';

  /** Dark-on-paper text (for inside panels). */
  function text(scene, x, y, str, size = 16, color = C.text, extra = {}) {
    return scene.add.text(x, y, str, { fontFamily: FONT, fontStyle: "bold", fontSize: size + "px", color, ...extra });
  }

  /** Light text with a dark outline (for floating over the world). */
  function outlinedText(scene, x, y, str, size = 16) {
    return text(scene, x, y, str, size, C.textLight, { stroke: "#2b1d24", strokeThickness: Math.max(3, size / 4) });
  }

  /** Draws a wooden panel of size w x h into a Graphics object (top-left 0,0). */
  function drawPanel(g, w, h) {
    g.clear();
    g.fillStyle(C.outline, 1).fillRoundedRect(0, 0, w, h, 8);
    g.fillStyle(C.frame, 1).fillRoundedRect(3, 3, w - 6, h - 6, 6);
    g.fillStyle(C.frameLight, 1).fillRoundedRect(5, 5, w - 10, h - 10, 5);
    g.fillStyle(C.paper, 1).fillRoundedRect(8, 8, w - 16, h - 16, 4);
    return g;
  }

  /** A container with a wooden panel background. */
  function panel(scene, x, y, w, h) {
    const c = scene.add.container(x, y);
    c.add(drawPanel(scene.add.graphics(), w, h));
    c.setSize(w, h);
    return c;
  }

  /** A clickable wooden button. onClick receives the button container. */
  function button(scene, x, y, label, onClick, w = 150, h = 44) {
    const c = scene.add.container(x, y);
    const g = drawPanel(scene.add.graphics(), w, h);
    g.setPosition(-w / 2, -h / 2);
    const t = text(scene, 0, 0, label, 16).setOrigin(0.5);
    c.add([g, t]);
    c.setSize(w, h);
    c.label = t;
    c.setInteractive({ useHandCursor: true });
    c.on("pointerover", () => t.setColor(C.danger));
    c.on("pointerout", () => t.setColor(C.text));
    c.on("pointerdown", () => onClick(c));
    return c;
  }

  DBG.UI.colors = C;
  DBG.UI.text = text;
  DBG.UI.outlinedText = outlinedText;
  DBG.UI.drawPanel = drawPanel;
  DBG.UI.panel = panel;
  DBG.UI.button = button;
})();
