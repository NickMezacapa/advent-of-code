import type { Entries } from "./helpers/types";
import { inputMap, scoreMap, gameMap, patternMap } from "./helpers/maps";
import { Puzzle } from "@/lib/types";
import * as fs from "fs";

// DAY 2 - ROCK, PAPER, SCISSORS

const inputFile: string = "src/puzzles/02/test/mockInput.txt";
let inputContent = fs.readFileSync(inputFile, "utf8");

export default class PuzzleSolution {
        input: string;
        constructor(input: string) {
            this.input = input;
        }

        parseInput(): Entries {
            const groups: string[] = this.input.split(/\n/);
            const entries: Entries = groups.map((group) => group.split(" ") as [string]);
            return entries;
        }

        getThrowValue(throwValue: string): string {
            const val: string | undefined = inputMap.get(throwValue);
            if (!val) return "invalid input";
            return val;
        }

        getThrowPoints(throwValue: string): number {
            const points: number | undefined = scoreMap.get(throwValue);
            if (!points) return 0;
            return points;
        }

        getWinner(round: string[]): [string, string, string, string] {
            const opponentThrowVariable = round[0]; // A, B or C
            const userThrowVariable = round[1]; // X, Y or Z

            const userThrowValue = this.getThrowValue(userThrowVariable)!; // rock, paper or scissors
            const opponentThrowValue = this.getThrowValue(opponentThrowVariable)!; // rock, paper or scissors

            let winner: string = "";
            let winnerThrowValue: string = "";
            let loserThrowValue: string = "";
            let tie: boolean = false;

            if (userThrowValue === opponentThrowValue) {
                tie = true;
                return ["tie", winnerThrowValue, loserThrowValue, userThrowValue];
            } else if (userThrowValue === "rock") {
                if (opponentThrowValue === "paper") {
                    winner = "opponent";
                    winnerThrowValue = opponentThrowValue;
                    loserThrowValue = userThrowValue;
                } else {
                    winner = "user";
                    winnerThrowValue = userThrowValue;
                    loserThrowValue = opponentThrowValue;
                }
            } else if (userThrowValue === "paper") {
                if (opponentThrowValue === "scissors") {
                    winner = "opponent";
                    winnerThrowValue = opponentThrowValue;
                    loserThrowValue = userThrowValue;
                } else {
                    winner = "user";
                    winnerThrowValue = userThrowValue;
                    loserThrowValue = opponentThrowValue;
                }
            } else if (userThrowValue === "scissors") {
                if (opponentThrowValue === "rock") {
                    winner = "opponent";
                    winnerThrowValue = opponentThrowValue;
                    loserThrowValue = userThrowValue;
                } else {
                    winner = "user";
                    winnerThrowValue = userThrowValue;
                    loserThrowValue = opponentThrowValue;
                }
            }

            return [winner, winnerThrowValue, loserThrowValue, userThrowValue];
        }

        getGamePoints(winner: string[]): number {
            let winningPlayer: string = winner[0];
            let winningThrowPoints: number = this.getThrowPoints(winner[1]);
            let userThrowPoints: number = this.getThrowPoints(winner[3]);
            let loserThrowPoints: number = this.getThrowPoints(winner[2]);

            let winLossPoints: number = 0;
            let totalUserGamePoints: number = 0;
            let totalOpponentGamePoints: number = 0;

            if (winningPlayer === "tie") {
                winLossPoints = gameMap.get("tie")!;
                totalUserGamePoints = winLossPoints + userThrowPoints;
                totalOpponentGamePoints = winLossPoints + loserThrowPoints;
            }
            if (winningPlayer === "user") {
                winLossPoints = gameMap.get("win")!;
                totalUserGamePoints = winLossPoints + winningThrowPoints;
                totalOpponentGamePoints = gameMap.get("loss")! + loserThrowPoints;
            }
            if (winningPlayer === "opponent") {
                winLossPoints = gameMap.get("loss")!;
                totalOpponentGamePoints = gameMap.get("win")! + userThrowPoints;
                totalUserGamePoints = winLossPoints + loserThrowPoints;
            }

            return totalUserGamePoints;
        }

        calculateSingleRoundScore(round: string[]): [string, number] {
            const winner = this.getWinner(round);
            const gamePoints = this.getGamePoints(winner);
            return [winner[0], gamePoints];
        }

        calculateTotalScore(entries: Entries): number {
            let totalScore: number = 0;
            if (entries.length === 0) return totalScore;

            const helper = (helperInput: Entries): void => {
                if (helperInput.length <= 0) return;
                const round = helperInput[0];
                const roundScore = this.calculateSingleRoundScore(round);
                totalScore += roundScore[1]; 
                console.log(`Round: ${round} - Winner: ${roundScore[0]} - Score: ${roundScore[1]} - Total: ${totalScore}`);   
                helper(helperInput.slice(1));
            }
            helper(entries);

            return totalScore;
        }

/*         getOutcomeFromPattern(round: string[]): string[] {
            let opponentThrow = round[0];
            let opponentThrowValue = this.getThrowValue(opponentThrow);
            
            let neededOutcome =  patternMap.get(round[1])!;

            return [neededOutcome, opponentThrowValue!];
        }

        getThrowFromOutcome(outcome: string[]): string[] {
            const [ neededOutcome, opponentThrowValue ] = outcome;
            let userThrow = "";

            if (neededOutcome === "tie") {
                userThrow = opponentThrowValue;
            }
            if (neededOutcome === "win") {
                if (opponentThrowValue === "rock") {
                    userThrow = "paper";
                }
                if (opponentThrowValue === "paper") {
                    userThrow = "scissors";
                }
                if (opponentThrowValue === "scissors") {
                    userThrow = "rock";
                }
            }
            if (neededOutcome === "loss") {
                if (opponentThrowValue === "rock") {
                    userThrow = "scissors";
                }
                if (opponentThrowValue === "paper") {
                    userThrow = "rock";
                }
                if (opponentThrowValue === "scissors") {
                    userThrow = "paper";
                }
            }
            
            const userThrowKey = Object.values(inputMap).filter((val) => val === userThrow)[0];
            const opponentThrowKey = Object.keys(inputMap).filter((key) => key === opponentThrowValue)[0];

            return [userThrowKey, opponentThrowKey];
        }

        calculatePatternRound(values: string[]): [string, number] {
            const singleRoundScore = this.calculateSingleRoundScore(values);
            return singleRoundScore;
        } */
}

const solution = new PuzzleSolution(inputContent);
const inputText = solution.parseInput();
const score = solution.calculateTotalScore(inputText);
console.log(score);