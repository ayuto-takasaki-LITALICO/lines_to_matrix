import util from "util";
import readline from "readline";
import fs from "fs";

export const readFileAsync = util.promisify(fs.readFile);
export const readAllLinesAsync = (): Promise<string[]> => {
  return new Promise(resolve => {
    const lines: string[] = [];
    const reader = readline.createInterface({
      input: process.stdin
    });
    reader.on("line", (line: string) => {
      lines.push(line);
    });
    reader.on("close", () => {
      resolve(lines);
    });
  });
};

export const readFromFileOrStdin = async (fileName: string): Promise<string> => {
  return fileName
    ? readFileAsync(fileName, "utf8")
    : (await readAllLinesAsync()).join("\n");
};
