// ---------------------------------------------------------------------------
// Sound effects, made on the fly with the browser's Web Audio (no files).
// Sounds are described in data/sounds.js.
//
//   DBG.Sfx.play("hit")   — play a sound by name
//   DBG.Sfx.toggleMute()  — M key; remembered between visits
//
// Browsers only allow sound after the player presses a key or clicks, so the
// audio engine starts on the first key press / click.
// ---------------------------------------------------------------------------
(function () {
  const MUTE_KEY = "death-by-generosity-muted";
  let ctx = null, master = null, noiseBuffer = null;
  let muted = false;
  try { muted = localStorage.getItem(MUTE_KEY) === "1"; } catch (e) { /* private mode */ }

  function start() {
    if (ctx) { if (ctx.state === "suspended") ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : DBG.data.settings.soundVolume ?? 0.5;
    master.connect(ctx.destination);
    // One second of random static, reused for every noise sound
    noiseBuffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuffer.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  ["keydown", "pointerdown"].forEach((ev) => window.addEventListener(ev, start));

  function note(n) {
    const t0 = ctx.currentTime + (n.delay || 0);
    const dur = n.dur || 0.1;
    const gain = ctx.createGain();
    // Quick fade in/out so notes don't click
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(n.vol ?? 0.25, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    gain.connect(master);
    let src;
    if (n.noise) {
      src = ctx.createBufferSource();
      src.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = n.filter || 2000;
      src.connect(filter);
      filter.connect(gain);
    } else {
      src = ctx.createOscillator();
      src.type = n.wave || "square";
      src.frequency.setValueAtTime(n.freq || 440, t0);
      if (n.to) src.frequency.exponentialRampToValueAtTime(Math.max(1, n.to), t0 + dur);
      src.connect(gain);
    }
    src.start(t0);
    src.stop(t0 + dur + 0.05);
  }

  DBG.Sfx = {
    play(name) {
      if (!ctx || muted) return;
      const notes = DBG.data.sounds[name];
      if (!notes) return console.warn(`No sound called "${name}"`);
      try { notes.forEach(note); } catch (e) { /* never let a sound crash the game */ }
    },
    toggleMute() {
      muted = !muted;
      try { localStorage.setItem(MUTE_KEY, muted ? "1" : "0"); } catch (e) { /* ignore */ }
      if (master) master.gain.value = muted ? 0 : DBG.data.settings.soundVolume ?? 0.5;
      return muted;
    },
    get muted() { return muted; },
  };
})();
