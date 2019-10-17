const log = require("../utils/log");

async function deploy({ activate = false }) {
  log(`Deploy ${activate ? "and activate" : ""}`);
}

module.exports = deploy;
