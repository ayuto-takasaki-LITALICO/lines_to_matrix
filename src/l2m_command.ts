import commander from "commander";
import { readFromFileOrStdin } from "./utils/read_from_file_or_stdin";
import { importCsvAsync } from "./utils/csv_utils";

export const createL2mCommand = (): commander.Command => {
  return new commander.Command()
    .name("l2m")
    .usage("[options] <file>")
    .version("1.0.0")
    .option(
      "-y, --y-position <position>",
      "縦方向のラベルを表す列の位置を指定します",
      /^\d+$/i,
      "0"
    )
    .option(
      "-x, --x-position, <position>",
      "横方向のラベルを表す列の位置を指定します",
      /^\d+$/i,
      "1"
    )
    .option(
      "-v, --value-position, <position>",
      "値を表す列の位置を指定します",
      /^\d+$/i,
      "2"
    )
    .option(
      "--y-order <order>",
      "縦方向のラベルの並び順を指定します",
      /^(asc|desc)$/i,
      null
    )
    .option(
      "--x-order <order>",
      "横方向のラベルの並び順を指定します",
      /^(asc|desc)$/i,
      null
    )
    .option("--na-as <value>}", "N/Aの箇所の表示内容を指定します", "")
    .option(
      "--from-line <number>",
      "CSVの解析を始める行番号を指定します",
      /^\d+$/i,
      "1"
    )
    .arguments("<file>");
};

export const importSource = async (
  program: commander.Command
): Promise<any[][]> => {
  const fileName = program.args[0];
  const fromLine = Number(program.fromLine) || 1;
  const content = await readFromFileOrStdin(fileName);
  return importCsvAsync(content, { fromLine: fromLine });
};

export const commandToOptions = (program: commander.Command) => {
  return {
    yPosition: Number(program.yPosition),
    xPosition: Number(program.xPosition),
    valuePosition: Number(program.valuePosition),
    xOrder: program.xOrder,
    yOrder: program.yOrder,
    naAs: program.naAs
  };
};
