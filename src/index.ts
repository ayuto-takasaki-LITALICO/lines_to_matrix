import { MatrixBuilder } from "./matrix_builder";
import {
  createL2mCommand,
  readCsv,
  parseCsv,
  commandToOptions
} from "./l2m_command";
import { exportCsvAsync } from "./utils/csv_utils";

(async function main() {
  const program = createL2mCommand().parse(process.argv);
  process.stdout.write(
    await exportCsvAsync(
      new MatrixBuilder(
        await parseCsv(program, await readCsv(program)),
        commandToOptions(program)
      ).build()
    )
  );
})();
