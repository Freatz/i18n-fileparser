import * as core from "@actions/core";
import { globby } from "globby";
import {
  createBlobForFile,
  createNewCommit,
  createNewTree,
  getCurrentCommit,
  setBranchToCommit,
} from "./github";

export const commitAndPush = async (token: string) => {
  const currentCommit = await getCurrentCommit(token);
  const filePath: string = core.getInput("destination");

  core.info(`filePath: ${JSON.stringify(filePath)}`);

  const filesPaths = await globby(filePath);
  const filesBlobs = await Promise.all(
    filesPaths.map(createBlobForFile(token))
  );

  const newTree = await createNewTree(
    token,
    filesBlobs,
    filesPaths,
    currentCommit.treeSha
  );
  const commitMessage = `Upload translation files`;
  const newCommit = await createNewCommit(
    token,
    commitMessage,
    newTree.sha,
    currentCommit.commitSha
  );

  await setBranchToCommit(token, newCommit.sha);
};
