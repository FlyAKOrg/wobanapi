/* eslint-disable no-console */
const log = {
  print(baseMsg) {
    const msg = `[${new Date().toISOString()}] ${baseMsg}`;
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
