"use strict";

const { readFileSync } = require("../../shared/loadFile");

const path = "input.txt";
const data = readFileSync({ path }).split("\n");

// UTILS
const toNumber = (x) => parseInt(x, 10);
const parser = (data) => ({ i, j, k }) => [
  toNumber(data[i]),
  toNumber(data[j]),
  toNumber(data[k]),
];

// PART ONE
const partOne = ({ data }) => {
  const getElements = parser(data);

  for (let i = 0; i < data.length; i++) {
    for (let j = i; j < data.length; j++) {
      if (i === j) continue;
      const [first, second] = getElements({ i, j });
      if (first + second === 2020) return first * second;
    }
  }
};

// PART TWO
const partTwo = ({ data }) => {
  const getElements = parser(data);

  for (let i = 0; i < data.length; i++) {
    for (let j = i; j < data.length; j++) {
      for (let k = j; k < data.length; k++) {
        if (i === j || i === k || j === k) continue;
        const [first, second, third] = getElements({ i, j, k });
        if (first + second + third === 2020) return first * second * third;
      }
    }
  }
};

// MAIN
console.log("partOne", partOne({ data }));
console.log("partTwo", partTwo({ data }));
