// Set these variables in your environment via either .env file or server config
const { S3_BUCKET, S3_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET } = process.env;

module.exports = function(branch, revision) {
  // Base config for all branches
  const config = {
    aws: {
      bucket: S3_BUCKET, // S3 bucket used for deployment
      region: S3_BUCKET_REGION, // AWS region of S3 bucket
      accessKey: AWS_ACCESS_KEY, // AWS IAM access key
      secret: AWS_SECRET // AWS IAM secret key
    },
    dist: {
      sourceFolder: "./build", // Folder to deploy
      revision: revision, // Revision key that would be appended to index, e.g. index:my-awesome-branch.html
      activate: false, // Should deployment be activated (accessible via index.html or just root of the site)
      domain: false // Custom domain attached to the bucket, e.g. domain: "my-website.com"
    },
    build: {
      command: "npm run build", // Command that builds the app
      skip: false // Skip the build?
    },
    report: {
      handler: function(url, revision) {
        // function or async function that handles reporting of the deployment URL or revision
        console.log(`Deployed to ${url}`);
      }
    }
  };

  if (branch === "master") {
    // Modify config for production distribution
    config.dist.activate = true;
  }

  // Modify config for other branches accordingly

  return config;
};
