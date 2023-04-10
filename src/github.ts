import * as core from "@actions/core";
import * as github from "@actions/github";
import { readFile } from "fs-extra";

interface Tree {
  path?: string | undefined;
  mode?: "100644" | "100755" | "040000" | "160000" | "120000" | undefined;
  type?: "blob" | "tree" | "commit" | undefined;
  sha?: string | null | undefined;
  content?: string | undefined;
}

export const createNewTree = async (
  token: string,
  blobs: {
    url: string;
    sha: string;
  }[],
  paths: string[],
  parentTreeSha: string
) => {
  const octokit = github.getOctokit(token);

  const { repo, owner } = github.context.repo;

  core.debug(`repo: ${repo}, owner: ${owner}`);
  const tree = blobs.map(({ sha }, index) => ({
    path: paths[index],
    mode: `100644`,
    type: `blob`,
    sha,
  })) as Tree[];

  const { data } = await octokit.rest.git.createTree({
    owner,
    repo,
    tree,
    base_tree: parentTreeSha,
  });
  return data;
};

export const createNewCommit = async (
  token: string,
  message: string,
  currentTreeSha: string,
  currentCommitSha: string
) => {
  const octokit = github.getOctokit(token);

  const { repo, owner } = github.context.repo;
  const response = await octokit.rest.git.createCommit({
    owner,
    repo,
    message,
    tree: currentTreeSha,
    parents: [currentCommitSha],
  });
  return response.data;
};

const getFileAsUTF8 = (filePath: string) => readFile(filePath, "utf8");

export const createBlobForFile =
  (token: string) => async (filePath: string) => {
    const octokit = github.getOctokit(token);
    const content = await getFileAsUTF8(filePath);
    const { repo, owner } = github.context.repo;

    const blobData = await octokit.rest.git.createBlob({
      owner,
      repo,
      content,
      encoding: "utf-8",
    });
    return blobData.data;
  };

export const getCurrentCommit = async (token: string) => {
  const { repo, owner } = github.context.repo;
  const octokit = github.getOctokit(token);
  core.info(`commitSha: ${github.context.ref}`);

  const { data: commitData } = await octokit.rest.git.getCommit({
    owner,
    repo,
    commit_sha: github.context.sha,
  });

  return {
    commitSha: github.context.sha,
    treeSha: commitData.tree.sha,
  };
};

export const setBranchToCommit = (token: string, commitSha: string) => {
  const octokit = github.getOctokit(token);
  const { repo, owner } = github.context.repo;

  return octokit.rest.git.updateRef({
    owner,
    repo,
    ref: github.context.ref,
    sha: commitSha,
  });
};
