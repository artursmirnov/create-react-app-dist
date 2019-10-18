#!/usr/bin/env node
const program = require("commander");

program
  .command("init")
  .description("Initialize deployment configuration in current directory")
  .action(async () => {
    const init = require("./lib/commands/init");
    await init();
  });

program
  .command("deploy")
  .description("Deploys current branch to S3")
  .option("-a, --activate", "Force to activate current branch")
  .action(async ({ activate = false }) => {
    const deploy = require("./lib/commands/deploy");
    await deploy({ activate });
  });

program.parse(process.argv);
