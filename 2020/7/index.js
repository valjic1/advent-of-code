"use strict";

const { readFileSync } = require("../../shared/loadFile");

const path = "input.txt";
let data = readFileSync({ path }).split("\n");

// UTILS

class Node {
  constructor(title) {
    this.title = title;
    this.next = [];
    this.previous = [];
  }
}

class List {
  constructor() {
    this.nodes = [];
  }
}

const createList = ({ data }) => {
  let nodes = [];
  let edges = [];

  for (let row of data) {
    const [source, destinations] = row.split(" bags contain ");

    if (nodes.indexOf(source) === -1) nodes.push(source);

    destinations.split(", ").forEach((destination) => {
      const [count, prefix, color] = destination.split(" bag")[0].split(" ");
      if (!isNaN(count)) {
        const prettyDest = `${prefix} ${color}`;
        if (nodes.indexOf(prettyDest) === -1) nodes.push(prettyDest);
        edges.push([source, prettyDest, count]);
      }
    });
  }

  const list = new List();

  nodes.forEach((nodeTitle) => {
    const newNode = new Node(nodeTitle);
    list.nodes.push(newNode);
  });

  edges.forEach((edge) => {
    const [source, destination] = edge;

    const sourceNode = list.nodes.find((node) => node.title === source);
    const destinationNode = list.nodes.find(
      (node) => node.title === destination
    );

    if (sourceNode.next.indexOf(destinationNode.title) === -1)
      sourceNode.next.push(destinationNode.title);

    if (destinationNode.previous.indexOf(sourceNode.title) === -1)
      destinationNode.previous.push(sourceNode.title);
  });

  return [list, edges];
};

// PART ONE
const partOne = ({ data }) => {
  const [list] = createList({ data });
  let shinyGoldNode = list.nodes.find((node) => node.title === "shiny gold");

  let visited = [];

  const traverse = (list, node) => {
    if (!node.previous.length) return;

    for (let i = 0; i < node.previous.length; i++) {
      const nodeTitle = node.previous[i];
      const realNode = list.nodes.find((node) => node.title === nodeTitle);
      if (visited.indexOf(nodeTitle) === -1) visited.push(nodeTitle);
      traverse(list, realNode);
    }
  };

  traverse(list, shinyGoldNode);
  return visited.length;
};

// PART TWO
const partTwo = ({ data }) => {
  const [list, edges] = createList({ data });
  let tail = list.nodes.find((node) => node.title === "shiny gold");

  let result = "";
  let visited = [];

  const traverse = (list, node, multiplier = 1) => {
    if (!node.next.length) {
      return;
    } else {
      for (let i = 0; i < node.next.length; i++) {
        const nodeTitle = node.next[i];
        const realNode = list.nodes.find((node) => node.title === nodeTitle);
        const [, , bagCount] = edges.find(
          ([s, d]) => s === node.title && d === nodeTitle
        );

        result += multiplier + "*" + bagCount + "+";
        if (visited.indexOf(nodeTitle) === -1) visited.push(nodeTitle);

        traverse(list, realNode, multiplier * bagCount);
      }
    }
  };

  traverse(list, tail);
  return eval(result + "0");
};

// MAIN
console.log("partOne", partOne({ data }));
console.log("partTwo", partTwo({ data }));
