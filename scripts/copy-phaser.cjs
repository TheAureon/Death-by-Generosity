// Copies Phaser's ready-made browser file into /vendor so index.html can be
// opened by double-click (no install needed). Run after upgrading Phaser:
//   npm run vendor:phaser
const fs = require("fs");
const path = require("path");
const src = path.join(__dirname, "..", "node_modules", "phaser", "dist", "phaser.min.js");
const dest = path.join(__dirname, "..", "vendor", "phaser.min.js");
fs.copyFileSync(src, dest);
console.log("Copied Phaser to vendor/phaser.min.js");
