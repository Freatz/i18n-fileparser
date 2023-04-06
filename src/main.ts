import * as core from "@actions/core";
import { processCSV } from "./processCsv";
import { processNotion } from "./processNotion";

async function run(): Promise<void> {
  try {
    const filePath: string = core.getInput("filePath");
    if (filePath) {
      await processCSV(filePath);
    }
    if (!filePath) {
      const notionSecret: string = core.getInput("notionSecret");
      const notionId: string = core.getInput("notionId");
      if (!notionId || !notionSecret) {
        return core.setFailed(
          "Missing inputs information to parse translation."
        );
      }

      await processNotion(notionSecret, notionId);
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
