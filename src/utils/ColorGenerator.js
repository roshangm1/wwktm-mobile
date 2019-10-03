const fs = require("fs");
var util = require("util");

const Colors = {};
let i = 1;
const hex = [
  0,
  0x11,
  0x22,
  0x33,
  0x44,
  0x55,
  0x66,
  0x77,
  0x88,
  0x99,
  0xaa,
  0xbb,
  0xcc,
  0xdd,
  0xee,
  0xff
];

const toHex = val =>
  val
    .toString(16)
    .toUpperCase()
    .padStart(2, "0");

for (const red of hex) {
  for (const green of hex) {
    for (const blue of hex) {
      Colors["color" + i] = "#" + toHex(red) + toHex(green) + toHex(blue);
      i++;
    }
  }
}

fs.writeFileSync(
  "./Color.js",
  "const colorHex = " + util.inspect(Colors),
  "utf-8"
);
