import { importCsvAsync, exportCsvAsync } from "../../src/utils/csv_utils";

describe("importCsvAsync", () => {
  it("CSVが解析されること", async () => {
    expect(await importCsvAsync("1,2,3\n4,5,6", { fromLine: 1 })).toEqual([
      ["1", "2", "3"],
      ["4", "5", "6"]
    ]);
  });
});

describe("exportCsvAsync", () => {
  it("CSVに変換されること", async () => {
    expect(await exportCsvAsync([
      ["1", "2", "3"],
      ["4", "5", "6"]
    ])).toEqual("1,2,3\n4,5,6\n");
  });
});
