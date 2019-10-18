const s3 = require("s3-node-client");
const path = require("path");
const { config } = require("./config");
const { root } = require("./git");

const {
  bucket: Bucket,
  region,
  accessKey: accessKeyId,
  secret: secretAccessKey
} = config.aws;

const { sourceFolder } = config.dist;
const localDir = path.join(root, sourceFolder);

const syncParams = {
  localDir,
  deleteRemoved: false,
  s3Params: { Bucket }
};

const client = s3.createClient({
  s3Options: { accessKeyId, secretAccessKey, region }
});

function uploadDir(params) {
  return new Promise((resolve, reject) => {
    const uploader = client.uploadDir(params);
    uploader.on("error", error => reject(error));
    uploader.on("end", () => resolve());
  });
}

async function upload() {
  await uploadDir(syncParams);
}

module.exports = {
  upload
};
