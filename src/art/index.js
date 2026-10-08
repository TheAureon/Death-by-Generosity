// ---------------------------------------------------------------------------
// Art entry point: makes every generated texture and animation in one go.
// To use real image files later, load them in BootScene instead and skip
// the matching generator — every texture key stays the same.
// ---------------------------------------------------------------------------
DBG.Art.createAll = function (scene) {
  DBG.Art.createTileArt(scene);
  DBG.Art.createCharacterArt(scene);
  DBG.Art.createPeopleArt(scene);

  // Looping animations for animated tiles (water ripples, lava bubbles)
  Object.entries(DBG.Art.animatedTiles).forEach(([key, fps]) => {
    const animKey = key + "-anim";
    if (scene.anims.exists(animKey)) return;
    scene.anims.create({
      key: animKey,
      frames: scene.anims.generateFrameNumbers(key, { start: 0, end: 2 }),
      frameRate: fps,
      repeat: -1,
    });
  });
};
