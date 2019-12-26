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
type MatrixBuilderOptions = {
  y: number;
  x: number;
  v: number;
  xOrder: Order;
  yOrder: Order;
};
enum Order {
  asc = "asc",
  desc = "desc"
}

class MatrixBuilder {
  matrix: MatrixData;
  X: MatrixRowData;
  Y: MatrixRowData;
  source: MatrixData;
  options: MatrixBuilderOptions;

  constructor(source: MatrixData, options: MatrixBuilderOptions) {
    this.source = source;
    this.options = options;
    this.matrix = [];
    this.X = [];
    this.Y = [];
  }

  build(): MatrixData {
    this.init();
    this.readLines();
    return this.exportWithHeader();
  }

  init(): void {
    const sorted = this.sortedData;
    this.X = _.uniq(_.map(sorted, this.options.x));
    this.Y = _.uniq(_.map(sorted, this.options.y));
    this.matrix = this.createEmptyMatrix(this.X.length, this.Y.length, null);
  }

  readLines(): void {
    this.source.forEach(row => {
      const yTitle = row[this.options.y];
      const xTitle = row[this.options.x];
      const value = row[this.options.v];
      this.matrix[this.Y.indexOf(yTitle)][this.X.indexOf(xTitle)] = value;
    });
  }

  createEmptyMatrix(
    width: number,
    height: number,
    initialValue: any
  ): MatrixData {
    return _.times(height, () => new Array(width).fill(initialValue));
  }

  exportWithHeader(): MatrixData {
    return [
      [null, ...this.X],
      ...this.matrix.map((it, index) => [this.Y[index], ...it])
    ];
  }

  get sortedData(): MatrixData {
    return _.orderBy(this.source, [
      [this.options.y, this.options.yOrder],
      [this.options.x, this.options.xOrder]
    ]);
  }
}

(async function main() {
  const path = process.argv[2];
  const content = await readFileAsync(path, "utf8");
  const csvLines = await parseCsvAsync(content);
  const matrix = new MatrixBuilder(csvLines, {
    y: 0,
    x: 1,
    v: 2,
    xOrder: Order.asc,
    yOrder: Order.asc
  }).build();
  console.log(await stringifyCsvAsync(matrix));
})();
