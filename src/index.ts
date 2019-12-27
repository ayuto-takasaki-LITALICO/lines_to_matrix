import { MatrixBuilder } from "./matrix_builder";
import {
  createL2mCommand,
  importSource,
  commandToOptions
} from "./l2m_command";
import { exportCsvAsync } from "./utils/csv_utils";

(async function main() {
  const program = createL2mCommand().parse(process.argv);
  const matrix = new MatrixBuilder(
    await importSource(program),
    commandToOptions(program)
  ).build();
  process.stdout.write(await exportCsvAsync(matrix));
})();
