"use strict";

const { readFileSync } = require("../../shared/loadFile");

const path = "input.txt";
let data = readFileSync({ path }).split("\n");

// UTILS
const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];
const splitPass = splitAt(7);

// HELPER METHODS
const findSeat = (entry) => {
  let min = 0;
  let max = Math.pow(2, Math.floor(entry.length)) - 1;

  for (let i = 0; i < entry.length; i++) {
    if (entry[i] === "F" || entry[i] === "L")
      max = Math.floor((max - min) / 2) + min;
    else min = Math.ceil((max - min) / 2) + min;
  }

  return min;
};

// PART ONE
const partOne = ({ data }) =>
  Math.max(
    ...data.reduce((acc, pass) => {
      const [row, column] = splitPass(pass);
      acc.push(findSeat(row) * 8 + findSeat(column));
      return acc;
    }, [])
  );

// PART TWO
const partTwo = ({ data }) => {
  let res = data.reduce((acc, pass) => {
    let [row, column] = splitPass(pass);

    row = findSeat(row);
    column = findSeat(column);

    if (!acc[row]) acc[row] = [column];
    else acc[row].push(column);
    return acc;
  }, {});

  // Delete first/last incomplete columns
  let keys = Object.keys(res);
  delete res[keys[0]];
  delete res[keys[keys.length - 1]];

  const [row, columns] = Object.entries(res).find(
    ([, columns]) => columns.length !== 8
  );

  for (let i = 0; i < 8; i++) {
    if (columns.indexOf(i) === -1) return row * 8 + i;
  }

  return -1;
};

// MAIN
console.log("partOne", partOne({ data }));
console.log("partTwo", partTwo({ data }));
