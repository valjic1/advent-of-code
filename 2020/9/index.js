"use strict";

const { readFileSync } = require("../../shared/loadFile");

const path = "input.txt";
let data = readFileSync({ path }).split("\n");

// UTILS
const toInt = (x) => parseInt(x, 10);

// PART ONE
const partOne = ({ data }) => {
  const PREAMBLE = 25;

  for (let i = PREAMBLE; i < data.length; i++) {
    let flag = false;

    for (let j = i - PREAMBLE; j < i; j++) {
      if (flag) break;

      for (let k = j; k < i; k++) {
        if (j === k) continue;
        if (toInt(data[j]) + toInt(data[k]) === toInt(data[i])) {
          flag = true;
          break;
        }
      }
    }

    if (!flag) return data[i];
  }
};

// PART TWO
const partTwo = ({ data }) => {
  const target = partOne({ data });

  for (let i = 0; i < data.length; i++) {
    let res = [];
    let sum = 0;
    let flag = false;

    for (let j = i; j < data.length; j++) {
      res.push(toInt(data[j]));
      sum += toInt(data[j]);

      if (sum == target) {
        flag = true;
        break;
      }

      if (sum > target) break;
    }

    if (flag) return Math.min(...res) + Math.max(...res);
  }
};

// MAIN
console.log("partOne", partOne({ data }));
console.log("partTwo", partTwo({ data }));
