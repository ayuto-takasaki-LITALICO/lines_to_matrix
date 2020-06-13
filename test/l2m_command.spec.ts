import {
  createL2mCommand,
  parseCsv,
  commandToOptions
} from "../src/l2m_command";
// eslint-disable-next-line import/order
import commander = require("commander");

const argumentsFactory = (args: string[]): string[] => {
  return ["node", "test", ...args];
};

const programFactory = (args: string[]): commander.Command => {
  return createL2mCommand().parse(args);
};

describe("parseCsv", () => {
  const csvFactory = (): string => {
    return "1,2,3\n4,5,6";
  };

  describe("fromLine", () => {
    it("1の場合", async () => {
      const program = programFactory(argumentsFactory(["--from-line", "1"]));
      expect(await parseCsv(program, csvFactory())).toEqual([
        ["1", "2", "3"],
        ["4", "5", "6"]
      ]);
    });

    it("2の場合", async () => {
      const program = programFactory(argumentsFactory(["--from-line", "2"]));
      expect(await parseCsv(program, csvFactory())).toEqual([["4", "5", "6"]]);
    });
  });
});

describe("commandToOptions", () => {
  it("オプションが正常に変換されること", () => {
    const program = programFactory(
      argumentsFactory([
        "--y-position",
        "10",
        "--x-position",
        "20",
        "--value-position",
        "30",
        "--y-order",
        "desc",
        "--x-order",
        "desc",
        "--na-as",
        "NA"
      ])
    );
    expect(commandToOptions(program)).toEqual({
      yPosition: 10,
      xPosition: 20,
      valuePosition: 30,
      yOrder: "desc",
      xOrder: "desc",
      naAs: "NA"
    });
  });
});
