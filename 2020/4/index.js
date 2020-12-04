"use strict";

const { readFileSync } = require("../../shared/loadFile");

const path = "input.txt";
let data = readFileSync({ path }).concat("\n").split("\n");

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

// UTILS
const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];
const splitHeight = splitAt(-2);

// VALIDATOR PART ONE
const validatorPartOne = (passport) => (field) => passport[field] !== undefined;

// VALIDATOR PART TWO
const validatorPartsTwo = (passport) => (field) => {
  const input = passport[field];
  if (!input) return false;

  switch (field) {
    case "byr":
      return input >= 1920 && input <= 2002;

    case "iyr":
      return input >= 2010 && input <= 2020;

    case "eyr":
      return input >= 2020 && input <= 2030;

    case "hgt": {
      const [value, suffix] = splitHeight(input);
      if (suffix === "cm") return value >= 150 && value <= 193;
      else if (suffix === "in") return value >= 59 && value <= 76;
      else return false;
    }

    case "hcl":
      return /^#[0-9a-f]{6}/.test(input);

    case "ecl":
      return eyeColors.indexOf(input) !== -1;

    case "pid":
      return /^[0-9]{9}$/.test(input);

    default:
      return true;
  }
};

// CORE METHOD
const core = ({ data, validator }) => {
  let ans = 0;
  let passport = {};

  for (let row of data) {
    if (row === "") {
      const validate = validator(passport);
      let isValid = true;

      for (let field of requiredFields) {
        if (!validate(field)) {
          isValid = false;
          break;
        }
      }

      if (isValid) ans++;
      passport = {};
    } else {
      row.split(" ").forEach((field) => {
        const [key, value] = field.split(":");
        passport[key] = value;
      });
    }
  }

  return ans;
};

// MAIN
console.log("partOne", core({ data, validator: validatorPartOne }));
console.log("partTwo", core({ data, validator: validatorPartsTwo }));
