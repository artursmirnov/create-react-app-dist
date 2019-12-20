const gitRepoInfo = require("git-repo-info");

const git = gitRepoInfo() || {};

git.root = git.root || process.cwd();
git.branch = git.branch || process.env.GIT_BRANCH;

if (!git.branch) {
  throw new Error(
    "Cannot determine git branch. Please make sure to either run deploy in a git repository or provide branch via GIT_BRANCH environment variable"
  );
}

module.exports = git;
