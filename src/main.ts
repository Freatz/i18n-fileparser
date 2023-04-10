import * as core from "@actions/core";
import { processCSV } from "./processCsv";
import { processNotion } from "./processNotion";
import { commitAndPush } from "./uploadToGit";

async function run(): Promise<void> {
  try {
    const filePath: string = core.getInput("filePath");
    const token = core.getInput("myToken");

    let files = [];
    if (filePath) {
      files = await processCSV(filePath);
    }

    if (!filePath) {
      const notionSecret: string = core.getInput("notionSecret");
      const notionId: string = core.getInput("notionId");
      if (!notionId || !notionSecret) {
        return core.setFailed(
          "Missing inputs information to parse translation."
        );
      }

      files = await processNotion(notionSecret, notionId);
    }

    await commitAndPush(token, files);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();

// npm run build && npm run package
// git add commit