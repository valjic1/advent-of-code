"use strict";

const { readFileSync } = require("../../shared/loadFile");

const path = "input.txt";
let data = readFileSync({ path }).split("\n");

// PART ONE
const partOne = ({ data }) => {
  let res = [];
  let acc = 0;
  let i = 0;

  while (true) {
    if (res.indexOf(i) !== -1) return acc;

    res.push(i);

    let [operation, value] = data[i].split(" ");
    value = parseInt(value, 10);

    if (operation === "acc") {
      acc += value;
      i++;
    } else if (operation === "jmp") i += value;
    else i++;
  }
};

// PART TWO
const partTwo = ({ data }) => {
  const jmpAndNopIndices = data.reduce((acc, curr, index) => {
    const [operation] = curr.split(" ");
    if (operation === "jmp" || operation === "nop") acc.push(index);
    return acc;
  }, []);

  let res = [];
  let acc = 0;
  let i = 0;
  let jmpOrNopIdx = null;

  while (true) {
    if (i >= data.length) return acc;

    if (res.indexOf(i) !== -1) {
      res = [];
      acc = 0;
      i = 0;
      jmpOrNopIdx = null;
      continue;
    }

    res.push(i);

    let [operation, value] = data[i].split(" ");
    value = parseInt(value, 10);

    if (!jmpOrNopIdx) jmpOrNopIdx = jmpAndNopIndices.shift();
    if (i === jmpOrNopIdx) operation = operation === "jmp" ? "nop" : "jmp";

    if (operation === "acc") {
      acc += value;
      i++;
    } else if (operation === "jmp") i += value;
    else i++;
  }
};

// MAIN
console.log("partOne", partOne({ data }));
console.log("partTwo", partTwo({ data }));
