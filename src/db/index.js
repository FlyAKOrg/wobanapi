import Sequelize from "sequelize";
import fs from "fs";
import path from "path";

const basename = path.basename(__filename);

const db = {};

db.buildConnection = (opts) => {
  const sequelize = new Sequelize(opts.database, opts.user, opts.password, {
    host: opts.host,
    port: opts.port,
    dialect: "mysql",
    timezone: "+00:00",
    logging: opts.logging || false,
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
    },
  });

  fs.readdirSync(`${__dirname}/models/`)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
      const model = sequelize.import(path.join(`${__dirname}/models/`, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;

  return db.sequelize.authenticate();
};

export default db;
