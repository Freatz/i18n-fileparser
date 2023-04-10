import * as core from "@actions/core";
import {
  createBlobForFile,
  createNewCommit,
  createNewTree,
  getCurrentCommit,
  setBranchToCommit,
} from "./github";

// pegar os varios arquivos gerados
// commit
// push

export const commitAndPush = async (token: string, files: string[]) => {
  const currentCommit = await getCurrentCommit(token);
  core.info(`currentCommit: ${JSON.stringify(currentCommit)}`);

  core.info(`filesPaths: ${JSON.stringify(files)}`);

  const filesBlobs = await Promise.all(files.map(createBlobForFile(token)));

  core.info(`filesBlobs: ${JSON.stringify(filesBlobs)}`);
  // verificar se é necessário

  const newTree = await createNewTree(
    token,
    filesBlobs,
    files,
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
