# Design notes

## World regions (from the owner)
- **Starter Village**: where you start. Has a forge.
- **Central City**: medieval, full of true human warriors.
- **Lake**: sea monsters.
- **Plains and Forest**: generic monsters.
- **Lava area**: lava monsters.
- Plus the original list (owner said: add to them): **Guard Town**, **Knight
  Fortress**, **Dragon Mountain**, **Ancient / god-tier area**.

Kept in `data/regions.js`. Maps get built in later milestones.

## Look
Stardew Valley–style view: top-down with a slight tilt (3/4 view), 16×16 tiles
shown at a whole-number zoom (about 3×), soft warm colours, dark outlines on
characters and objects, and y-sorting so characters walk behind trees.

## Milestones
1. Foundation (done)
2. The cursed hero: stats, regen, thorns, HUD, broken Esc, Save & Exit gag (done)
3. Gifting system (done)
4. Dumb NPC AI, combat, hazards, "gifted to death" tally (done)
5. Starting village (first fun test)
6. Loot loop (done)
7. World memory and saving
8. Regions, fast travel, gating
9. Ending and polish

## Notes
- The hero can't die yet: HP stops at 1 ("Death politely declined"). Dying
  for real is the ending (Milestone 9).
- Thorns reflect the attacker's *raw* hit x thorns, so even weak attackers
  get flattened. Thorns damage never bounces again.
- NPCs are drawn in layers (person + one sprite per worn item) so real art
  can replace each piece separately. Gifting an item into a filled slot
  hands the old item back to the hero.
- Fighting: talk to someone (E) -> "Please fight me". They refuse if they
  have no gear. Quirks per NPC (data/npcs.js) pick their silly behaviours.
- Hazards: lava + pits always kill; water kills if gear defense >= 50,
  otherwise they crawl out soggy; cliffs drop them to the ground below.
- Dead NPCs drop their gear and a "suspiciously similar" one respawns
  (settings.npcRespawnSeconds). Milestone 7 may change this (world memory).
- Flattening someone yourself (F) counts as a wasted attempt, not a gift-death.

## Little Givington (starting village)
| Villager | Where | Signature failure |
|---|---|---|
| Farmer Bob | Farm, north-west | Chases chickens instead of fighting |
| Grandma Gertrude | West house | Shows off "her special move", hits herself |
| Kevin | South-west, by the cliff | Panics at his own buff glow, runs off the cliff |
| Brunhilde the Smith | Forge, north-east | "Heats up" her weapon by walking into the coals |
| Sir Reginald | Pond dock, east | Heroic charge... the wrong way, into the pond |
| Mayor Humphrey | Town square | Gives a speech while backing into the well |
Brunhilde, Reginald and the Mayor start with gear, so they'll fight right away.

## Loot loop
- The Plains (south of the village): Slimes, Blue Slimes, Angry Geese,
  Grumpy Boars. They attack the hero and usually die to thorns, so you can
  farm by standing still. They respawn at their spot.
- Drops: monster bits (stack in the bag) and rare gear.
- Brunhilde forges bits into gear (data/recipes.js), so there is always
  something to give away.
- Known gap until Milestone 7: leaving a map resets it (villagers lose gifts).
