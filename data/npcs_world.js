// ===========================================================================
// NPCs of the wider world (Milestone 8). Same format as data/npcs.js —
// see the notes at the top of that file. Grouped by region.
//
// Extra field:
//   "noFight": a line they say instead of ever agreeing to fight
// ===========================================================================
Object.assign(DBG.data.npcs, {

  // ---------------- THE LAKE ----------------
  "finn": {
    "name": "Old Finn",
    "look": { "skin": "#d89b72", "hair": "#d8d8e0", "hairStyle": "long", "shirt": "#3f6fb4", "pants": "#4a5a7a", "shoes": "#3b2414" },
    "stats": { "maxHp": 45, "attack": 3, "defense": 1, "speed": 30 },
    "wander": 2,
    "greeting": "Caught a sea monster once. Threw it back. It threw ME back.",
    "giftLines": ["A {item}! Good for fish. Or... whatever you fight.", "Fifty years fishing and nobody gave me a {item}.", "I'll name this {item} after my boat."],
    "swapLine": "Have my old {item}. Smells of fish. Everything does.",
    "fightStart": "Alright, youngster. Let's see what the lake taught me.",
    "refuseFight": "Fight with my fishing rod? It's for FISH.",
    "quirks": { "seekHazard": 4, "trip": 3, "attack": 1 },
    "seekHazard": "water",
    "quirkLines": { "seekHazard": ["Hold on, gotta check my nets!", "Was that a bite?!", "My lucky spot! One second!"] }
  },

  // ---------------- THE FOREST ----------------
  "moss": {
    "name": "Moss the Hermit",
    "look": { "skin": "#c98a5e", "hair": "#4f9130", "hairStyle": "long", "shirt": "#5a6a3a", "pants": "#3b4a2a", "shoes": "#3b2414" },
    "stats": { "maxHp": 50, "attack": 4, "defense": 2, "speed": 40 },
    "wander": 3,
    "greeting": "The trees whisper about you. Mostly 'why are they so shiny'.",
    "giftLines": ["The forest spirits approve of this {item}.", "A {item}... I shall commune with it.", "I haven't owned a {item} since the Great Mushroom War."],
    "swapLine": "Return this {item} to the world. Through you.",
    "fightStart": "The forest gives me strength! ...Hopefully enough.",
    "refuseFight": "I fight with nature. Nature is currently unarmed.",
    "quirks": { "fleeBuff": 5, "chicken": 1, "attack": 1 },
    "quirkLines": { "fleeBuff": ["THE SPIRITS HAVE FOUND ME!", "WHY ARE THE SPARKLES ANGRY?!", "BEGONE, GLOWING ONES!"] }
  },

  // ---------------- CENTRAL CITY ----------------
  "valeria": {
    "name": "Captain Valeria",
    "look": { "skin": "#e8b48a", "hair": "#b5503a", "hairStyle": "long", "shirt": "#3f6fb4", "pants": "#2b2b33", "shoes": "#2b1d24" },
    "stats": { "maxHp": 400, "attack": 12, "defense": 10, "speed": 55 },
    "startingGear": ["knight_shield", "pointy_spear"],
    "wander": 2,
    "greeting": "A true warrior never refuses a duel. Or a free sword.",
    "giftLines": ["A fine {item}. I accept it with honour.", "This {item} will serve the realm.", "Finally, equipment worthy of a captain."],
    "swapLine": "Take my old {item}. May it serve you better than it served me.",
    "fightStart": "On my honour, I will give you the death you seek!",
    "refuseFight": "I never fight unarmed. It's in the handbook.",
    "quirks": { "attack": 6, "wrongWay": 1 },
    "ranks": [
      { "power": 450, "title": "Valeria, Champion of the Realm", "idle": "brag",
        "greeting": "Champion of the Realm, at your service. Mostly at your SLAYING.",
        "promotion": "With this, I could slay a god. Or you. Probably you.",
        "brags": ["I've never lost a duel. Except to thorns. Twice.", "The king asked ME for an autograph."] }
    ]
  },
  "gus": {
    "name": "Merchant Gus",
    "look": { "skin": "#f3c39a", "hair": "#2b1d24", "hairStyle": "bald", "shirt": "#8a4bb4", "pants": "#5a3a22", "shoes": "#2b1d24" },
    "stats": { "maxHp": 60, "attack": 2, "defense": 0, "speed": 30 },
    "wander": 1,
    "greeting": "Welcome, welcome! Everything's for sale. Except my dignity. That's sold out.",
    "giftLines": ["A FREE {item}? This is the worst deal you've ever made. I love it.", "I'll sell this {item} for triple. After I fight you.", "No receipt? No problem!"],
    "swapLine": "Have my old {item}. Store credit only.",
    "fightStart": "A fight? Let's negotiate the terms first...",
    "refuseFight": "Fight without merchandise? Bad for business.",
    "quirks": { "backpedal": 5, "attack": 1 },
    "quirkLines": { "backpedal": ["Now, now, let's talk prices!", "Ten percent off your death?", "Twenty percent? Final offer!", "...why is it so wet back here?"] },
    "ranks": [
      { "power": 60, "title": "Gus, Merchant Prince", "idle": "brag",
        "greeting": "Prices have gone up. Because I can. Because I'm ARMED.",
        "promotion": "I'm not a merchant anymore. I'm a MERCHANT PRINCE.",
        "brags": ["Everything's 50% more expensive near me now.", "I've started charging people for looking."] }
    ]
  },
  "fennick": {
    "name": "Bard Fennick",
    "look": { "skin": "#f6d0b0", "hair": "#f2c14e", "hairStyle": "spiky", "shirt": "#c8323c", "pants": "#5b4bc4", "shoes": "#2b1d24" },
    "stats": { "maxHp": 35, "attack": 2, "defense": 0, "speed": 45 },
    "wander": 2,
    "greeting": "Ah! A hero! Want a song about you? It's three hours long.",
    "giftLines": ["A {item}! I shall write a ballad about it!", "This {item} rhymes with... nothing. Great.", "Verse two: the hero gave me a {item}!"],
    "swapLine": "Take my old {item}. It's out of tune.",
    "fightStart": "A battle! The ballad writes itself!",
    "refuseFight": "Fight with my lute? It's my only friend.",
    "quirks": { "selfHit": 3, "wrongWay": 3, "attack": 1 },
    "quirkLines": {
      "selfHit": ["A rousing chord!", "And now, the dramatic finish—", "*TWANG*"],
      "wrongWay": ["EXIT, STAGE LEFT!", "A dramatic retreat!", "For the encore!"]
    }
  },
  "lancelittle": {
    "name": "Sir Lancelittle",
    "look": { "skin": "#f3c39a", "hair": "#7a5232", "hairStyle": "short", "shirt": "#9aa0a8", "pants": "#3f6fb4", "shoes": "#3b2414" },
    "stats": { "maxHp": 40, "attack": 5, "defense": 4, "speed": 50 },
    "startingGear": ["iron_helm"],
    "wander": 2,
    "greeting": "I'm a knight! A small one. A small, brave, mostly-knight.",
    "giftLines": ["A {item}! I'm practically Sir Lancelot now!", "Is this {item} knight-sized? It's huge!", "My mum's going to be so proud."],
    "swapLine": "You can have my old {item}. It was a bit big anyway.",
    "fightStart": "Have at thee! Gently!",
    "refuseFight": "A knight needs a weapon. I just have this helmet.",
    "quirks": { "trip": 5, "attack": 2 },
    "quirkLines": { "trip": ["Whoa— my cape!", "Too much armour—", "I'm fine! I'm fine!"] }
  },

  // ---------------- GUARD TOWN ----------------
  "brick": {
    "name": "Sergeant Brick",
    "look": { "skin": "#c98a5e", "hair": "#2b1d24", "hairStyle": "short", "shirt": "#8e1f2a", "pants": "#2b2b33", "shoes": "#2b1d24" },
    "stats": { "maxHp": 150, "attack": 10, "defense": 6, "speed": 50 },
    "startingGear": ["pointy_spear"],
    "wander": 2,
    "greeting": "HALT! ...Oh, it's you. Carry on. Slowly. With your hands where I can see them.",
    "giftLines": ["A {item}? Bribery is illegal. ...Thank you.", "I'll log this {item} as evidence.", "Standard issue {item}. Approved."],
    "swapLine": "Return of {item}. Sign here.",
    "fightStart": "YOU'RE UNDER ARREST! For being too shiny!",
    "refuseFight": "Regulations say I need a weapon to arrest you.",
    "quirks": { "wrongWay": 4, "attack": 3 },
    "quirkLines": { "wrongWay": ["HALT, CRIMINAL! ...wrong person.", "STOP RIGHT THERE! ...that's a tree.", "CHARGE! As per regulations!"] }
  },
  "pete": {
    "name": "Guard Pete",
    "look": { "skin": "#f3c39a", "hair": "#d8642c", "hairStyle": "short", "shirt": "#3f6fb4", "pants": "#2b2b33", "shoes": "#2b1d24" },
    "stats": { "maxHp": 70, "attack": 6, "defense": 4, "speed": 40 },
    "startingGear": ["rusty_sword"],
    "wander": 2,
    "greeting": "I'm Pete. That's my twin, Repeat. Our parents had a sense of humour.",
    "giftLines": ["Ooh, a {item}! Repeat's gonna be so jealous.", "Mine! Not Repeat's! MINE!", "Best shift ever."],
    "swapLine": "Give my old {item} to Repeat. He loves my hand-me-downs.",
    "fightStart": "On guard! ...That's a guard joke.",
    "refuseFight": "Repeat has our sword this week.",
    "quirks": { "selfHit": 5, "attack": 1 },
    "quirkLines": { "selfHit": ["Watch my sword spin!", "Like they showed us in training—", "Hup! Hup! HUP— ow."] }
  },
  "repeat": {
    "name": "Guard Repeat",
    "look": { "skin": "#f3c39a", "hair": "#d8642c", "hairStyle": "spiky", "shirt": "#3f6fb4", "pants": "#2b2b33", "shoes": "#2b1d24" },
    "stats": { "maxHp": 70, "attack": 6, "defense": 4, "speed": 40 },
    "wander": 2,
    "greeting": "I'm Repeat. That's Pete. Our parents had a sense of humour.",
    "giftLines": ["A {item}! Finally something Pete didn't have first!", "Mine! Not Pete's!", "Best shift ever. Wait, Pete said that."],
    "swapLine": "Give my old {item} to Pete. Fair's fair.",
    "fightStart": "On guard! ...Pete already did that joke, didn't he.",
    "refuseFight": "Pete has our sword this week.",
    "quirks": { "chicken": 5, "attack": 1 },
    "quirkLines": { "chicken": ["The barracks chicken escaped AGAIN!", "Come back, Sergeant Cluck!", "Not on my watch, chicken!"] }
  },

  // ---------------- KNIGHT FORTRESS ----------------
  "ironsides": {
    "name": "Dame Ironsides",
    "look": { "skin": "#e8b48a", "hair": "#d8d8e0", "hairStyle": "bun", "shirt": "#6c717b", "pants": "#3a3a44", "shoes": "#2b1d24" },
    "stats": { "maxHp": 300, "attack": 15, "defense": 15, "speed": 45 },
    "startingGear": ["plate_armor", "knight_shield", "rusty_sword"],
    "wander": 1,
    "greeting": "Forty years a knight. Never once lost my footing. Never once looked down.",
    "giftLines": ["A {item}. Acceptable.", "Hmph. A knight's {item}. Fine.", "This {item} will see glory."],
    "swapLine": "Take my old {item}. It has seen glory. Enough glory.",
    "fightStart": "To the moat-side! A proper duel!",
    "refuseFight": "A knight unarmed? Never.",
    "quirks": { "wrongWay": 6, "attack": 1 },
    "quirkLines": { "wrongWay": ["CHARGE! Eyes FORWARD!", "Never look down! NEVER LOOK DOWN!", "For the Fortress!"] }
  },
  "clankston": {
    "name": "Sir Clankston",
    "look": { "skin": "#f3c39a", "hair": "#f2c14e", "hairStyle": "short", "shirt": "#6c717b", "pants": "#3a3a44", "shoes": "#2b1d24" },
    "stats": { "maxHp": 250, "attack": 14, "defense": 12, "speed": 40 },
    "startingGear": ["plate_armor"],
    "wander": 2,
    "greeting": "*clank* Greetings! *clank* Sorry. *clank* It's the armour.",
    "giftLines": ["*clank* A {item}! *clank*", "*clank clank* Thank you! *clank*", "More metal! *CLANK*"],
    "swapLine": "*clank* Have my old {item}. *clank*",
    "fightStart": "*CLANK* EN GARDE *CLANK*",
    "refuseFight": "*clank* I need a weapon. *clank*",
    "quirks": { "seekHazard": 5, "attack": 1 },
    "seekHazard": "water",
    "quirkLines": { "seekHazard": ["Must polish armour in the moat first!", "*clank* Too shiny? Never too shiny! *clank*", "A quick rinse! *CLANK*"] }
  },

  // ---------------- LAVA FIELDS ----------------
  "ignatius": {
    "name": "Ignatius the Fire-Juggler",
    "look": { "skin": "#c98a5e", "hair": "#e8541c", "hairStyle": "spiky", "shirt": "#f2c14e", "pants": "#8e1f2a", "shoes": "#2b1d24" },
    "stats": { "maxHp": 200, "attack": 20, "defense": 5, "speed": 55 },
    "wander": 2,
    "greeting": "I juggle fire! Professionally! The insurance company hates me.",
    "giftLines": ["A {item}! I could juggle this!", "Is this {item} flammable? Let's find out!", "Ooh. It's not on fire yet. I'll fix that."],
    "swapLine": "Have my old {item}. It's only a little scorched.",
    "fightStart": "Prepare for a FLAMING performance!",
    "refuseFight": "I juggle fire, not fists.",
    "quirks": { "seekHazard": 6, "attack": 1 },
    "seekHazard": "lava",
    "quirkLines": { "seekHazard": ["Watch me juggle LAVA!", "For my next trick—", "Grand finale! IN THE LAVA!"] }
  },

  // ---------------- DRAGON MOUNTAIN ----------------
  "derek": {
    "name": "Derek the Dragon Fan",
    "look": { "skin": "#f6d0b0", "hair": "#7a5232", "hairStyle": "spiky", "shirt": "#a8302c", "pants": "#3a3a44", "shoes": "#2b1d24" },
    "stats": { "maxHp": 120, "attack": 18, "defense": 3, "speed": 60 },
    "wander": 3,
    "greeting": "Have you SEEN Grumbold? Up close? I have his poster. And his footprint. I licked it.",
    "giftLines": ["A {item}! Grumbold would LOVE this!", "Is this {item} dragon-themed? Close enough!", "I'll get Grumbold to sign it!"],
    "swapLine": "Have my old {item}. It's not dragon-themed enough.",
    "fightStart": "If I win, Grumbold will notice me!",
    "refuseFight": "Fight? With what, my Grumbold plushie?",
    "quirks": { "wrongWay": 6, "attack": 1 },
    "quirkLines": { "wrongWay": ["I'M COMING, GRUMBOLD! I LOVE YOU!", "WAS THAT A DRAGON?!", "AUTOGRAPH! AUTOGRAPH!"] }
  },

  // ---------------- THE ANCIENT REALM ----------------
  "bartholomew": {
    "name": "Bartholomew, an Old God",
    "look": { "skin": "#ece6f2", "hair": "#f4f1e8", "hairStyle": "long", "shirt": "#f2c14e", "pants": "#ece6f2", "shoes": "#f2c14e" },
    "stats": { "maxHp": 999999, "attack": 50000, "defense": 9999, "speed": 20 },
    "wander": 1,
    "greeting": "Ah. The shiny one. I've been watching you. It's been... a lot.",
    "giftLines": ["A {item}. How quaint. I accept your offering.", "Mortals keep giving me things. I keep accepting them.", "This {item} amuses me. Continue."],
    "swapLine": "Take back this {item}. I have transcended it.",
    "fightStart": "...",
    "refuseFight": "...",
    "noFight": "Not yet, little mortal. That part of the story hasn't been written. (Come back in Milestone 9.)",
    "quirks": { "attack": 1 }
  }
});
