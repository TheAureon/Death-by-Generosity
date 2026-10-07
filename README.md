# Death By Generosity

A comedy top-down fantasy RPG. You are absurdly overpowered, stuck in cursed
armour, and the game won't let you quit. The only way out is to die — so you
hand your best gear to NPCs and beg them to fight you. They lose. Badly.

## How to play (no install needed)

1. Download the project as a ZIP from GitHub and unzip it.
2. Open the unzipped folder and **double-click `index.html`**.
   It opens in your web browser (Chrome, Safari, Firefox or Edge).

Controls: **W A S D** or **arrow keys** to walk.

## Editing the game (no coding needed)

All content lives in the `data/` folder. Open these files in any text editor
(on a Mac, TextEdit works, but use Format → Make Plain Text first).

| File | What it controls |
|---|---|
| `data/settings.js` | Walking speed, zoom, which map loads first |
| `data/tiles.js` | What each map character means (`#` wall, `~` water, `^` lava...) |
| `data/maps/*.js` | The handmade maps, drawn as grids of characters |
| `data/regions.js` | The planned world regions |

The data files end in `.js` rather than `.json` because browsers won't let a
double-clicked page read separate data files. Inside, they're written in the
same simple format as JSON. Only change the parts between the quotes and
backticks.

**Adding a new map file:** also add one line for it in `index.html`, next to
the `test_meadow.js` line.

## For developers

- Plain JavaScript and Phaser 3, loaded as normal `<script>` tags (see
  `index.html` for the order). There's no build step, so the folder itself is
  the deployable static site.
- Optional dev server with live reload: `npm install`, then `npm run dev` (Vite).
- Phaser is copied into `vendor/` so no install is needed to play. After
  upgrading Phaser, run `npm run vendor:phaser`.
- Everything shares one global object, `DBG` (see `src/core/namespace.js`).

```
data/            editable content (settings, tile legend, maps, regions)
src/core/        global namespace
src/art/         ALL generated pixel art (swap in real art here)
src/world/       map parsing (mapLoader) and building (worldBuilder)
src/entities/    player (NPCs and monsters later)
src/scenes/      Boot (makes art) -> World (map + player) + UI (text on top)
vendor/          Phaser engine file
docs/            design notes
```
