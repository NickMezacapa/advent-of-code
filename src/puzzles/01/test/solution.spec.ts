import * as fs from "fs";
import { PuzzleSolution } from "../solution";


describe("Day 01 - Couting Calories", () => {
    let puzzle: PuzzleSolution;
    let mockInput: string;
    let mockInputFile: string;
    let result: Promise<number> | number;
    let expected: Promise<number> | number;

    describe("first puzzle", () => {
        beforeEach(async () => {
            mockInputFile = "src/puzzles/01/test/mockInput.txt";
            mockInput = fs.readFileSync(mockInputFile, "utf8");
            puzzle = new PuzzleSolution(mockInput);
            result = await puzzle.solvePart1();
            expected = 240;
        })
        describe("finds the elf carrying the most calories", () => {
            describe("parsePerElfCalories", () => {
                describe("a class method to handle the given input string", () => {
                    it("is defined", () => {
                        expect(puzzle.solvePart1).toBeDefined();
                    });
                    it("returns something", () => {
                        expect(result).toBeDefined();
                    });
                    it("returns an array of numbers", () => {
                        // expect puzzle.parsePerElfCalories to return an array of numbers
                        expect(puzzle.parsePerElfCalories()).toBeInstanceOf(Array);
                    });
                });
            });
            describe("solves part 1", () => {
                it("returns the max amount of calories carried by a single elf", async () => {
                    expect(result).toEqual(expected);
                });
                it("returns 0 if the input string is empty", () => {
                    puzzle = new PuzzleSolution("");
                    result = puzzle.solvePart1();
                    expect(result).toEqual(0);
                });
            });
        });
    });
    describe("second puzzle", () => {
        beforeEach(async () => {
            mockInputFile = "src/puzzles/01/test/mockInput.txt";
            mockInput = fs.readFileSync(mockInputFile, "utf8");
            puzzle = new PuzzleSolution(mockInput);
            result = await puzzle.solvePart2();
            expected = 450;
        });
        describe("sums the top 3 elves carrying the most calories", () => {
            describe("solves part 2", () => {
                it("returns the sum of the top 3 elves carrying the most calories", async () => {
                    expect(result).toEqual(expected);
                });
                it("returns 0 if the input string is empty", () => {
                    puzzle = new PuzzleSolution("");
                    result = puzzle.solvePart2();
                    expect(result).toEqual(0);
                });
            });
        });
    });
});