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
    const elfGroups = this.input.split(/\n\s*\n/); // split on empty lines to get groups of elves
    return elfGroups.map((group) => {
      const answers = group.split(/\n/).map((line) => parseInt(line, 10)); // split on new lines to get answers and convert to numbers
      return answers.reduce((acc, answer) => acc + answer, 0); // sum the answers, return in array
    });
  }

  solvePart1(): Promise<number> | number {
    if (this.input.length === 0 ) return 0;
    return Math.max(...this.parsePerElfCalories()); 
  }

  solvePart2(): Promise<number> | number {
    if (this.input.length === 0 ) return 0;
    return this.parsePerElfCalories()
      .sort((a, b) => b - a) // sort in descending order
      .slice(0, 3) // get the top 3
      .reduce((acc, answer) => acc + answer, 0); // sum the top 3
  }
}

/* istanbul ignore next */
export default {
  day: "01",
  name: "Couting Calories",
  input: inputContent,
  solvePart1: (input: string) => new PuzzleSolution(input).solvePart1(),
  solvePart2: (input: string) => new PuzzleSolution(input).solvePart2(),
} as Puzzle;


const puzzle = new PuzzleSolution(inputContent);










