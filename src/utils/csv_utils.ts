import util from "util";
import stringify from "csv-stringify";
import parse from "csv-parse";

const parseCsvAsync = util.promisify<any, any, any>(parse);
const stringifyCsvAsync = util.promisify<any, any>(stringify);

type ImportCsvOptions = { fromLine: number };

export const importCsvAsync = (
  content: string,
  options: ImportCsvOptions
): Promise<any[][]> => parseCsvAsync(content, { from_line: options.fromLine });

export const exportCsvAsync = (content: any): Promise<string> =>
  stringifyCsvAsync(content);
