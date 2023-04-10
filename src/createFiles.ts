import * as core from "@actions/core";
import { processCSV } from "./processCsv";
import { processNotion } from "./processNotion";

export const createFiles = async () => {
  const filePath: string = core.getInput("filePath");

  if (filePath) {
    return processCSV(filePath).then((files) => {
      return files;
    });
  }

  if (!filePath) {
    const notionSecret: string = core.getInput("notionSecret");
    const notionId: string = core.getInput("notionId");
    if (!notionId || !notionSecret) {
      return core.setFailed("Missing inputs information to parse translation.");
    }
    return await processNotion(notionSecret, notionId);
  }
};
