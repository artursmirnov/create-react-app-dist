const program = require("commander");
const init = require("./lib/commands/init");
const deploy = require("./lib/commands/deploy");

program
  .command("init")
  .description("Initialize deployment configuration in current directory")
  .action(async () => {
    await init();
  });

program
  .command("deploy")
  .description("Deploys current branch to S3")
  .option("-a, --activate", "Force to activate current branch")
  .action(async ({ activate = false }) => {
    await deploy({ activate });
  });

program.parse(process.argv);
