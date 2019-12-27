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
  yPosition: number;
  xPosition: number;
  valuePosition: number;
  xOrder?: Order;
  yOrder?: Order;
  naAs: string;
};
type Order = "asc" | "desc";

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
    this.sortLabels();
    this.readLines();
    return this.exportWithHeader();
  }

  init(): void {
    this.X = _.uniq(_.map(this.source, this.options.xPosition));
    this.Y = _.uniq(_.map(this.source, this.options.yPosition));
    this.matrix = _.times(this.Y.length, () =>
      new Array(this.X.length).fill(this.options.naAs)
    );
  }

  sortLabels(): void {
    if (this.options.xOrder) {
      if (this.options.xOrder === 'asc') {
        _.sortBy(this.X);
      } else {
        _.sortBy(this.X);
        _.reverse(this.X);
      }
    }
    if (this.options.yOrder) {
      if (this.options.yOrder === 'asc') {
        _.sortBy(this.Y);
      } else {
        _.sortBy(this.Y);
        _.reverse(this.Y);
      }
    }
  }

  readLines(): void {
    this.source.forEach(row => {
      const yTitle = row[this.options.yPosition];
      const xTitle = row[this.options.xPosition];
      const value = row[this.options.valuePosition];
      this.matrix[this.Y.indexOf(yTitle)][this.X.indexOf(xTitle)] = value;
    });
  }

  exportWithHeader(): MatrixData {
    return [
      [null, ...this.X],
      ...this.matrix.map((it, index) => [this.Y[index], ...it])
    ];
  }
}

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
