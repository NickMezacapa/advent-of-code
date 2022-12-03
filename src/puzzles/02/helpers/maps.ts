/* istanbul ignore file */
export const inputMap = new Map([
    ["A", "rock"],
    ["B", "paper"],
    ["C", "scissors"],
    ["X", "rock"],
    ["Y", "paper"],
    ["Z", "scissors"],
]);
export const scoreMap = new Map([
    ["rock", 1],
    ["paper", 2],
    ["scissors", 3],
]);
export const gameMap = new Map([
    ["tie", 3],
    ["win", 6],
    ["loss", 0],
]);
export const patternMap = new Map([
    ["Y", "tie"],
    ["Z", "win"],
    ["X", "loss"],
]);