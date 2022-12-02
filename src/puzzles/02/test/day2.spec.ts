import PuzzleSolution from "../day2";
import * as fs from "fs";

describe("Day 2 - Rock, Paper, Scissors", () => {
    let mockInput: string;
    let mockInputFile: string;

    describe("first puzzle", () => {
        beforeEach(() => {
            mockInputFile = "src/puzzles/02/test/mockInput.txt";
            mockInput = fs.readFileSync(mockInputFile, "utf8");
        });
        describe("calculates the score of a game of rock, paper, scissors", () => {

        });
    });
});