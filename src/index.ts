import stringify from "csv-stringify";
import parse from "csv-parse";
import fs from "fs";
import util from "util";
import { MatrixBuilder } from "./matrix_builder";

const readFileAsync = util.promisify(fs.readFile);
const parseCsvAsync = util.promisify<any, any>(parse);
const stringifyCsvAsync = util.promisify<any, any>(stringify);

(async function main() {
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
})();
