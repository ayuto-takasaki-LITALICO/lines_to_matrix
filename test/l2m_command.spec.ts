import { createL2mCommand, parseCsv } from "../src/l2m_command";
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
