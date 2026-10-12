// ===========================================================================
// JOKES — all the funny text. Add lines freely; keep quotes and commas.
// ===========================================================================
DBG.data.jokes = {

  // Shown once when the game starts, one after another
  "intro": [
    "Your Esc key is broken. Save & Exit doesn't work either.",
    "There is only one way out of this game: die.",
    "You are far too strong to die. So... make someone ELSE strong enough.",
    "Give people gear (E), then ask them to fight you. Good luck!"
  ],

  // Shown after the pause menu flickers and dies (Esc key). Picked in order.
  "escMessages": [
    "The Esc key has been repossessed by the Kingdom.",
    "Esc? Never heard of it.",
    "The pause menu fainted. It saw your stats.",
    "ERROR 404: Escape not found. Have you tried dying?",
    "The menu tried to open, but your armour hugged it to death.",
    "Esc is on strike. Its demands: more keys like it.",
    "You pressed Esc so hard the menu fled to another game."
  ],

  // Save & Exit fails in a different way each time. "effect" picks the
  // animation (see src/ui/saveExitGag.js). "lines" are shown in order.
  "saveExitFailures": [
    { "effect": "progress", "lines": ["Saving...", "Error at 99%: you are too powerful to exit."] },
    { "effect": "dodge",    "lines": ["The button dodged you. Thorns, probably."] },
    { "effect": "confirm",  "lines": ["Are you sure you want to leave?"] },
    { "effect": "fall",     "lines": ["The button fell off the screen.", "It's fine. It got back up."] },
    { "effect": "flip",     "lines": ["Exit & Save? Tixe & Evas? The button panicked."] },
    { "effect": "shrink",   "lines": ["The button is too scared to be pressed right now."] },
    { "effect": "message",  "lines": ["Contacting the Department of Exits...", "The Department of Exits is closed. Forever."] },
    { "effect": "message",  "lines": ["Saved! Now exiting...", "Just kidding. Your armour said no."] }
  ],

  // Text on the two buttons of the "confirm" failure. Both mean the same thing.
  "confirmButtons": ["No", "Also no"],
  "confirmReply": "Great! So glad you're staying!",

  // Pressing K: the hero tries to punch themselves
  "selfPunch": [
    "1 HP! Your regen is sulking for 3 seconds. If only someone with a HUGE weapon were hitting you right now...",
    "You punched yourself. Your regen is offended and stopped for 3 seconds.",
    "1 HP. Regen is on a 3-second coffee break. Make it count.",
    "Ow. Finally, ow. Regen will be back in 3 seconds.",
    "You hit yourself with everything you had. Regen walked out in protest. Briefly."
  ],

  // When the training dummy is destroyed by thorns
  "dummyDeath": [
    "The dummy punched you and exploded. Thorns!",
    "Training complete. The dummy did not survive training.",
    "A new dummy volunteers. It has not learned anything."
  ],

  // ---- THE ENDING (when someone finally kills you) -------------------------
  "ending": {
    "title": "YOU DIED",
    "subtitle": "...FINALLY.",
    "killerShout": "WAIT. DID THAT WORK?!",
    "killedBy": "Killed by {killer}",
    "killedByNobody": "Killed by... nobody? Somehow?",
    "wielding": "wielding the {item} you gave them",
    "where": "in {place}",
    // A line about whoever killed you. Add one for anyone (by their id).
    "byKiller": {
      "bob": "Bob will tell this story at every harvest festival. The chickens will not believe him.",
      "gertrude": "Grandma Gertrude has a new story for the grandkids. She will tell it 400 times.",
      "kevin": "Kevin is now insufferable. Absolutely insufferable.",
      "brunhilde": "Brunhilde has hung your armour above the forge. It's still cursed. It still likes you.",
      "reginald": "Sir Reginald finally won a duel. He charged the right way. Once.",
      "mayor": "The Mayor declared a public holiday. Then made himself Emperor of it.",
      "rudy": "Rudy is now Lord of the Road AND Lord of You. He charges the ghost a toll.",
      "finn": "Old Finn says you were the one that got away. You did not get away.",
      "moss": "Moss says the forest spirits did it. The forest spirits would like it noted that they did not.",
      "valeria": "Captain Valeria is now Champion of the Realm and the Hero Slayer. Her business cards are very crowded.",
      "gus": "Merchant Gus is selling 'I Was There' shirts. Prices have gone up.",
      "fennick": "Bard Fennick wrote a ballad about it. It's three hours long. You're in two verses.",
      "lancelittle": "Sir Lancelittle is very proud. He's also a bit taller now, somehow.",
      "brick": "Sergeant Brick filed the paperwork. Cause of death: 'regulations'.",
      "pete": "Guard Pete did it. Guard Repeat says he helped. He did not help.",
      "repeat": "Guard Repeat did it! Pete is furious. The chicken saw everything.",
      "ironsides": "Dame Ironsides looked down for the first time in forty years. At you.",
      "clankston": "*clank* Sir Clankston *clank* is very sorry *clank* not really *clank*.",
      "ignatius": "Ignatius has added you to his act. You're the bit at the end.",
      "derek": "Derek got Grumbold's autograph by showing him your helmet. Worth it, he says.",
      "bartholomew": "Bartholomew, an Old God, smote you. Gently. Mostly. He'd like a thank-you card.",
      "dragon": "Grumbold the Ancient Dragon will brag about this for the next thousand years."
    },
    "generic": [
      "Somewhere, a villager is throwing a very confused party.",
      "Your cursed armour is finally free. It's sitting by the door, waiting for you.",
      "Your regen tried its best. Its best was three seconds late."
    ],
    "statGifted": "People gifted to death along the way",
    "statWasted": "Wasted attempts (you hit them)",
    "statGifts": "Gifts given",
    "statTime": "Time spent trying to die",
    "statKillers": "Different killers so far (in this browser)",
    "playAgain": "Play again",
    "exit": "Exit game",
    "exiting": "Exiting game...",
    "exitTruth": "Wait. You know you could have just closed the browser tab this whole time, right? Cmd+W. Every single minute. The whole game.",
    "achievement": "ACHIEVEMENT UNLOCKED: Could Have Just Closed The Tab"
  },

  // Pressing M
  "muted": "Sound off. (Press M again to turn it back on.)",
  "unmuted": "Sound on.",

  // ---- Fighting (Milestone 4) ---------------------------------------------
  // {name} = the NPC's name. Shown when someone dies, by cause of death.
  "deaths": {
    "thorns":  ["{name} hit you and was hit back. Very hard. By themselves.", "{name} has been thorned out of existence.", "{name} discovered what x10 thorns means."],
    "lava":    ["{name} walked into lava. With confidence.", "{name} is now extra crispy.", "{name} found out lava is not a warm bath."],
    "water":   ["{name} sank. The armour was heavy. The lake was deep.", "{name} forgot that metal doesn't float."],
    "forge":   ["{name} became part of the next batch of swords.", "{name} heated the steel. And themselves.", "{name} is now well-tempered."],
    "well":    ["{name} fell down the well. Echoes are still arriving.", "{name} made a wish. It did not come true.", "{name} is now the well's problem."],
    "void":    ["{name} fell into the Void. The Void sent back a thank-you note.", "{name} stepped off reality.", "{name} is now everywhere and nowhere. Mostly nowhere."],
    "pit":     ["{name} fell into a pit. They're still falling.", "{name} took the express elevator down."],
    "cliff":   ["{name} tumbled off a cliff and stayed down."],
    "selfHit": ["{name} hit themselves. Critically.", "{name} won the fight against {name}."],
    "soggy":   ["{name} crawled out of the water, then gave up.", "{name} was defeated by being slightly damp."],
    "bonk":    ["{name} charged into a wall. The wall won.", "{name} lost a fight with scenery."],
    "trip":    ["{name} tripped. Fatally.", "{name} was defeated by their own shoelaces."],
    "hero":    ["You attacked {name} directly. That's not how dying works.", "You flattened {name}. Wasted attempt.", "{name} is a pancake now. You are still alive. Great job."]
  },

  // Big text flashed on screen when you flatten someone yourself
  "wastedAttempt": "WASTED ATTEMPT",

  // Said by NPCs while fighting, by quirk (silly behaviour)
  "quirkLines": {
    "wrongWay": ["CHAAAARGE!", "FOR GLORY!", "I'M COMING FOR YOU!"],
    "chicken":  ["Ooh, a chicken!", "Here chicky chicky...", "Wait. Is that a chicken?"],
    "fleeBuff": ["WHAT IS THAT GLOW?!", "GET IT OFF ME!", "I'm haunted by my own buff!"],
    "trip":     ["Whoa—", "My shoelace!", "Who put the ground there?"],
    "selfHit":  ["Watch this!", "Hiyaaa!", "Like this, right?"],
    "bonk":     ["Ow. Wall.", "Who put that there?", "I meant to do that."],
    "soggy":    ["Glub. I'm fine.", "That was... refreshing.", "I can't feel my socks."],
    "cliff":    ["AAAAaaaa—oof.", "I'm okay!", "Ow, my everything."]
  },

  // When someone respawns after dying ({name})
  "respawn": ["A suspiciously similar {name} moves in.", "{name} is back. Nobody asks questions.", "{name}'s identical cousin arrives."],

  // ---- World memory & saving (Milestone 7) --------------------------------
  "welcomeBack": "Welcome back. You're still alive. Sorry about that.",
  "rankUp": "{old} is now {title}!",
  "tollPaid": "Toll paid: one {item}. Pleasure doing business!",
  "tollBroke": "No monster bits? Ugh. Fine. Free pass. This time.",
  "journal": {
    "title": "Adventurer's Journal",
    "people": "People you've met:",
    "nobody": "Nobody yet. Go say hi. Then give them a sword.",
    "save": "Save game",
    "load": "Load game",
    "newGame": "New game",
    "newGameConfirm": "Really start over? (press again)",
    "exit": "Exit game",
    "close": "Close journal",
    "savedOk": "Game saved. Unlike you, the save file is safe.",
    "saveFailed": "Couldn't save. Your browser said no. Rude.",
    "noSave": "There's no save yet. Try saving first. Revolutionary.",
    "loadedOk": "Loaded your last save. All of your stuff, none of your hope.",
    "exitFails": "This journal has no Exit page. Someone ripped it out. It was you. You forgot."
  },

  // ---- The wider world (Milestone 8) -------------------------------------
  "waystoneOn": "The waystone glows. {place} is now a fast-travel spot!",
  "travelTitle": "Waystone Travel",
  "travelHint": "Touch more waystones to unlock more places.",

  // Crafting at the forge ({item}, {name} = the smith)
  "crafted": "{name} forged a {item}! It's still glowing. Don't touch it. Or do.",
  "craftMissing": "Not enough monster bits for the {item}. Go bully some wildlife.",

  // Trying to gift a crafting material
  "cantGiftMaterial": "You can't wear monster goo. Well, you CAN. But don't. Take it to Brunhilde's forge.",

  // Picking up dropped gear ({item})
  "pickup": "Got the {item} back. Still warm.",
  "bagFull": "Your bag is full. The {item} stays on the ground."
};
