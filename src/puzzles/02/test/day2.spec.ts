import PuzzleSolution from "../day2";
import * as fs from "fs";

describe("Day 2 - Rock, Paper, Scissors", () => {
    let solution: PuzzleSolution;
    let mockInput: string;
    let mockInputFile: string;
    let user: string;
    let opponent: string;

    describe("first puzzle", () => {
        beforeEach(() => {
            mockInputFile = "src/puzzles/02/test/mockInput.txt";
            mockInput = fs.readFileSync(mockInputFile, "utf8");
            solution = new PuzzleSolution(mockInput);
            user = "user";
            opponent = "opponent";
        });
        describe("calculates the score of a game of rock, paper, scissors", () => {
            describe("parses the input argument to a readable variable", () => {
                describe("instance of .parseInput()", () => {
                    it("returns an array of arrays", () => {
                        const result = solution.parseInput();
                        expect(result).toEqual([["A", "Y"], ["B", "X"], ["C", "Z"]]);
                    });
                    it("formats the input correctly", () => {
                        const result = solution.parseInput();
                        expect(result[0][0]).toEqual("A");
                    });
                });
            });
            describe("translates each encrypted input to rock, paper or scissors", () => {
                describe("instance of .getThrowValue()", () => {
                    describe("searches a Map of decrypted variables for a corresponding value", () => {
                        it("returns the correct corresponding value", () => {
                            const result = solution.getThrowValue("A");
                            expect(result).toEqual("rock");
                        });
                        it("returns an error message if there is no match in the Map", () => {
                            const result = solution.getThrowValue("D");
                            expect(result).toContain("invalid");
                        });
                    });
                });
            });
            describe("assigns a point value for each throw", () => {
                describe("instance of .getThrowPoints()", () => {
                    describe("searches a Map of predefined scores for each throw possibility", () => {
                        it("returns the correct corresponding value", () => {
                            const result = solution.getThrowPoints("rock");
                            expect(result).toEqual(1);
                        });
                        it("returns 0 if there is no match in the Map", () => {
                            const result = solution.getThrowPoints("invalid");
                            expect(result).toEqual(0);
                        });
                    });
                });
            });
            describe("compares the user's throw to the opponent's throw", () => {
                describe("instance of .getWinner()", () => {
                    describe("returns the winner, the winner's throw, the loser's throw and the tie status", () => {
                        it("returns a tie if the user and opponent throw the same value", () => {
                            const result = solution.getWinner(["A", "X"]);
                            expect(result[0]).toEqual("tie");
                        });
                        it("returns the correct winner if the user throws rock and the opponent throws scissors", () => {
                            const result = solution.getWinner(["C", "X"]);
                            expect(result[0]).toEqual(user);
                        });
                        it("returns the correct winner if the user throws rock and the opponent throws paper", () => {
                            const result = solution.getWinner(["B", "X"]);
                            expect(result[0]).toEqual(opponent);
                        });
                        it("returns the correct winner if the user throws paper and the opponent throws rock", () => {
                            const result = solution.getWinner(["A", "Y"]);
                            expect(result[0]).toEqual(user);
                        });
                        it("returns the correct winner if the user throws paper and the opponent throws scissors", () => {
                            const result = solution.getWinner(["C", "Y"]);
                            expect(result[0]).toEqual(opponent);
                        });
                        it("returns the correct winner if the user throws scissors and the opponent throws rock", () => {
                            const result = solution.getWinner(["A", "Z"]);
                            expect(result[0]).toEqual(opponent);
                        });
                        it("returns the correct winner if the user throws scissors and the opponent throws paper", () => {
                            const result = solution.getWinner(["B", "Z"]);
                            expect(result[0]).toEqual(user);
                        });
                    });
                });
            });
            describe("assigns extra points based off a win, loss or tie", () => {
                describe("instance of .getGamePoints()", () => {
                    describe("searches a Map of predefined scores for each game outcome", () => {
                        it("returns the score for the throw added to the score for the outcome", () => {
                            const winner = solution.getWinner(["A", "Y"]);
                            const result = solution.getGamePoints(winner);
                            expect(result).toEqual(8);
                        });
                        it("assigns 0 points for a loss", () => {
                            const winner = solution.getWinner(["A", "Z"]);
                            const result = solution.getGamePoints(winner);
                            expect(result).toEqual(3);
                        });
                        it("assigns 3 points for a tie", () => {
                            const winner = solution.getWinner(["A", "X"]);
                            const result = solution.getGamePoints(winner);
                            expect(result).toEqual(4);
                        });
                        it("assigns 6 points for a win", () => {
                            const winner = solution.getWinner(["C", "X"]);
                            const result = solution.getGamePoints(winner);
                            expect(result).toEqual(7);
                        });
                    });
                });
            });
            describe("recursively repeats for each game in the input", () => {
                describe("instance of .calculateTotalScore()", () => {
                    describe("uses a recursive helper function - helper()", () => {
                        it("returns the sum of each game outcome in an input array", () => {
                            const input = solution.parseInput();
                            const result = solution.calculateTotalScore(input);
                            expect(result).toEqual(15);
                        });
                        it("returns 0 if there are no games to score", () => {
                            const input: [] = [];
                            const result = solution.calculateTotalScore(input);
                            expect(result).toEqual(0);
                        });
                    });
                });
            });
        });
    });
});