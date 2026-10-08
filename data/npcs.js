// ===========================================================================
// NPCs — people you can give gifts to.
//
//   "look"      : colours for the generated sprite. hairStyle can be
//                 short, long, bun, bald, spiky
//   "stats"     : their own (sad) numbers before any gifts
//   "wander"    : how far (in tiles) they stroll from where they start
//   "greeting"  : said when you walk up to them
//   "giftLines" : said after receiving a gift. {item} = the item's name
//   "swapLine"  : said when they hand back what they were wearing before
// ===========================================================================
DBG.data.npcs = {
  "bob": {
    "name": "Farmer Bob",
    "look": { "skin": "#f3c39a", "hair": "#7a5232", "hairStyle": "short", "shirt": "#5b8fd6", "pants": "#4a5a7a", "shoes": "#5a3a22" },
    "stats": { "maxHp": 40, "attack": 3, "defense": 0, "speed": 35 },
    "wander": 3,
    "greeting": "Howdy! Lovely day to not be fighting anybody.",
    "giftLines": [
      "A {item}? For me? I only own a turnip.",
      "Golly. I feel... dangerous.",
      "Is this a gift or a threat? Either way, thanks!"
    ],
    "swapLine": "Here, take back my old {item}. Fair's fair."
  },
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
    "swapLine": "Take this old {item} back, dear, it's cluttering my hands."
  },
  "kevin": {
    "name": "Kevin",
    "look": { "skin": "#f6d0b0", "hair": "#d8642c", "hairStyle": "spiky", "shirt": "#4f9130", "pants": "#3a3a44", "shoes": "#2b1d24" },
    "stats": { "maxHp": 30, "attack": 2, "defense": 0, "speed": 55 },
    "wander": 4,
    "greeting": "Whoa. Are you, like, a real hero? Can I have something?",
    "giftLines": [
      "NO WAY. A {item}! I'm gonna be SO strong.",
      "Mom is gonna freak out about this {item}.",
      "I'm basically the main character now."
    ],
    "swapLine": "You can have my old {item}. It's not cool anymore."
  }
};
