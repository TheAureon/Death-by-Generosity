// ===========================================================================
// JOKES — all the funny text. Add lines freely; keep quotes and commas.
// ===========================================================================
DBG.data.jokes = {

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
    "You punched yourself. Your armour punched back. You're fine.",
    "Ow? No. Not ow. Regen already fixed it.",
    "You were at 1 HP for a glorious moment. Then regen happened.",
    "Self-punch denied by the Cursed Plate. It cares about you.",
    "You hit yourself with everything you had. The armour sighed."
  ],

  // When the training dummy is destroyed by thorns
  "dummyDeath": [
    "The dummy punched you and exploded. Thorns!",
    "Training complete. The dummy did not survive training.",
    "A new dummy volunteers. It has not learned anything."
  ],

  // When something would kill the hero (dying isn't unlocked yet!)
  "deathDenied": "Death politely declined. Regen got there first."
};
