// ===========================================================================
// MAP: Test Meadow — a small sampler of every tile type (Milestone 1).
//
// Each character is one tile. See data/tiles.js for what they mean.
// Rows can be any length; short rows are filled with grass automatically.
// Exactly one "P" marks where the player starts.
// Numbers place NPCs (see "legend" below and data/npcs.js).
// ===========================================================================
DBG.addMap("test_meadow", {
  "name": "Test Meadow",

  // Characters that only mean something on THIS map: who stands where.
  "legend": {
    "1": { "npc": "bob" },
    "2": { "npc": "gertrude" },
    "3": { "npc": "kevin" }
  },
  "grid": `
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
TT...,......T.......====.........,....T...TT
T.....T..........,..====...,.......B......TT
T..B.......ss.......====.........T....,...rT
T.......sss~~sss....====..................TT
T..,...s~~~~~~~~s...====....######.####...TT
T......s~~~~~~~~~s..====....#.........#...TT
T....ss~~~~~~~~~~~s.====....#..,......#..T.T
T....s~~~~~~~~~~~~~______...#.........#...TT
T....s~~~~~~~~~~~~~______...#....r....#...TT
T.....s~~~~~~~~~~~s.====....###.#######...TT
T..T...s~~~~~~~~ss..====..................TT
T.......ss~~~~ss....====....2..,.........B.T
T..........ss.......====..........T.......TT
T....,..............========================
T...........,.......========================
T.......T......1....====...........,......TT
T..r................====D.ffffffffffff....TT
T...................=P==..f^^^^^^^^^^f....TT
T....%%%%%%%%%......====..f^^^^^^^^^^f..,.TT
T....%%%%%%%%%......====..f^^^^rr^^^^f....TT
T........3..........====..f^^^^^^^^^^f....TT
T..,.......o........====..ffffff.fffff....TT
T.........ooo.......====..................TT
T..........o....,...====.....,.....T......TT
T..T................====.................TTT
T.......B...........====....r.......,...TTTT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
`
});
