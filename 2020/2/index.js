"use strict";

const { readFileSync } = require("../../shared/loadFile");

const path = "input.txt";
const data = readFileSync({ path }).split("\n");

// PART ONE
const partOne = ({ data }) => {
  return data.reduce((acc, elem) => {
    let [frequency, letter, password] = elem.split(" ");
    letter = letter.slice(0, -1);

    let counter = 0;
    for (let i = 0; i < password.length; i++) {
      if (password[i] === letter) counter++;
    }

    const [min, max] = frequency.split("-");
    if (counter >= min && counter <= max) acc++;

    return acc;
  }, 0);
};

// PART TWO
const partTwo = ({ data }) => {
  return data.reduce((acc, elem) => {
    let [position, letter, password] = elem.split(" ");
    const [first, second] = position.split("-");
    letter = letter.slice(0, -1);

    if (
      (password[first - 1] === letter && password[second - 1] !== letter) ||
      (password[first - 1] !== letter && password[second - 1] === letter)
    )
      acc++;

    return acc;
  }, 0);
};

// MAIN
console.log("partOne", partOne({ data }));
console.log("partTwo", partTwo({ data }));
