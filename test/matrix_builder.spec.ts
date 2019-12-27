import { MatrixBuilder } from "../src/matrix_builder";

const sourceFactory = () => {
  return [
    ["2019-11-10", "C", "200", "white"],
    ["2019-11-10", "A", "100", "black"],
    ["2019-11-05", "B", "50", "read"],
    ["2019-12-15", "C", "150", "blue"],
    ["2019-12-15", "A", "250", "yellow"],
    ["2019-12-15", "B", "300", "green"]
  ];
};

const optionsFactory = () => {
  return {
    yPosition: 0,
    xPosition: 1,
    valuePosition: 2,
    xOrder: null,
    yOrder: null,
    naAs: ""
  };
};

describe("MatrixBuilder", () => {
  describe("build", () => {
    describe("デフォルトのオプションの挙動", () => {
      it("", () => {
        expect(
          new MatrixBuilder(sourceFactory(), optionsFactory()).build()
        ).toEqual([
          [null, "C", "A", "B"],
          ["2019-11-10", "200", "100", ""],
          ["2019-11-05", "", "", "50"],
          ["2019-12-15", "150", "250", "300"]
        ]);
      });
    });
  });
});
