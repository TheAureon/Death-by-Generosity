# Design notes

## World regions (from the owner)
- **Starter Village**: where you start. Has a forge.
- **Central City**: medieval, full of true human warriors.
- **Lake**: sea monsters.
- **Plains and Forest**: generic monsters.
- **Lava area**: lava monsters.

Kept in `data/regions.js`. Maps get built in later milestones.

## Look
Stardew Valley–style view: top-down with a slight tilt (3/4 view), 16×16 tiles
shown at a whole-number zoom (about 3×), soft warm colours, dark outlines on
characters and objects, and y-sorting so characters walk behind trees.

## Milestones
1. Foundation (done)
2. The cursed hero: stats, regen, thorns, HUD, broken Esc, Save & Exit gag (done)
3. Gifting system
4. Dumb NPC AI, combat, hazards, "gifted to death" tally
5. Starting village (first fun test)
6. Loot loop
7. World memory and saving
8. Regions, fast travel, gating
9. Ending and polish

## Notes
- The hero can't die yet: HP stops at 1 ("Death politely declined"). Dying
  for real is the ending (Milestone 9).
- Thorns reflect the attacker's *raw* hit x thorns, so even weak attackers
  get flattened. Thorns damage never bounces again.
