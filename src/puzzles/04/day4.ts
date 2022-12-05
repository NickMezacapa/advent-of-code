import { Entries } from "@/lib/types";
import * as fs from "fs";

const inputFile: string = "src/puzzles/04/test/mockInput.txt";
let inputContent = fs.readFileSync(inputFile, "utf8");


export default class PuzzleSolution {
    input: string;
    constructor(input: string) {
        this.input = input;
    }
}