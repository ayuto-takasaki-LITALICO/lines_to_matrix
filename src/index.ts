import _ from "lodash";
import stringify from "csv-stringify";
import parse from "csv-parse";
import fs from "fs";
import util from "util";

const readFileAsync = util.promisify(fs.readFile);
const parseCsvAsync = util.promisify<any, any>(parse);
const stringifyCsvAsync = util.promisify<any, any>(stringify);

type MatrixCellData = string | number | boolean | null;
type MatrixRowData = MatrixCellData[];
type MatrixData = MatrixRowData[];
enum Order {
  asc = "asc",
  desc = "desc"
}

const createEmptyMatrix = (
  width: number,
  height: number,
  initialValue = null
) => _.times(height, () => new Array(width).fill(initialValue));
const appendMatrixHeader = (
  matrix: MatrixData,
  X: MatrixCellData[],
  Y: MatrixCellData[]
) => [[null, ...X], ...matrix.map((it, idx) => [Y[idx], ...it])];

function linesToMatrix(
  source: MatrixData,
  { y = 1, x = 2, v = 3, xOrder = Order.asc, yOrder = Order.asc } = {}
): MatrixData {
  const sorted = _.orderBy(source, [
    [y, yOrder],
    [x, xOrder]
  ]);
  const X = _.uniq(_.map(sorted, x));
  const Y = _.uniq(_.map(sorted, y));
  const matrix = createEmptyMatrix(X.length, Y.length, null);
  sorted.forEach((it) => {
    matrix[Y.indexOf(it[y])][X.indexOf(it[x])] = it[v];
  });
  return appendMatrixHeader(matrix, X, Y);
}

(async function main() {
  const path = process.argv[2];
  const content = await readFileAsync(path, "utf8");
  const csvLines = await parseCsvAsync(content);
  const matrix = linesToMatrix(csvLines, {y: 0, x: 1, v: 2});
  console.log(await stringifyCsvAsync(matrix));
})();
