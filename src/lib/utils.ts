import * as fs from "fs";

export function readInputFile(filePath: string): string {
    return fs.readFileSync (filePath, "utf8");
};
