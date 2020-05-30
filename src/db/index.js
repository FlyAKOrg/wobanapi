const Sequelize = require('sequelize');

let sequelize;

const db = {
  sequelize,

  buildConnection(opts) {
    sequelize = new Sequelize(opts.database, opts.username, opts.password, {
      host: opts.host,
      port: opts.port,
      dialect: 'mysql',
      pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000,
      },
    });
    return sequelize.authenticate();
  },

  get() { return sequelize; },
};

export default db;
