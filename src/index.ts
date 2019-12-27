import stringify from "csv-stringify";
import parse from "csv-parse";
import fs from "fs";
import util from "util";
import commander from "commander";
import { MatrixBuilder } from "./matrix_builder";

const readFileAsync = util.promisify(fs.readFile);
const parseCsvAsync = util.promisify<any, any>(parse);
const stringifyCsvAsync = util.promisify<any, any>(stringify);

const program = new commander.Command();
program
  .name("l2m")
  .usage('[options] <file>')
  .version('1.0.0')
  .option('-v, --value-position, <position>', '値を表す列の位置を指定します', /^\d+$/i, "2")
  .option('-x, --x-position, <position>', '横方向のラベルを表す列の位置を指定します', /^\d+$/i, "1")
  .option('-y, --y-position <position>', '縦方向のラベルを表す列の位置を指定します', /^\d+$/i, "0")
  .option('--y-order <order>', '縦方向のラベルの並び順を指定します', /^(asc|desc)$/i, null)
  .option('--x-order <order>', '横方向のラベルの並び順を指定します', /^(asc|desc)$/i, null)
  .option('--na-as <value>}', 'N/Aの箇所の表示内容を指定します', '')
  .arguments('<file>')
  .parse(process.argv);

async function main() {
  const path = process.argv[2];
  const content = await readFileAsync(path, "utf8");
  const csvLines = await parseCsvAsync(content);
  const matrix = new MatrixBuilder(csvLines, {
    yPosition: 0,
    xPosition: 1,
    valuePosition: 2,
    xOrder: "asc",
    yOrder: "asc",
    naAs: ""
  }).build();
  const result = await stringifyCsvAsync(matrix);
  process.stdout.write(result);
};
main();
