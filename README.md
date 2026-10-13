# Death By Generosity

A comedy top-down fantasy RPG. You are absurdly overpowered, stuck in cursed
armour, and the game won't let you quit. The only way out is to die — so you
hand your best gear to NPCs and beg them to fight you. They lose. Badly.

## How to play (no install needed)

1. Download the project as a ZIP from GitHub and unzip it.
2. Open the unzipped folder and **double-click `index.html`**.
   It opens in your web browser (Chrome, Safari, Firefox or Edge).

Controls:
- **W A S D** or **arrow keys**: walk
- **E** (or Space) next to someone: talk — give a gift, or ask them to fight you
- **F**: attack directly (flattens people instantly; counts as a wasted attempt)
- **I**: look in your bag
- **J**: the Journal — the menu that actually works (save, load, new game)
- **N**: world map
- **C**: character sheet
- **K**: punch yourself (drops you to 1 HP and stops healing for 3 seconds)
- **M**: sound on/off
- **Esc**: pause menu (it doesn't work either)
- **Save & Exit** button, top-right (you can guess)

## How do I win? (spoilers)

You win by dying. Your cursed armour shrugs off any hit under 1,000 attack,
so ordinary gear won't do it. You need something monster-sized:

1. Travel to Dragon Mountain (past the Lava Fields) and let Grumbold the
   dragon attack you. Your thorns handle the rest. He always drops a
   **Dragon Tooth Sword** (1,500 attack).
2. Pick it up (walk over it).
3. Give the sword to anyone (E → gift), then ask them to fight you.
4. Press **K** to knock yourself down to 1 HP, and stand still. Hope they
   don't trip over a chicken.

Whoever finally kills you gets their own ending joke. Try them all.

## Saving

The game saves itself (when you change maps, give gifts, people die, or you
craft), and **Save & Exit** really saves now (it still won't exit). You can
also save, load, or start a new game from the **Journal** (press **J**).
Saves live in your web browser, so reopening `index.html` in the same browser
continues where you left off. To start over: Journal → New game.

## Putting it on a game website (itch.io etc.)

The ready-to-upload file is **`release/death-by-generosity-web.zip`**.

On itch.io: Create new project → Kind of project: **HTML** → upload that ZIP
→ tick **"This file will be played in the browser"** → set the size to
1280 × 800 (or tick "Fullscreen button") → Save. Other sites (Newgrounds,
GameJolt) work the same way: upload the ZIP as an HTML5 game.

If you change anything in `data/`, make a fresh ZIP with
`python3 scripts/make-release.py` (in Terminal, inside the game folder).

## Editing the game (no coding needed)

All content lives in the `data/` folder. Open these files in any text editor
(on a Mac, TextEdit works, but use Format → Make Plain Text first).

| File | What it controls |
|---|---|
| `data/settings.js` | Walking speed, zoom, which map loads first |
| `data/tiles.js` | What each map character means (`#` wall, `~` water, `^` lava...) |
| `data/maps/*.js` | The handmade areas, drawn as grids of characters (64 x 48 each) |
| `data/world.js` | How the areas fit together into one open world |
| `data/regions.js` | Every area, in fast-travel order, with the warning shown the first time you walk in |
| `data/hero.js` | The hero's name, HP, regen, defense, thorns, armour, silly stats |
| `data/creatures.js` | Creatures like the training dummy (HP, punch strength...) |
| `data/jokes.js` | All the funny text: Esc messages, Save & Exit failures, ending jokes per killer |
| `data/sounds.js` | Every sound effect, written as notes (pitch, length, wave shape) |
| `data/items.js` | Every item: name, slot, stats, colours/shape, description |
| `data/npcs.js` | Village people (+ Rudy): name, colours, stats, lines, fighting "quirks" |
| `data/npcs_world.js` | People in the other regions (same format) |
| `data/creatures.js` | Monsters: stats, loot drops, how they move, respawn time |
| `data/recipes.js` | What Brunhilde can forge from monster bits |

**The world:** it's one big open world. Every area (Little Givington, the
Plains, the Lake, the Forest, Central City, Guard Town, the Knight Fortress,
the Lava Fields, Dragon Mountain, the Ancient Realm, plus some wild land in
between) is a 64 x 48 grid in `data/maps/`, and `data/world.js` lays them
out side by side like tiles on a board. There are no gates and no loading:
walk off the edge of one area and you're in the next. Roads (`=`) link the
areas up, but you can walk anywhere that isn't a wall, water, lava or the
Void. Tougher areas just show a warning the first time you walk in.

**Fast travel:** press **E** at a waystone (the glowing carved stones) to
light it and jump between any waystones you've lit. Press **N** for the
world map.
To play the old test map on its own, change `"startMap"` in
`data/settings.js` to `"test_meadow"`.

**Placing NPCs on a map:** in the map file, add a `"legend"` entry like
`"1": { "npc": "bob" }`, then put a `1` in the grid where they should stand.

The data files end in `.js` rather than `.json` because browsers won't let a
double-clicked page read separate data files. Inside, they're written in the
same simple format as JSON. Only change the parts between the quotes and
backticks.

**Adding a new area:** make a new 64 x 48 map file in `data/maps/`, add one
line for it in `index.html` (next to the other map lines), and put its name
into the `"layout"` in `data/world.js`.

## For developers

- Plain JavaScript and Phaser 3, loaded as normal `<script>` tags (see
  `index.html` for the order). There's no build step, so the folder itself is
  the deployable static site.
- Optional dev server with live reload: `npm install`, then `npm run dev` (Vite).
- `npm run build` (or `python3 scripts/make-release.py`) packs the upload ZIP
  into `release/`.
- Phaser is copied into `vendor/` so no install is needed to play. After
  upgrading Phaser, run `npm run vendor:phaser`.
- Everything shares one global object, `DBG` (see `src/core/namespace.js`).

```
data/            editable content (settings, tile legend, maps, regions)
src/core/        global namespace
src/art/         ALL generated pixel art (swap in real art here)
src/world/       map parsing + stitching the open world (mapLoader),
                 drawing it in chunks (worldBuilder)
src/systems/     game rules (combat + thorns, inventory, gifting, hazards,
                 world memory, saving)
src/audio/       sound effects, synthesized in the browser (no sound files)
src/ai/          fightBrain: how NPCs fight (badly)
src/entities/    player, training dummy, NPCs (drawn in gear layers),
                 monsters, chickens, dropped items
src/ui/          HUD pieces: health bar, tally, messages, speech bubbles, travel,
                 talk menu, bag/gift menu, forge (crafting) menu, journal, world map,
                 character sheet,
                 Esc + Save & Exit gags
src/scenes/      Boot (makes art) -> World (map + player) + UI (text on top),
                 Ending (you finally died)
vendor/          Phaser engine file
docs/            design notes
```
