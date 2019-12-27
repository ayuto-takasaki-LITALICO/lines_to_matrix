import _ from "lodash";

export type MatrixCellData = string | number | boolean | null;
export type MatrixRowData = MatrixCellData[];
export type MatrixData = MatrixRowData[];
export type MatrixBuilderOptions = {
  yPosition: number;
  xPosition: number;
  valuePosition: number;
  xOrder: Order | null;
  yOrder: Order | null;
  naAs: string;
};
export type Order = "asc" | "desc";

export class MatrixBuilder {
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
      if (this.options.xOrder === "asc") {
        _.sortBy(this.X);
      } else {
        _.sortBy(this.X);
        _.reverse(this.X);
      }
    }
    if (this.options.yOrder) {
      if (this.options.yOrder === "asc") {
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
