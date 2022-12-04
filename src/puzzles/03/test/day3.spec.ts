import * as fs from "fs";
import PuzzleSolution from "../day3";
import { Entries } from '../../../lib/types';

describe("Day 03 - Rucksack Reorganization", () => {
    describe("first puzzle", () => {
        let solution: PuzzleSolution;
        let mockInput: string;
        let mockInputFile: string;

        beforeEach(() => {
            mockInputFile = "src/puzzles/03/test/mockInput.txt";
            mockInput = fs.readFileSync(mockInputFile, "utf8");
            solution = new PuzzleSolution(mockInput);
        });
        describe("prioritizes rucksack item rearrangement based on values", () => {
            describe("parseInput method", () => {
                describe("parses input .txt file into an array of arrays", () => {
                    it("should be defined", () => {
                        expect(solution.parseInput).toBeDefined();
                    });
                    it("returns an error message if the input type is invalid", () => {
                        const solution = new PuzzleSolution("");
                        const actual = solution.parseInput();
                        expect(actual).toContain("invalid");
                    });
                    it("returns an error message if the input string is empty", () => {
                        const solution = new PuzzleSolution("");
                        const actual = solution.parseInput();
                        expect(actual).toContain("invalid");
                    });
                    it("returns an array of arrays", () => {
                        const expected: [string, string][] = [
                            [ 'vJrwpWtwJgWr', 'hcsFMMfFFhFp' ],
                            [ 'jqHRNqRjqzjGDLGL', 'rsFMfFZSrLrFZsSL' ],
                            [ 'PmmdzqPrV', 'vPwwTWBwg' ],
                            [ 'wMqvLMZHhHMvwLH', 'jbvcjnnSBnvTQFn' ],
                            [ 'ttgJtRGJ', 'QctTZtZT' ],
                            [ 'CrZsJsPPZsGz', 'wwsLwLmpwMDw' ]
                          ];
                        const actual = solution.parseInput();
                        expect(actual).toEqual(expected);
                    });
                    it("returns an array of arrays each containing two strings", () => {
                        const actual = solution.parseInput();
                        expect(actual[0].length).toEqual(2);
                    });
                    it("returns an array of arrays each containing two strings of equal length", () => {
                        const actual = solution.parseInput();
                        expect(actual[0][0].length).toEqual(actual[0][1].length);
                    });
                });
            });
            describe("compareStrings method", () => {
                describe("compares two strings within an array for common characters", () => {
                    it("should be defined", () => {
                        expect(solution.compareStrings).toBeDefined();
                    });
                    it("returns a string", () => {
                        const actual = solution.compareStrings(["abc", "Abc"]);
                        expect(typeof actual).toEqual("string");
                    });
                    it("returns a single character", () => {
                        const actual = solution.compareStrings(["abc", "Abc"]);
                        expect(actual.length).toEqual(1);
                    });
                    it("returns an error message if the strings are the same", () => {
                        const actual = solution.compareStrings(["abc", "abc"]);
                        expect(actual).toContain("invalid");
                    });
                    it("returns an error message if the strings are not the same length", () => {
                        const actual = solution.compareStrings(["abc", "abcd"]);
                        expect(actual).toContain("invalid");
                    });
                    it("returns the character that is not common to both strings", () => {
                        const actual = solution.compareStrings(["abc", "Abc"]);
                        expect(actual).toEqual("A");
                    });
                });
            });
            describe("getLetterPriority method", () => {
                describe("searches a predefined map of priority values for a given letter", () => {
                    it("should be defined", () => {
                        expect(solution.getLetterPriority).toBeDefined();
                    });
                    it("returns a number", () => {
                        const actual = solution.getLetterPriority("a");
                        expect(typeof actual).toEqual("number");
                    });
                    it("returns a number between 1 and 52 for the given letter", () => {
                        const actual = solution.getLetterPriority("a");
                        expect(actual).toBeGreaterThanOrEqual(1);
                        expect(actual).toBeLessThanOrEqual(52);
                    });
                    it("returns 0 if the given letter is not a key in the map", () => {
                        const actual = solution.getLetterPriority("!");
                        expect(actual).toEqual(0);
                    });
                });
                describe("returns the correct value for the given letter", () => {
                    it("returns 1 for 'a'", () => {
                        const actual = solution.getLetterPriority("a");
                        expect(actual).toEqual(1);
                    });
                    it("returns 26 for 'z'", () => {
                        const actual = solution.getLetterPriority("z");
                        expect(actual).toEqual(26);
                    });
                    it("returns 27 for 'A'", () => {
                        const actual = solution.getLetterPriority("A");
                        expect(actual).toEqual(27);
                    });
                    it("returns 52 for 'Z'", () => {
                        const actual = solution.getLetterPriority("Z");
                        expect(actual).toEqual(52);
                    });
                });
            });
            describe("checkAllRucksacks method", () => {
                let input: Entries;
                let actual: number[] | string;

                beforeEach(() => {
                    input = solution.parseInput() as Entries;
                    actual = solution.checkAllRucksacks(input);
                });
                describe("uses helper-method recursion to compare strings in each array element", () => {
                    it("should be defined", () => {
                        expect(solution.checkAllRucksacks).toBeDefined();
                    });
                    it("returns an array of numbers when given valid input", () => {
                        expect(typeof actual).toEqual("object");
                    });
                    describe("adds the priority value of each returned character to an array", () => {
                        describe(".push(x)", () => {
                            it("adds an input element to the end of an array", () => {
                                const array = [1, 2, 3];
                                array.push(4);
                                expect(array).toEqual([1, 2, 3, 4]);
                            });
                            it("adds an input element that is the same type as the input array", () => {
                                const array = [1, 2, 3];
                                array.push(4);
                                expect(typeof array[3]).toEqual("number");
                            });
                            it("adds an input element to an array that is empty", () => {
                                const array = [];
                                array.push(4);
                                expect(array).toEqual([4]);
                            });
                            it("adds an input number to an array containing numbers", () => {
                                const array = [1, 2, 3];
                                array.push(4);
                                expect(array).toEqual([1, 2, 3, 4]);
                            });
                        });
                    });
                    describe("is called for the length of the input array", () => {
                        it("calls the compareStrings method for each array element", () => {
                            jest.spyOn(solution, "compareStrings");
                            solution.checkAllRucksacks(input);
                            expect(solution.compareStrings).toHaveBeenCalledTimes(input.length);
                        });
                        it("adds a priority value for each element in the input array", () => {
                            const actual = solution.checkAllRucksacks(input);
                            expect(actual.length).toEqual(input.length);
                        });
                    });
                });
            });
            describe("sumArrayElements method", () => {
                describe("sums all numbers within an array of numbers", () => {
                    it("should be defined", () => {
                        expect(solution.sumArrayElements).toBeDefined();
                    });
                    it("returns a number", () => {
                        const actual = solution.sumArrayElements([1, 2, 3]);
                        expect(typeof actual).toEqual("number");
                    });
                    it("returns 0 if the input array is empty", () => {
                        const actual = solution.sumArrayElements([]);
                        expect(actual).toEqual(0);
                    });
                    describe("uses Array.prototype.reduce()", () => {
                        it("returns a single number", () => {
                            const actual = solution.sumArrayElements([1, 2, 3]);
                            expect(typeof actual).toEqual("number");
                        });
                        it("returns the correct sum of all numbers in the input array", () => {
                            const actual = solution.sumArrayElements([1, 2, 3]);
                            expect(actual).toEqual(6);
                        });
                        it("returns Infinity when summing Infinity", () => {
                            const actual = solution.sumArrayElements([Infinity, 20000000000000, Infinity]);
                            expect(actual).toEqual(Infinity);
                        });
                        it("sums negative numbers", () => {
                            const actual = solution.sumArrayElements([-1, -2, -3]);
                            expect(actual).toEqual(-6);
                        });
                        it("returns negative Infinity when summing negative Infinity", () => {
                            const actual = solution.sumArrayElements([-Infinity, -20000000000000, -Infinity]);
                            expect(actual).toEqual(-Infinity);
                        });
                    });
                });
            });
            describe("solvePart1 method", () => {
                describe("a method to quickly find the solution to part 1 of the puzzle", () => {
                    describe("returns the correct answer for part 1", () => {
                        it("should be defined", () => {
                            expect(solution.solvePart1).toBeDefined();
                        });
                        it("returns a number", () => {
                            const actual = solution.solvePart1();
                            expect(typeof actual).toEqual("number");
                        });
                        it("returns a value greater than 0", () => {
                            const actual = solution.solvePart1();
                            expect(actual).toBeGreaterThan(0);
                        });
                        it("returns the correct answer for part 1", () => {
                            const actual = solution.solvePart1();
                            expect(actual).toEqual(124);
                        });
                    });
                });
            });
        });
    });
});