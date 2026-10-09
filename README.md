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
- **C**: character sheet
- **K**: punch yourself (it doesn't work)
- **Esc**: pause menu (it doesn't work either)
- **Save & Exit** button, top-right (you can guess)

## Saving

The game saves itself (when you change maps, give gifts, people die, or you
craft), and **Save & Exit** really saves now (it still won't exit). You can
also save, load, or start a new game from the **Journal** (press **J**).
Saves live in your web browser, so reopening `index.html` in the same browser
continues where you left off. To start over: Journal → New game.

## Editing the game (no coding needed)

All content lives in the `data/` folder. Open these files in any text editor
(on a Mac, TextEdit works, but use Format → Make Plain Text first).

| File | What it controls |
|---|---|
| `data/settings.js` | Walking speed, zoom, which map loads first |
| `data/tiles.js` | What each map character means (`#` wall, `~` water, `^` lava...) |
| `data/maps/*.js` | The handmade maps, drawn as grids of characters |
| `data/regions.js` | The planned world regions |
| `data/hero.js` | The hero's name, HP, regen, defense, thorns, armour, silly stats |
| `data/creatures.js` | Creatures like the training dummy (HP, punch strength...) |
| `data/jokes.js` | All the funny text: Esc messages, Save & Exit failures, etc. |
| `data/items.js` | Every item: name, slot, stats, colours/shape, description |
| `data/npcs.js` | People: name, colours, stats, lines, and their silly fighting "quirks" |
| `data/creatures.js` | Monsters: stats, loot drops, how they move, respawn time |
| `data/recipes.js` | What Brunhilde can forge from monster bits |

**Maps:** the game starts in the village (`data/maps/village.js`); the road
south leads to the Plains (`data/maps/plains.js`). Exits are tiles with
`"exit"` (which map) and `"arrive"` (which arrival spot) in a map's legend.
To play the old test map, change `"startMap"` in `data/settings.js` to
`"test_meadow"`.

**Placing NPCs on a map:** in the map file, add a `"legend"` entry like
`"1": { "npc": "bob" }`, then put a `1` in the grid where they should stand.

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
src/systems/     game rules (combat + thorns, inventory, gifting, hazards,
                 world memory, saving)
src/ai/          fightBrain: how NPCs fight (badly)
src/entities/    player, training dummy, NPCs (drawn in gear layers),
                 monsters, chickens, dropped items
src/ui/          HUD pieces: health bar, tally, messages, speech bubbles,
                 talk menu, bag/gift menu, forge (crafting) menu, journal, character sheet,
                 Esc + Save & Exit gags
src/scenes/      Boot (makes art) -> World (map + player) + UI (text on top)
vendor/          Phaser engine file
docs/            design notes
```
