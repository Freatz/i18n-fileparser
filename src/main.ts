import * as core from "@actions/core";
import { commitAndPush } from "./uploadToGit";
import { createFiles } from "./createFiles";

async function run(): Promise<void> {
  try {
    const token = core.getInput("myToken");
    const files = await createFiles();
    await commitAndPush(token, files);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
