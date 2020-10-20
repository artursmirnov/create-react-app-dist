# CLI tool to deploy apps, based on Create React App to AWS S3

This tool is aimed to simplfy deployment of React static apps to AWS S3 bucket (with enabled static hosting). The deployment is based on branches, which means that it deploys currently active Git branch as a separate revision to S3. All revisions are available at the same time.

## Example

Let's assume that we have an AWS S3 bucket `react-app` located in `eu-north-1` region. Also we have a React application, created with Create React App and create-react-app-dist installed. As usually, when we need to implement some changes, first of all we create a new Git branch:
```
git checkout -b my-awesome-changes
```
Then we implement all the necessary changes and want to show them to our manager or pull-request reviewer. In order to do that, the app needs to be deployed somewhere. This is very easy to achieve!
```
cra-dist deploy
```
That's it! Our branch is now deployed and available at `http://react-app.s3-website.eu-north-1.amazonaws.com/my-awesome-changes.html`

## Installation

Globally:

```
npm install -g create-react-app-dist
```

Locally:

```
npm install --save-dev create-react-app-dist
```

Upon the installation the tool exposes `cra-dist` binary that allows to run it via CLI.

## Configuration

The first thing to do after installation in the app is to initialize configuration. It's as easy as running

```
cra-dist init
```
This command creates a configuration file at `./config/dist.js` relative to your app's Git root.

The config file contains all available configuration options with default values and documentation comments. Here's [how it looks](https://github.com/artursmirnov/create-react-app-dist/blob/master/lib/blueprints/config/dist.js)

Although, it requires certain options, like AWS credentials and Bucket settings, to be configured via environment variables. You could define them either via `.env` file located in the Git root of the application, or environment settings of the server (e.g. CI server).

The config is basically a script that configures options for each run. The script provides two arguments:
- `branch` - current Git branch
- `revision` - the exact revision name, based on Git branch, with all special characters replaced by `-`

You can use these options to configure the deployment in runtime. E.g. You can tweak certain configuration options depending on current branch (for example, deploy to different bucket or activate the revision)

The initial config contains general options, that aplly to all branches. These settings could be tweaked for other branches. For example, initial config [overwrites settings for `master` branch](https://github.com/artursmirnov/create-react-app-dist/blob/master/lib/blueprints/config/dist.js#L25-L28) to automatically activate any deployment from that branch.

## Deployment

Once configuration is set up, the deployment of the current branch is as easy as:

```
cra-dist deploy
```

If you need to activate current branch (make it available as `index.html` or just on root of the domain), just add `--activate` or `-a` option:

```
cra-dist deploy --activate
```

This CLI parameter takes precedance over the `activate` config option.
