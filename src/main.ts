import * as core from "@actions/core";
import { processCsv } from "./processCsv";

async function run(): Promise<void> {
  try {
    const filePath: string = core.getInput("filePath");
    // core.debug(`Waiting ${ms} milliseconds ...`)
    // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    // core.debug(new Date().toTimeString())
    core.debug(`filePath: ${filePath}`);
    await processCsv(filePath);
    // core.debug(new Date().toTimeString())

    // core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();

// modificar o codigo
// npm run build && npm run package
// git push

// dashboard -> rodar o workflow
