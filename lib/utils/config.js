const path = require("path");
const fs = require("fs-extra");
const git = require("./git");
const rev = require("./revision");

require("dotenv").config(path.join(git.root, ".env"));

function read(branch = git.branch, revision = rev.revision) {
  const path = getPath();
  createConfig = require(path);
  return createConfig(branch, revision);
}

function getPath() {
  return ["src/config/dist.js", "config/dist.js", "dist.js"]
    .map(relativePath => path.join(git.root, relativePath))
    .find(path => fs.existsSync(path));
}

const config = read();

module.exports = {
  read,
  getPath,
  config
};
