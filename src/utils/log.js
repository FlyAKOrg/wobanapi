/* eslint-disable no-console */
const log = {
  print(msg) {
    msg = `[${new Date().toISOString()}] ${msg}`;
    console.log(msg);
  },
  info(msg) {
    this.print(`- INFO  - ${msg}`);
  },
  warn(msg) {
    this.print(`- WARN  - ${msg}`);
  },
  debug(msg) {
    this.print(`- DEBUG - ${msg}`);
  },
  error(msg) {
    this.print(`- ERROR - ${msg}`);
  },
};

module.exports = log;
