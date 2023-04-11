import * as core from "@actions/core";
import {
  createBlobForFile,
  createNewCommit,
  createNewTree,
  getCurrentCommit,
  setBranchToCommit,
} from "./github";
import { globby } from "globby";
import path from "path";

export const commitAndPush = async (token: string, files: string) => {
  const currentCommit = await getCurrentCommit(token);
  const filesPaths = await globby(files);
  const filesBlobs = await Promise.all(
    filesPaths.map(createBlobForFile(token))
  );
  const pathsForBlobs = filesPaths.map((fullPath: string) =>
    path.relative(files, fullPath)
  );
  core.info(`filesBlobs: ${JSON.stringify(filesBlobs)}`);
  core.info(`filesPaths: ${JSON.stringify(filesPaths)}`);
  core.info(`pathsForBlobs: ${JSON.stringify(pathsForBlobs)}`);
  const newTree = await createNewTree(
    token,
    filesBlobs,
    pathsForBlobs,
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
