import { Puzzle } from "@/lib/types";
import * as fs from "fs";

const inputFile: string = "src/puzzles/01/input.txt";
let inputContent = fs.readFileSync(inputFile, "utf8");


export class PuzzleSolution {
  input: string;
  constructor(input: string) {
    this.input = input;
  }

  parsePerElfCalories(): number[] {
    const elfGroups = this.input.split(/\n\s*\n/);
    return elfGroups.map((group) => {
      const answers = group.split(/\n/).map((line) => parseInt(line, 10));
      return answers.reduce((acc, answer) => acc + answer, 0);
    });
  }

  solvePart1(): Promise<number> | number {
    if (this.input.length === 0 ) return 0;
    return Math.max(...this.parsePerElfCalories());
  }

  solvePart2(): Promise<number> | number {
    if (this.input.length === 0 ) return 0;
    return this.parsePerElfCalories()
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((acc, answer) => acc + answer, 0);
  }
}

export default {
  day: "01",
  name: "Couting Calories",
  input: inputContent,
  solvePart1: (input: string) => new PuzzleSolution(input).solvePart1(),
  solvePart2: (input: string) => new PuzzleSolution(input).solvePart2(),
} as Puzzle;


// print the solutions for day 1
const puzzle = new PuzzleSolution(inputContent);
console.log("Day 1 - Couting Calories");
console.log("Part 1: ", puzzle.solvePart1());
console.log("Part 2: ", puzzle.solvePart2());










