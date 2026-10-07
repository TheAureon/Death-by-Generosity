// ---------------------------------------------------------------------------
// Starts the game. Settings for the canvas/engine live here; gameplay
// numbers live in data/settings.js.
// ---------------------------------------------------------------------------
window.addEventListener("load", () => {
  DBG.game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: "game",
    backgroundColor: "#1d1620",
    pixelArt: true, // no blurry scaling
    scale: { mode: Phaser.Scale.RESIZE, width: window.innerWidth, height: window.innerHeight },
    physics: { default: "arcade", arcade: { debug: false } },
    scene: [DBG.Scenes.BootScene, DBG.Scenes.WorldScene, DBG.Scenes.UIScene],
  });
});
