import { MatrixBuilder, MatrixBuilderOptions } from "../src/matrix_builder";

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
  } as MatrixBuilderOptions;
};

describe("MatrixBuilder", () => {
  describe("build", () => {
    it("デフォルトのオプションの挙動", () => {
      const options = optionsFactory();
      expect(new MatrixBuilder(sourceFactory(), options).build()).toEqual([
        [null, "C", "A", "B"],
        ["2019-11-10", "200", "100", ""],
        ["2019-11-05", "", "", "50"],
        ["2019-12-15", "150", "250", "300"]
      ]);
    });

    describe("縦方向のソートのテスト", () => {
      it("ascの挙動", () => {
        const options = optionsFactory();
        options.yOrder = "asc";
        expect(new MatrixBuilder(sourceFactory(), options).build()).toEqual([
          [null, "C", "A", "B"],
          ["2019-11-05", "", "", "50"],
          ["2019-11-10", "200", "100", ""],
          ["2019-12-15", "150", "250", "300"]
        ]);
      });

      it("descの挙動", () => {
        const options = optionsFactory();
        options.yOrder = "desc";
        expect(new MatrixBuilder(sourceFactory(), options).build()).toEqual([
          [null, "C", "A", "B"],
          ["2019-12-15", "150", "250", "300"],
          ["2019-11-10", "200", "100", ""],
          ["2019-11-05", "", "", "50"]
        ]);
      });
    });

    describe("横方向のソートのテスト", () => {
      it("ascの挙動", () => {
        const options = optionsFactory();
        options.xOrder = "asc";
        expect(new MatrixBuilder(sourceFactory(), options).build()).toEqual([
          [null, "A", "B", "C"],
          ["2019-11-10", "100", "", "200"],
          ["2019-11-05", "", "50", ""],
          ["2019-12-15", "250", "300", "150"]
        ]);
      });

      it("descの挙動", () => {
        const options = optionsFactory();
        options.xOrder = "desc";
        expect(new MatrixBuilder(sourceFactory(), options).build()).toEqual([
          [null, "C", "B", "A"],
          ["2019-11-10", "200", "", "100"],
          ["2019-11-05", "", "50", ""],
          ["2019-12-15", "150", "300", "250"]
        ]);
      });
    });
  });
});
