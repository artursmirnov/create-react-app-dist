const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const log = require("./log");
const { config } = require("./config");
const { root } = require("./git");
const s3 = require("./s3");

const { revision, sourceFolder } = config.dist;

const sourceDir = path.resolve(root, sourceFolder);
const indexFile = path.join(sourceDir, "index.html");
const indexFileWithRev = path.join(sourceDir, `${revision}.html`);

async function build() {
  log("Building the application...");
  try {
    const { stdout } = await exec(config.build.command, { cwd: root });
    log(stdout);
    log.success("Application built successfully!");
    log();
  } catch (error) {
    log.error("There was an error building the app");
    log(error);
    throw error;
  }
}

async function applyRevision() {
  log(`Applying revision: ${revision}`);
  try {
    await fs.move(indexFile, indexFileWithRev, { overwrite: true });
    log.success("Revision has been applied successfully!");
    log();
  } catch (error) {
    log.error("There was an error applying the revision");
    log(error);
    throw error;
  }
}

async function activateRevision() {
  log(`Activating revision: ${revision}`);
  try {
    await fs.copy(indexFileWithRev, indexFile);
    log.success("Revision has been activated successfully!");
    log();
  } catch (error) {
    log.error("There was an error activating the revision");
    log(error);
    throw error;
  }
}

async function upload() {
  log(`Deploying to S3 bucket ${config.aws.bucket}...`);
  try {
    await s3.upload();

    const { activate } = config.dist;
    const { handler } = config.report;
    if (typeof handler === "function") {
      await handler(urlFor(activate ? indexFile : indexFileWithRev), revision);
    }

    log.success("Deployed successfully!");
    log();
    log(`Revision URL: ${chalk.blue.underline(urlFor(indexFileWithRev))}`);
    if (activate) {
      log(`Application URL: ${chalk.blue.underline(urlFor(indexFile))}`);
    }
  } catch (error) {
    log.error("There was an error deploying to S3");
    log(error);
    throw error;
  }
}

function urlFor(index) {
  const { region, bucket } = config.aws;
  const { revision, domain } = config.dist;
  const root = domain || `${bucket}.s3-website.${region}.amazonaws.com`;
  const path = index === indexFile ? "" : `${revision}.html`;
  return `http://${root}/${path}`;
}

module.exports = {
  build,
  applyRevision,
  activateRevision,
  upload
};
