import * as core from "@actions/core";
import { processCsv } from "./processCsv";

async function run(): Promise<void> {
  try {
    const filePath: string = core.getInput("filePath");
    core.debug(`filePath: ${filePath}`);
    await processCsv("tranlsations.csv");
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();

// modificar o codigo
// npm run build && npm run package
// git push

// dashboard -> rodar o workflow
