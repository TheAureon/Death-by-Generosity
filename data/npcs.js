// ===========================================================================
// NPCs — the people of Little Givington (and anyone else you can gift).
//
//   "name"        : shown in menus and messages
//   "look"        : colours for the generated sprite. hairStyle can be
//                   short, long, bun, bald, spiky
//   "stats"       : their own (sad) numbers before any gifts
//   "startingGear": items they already wear (ids from data/items.js).
//                   People with gear will fight you right away.
//   "wander"      : how far (in tiles) they stroll from where they start
//   "greeting"    : their personality line, said when you first walk up
//   "giftLines"   : said after receiving a gift. {item} = the item's name
//   "swapLine"    : said when they hand back what they were wearing before
//   "fightStart"  : said when you ask them to fight (and they have gear)
//   "refuseFight" : said when you ask them to fight with no gear
//   "quirks"      : their fighting habits and how likely each is (bigger =
//                   more often). Options: attack, wrongWay, chicken, fleeBuff,
//                   trip, selfHit, seekHazard, backpedal.
//                   Their SIGNATURE failure gets the biggest number.
//   "seekHazard"  : which hazard the seekHazard quirk walks into
//                   (forge, well, water, lava, pit, cliff)
//   "crafter"     : true = can forge items from monster bits (data/recipes.js)
//   "quirkLines"  : their own lines for a quirk (instead of the shared ones
//                   in data/jokes.js). backpedal uses them as a speech.
// ===========================================================================
DBG.data.npcs = {

  // ---- Farmer Bob — signature: distracted by chickens ----
  "bob": {
    "name": "Farmer Bob",
    "look": { "skin": "#f3c39a", "hair": "#7a5232", "hairStyle": "short", "shirt": "#5b8fd6", "pants": "#4a5a7a", "shoes": "#5a3a22" },
    "stats": { "maxHp": 40, "attack": 3, "defense": 0, "speed": 35 },
    "wander": 3,
    "greeting": "Howdy! Mind the chickens. They're the real bosses round here.",
    "giftLines": [
      "A {item}? For me? I only own a turnip.",
      "Golly. I feel... dangerous.",
      "Is this a gift or a threat? Either way, thanks!"
    ],
    "swapLine": "Here, take back my old {item}. Fair's fair.",
    "fightStart": "Alright! I'll fight ya! Hold still!",
    "refuseFight": "Fight you? With what, my turnip? Give me something first!",
    "quirks": { "chicken": 6, "attack": 2, "wrongWay": 1 },
    "quirkLines": {
      "chicken": ["CLUCKY? Is that you?!", "Who let you out of the pen?!", "Not now— oh, she's so fluffy."]
    }
  },

  // ---- Grandma Gertrude — signature: hits herself ----
  "gertrude": {
    "name": "Grandma Gertrude",
    "look": { "skin": "#e8b48a", "hair": "#d8d8e0", "hairStyle": "bun", "shirt": "#8a4bb4", "pants": "#5b3a7a", "shoes": "#3b2414" },
    "stats": { "maxHp": 25, "attack": 1, "defense": 0, "speed": 20 },
    "wander": 2,
    "greeting": "Oh, look how shiny you are, dear! Have you eaten?",
    "giftLines": [
      "A {item}! Just like the one I used in the war.",
      "My hip says no, but my heart says FIGHT.",
      "I'll knit a cosy for this {item}, dear."
    ],
    "swapLine": "Take this old {item} back, dear, it's cluttering my hands.",
    "fightStart": "In my day we fought uphill both ways! HAVE AT YOU!",
    "refuseFight": "With these knitting needles? Bring me something proper, dear.",
    "quirks": { "selfHit": 6, "attack": 1, "trip": 2 },
    "quirkLines": {
      "selfHit": ["This is how we did it in '42!", "Watch Granny's special move!", "Now where's my glasses— HIYA!"]
    }
  },

  // ---- Kevin — signature: runs from his own buff (lives by the cliff) ----
  "kevin": {
    "name": "Kevin",
    "look": { "skin": "#f6d0b0", "hair": "#d8642c", "hairStyle": "spiky", "shirt": "#4f9130", "pants": "#3a3a44", "shoes": "#2b1d24" },
    "stats": { "maxHp": 30, "attack": 2, "defense": 0, "speed": 55 },
    "wander": 3,
    "greeting": "Whoa. Are you, like, a real hero? Can I have something?",
    "giftLines": [
      "NO WAY. A {item}! I'm gonna be SO strong.",
      "Mom is gonna freak out about this {item}.",
      "I'm basically the main character now."
    ],
    "swapLine": "You can have my old {item}. It's not cool anymore.",
    "fightStart": "SICK. Okay, okay, I'm gonna destroy you. Watch.",
    "refuseFight": "Bro I'm literally holding nothing. Gimme a sword first.",
    "quirks": { "fleeBuff": 6, "wrongWay": 1, "attack": 1 },
    "quirkLines": {
      "fleeBuff": ["WHY AM I SPARKLING?!", "MOM! MOM! I'M GLOWING!", "IT'S FOLLOWING MEEE!"]
    }
  },

  // ---- Brunhilde the Blacksmith — signature: walks into her own forge ----
  "brunhilde": {
    "name": "Brunhilde the Smith",
    "look": { "skin": "#c98a5e", "hair": "#2b1d24", "hairStyle": "long", "shirt": "#6b4428", "pants": "#3a3a44", "shoes": "#2b1d24" },
    "stats": { "maxHp": 80, "attack": 6, "defense": 2, "speed": 40 },
    "startingGear": ["smith_hammer"],
    "wander": 2,
    "greeting": "Need a sword? I make 'em. I don't use 'em. Much.",
    "giftLines": [
      "A {item}. Decent work. Not mine, but decent.",
      "Hmm. I'd have tempered this {item} longer.",
      "Finally, something worth swinging."
    ],
    "swapLine": "Take the old {item}. I'll make another.",
    "fightStart": "Alright, hero. Let's see what that armour's made of.",
    "refuseFight": "Fight with my bare hands? I need those for work.",
    "crafter": true,
    "quirks": { "seekHazard": 6, "attack": 1 },
    "seekHazard": "forge",
    "quirkLines": {
      "seekHazard": ["Hold on! Gotta heat this up first!", "Proper weapons need proper heat. One sec!", "Let me just warm up the steel—"]
    }
  },

  // ---- Sir Reginald (retired knight) — signature: heroic charge, wrong way ----
  "reginald": {
    "name": "Sir Reginald",
    "look": { "skin": "#e8b48a", "hair": "#f4f1e8", "hairStyle": "bald", "shirt": "#6c717b", "pants": "#3f6fb4", "shoes": "#3b2414" },
    "stats": { "maxHp": 60, "attack": 6, "defense": 5, "speed": 45 },
    "startingGear": ["rusty_sword"],
    "wander": 1,
    "greeting": "Sir Reginald the Unbent, retired! Mostly unbent. Ask my back.",
    "giftLines": [
      "A {item}! Just like my glory days!",
      "By my beard, a fine {item}!",
      "I shall bear this {item} with honour. And a bad knee."
    ],
    "swapLine": "Take back my trusty {item}. It has served... adequately.",
    "fightStart": "A DUEL! At last! Have at thee, villain!",
    "refuseFight": "A knight without a blade? Unthinkable! Bring me steel!",
    "quirks": { "wrongWay": 7, "attack": 1 },
    "quirkLines": {
      "wrongWay": ["FOR THE KING!", "CHAAARGE! ...wait, which way?", "Fear not! I shall... over there!"]
    }
  },

  // ---- Mayor Humphrey — signature: speech while backing into the well ----
  "mayor": {
    "name": "Mayor Humphrey",
    "look": { "skin": "#f3c39a", "hair": "#7a5232", "hairStyle": "short", "shirt": "#8e1f2a", "pants": "#2b2b33", "shoes": "#2b1d24" },
    "stats": { "maxHp": 50, "attack": 2, "defense": 0, "speed": 30 },
    "startingGear": ["mayor_hat"],
    "wander": 2,
    "greeting": "Welcome to Little Givington, hero! Please don't hurt anyone. Especially me.",
    "giftLines": [
      "A {item}! I'll put it in the town museum. On me.",
      "On behalf of the village, thank you for this {item}!",
      "This {item} will look great in the campaign posters."
    ],
    "swapLine": "Please accept my old {item} as a token of civic gratitude.",
    "fightStart": "Very well! But first, a few words...",
    "refuseFight": "A mayor fights with WORDS. And also, preferably, a weapon.",
    "quirks": { "backpedal": 6, "attack": 1 },
    "quirkLines": {
      "backpedal": ["Citizens of Little Givington!", "Today, I fight for ALL of you!", "As your mayor, I promise...", "...to never, EVER back down!"]
    }
  }
};
