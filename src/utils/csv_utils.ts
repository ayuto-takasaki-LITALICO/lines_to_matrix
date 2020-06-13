import util from "util";
import stringify from "csv-stringify";
import parse from "csv-parse";

/* eslint @typescript-eslint/no-explicit-any: 0 */

const parseCsvAsync = util.promisify<any, any, any>(parse);
const stringifyCsvAsync = util.promisify<any, any>(stringify);

type ImportCsvOptions = { fromLine: number };

export const importCsvAsync = (
  content: string,
  options: ImportCsvOptions
): Promise<any[][]> => parseCsvAsync(content, { from_line: options.fromLine });

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const exportCsvAsync = (content: any): Promise<string> =>
  stringifyCsvAsync(content);
