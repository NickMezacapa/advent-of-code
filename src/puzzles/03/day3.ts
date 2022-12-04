import type { Entries } from "@/lib/types";
import * as fs from "fs";
import alphabetMap from "./helpers/alphabetMap";

const inputFile: string = "src/puzzles/03/test/mockInput.txt";
let inputContent = fs.readFileSync(inputFile, "utf8");

export default class PuzzleSolution {
    input: string;
    constructor(input: string) {
        this.input = input;
    }

    parseInput(): Entries | string {
        if (this.input == "") return "invalid input";
        const groups: string[] = this.input.split(/\n/);
        const entries: Entries = groups.map((group) => group.split(" ") as [string]);
        entries.forEach((entry) => {
            const firstHalf = entry[0].slice(0, entry[0].length / 2);
            const secondHalf = entry[0].slice(entry[0].length / 2);
            entry[0] = firstHalf;
            entry.push(secondHalf);
        });
        return entries;
    }
   
    compareStrings(arrayElement: string[]): string {
        const firstString = arrayElement[0];
        const secondString = arrayElement[1];
        let result: string = "";
        if (firstString.length !== secondString.length) return "invalid input";
        if (firstString === secondString) return "invalid input";
        for (let i = 0; i < secondString.length; i++) {
            const char = secondString[i];
            if (!firstString.includes(char)) {
                result = char;
                break;
            }
        }
        return result;
    }

    getLetterPriority(letter: string): number {
        const priority: number | undefined = alphabetMap.get(letter);
        if (!priority) return 0;
        return priority;
    }

    checkAllRucksacks(entries: Entries): number[] | string {
        const priorities: number[] = [];
        const helper = (entries: Entries): void => {
            if (entries.length === 0) return;
            const firstElement = entries[0];
            const result = this.compareStrings(firstElement);
            const priority = this.getLetterPriority(result);
            priorities.push(priority);
            entries.shift();
            helper(entries);
        }
        helper(entries);
        return priorities;
    }

    sumArrayElements(array: number[]): number {
        if (array.length <= 0) return 0;
        const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
        return array.reduce(reducer);
    }

    solvePart1(): number {
        const entries = this.parseInput();
        const priorities = this.checkAllRucksacks(entries as Entries);
        const sum = this.sumArrayElements(priorities  as number[]);
        return sum;
    }
}
const puzzle = new PuzzleSolution(inputContent);
