import glob from "globby";
import path from "path";
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

  const filesPaths = await glob(files);
  const filesBlobs = await Promise.all(
    filesPaths.map(createBlobForFile(token))
  );
  // verificar se é necessário
  const pathsForBlobs = filesPaths.map((fullPath) =>
    path.relative(".", fullPath)
  );

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
