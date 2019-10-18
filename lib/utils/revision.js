const git = require("./git");

function createRevision() {
  return git.branch.replace(/[\W_-]+/gi, "-");
}

const revision = createRevision();

module.exports = {
  createRevision,
  revision
};
