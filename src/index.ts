import stringify from "csv-stringify";
import parse from "csv-parse";
import fs from "fs";
import util from "util";
import commander from "commander";
import readline from "readline";
import { MatrixBuilder } from "./matrix_builder";

const parseCsvAsync = util.promisify<any, any, any>(parse);
const stringifyCsvAsync = util.promisify<any, any>(stringify);

const readFileAsync = util.promisify(fs.readFile);
const readAllLinesAsync = (): Promise<string[]> => {
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

const readFromFileOrStdin = async (fileName: string): Promise<string> => {
  return fileName
    ? readFileAsync(fileName, "utf8")
    : (await readAllLinesAsync()).join("\n");
};

const initL2mCommand = (): commander.Command => {
  return new commander.Command()
    .name("l2m")
    .usage("[options] <file>")
    .version("1.0.0")
    .option(
      "-y, --y-position <position>",
      "縦方向のラベルを表す列の位置を指定します",
      /^\d+$/i,
      "0"
    )
    .option(
      "-x, --x-position, <position>",
      "横方向のラベルを表す列の位置を指定します",
      /^\d+$/i,
      "1"
    )
    .option(
      "-v, --value-position, <position>",
      "値を表す列の位置を指定します",
      /^\d+$/i,
      "2"
    )
    .option(
      "--y-order <order>",
      "縦方向のラベルの並び順を指定します",
      /^(asc|desc)$/i,
      null
    )
    .option(
      "--x-order <order>",
      "横方向のラベルの並び順を指定します",
      /^(asc|desc)$/i,
      null
    )
    .option("--na-as <value>}", "N/Aの箇所の表示内容を指定します", "")
    .option(
      "--from-line <number>",
      "CSVの解析を始める行番号を指定します",
      /^\d+$/i,
      "1"
    )
    .arguments("<file>");
};

const importCsv = async (program: commander.Command): Promise<any[][]> => {
  const fileName = program.args[0];
  const fromLine = Number(program.fromLine);
  const content = await readFromFileOrStdin(fileName);
  return parseCsvAsync(content, { from_line: fromLine });
};

const commanderProgramToOptions = (program: commander.Command) => {
  return {
    yPosition: Number(program.yPosition),
    xPosition: Number(program.xPosition),
    valuePosition: Number(program.valuePosition),
    xOrder: program.xOrder,
    yOrder: program.yOrder,
    naAs: program.naAs
  };
};

(async function main() {
  const program = initL2mCommand().parse(process.argv);
  const matrix = new MatrixBuilder(
    await importCsv(program),
    commanderProgramToOptions(program)
  ).build();
  const result = await stringifyCsvAsync(matrix);
  process.stdout.write(result);
})();
