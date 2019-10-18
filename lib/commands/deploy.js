const log = require("../utils/log");
const { config } = require("../utils/config");
const app = require("../utils/app");

async function deploy({ activate = false }) {
  if (activate) config.dist.activate = true;

  try {
    if (!config.build.skip) await app.build();
    await app.applyRevision();
    if (activate) await app.activateRevision();
    await app.upload();
  } catch (error) {}
}

module.exports = deploy;
