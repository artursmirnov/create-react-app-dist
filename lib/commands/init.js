const log = require("../utils/log");
const path = require("path");
const git = require("../utils/git");
const fs = require("fs-extra");

async function init() {
  log("Setting up blueprints and initial configuration...");

  const blueprintsDir = path.join(__dirname, "../blueprints");
  const targetDir = git.root;

  try {
    await fs.copy(blueprintsDir, targetDir, {
      overwrite: false,
      errorOnExist: true
    });

    log.success("Set up successfully!");
    log("Please update ./config/dist.js file and provide your AWS credentials");
  } catch (error) {
    log.error("Failed to initialize configuration. Already initialized?");
  }
}

module.exports = init;
