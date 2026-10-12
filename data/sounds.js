// ===========================================================================
// SOUND EFFECTS — every sound is made by the computer from simple "notes".
// No sound files needed. Each sound is a list of notes played together:
//
//   "wave"  : the tone's flavour: sine (soft), triangle (flute-y),
//             square (retro beep), sawtooth (buzzy)
//   "noise" : true = static/hiss instead of a tone (splashes, whooshes)
//   "freq"  : starting pitch (higher number = higher sound)
//   "to"    : pitch it slides to (optional)
//   "dur"   : how long, in seconds
//   "delay" : wait this long before playing (seconds, optional)
//   "vol"   : loudness from 0 to 1 (optional)
//   "filter": for noise — lower number = duller, muffled sound
//
// Later you can swap any of these for real sound files.
// ===========================================================================
DBG.data.sounds = {
  "hit":      [{ "wave": "square", "freq": 220, "to": 110, "dur": 0.08, "vol": 0.25 }],
  "blocked":  [{ "wave": "triangle", "freq": 1100, "to": 1500, "dur": 0.05, "vol": 0.2 }],
  "thorns":   [{ "wave": "sawtooth", "freq": 700, "to": 80, "dur": 0.2, "vol": 0.25 }],
  "gift":     [{ "wave": "triangle", "freq": 660, "dur": 0.08 }, { "wave": "triangle", "freq": 880, "dur": 0.08, "delay": 0.08 }, { "wave": "triangle", "freq": 1320, "dur": 0.14, "delay": 0.16 }],
  "rankup":   [{ "wave": "square", "freq": 523, "dur": 0.1, "vol": 0.2 }, { "wave": "square", "freq": 659, "dur": 0.1, "delay": 0.1, "vol": 0.2 }, { "wave": "square", "freq": 784, "dur": 0.1, "delay": 0.2, "vol": 0.2 }, { "wave": "square", "freq": 1047, "dur": 0.3, "delay": 0.3, "vol": 0.2 }],
  "splash":   [{ "noise": true, "dur": 0.4, "vol": 0.3, "filter": 1400 }],
  "burn":     [{ "noise": true, "dur": 0.6, "vol": 0.25, "filter": 700 }, { "wave": "sawtooth", "freq": 220, "to": 60, "dur": 0.5, "vol": 0.15 }],
  "fall":     [{ "wave": "sine", "freq": 1400, "to": 120, "dur": 1.0, "vol": 0.25 }],
  "poof":     [{ "noise": true, "dur": 0.15, "vol": 0.25, "filter": 3000 }],
  "pancake":  [{ "wave": "square", "freq": 120, "to": 40, "dur": 0.2, "vol": 0.3 }, { "noise": true, "dur": 0.1, "vol": 0.2, "filter": 800 }],
  "pickup":   [{ "wave": "square", "freq": 988, "dur": 0.05, "vol": 0.15 }, { "wave": "square", "freq": 1319, "dur": 0.09, "delay": 0.05, "vol": 0.15 }],
  "swoosh":   [{ "noise": true, "dur": 0.12, "vol": 0.15, "filter": 5000 }],
  "bonk":     [{ "wave": "square", "freq": 160, "to": 80, "dur": 0.14, "vol": 0.3 }],
  "honk":     [{ "wave": "sawtooth", "freq": 330, "to": 300, "dur": 0.16, "vol": 0.2 }, { "wave": "sawtooth", "freq": 330, "to": 280, "dur": 0.2, "delay": 0.2, "vol": 0.2 }],
  "roar":     [{ "wave": "sawtooth", "freq": 110, "to": 55, "dur": 0.9, "vol": 0.3 }, { "noise": true, "dur": 0.8, "vol": 0.15, "filter": 500 }],
  "click":    [{ "wave": "square", "freq": 1200, "dur": 0.02, "vol": 0.1 }],
  "error":    [{ "wave": "square", "freq": 220, "dur": 0.14, "vol": 0.2 }, { "wave": "square", "freq": 155, "dur": 0.22, "delay": 0.15, "vol": 0.2 }],
  "glitch":   [{ "wave": "square", "freq": 900, "to": 200, "dur": 0.06, "vol": 0.15 }, { "wave": "square", "freq": 1500, "to": 300, "dur": 0.05, "delay": 0.1, "vol": 0.15 }, { "noise": true, "dur": 0.25, "delay": 0.2, "vol": 0.15, "filter": 2500 }],
  "chime":    [{ "wave": "sine", "freq": 1047, "dur": 0.4, "vol": 0.2 }, { "wave": "sine", "freq": 1568, "dur": 0.6, "delay": 0.12, "vol": 0.15 }],
  "clang":    [{ "wave": "square", "freq": 1800, "to": 1650, "dur": 0.25, "vol": 0.15 }, { "noise": true, "dur": 0.06, "vol": 0.2, "filter": 6000 }],
  "selfpunch":[{ "wave": "square", "freq": 200, "to": 60, "dur": 0.2, "vol": 0.35 }, { "noise": true, "dur": 0.1, "vol": 0.2, "filter": 1500 }],
  "herodeath":[{ "wave": "sine", "freq": 440, "to": 55, "dur": 1.8, "vol": 0.35 }],
  "trombone": [
    { "wave": "sawtooth", "freq": 293.7, "to": 290, "dur": 0.45, "vol": 0.2 },
    { "wave": "sawtooth", "freq": 277.2, "to": 274, "dur": 0.45, "delay": 0.5, "vol": 0.2 },
    { "wave": "sawtooth", "freq": 261.6, "to": 258, "dur": 0.45, "delay": 1.0, "vol": 0.2 },
    { "wave": "sawtooth", "freq": 246.9, "to": 233, "dur": 1.4, "delay": 1.5, "vol": 0.2 }
  ],
  "fanfare":  [{ "wave": "square", "freq": 523, "dur": 0.12, "vol": 0.15 }, { "wave": "square", "freq": 523, "dur": 0.12, "delay": 0.14, "vol": 0.15 }, { "wave": "square", "freq": 784, "dur": 0.5, "delay": 0.28, "vol": 0.15 }]
};
