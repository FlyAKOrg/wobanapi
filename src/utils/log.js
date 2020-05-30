/* eslint-disable no-console */
const log = {
  print(msg) {
    const m = `[${new Date().toISOString()}] ${msg}`;
    console.log(m);
  },
  info(msg) {
    this.print(`- INFO  - ${msg}`);
  },
  debug(msg) {
    this.print(`- DEBUG - ${msg}`);
  },
  error(msg) {
    this.print(`- ERROR - ${msg}`);
  },
};

export default log;
