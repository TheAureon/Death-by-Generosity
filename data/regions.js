// ===========================================================================
// WORLD REGIONS — every area, roughly from easiest to hardest.
// "map" is the file name in data/maps/. The fast-travel menu lists
// waystones in this order. The world is fully open: tougher places just
// show their "warning" the first time you walk in.
// (Where each area sits on the world map is set in data/world.js.)
// ===========================================================================
DBG.data.regions = [
  { "id": "village", "name": "Starter Village", "map": "village", "notes": "Where it all begins. Has the forge." },
  { "id": "plains", "name": "The Plains", "map": "plains", "notes": "Generic monsters. Crossroads of the world." },
  { "id": "lake", "name": "The Lake", "map": "lake", "notes": "Sea monsters. Old Finn fishes here." },
  { "id": "forest", "name": "The Forest", "map": "forest", "notes": "Generic monsters. Moss the Hermit." },
  { "id": "city", "name": "Central City", "map": "city", "notes": "Medieval. True human warriors.",
    "warning": "CITY GATE GUARD: Welcome to Central City! Real warriors live here. They might even last a few seconds." },
  { "id": "guardtown", "name": "Guard Town", "map": "guardtown", "notes": "Guards everywhere.",
    "warning": "Guard Town: guards with real training. Still not enough training." },
  { "id": "fortress", "name": "Knight Fortress", "map": "fortress", "notes": "Knights and a moat.",
    "warning": "Knight Fortress: proper knights. Heavy armour. Deep moat." },
  { "id": "lava", "name": "Lava Fields", "map": "lava", "notes": "Lava monsters.",
    "warning": "A SCORCHED SIGN: Lava Fields. Bring a fire extinguisher. For THEM." },
  { "id": "dragon", "name": "Dragon Mountain", "map": "dragon", "notes": "Grumbold the Ancient Dragon.",
    "warning": "A DRAGON-SHAPED SIGN: Dragon Mountain. Home of Grumbold. Grumbold is very busy. And very big." },
  { "id": "ancient", "name": "The Ancient Realm", "map": "ancient", "notes": "God-tier. Bartholomew, an Old God.",
    "warning": "A GLOWING SIGN: The Ancient Realm. Gods live here. Real ones. Mind the Void." },
  // Wild land between the main areas (no waystones)
  { "id": "hills", "name": "Windy Hills", "map": "hills", "notes": "Slimes and geese." },
  { "id": "oldwoods", "name": "The Old Woods", "map": "oldwoods", "notes": "Boars and mushroom folk." },
  { "id": "marsh", "name": "Reedy Marsh", "map": "marsh", "notes": "Crabs, geese, puddles." },
  { "id": "meadow", "name": "Quiet Meadow", "map": "meadow", "notes": "Suspiciously peaceful." },
  { "id": "kingsroad", "name": "King's Road", "map": "kingsroad", "notes": "Wolves." },
  { "id": "edge", "name": "The Edge of Everything", "map": "edge", "notes": "The world just stops." }
];
