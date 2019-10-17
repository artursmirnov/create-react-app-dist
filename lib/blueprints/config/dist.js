// Set these variables in your environment via either .env file or server config
const { S3_BUCKET, AWS_ACCESS_KEY, AWS_SECRET } = process.env;

module.exports = function(branch, revision) {
  // Base config for all branches
  const config = {
    aws: {
      bucket: S3_BUCKET, // S3 bucket used for deployment
      accessKey: AWS_ACCESS_KEY, // AWS IAM access key
      secret: AWS_SECRET // AWS IAM secret key
    },
    dist: {
      sourceFolder: "./build", // Folder to deploy
      revision: revision, // Revision key that would be appended to index, e.g. index:my-awesome-branch.html
      activate: false // Should deployment be activated (accessible via index.html or just root of the site)
    }
  };

  if (branch === "master") {
    // Modify config for production distribution
    config.dist.activate = true;
  }

  // Modify config for other branches accordingly

  return config;
};
