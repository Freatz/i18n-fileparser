import glob from "globby";
import path from "path";
import {
  createBlobForFile,
  createNewCommit,
  createNewTree,
  getCurrentCommit,
  setBranchToCommit,
} from "./github";
import * as core from "@actions/core";

// pegar os varios arquivos gerados
// commit
// push

export const commitAndPush = async (token: string, files: string[]) => {
  const currentCommit = await getCurrentCommit(token);
  core.info(`currentCommit: ${currentCommit}`)

  const filesPaths = await glob(files);
  core.info(`filesPaths: ${filesPaths}`)

  const filesBlobs = await Promise.all(
    filesPaths.map(createBlobForFile(token))
  );

  core.info(`filesBlobs: ${filesBlobs}`)
  // verificar se é necessário
  const pathsForBlobs = filesPaths.map((fullPath) =>
    path.relative(".", fullPath)
  );

  core.info(`pathsForBlobs: ${pathsForBlobs}`)
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
