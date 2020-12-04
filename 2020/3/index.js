"use strict";

const { readFileSync } = require("../../shared/loadFile");

const path = "input.txt";
const data = readFileSync({ path }).split("\n");

// CORE METHOD
function core({ data, x, y }) {
  const len = data[0].length;
  const xShift = parseInt(x, 10);
  const yShift = parseInt(y, 10);

  let ans = 0;
  while (y < data.length) {
    if (data[y][x % len] === "#") ans++;
    x += xShift;
    y += yShift;
  }

  return ans;
}

// PART ONE
const partOne = ({ data }) => {
  return core({ data, x: 3, y: 1 });
};

// PART TWO
const partTwo = ({ data }) => {
  let ans = 1;
  ans *= core({ data, x: 1, y: 1 });
  ans *= core({ data, x: 3, y: 1 });
  ans *= core({ data, x: 5, y: 1 });
  ans *= core({ data, x: 7, y: 1 });
  ans *= core({ data, x: 1, y: 2 });
  return ans;
};

// MAIN
console.log("partOne", partOne({ data }));
console.log("partTwo", partTwo({ data }));
