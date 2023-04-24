import * as core from "@actions/core";
import { globby } from "globby";
import path from "path";
import {
  createBlobForFile,
  createNewCommit,
  createNewTree,
  getCurrentCommit,
  setBranchToCommit,
} from "./github";

export const commitAndPush = async (token: string, files: string[]) => {
  const currentCommit = await getCurrentCommit(token);
  // const filesPaths = await globby(files);
  const filePath: string = core.getInput("destination");

  const filesPaths = await globby(filePath);
  const filesBlobs = await Promise.all(
    filesPaths.map(createBlobForFile(token))
  );
  core.info(`filesPaths: ${JSON.stringify(filesPaths)}`);
  core.info(`filesBlobs: ${JSON.stringify(filesBlobs)}`);

  const pathsForBlobs = filesPaths.map((fullPath: string) =>
    path.relative(filePath, fullPath)
  );
  core.info(`pathsForBlobs: ${JSON.stringify(pathsForBlobs)}`);
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
