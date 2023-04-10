import {
  createBlobForFile,
  createNewCommit,
  createNewTree,
  getCurrentCommit,
  setBranchToCommit,
} from "./github";

export const commitAndPush = async (token: string, files: string[]) => {
  const currentCommit = await getCurrentCommit(token);
  const filesBlobs = await Promise.all(files.map(createBlobForFile(token)));
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
