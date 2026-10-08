// ---------------------------------------------------------------------------
// Speech bubble that floats above someone in the world and follows them.
//   DBG.UI.SpeechBubble.say(scene, who, "Hello!", milliseconds)
// One bubble per speaker; a new line replaces the old one.
// ---------------------------------------------------------------------------
DBG.UI.SpeechBubble = {
  say(scene, who, text, ms = 2500) {
    if (who.bubble) who.bubble.destroy();
    const zoom = scene.cameras.main.zoom;
    const label = scene.add.text(0, 0, text, {
      fontFamily: '"Courier New", monospace', fontStyle: "bold", fontSize: "7px",
      color: "#3b2414", align: "center", wordWrap: { width: 110 },
    }).setOrigin(0.5, 1).setResolution(zoom * 2);
    const w = label.width + 8, h = label.height + 6;
    const g = scene.add.graphics();
    g.fillStyle(0x3b2414, 1).fillRoundedRect(-w / 2 - 1, -h - 1, w + 2, h + 2, 3);
    g.fillStyle(0xfff6d8, 1).fillRoundedRect(-w / 2, -h, w, h, 3);
    g.fillStyle(0x3b2414, 1).fillTriangle(-3, 0, 3, 0, 0, 4);
    g.fillStyle(0xfff6d8, 1).fillTriangle(-2, -1, 2, -1, 0, 3);
    label.setY(-3);

    const bubble = scene.add.container(who.x, who.y, [g, label]).setDepth(99999);
    who.bubble = bubble;
    const follow = () => bubble.setPosition(Math.round(who.x), Math.round(who.y - 30));
    follow();
    scene.events.on("postupdate", follow);
    bubble.once("destroy", () => {
      scene.events.off("postupdate", follow);
      if (who.bubble === bubble) who.bubble = null;
    });
    scene.time.delayedCall(ms, () => bubble.active && bubble.destroy());
    return bubble;
  },
};
