const path = require("path");
const git = require("./git");
const rev = require("./revision");

require("dotenv").config(path.join(git.root, ".env"));

function read(branch = git.branch, revision = rev.revision) {
  const path = getPath();
  createConfig = require(path);
  return createConfig(branch, revision);
}

function getPath() {
  return path.join(git.root, "config/dist.js");
}

const config = read();

module.exports = {
  read,
  getPath,
  config
};
