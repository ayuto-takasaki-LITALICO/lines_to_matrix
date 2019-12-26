const _ = require('lodash');
const csv = require('csv');
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const parseCsvAsync = util.promisify(csv.parse);

type MatrixCellData = string | number | boolean | null;
type MatrixRowData = MatrixCellData[];
type MatrixData = MatrixRowData[];

const createEmptyMatrix = (width: number, height: number, initialValue = null) => _.times(height, () => new Array(width).fill(initialValue));
const appendMatrixHeader = (matrix: MatrixData, X: MatrixCellData[], Y: MatrixCellData[]) => [[null, ...X], ...matrix.map((it, idx) => [Y[idx], ...it])];

const linesToMatrix = (lines: string[], xPos = 0, yPos = 1, vPos = 2) => {
  const [X, Y] = [_.uniq(_.map(lines, xPos)), _.uniq(_.map(lines, yPos))];
  const matrix = lines.reduce((m, it) => (m[Y.indexOf(it[yPos])][X.indexOf(it[xPos])] = it[vPos], m), createEmptyMatrix(X.length, Y.length));
  return appendMatrixHeader(matrix, X, Y);
};

(async function main() {
  const path = process.argv[2];
  const content = await readFileAsync(path, 'utf8');
  const csvLines = await parseCsvAsync(content);
  const csvLinesSorted = _.orderBy(csvLines, [0, 1])
  const matrix = linesToMatrix(csvLinesSorted, 0, 1, 4);
  console.log(matrix.map((it) => it.join(",")).join("\n"));
})();
