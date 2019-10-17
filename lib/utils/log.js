const { yellow, redBright, green } = require("chalk");

const LOG_LEVEL = {
  NORMAL: "normal",
  WARNING: "warning",
  ERROR: "error",
  SUCCESS: "success"
};

function log(message = "", level = LOG_LEVEL.NORMAL) {
  log[level](message);
}

log[LOG_LEVEL.NORMAL] = function(message = "") {
  const line = message;
  putLine(line);
};

log[LOG_LEVEL.WARNING] = function(message = "") {
  const line = yellow(message);
  putLine(line);
};

log[LOG_LEVEL.ERROR] = function(message = "") {
  const line = redBright(message);
  putLine(line);
};

log[LOG_LEVEL.SUCCESS] = function(message = "") {
  const line = green(message);
  putLine(line);
};

function putLine(line) {
  console.log(line);
}

module.exports = log;
