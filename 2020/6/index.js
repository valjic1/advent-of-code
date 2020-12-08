"use strict";

const { readFileSync } = require("../../shared/loadFile");

const path = "input.txt";
let data = readFileSync({ path }).concat("\n").split("\n");

// PART ONE
const partOne = ({ data }) => {
  let ans = 0;
  let group = {};

  for (let row of data) {
    if (row === "") {
      ans += Object.keys(group).length;
      group = {};
    } else for (let i = 0; i < row.length; i++) group[row[i]] = 1;
  }
  return ans;
};

// PART TWO
const partTwo = ({ data }) => {
  let ans = 0;

  let voters = 0;
  let group = {};

  for (let row of data) {
    if (row === "") {
      Object.values(group).forEach((value) => {
        if (value === voters) ans++;
      });
      voters = 0;
      group = {};
    } else {
      voters++;
      for (let i = 0; i < row.length; i++) {
        if (!group[row[i]]) group[row[i]] = 1;
        else group[row[i]] += 1;
      }
    }
  }
  return ans;
};

// MAIN
console.log("partOne", partOne({ data }));
console.log("partTwo", partTwo({ data }));
