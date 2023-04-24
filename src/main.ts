import * as core from "@actions/core";
import { createFiles } from "./createFiles";
import { commitAndPush } from "./uploadToGit";

async function run(): Promise<void> {
  try {
    const token = core.getInput("myToken");
    await createFiles();
    await commitAndPush(token);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
